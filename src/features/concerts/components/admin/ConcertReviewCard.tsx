'use client';

import { Concert } from '@prisma/client';
import { CheckCircle2, Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import {
  publishConcertAction,
  rejectConcertAction,
  requestAnalysisAction,
  searchSpotifyArtistsAction,
} from '@/features/concerts/server/actions';
import { Candidate } from '@/features/concerts/server/services/analysis.service';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';

interface ConcertReviewCardProps {
  concert: Concert;
  mode: 'draft' | 'review';
}

export function ConcertReviewCard({ concert, mode }: ConcertReviewCardProps) {
  const [loading, setLoading] = useState(false);

  // Multi-Selection State
  // Set<spotifyId>
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Store full candidate objects for lookup
  // Map<spotifyId, Candidate>
  const [candidateMap, setCandidateMap] = useState<Map<string, Candidate>>(new Map());

  // Manual Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const analysisResult = concert.analysisResult as unknown as {
    results: { query: string; candidates: Candidate[] }[];
  } | null;

  const groupedResults = analysisResult?.results || [];

  const handleRequestAnalysis = async () => {
    setLoading(true);
    // Optimistic UI update could be done here, but we rely on revalidatePath
    await requestAnalysisAction(concert.id);
    setLoading(false);
  };

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
    const results = await searchSpotifyArtistsAction(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const toggleSelection = (candidate: Candidate) => {
    if (!candidate.spotifyId) return;

    const newSet = new Set(selectedIds);
    const newMap = new Map(candidateMap);

    if (newSet.has(candidate.spotifyId)) {
      newSet.delete(candidate.spotifyId);
    } else {
      newSet.add(candidate.spotifyId);
      newMap.set(candidate.spotifyId, candidate);
    }

    setSelectedIds(newSet);
    setCandidateMap(newMap);
  };

  const isSelected = (spotifyId?: string) => (spotifyId ? selectedIds.has(spotifyId) : false);

  return (
    <Card className="w-full flex flex-col md:flex-row overflow-hidden border-l-4 border-l-primary">
      {/* Left: KOPIS Info */}
      <div className="w-full md:w-1/3 bg-slate-50 p-4 border-r flex flex-col">
        <div className="relative w-full aspect-3/4 mb-4 bg-gray-200 rounded shrink-0">
          {concert.poster && (
            <Image
              src={concert.poster}
              alt={concert.prfnm}
              fill
              className="object-cover rounded"
              unoptimized
            />
          )}
        </div>
        <h3 className="font-bold text-lg mb-2">{concert.prfnm}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            📅 {new Date(concert.prfpdfrom).toLocaleDateString()} ~{' '}
            {new Date(concert.prfpdto).toLocaleDateString()}
          </p>
          <p>📍 {concert.fcltynm}</p>
          <p>🎭 {concert.genrenm}</p>
        </div>
        <div className="mt-4 text-xs text-gray-400 break-all">ID: {concert.mt20id}</div>

        {mode === 'draft' && (
          <div className="mt-auto pt-4">
            <Button onClick={handleRequestAnalysis} disabled={loading} className="w-full">
              {loading ? '요청 중...' : 'AI 분석 요청 (Background)'}
            </Button>
          </div>
        )}
      </div>

      {/* Right: Action Area */}
      <div className="w-full md:w-2/3 p-6 flex flex-col max-h-[800px] overflow-y-auto">
        {mode === 'review' ? (
          <div className="space-y-6">
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
                      className={`flex items-center gap-3 p-2 rounded border cursor-pointer transition-colors
                        ${isSelected(cand.spotifyId) ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-accent'}`}
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
                        <div className="text-xs text-gray-500">
                          팔로워: {cand.followers?.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        {isSelected(cand.spotifyId) ? (
                          <CheckCircle2 className="text-primary" size={20} />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
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

            {/* Manual Search Section */}
            <div className="pt-4 border-t">
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
                      className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-colors text-sm
                        ${isSelected(result.spotifyId) ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'hover:bg-accent'}`}
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
                      {isSelected(result.spotifyId) && (
                        <CheckCircle2 size={16} className="text-green-600" />
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
                <div className="flex flex-wrap gap-2">
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
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={handleReject} disabled={loading}>
                {loading ? '처리 중...' : '반려'}
              </Button>
              <Button onClick={handlePublish} disabled={loading || selectedIds.size === 0}>
                {loading ? '발행 중...' : `선택한 ${selectedIds.size}명 승인 및 발행`}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            {/* Draft mode handled in Left column for cleaner layout, or keep here if desired. 
                 Currently moved to Left Column for visibility. */}
            <div className="text-center">
              <p className="mb-2">출연진 정보 (KOPIS):</p>
              <p className="font-medium text-black mb-4">{concert.prfcast || '정보 없음'}</p>
              <p className="text-xs">왼쪽의 [AI 분석 요청] 버튼을 눌러주세요.</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
