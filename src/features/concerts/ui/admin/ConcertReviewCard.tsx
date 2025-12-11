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
  const [selectedCandidateIdx, setSelectedCandidateIdx] = useState<number | null>(0);

  // Manual Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [manualCandidate, setManualCandidate] = useState<Candidate | null>(null);

  const analysisResult = concert.analysisResult as { candidates: Candidate[] } | null;
  const candidates = analysisResult?.candidates || [];

  const handleRequestAnalysis = async () => {
    setLoading(true);
    await requestAnalysisAction(concert.id);
    setLoading(false);
  };

  const handlePublish = async () => {
    // Use manual candidate if selected, otherwise use AI candidate
    const candidate =
      manualCandidate || (selectedCandidateIdx !== null ? candidates[selectedCandidateIdx] : null);
    if (!candidate) return;

    setLoading(true);
    await publishConcertAction(concert.id, candidate);
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

  const handleSelectManual = (candidate: Candidate) => {
    setManualCandidate(candidate);
    setSelectedCandidateIdx(null); // Deselect AI candidates
  };

  const handleSelectAI = (idx: number) => {
    setSelectedCandidateIdx(idx);
    setManualCandidate(null); // Deselect manual candidate
  };

  const canPublish = manualCandidate || (selectedCandidateIdx !== null && candidates.length > 0);

  return (
    <Card className="w-full flex flex-col md:flex-row overflow-hidden">
      {/* Left: KOPIS Info */}
      <div className="w-full md:w-1/3 bg-slate-50 p-4 border-r">
        <div className="relative w-full aspect-[3/4] mb-4 bg-gray-200 rounded">
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
      </div>

      {/* Right: Action Area */}
      <div className="w-full md:w-2/3 p-6 flex flex-col">
        {mode === 'draft' ? (
          <div className="flex-1 flex flex-col justify-center items-center space-y-4">
            <div className="text-center text-gray-500">
              <p>KOPIS 원본 데이터</p>
              <p className="text-sm">출연: {concert.prfcast || 'N/A'}</p>
            </div>
            <Button onClick={handleRequestAnalysis} disabled={loading}>
              {loading ? '요청 중...' : 'AI 분석 요청'}
            </Button>
          </div>
        ) : (
          <div className="flex-1 space-y-4">
            {/* AI Candidates Section */}
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                🤖 AI 추천 후보 <Badge variant="outline">상위 3개</Badge>
              </h4>
              <span className="text-xs text-muted-foreground">출처: Spotify</span>
            </div>

            <div className="grid gap-2">
              {candidates.map((cand, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-2 rounded border cursor-pointer transition-colors
                    ${selectedCandidateIdx === idx && !manualCandidate ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-accent'}`}
                  onClick={() => handleSelectAI(idx)}
                >
                  <div className="w-10 h-10 relative bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    {cand.imageUrl && (
                      <Image src={cand.imageUrl} alt={cand.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{cand.name}</div>
                    <div className="text-xs text-gray-500">인기도: {cand.popularity}</div>
                  </div>
                  <div className="text-primary">
                    {selectedCandidateIdx === idx && !manualCandidate ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2" />
                    )}
                  </div>
                </div>
              ))}
              {candidates.length === 0 && (
                <div className="text-center py-4 text-gray-400 bg-gray-50 rounded border border-dashed text-sm">
                  AI 후보가 없습니다. 수동 검색을 사용하세요.
                </div>
              )}
            </div>

            {/* Manual Search Section */}
            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-2">🔍 수동 검색</p>
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
                        ${manualCandidate?.spotifyId === result.spotifyId ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'hover:bg-accent'}`}
                      onClick={() => handleSelectManual(result)}
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
                      {manualCandidate?.spotifyId === result.spotifyId && (
                        <CheckCircle2 size={16} className="text-green-600" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {manualCandidate && (
                <div className="mt-2 p-2 bg-green-50 rounded border border-green-200 text-sm">
                  ✅ 선택됨: <strong>{manualCandidate.name}</strong>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleReject} disabled={loading}>
                {loading ? '처리 중...' : '반려'}
              </Button>
              <Button onClick={handlePublish} disabled={loading || !canPublish}>
                {loading ? '발행 중...' : '승인 및 발행'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
