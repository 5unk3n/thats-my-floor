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
      state: string; // 공연 상태
    }[];
  };
}

export interface KopisConcertDetailResponse {
  dbs: {
    db: {
      mt20id: string; // 공연 ID
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
      state: string; // 공연 상태
      openrun: string; // 오픈런 여부
      styurls: {
        styurl: string[]; // 소개 이미지 목록
      };
      dtguidance: string; // 공연 시간
    };
  };
}
