'use client';

import { Concert } from '@prisma/client';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import {
  publishConcertAction,
  rejectConcertAction,
  requestAnalysisAction,
} from '@/features/concerts/server/actions';
import { Candidate } from '@/features/concerts/server/services/analysis.service';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';

interface ConcertReviewCardProps {
  concert: Concert;
  mode: 'draft' | 'review';
}

export function ConcertReviewCard({ concert, mode }: ConcertReviewCardProps) {
  const [loading, setLoading] = useState(false);
  const [selectedCandidateIdx, setSelectedCandidateIdx] = useState<number | null>(0); // Default to first

  const analysisResult = concert.analysisResult as { candidates: Candidate[] } | null;
  const candidates = analysisResult?.candidates || [];

  const handleRequestAnalysis = async () => {
    setLoading(true);
    await requestAnalysisAction(concert.id);
    setLoading(false);
  };

  const handlePublish = async () => {
    if (selectedCandidateIdx === null) return;
    setLoading(true);
    const candidate = candidates[selectedCandidateIdx];
    await publishConcertAction(concert.id, candidate);
    setLoading(false);
  };

  const handleReject = async () => {
    setLoading(true);
    await rejectConcertAction(concert.id);
    setLoading(false);
  };

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
              unoptimized // KOPIS images external
            />
          )}
        </div>
        <h3 className="font-bold text-lg mb-2">{concert.prfnm}</h3>
        <p className="text-sm text-gray-600 space-y-1">
          <div>
            📅 {new Date(concert.prfpdfrom).toLocaleDateString()} ~{' '}
            {new Date(concert.prfpdto).toLocaleDateString()}
          </div>
          <div>📍 {concert.fcltynm}</div>
          <div>🎭 {concert.genrenm}</div>
        </p>
        <div className="mt-4 text-xs text-gray-400 break-all">ID: {concert.mt20id}</div>
      </div>

      {/* Right: 액션 영역 */}
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
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                🤖 AI 추천 후보 <Badge variant="outline">상위 3개</Badge>
              </h4>
              <span className="text-xs text-muted-foreground">출처: Spotify</span>
            </div>

            <div className="grid gap-3">
              {candidates.map((cand, idx) => (
                <div
                  key={idx}
                  className={`
                                flex items-center gap-4 p-3 rounded border cursor-pointer transition-colors
                                ${selectedCandidateIdx === idx ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-accent'}
                            `}
                  onClick={() => setSelectedCandidateIdx(idx)}
                >
                  <div className="w-12 h-12 relative bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    {cand.imageUrl && (
                      <Image src={cand.imageUrl} alt={cand.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{cand.name}</div>
                    <div className="text-xs text-gray-500 flex gap-2">
                      <span>인기도: {cand.popularity}</span>
                      <span>팔로워: {cand.followers?.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-primary">
                    {selectedCandidateIdx === idx ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2" />
                    )}
                  </div>
                </div>
              ))}
              {candidates.length === 0 && (
                <div className="text-center py-8 text-gray-400 bg-gray-50 rounded border border-dashed">
                  후보를 찾을 수 없습니다. 수동 검색을 사용하세요.
                </div>
              )}
            </div>

            {/* 수동 검색 (현재는 플레이스홀더) */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-gray-500 mb-2">
                원하는 아티스트가 없나요? 수동 검색 기능 추가 예정입니다.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleReject} disabled={loading}>
                {loading ? '처리 중...' : '반려'}
              </Button>
              <Button
                onClick={handlePublish}
                disabled={loading || selectedCandidateIdx === null || candidates.length === 0}
              >
                {loading ? '발행 중...' : '승인 및 발행'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
