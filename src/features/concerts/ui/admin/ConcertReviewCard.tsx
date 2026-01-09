'use client';

import { Concert } from '@prisma/client';
import { CheckCircle2, ExternalLink, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
  publishConcertAction,
  rejectConcertAction,
  searchExternalArtistsAction,
} from '@/features/concerts/api/actions';
import { Candidate } from '@/features/concerts/model/services/analysis.service';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';

interface ConcertReviewCardProps {
  concert: Concert;
}

export function ConcertReviewCard({ concert }: ConcertReviewCardProps) {
  const [loading, setLoading] = useState(false);

  // Multi-Selection State
  // Set<mbid>
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Store full candidate objects for lookup
  // Map<mbid, Candidate>
  const [candidateMap, setCandidateMap] = useState<Map<string, Candidate>>(new Map());

  // Manual Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const analysisResult = concert.analysisResult as unknown as {
    results: { query: string; candidates: Candidate[] }[];
  } | null;

  const groupedResults = analysisResult?.results || [];

  const handlePublish = async () => {
    const selectedCandidates = Array.from(selectedIds)
      .map((id) => candidateMap.get(id))
      .filter(Boolean) as Candidate[];
    if (selectedCandidates.length === 0) return;

    setLoading(true);
    await publishConcertAction(concert.id, selectedCandidates);
    setLoading(false);
  };

  const handleReject = async () => {
    setLoading(true);
    await rejectConcertAction(concert.id);
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const results = await searchExternalArtistsAction(searchQuery);
    setSearchResults(results as Candidate[]);
    setIsSearching(false);
  };

  const toggleSelection = (candidate: Candidate) => {
    if (!candidate.mbid) return;

    const newSet = new Set(selectedIds);
    const newMap = new Map(candidateMap);

    if (newSet.has(candidate.mbid)) {
      newSet.delete(candidate.mbid);
    } else {
      newSet.add(candidate.mbid);
      newMap.set(candidate.mbid, candidate);
    }

    setSelectedIds(newSet);
    setCandidateMap(newMap);
  };

  const isSelected = (mbid?: string) => (mbid ? selectedIds.has(mbid) : false);

  return (
    <Card className="w-full flex flex-col md:flex-row overflow-hidden">
      {/* Left: KOPIS Info */}
      <Link
        href={`/concerts/${concert.id}`}
        target="_blank"
        className="w-full md:w-1/3 bg-slate-50 p-4 border-r flex flex-col hover:bg-slate-100 transition-colors cursor-pointer"
      >
        <div className="relative w-full aspect-3/4 mb-4 bg-gray-200 rounded shrink-0">
          {concert.posterUrl && (
            <Image
              src={concert.posterUrl}
              alt={concert.title}
              fill
              className="object-cover rounded"
              unoptimized
            />
          )}
        </div>
        <h3 className="font-bold text-lg mb-2">{concert.title}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            📅 {new Date(concert.startDate).toLocaleDateString()} ~{' '}
            {new Date(concert.endDate).toLocaleDateString()}
          </p>
          <p>📍 {concert.place}</p>
        </div>
        <div className="mt-4 text-xs text-gray-400 break-all">ID: {concert.kopisId}</div>
        <div className="mt-auto pt-4 text-xs text-primary flex items-center gap-1">
          <ExternalLink size={12} />
          상세 페이지 보기
        </div>
      </Link>

      {/* Right: Action Area */}
      <div className="w-full md:w-2/3 p-6 flex flex-col max-h-200">
        <div className="flex flex-col h-full">
          {/* Fixed Top Section */}
          <div className="space-y-4 pb-4 border-b">
            {/* Manual Search Section */}
            <div>
              <p className="text-sm font-medium mb-2">🔍 수동 추가 (검색)</p>
              <div className="flex gap-2">
                <Input
                  placeholder="아티스트 이름 입력..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button variant="outline" size="icon" onClick={handleSearch} disabled={isSearching}>
                  <Search size={16} />
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="mt-2 grid gap-2 max-h-40 overflow-y-auto">
                  {searchResults.map((result, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 p-2 rounded border transition-colors text-sm
                          ${isSelected(result.mbid) ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'hover:bg-accent'}`}
                    >
                      <div
                        className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
                        onClick={() => toggleSelection(result)}
                      >
                        <div className="w-8 h-8 relative bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                          {result.imageUrl && (
                            <Image
                              src={result.imageUrl}
                              alt={result.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{result.name}</div>
                        </div>
                        {isSelected(result.mbid) && (
                          <CheckCircle2 size={16} className="text-green-600" />
                        )}
                      </div>
                      {result.url && (
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 p-1 hover:bg-primary/10 rounded transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={14} className="text-primary" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Summary */}
            {selectedIds.size > 0 && (
              <div className="p-3 bg-secondary/20 rounded border border-secondary">
                <h5 className="font-bold text-sm mb-2">선택된 아티스트 ({selectedIds.size})</h5>
                <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                  {Array.from(selectedIds).map((id) => (
                    <Badge key={id} variant="default" className="gap-1">
                      {candidateMap.get(id)?.name}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelection(candidateMap.get(id)!);
                        }}
                        className="ml-1 hover:text-red-300"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleReject} disabled={loading}>
                {loading ? '처리 중...' : '반려'}
              </Button>
              <Button onClick={handlePublish} disabled={loading || selectedIds.size === 0}>
                {loading ? '발행 중...' : `선택한 ${selectedIds.size}명 승인 및 발행`}
              </Button>
            </div>
          </div>

          {/* Scrollable AI Results Section */}
          <div className="flex-1 overflow-y-auto pt-4 space-y-4">
            {/* AI Grouped Results */}
            {groupedResults.map((group, gIdx) => (
              <div key={gIdx} className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                    AI 감지
                  </span>
                  {group.query}
                </h4>

                <div className="grid gap-2 pl-2 border-l-2 border-gray-100">
                  {group.candidates.map((cand, cIdx) => (
                    <div
                      key={cIdx}
                      className={`flex items-center gap-3 p-2 rounded border transition-colors
                        ${isSelected(cand.mbid) ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-accent'}`}
                    >
                      <div
                        className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                        onClick={() => toggleSelection(cand)}
                      >
                        <div className="w-10 h-10 relative bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                          {cand.imageUrl && (
                            <Image
                              src={cand.imageUrl}
                              alt={cand.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{cand.name}</div>
                        </div>
                        <div>
                          {isSelected(cand.mbid) ? (
                            <CheckCircle2 className="text-primary" size={20} />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                      </div>
                      {cand.url && (
                        <a
                          href={cand.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 p-1.5 hover:bg-primary/10 rounded transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} className="text-primary" />
                        </a>
                      )}
                    </div>
                  ))}
                  {group.candidates.length === 0 && (
                    <div className="text-xs text-gray-400 italic pl-2">검색 결과 없음</div>
                  )}
                </div>
              </div>
            ))}

            {groupedResults.length === 0 && (
              <div className="text-center py-4 text-gray-400 bg-gray-50 rounded border border-dashed text-sm">
                AI 분석 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
