export type KopisConcertStatus = '공연예정' | '공연중' | '공연완료';

export interface KopisConcertListResponse {
  dbs: {
    db: {
      mt20id: string; // 공연 ID
      prfnm: string; // 공연명
      prfpdfrom: string; // 공연 시작일
      prfpdto: string; // 공연 종료일
      fcltynm: string; // 공연 시설명
      poster: string; // 포스터 이미지 경로
      genrenm: string; // 공연 장르명
      openrun: string; // 오픈런 여부
      prfstate: KopisConcertStatus; // 공연 상태
      festival?: string; // 페스티벌 여부 (Y/N)
    }[];
  };
}

export interface KopisConcertDetailResponse {
  dbs: {
    db: {
      mt20id: string; // 공연 ID
      mt10id?: string; // 공연시설 ID
      prfnm: string; // 공연명
      prfpdfrom: string; // 공연 시작일
      prfpdto: string; // 공연 종료일
      fcltynm: string; // 공연 시설명
      prfcast: string; // 공연출연진
      prfcrew: string; // 공연제작진
      prfruntime: string; // 공연 런타임
      prfage: string; // 관람 연령
      entrpsnm: string; // 제작사
      pcseguidance: string; // 티켓 가격
      poster: string; // 포스터 이미지 경로
      sty: string; // 줄거리
      genrenm: string; // 공연 장르명
      prfstate: KopisConcertStatus; // 공연 상태
      openrun: string; // 오픈런 여부
      area?: string; // 지역 (예: 서울, 경기, 인천 등)
      festival?: string; // 페스티벌 여부 (Y/N)
      visit?: string; // 내한공연 여부 (Y/N)
      styurls: {
        styurl: string | string[]; // 소개 이미지 목록 (단일 또는 배열)
      };
      dtguidance: string; // 공연 시간
      relates?: {
        relate?:
          | {
              relatenm: string; // 예매처명
              relateurl: string; // 예매처 링크
            }
          | Array<{
              relatenm: string; // 예매처명
              relateurl: string; // 예매처 링크
            }>;
      };
    };
  };
}
