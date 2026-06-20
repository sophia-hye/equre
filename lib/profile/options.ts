/** 회원가입 / 프로필 선택지 (가입 폼과 관리자 필터에서 공용 사용) */

export const CONTACT_TYPES = [
  "휴대폰",
  "인스타그램",
  "카카오톡 ID",
  "이메일(다른)",
  "기타",
] as const;

export const CONTACT_PLACEHOLDER: Record<string, string> = {
  "휴대폰": "010-0000-0000",
  "인스타그램": "@instagram_id",
  "카카오톡 ID": "kakao_id",
  "이메일(다른)": "other@email.com",
  "기타": "연락 가능한 정보를 적어주세요",
};

export const USER_TYPES = [
  "학생",
  "학부모",
  "직장인",
  "외국인",
  "크리에이터",
  "B2B / 기업",
  "기타",
] as const;

export const AGE_GROUPS = [
  "10대",
  "20대",
  "30대",
  "40대",
  "50대 이상",
] as const;

export const GENDERS = ["남성", "여성", "선택 안 함"] as const;

export const REGIONS = [
  "서울",
  "경기 · 인천",
  "충청",
  "전라",
  "경상",
  "강원",
  "제주",
  "해외",
] as const;

export const LANGUAGES = ["한국어", "English", "中文", "기타"] as const;

export const INTERESTS = [
  "입시 컨설팅",
  "멘탈 케어",
  "피어 멘토링",
  "웰니스 라이프스타일",
  "이벤트 · 커뮤니티",
  "프라이빗 멤버십",
  "Sober Bar · 공간",
  "B2B · 브랜드",
] as const;

export const REFERRALS = [
  "인스타그램",
  "지인 추천",
  "검색 (구글/네이버)",
  "오프라인 이벤트",
  "유튜브",
  "기타",
] as const;

export const PROFILE_LABELS: Record<string, string> = {
  user_type: "사용자 유형",
  age_group: "연령대",
  gender: "성별",
  region: "거주 지역",
  language: "선호 언어",
  referral: "유입 경로",
};
