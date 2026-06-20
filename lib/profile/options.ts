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

/** 저장값(한국어)은 그대로 두고, 화면에는 로케일별 라벨을 표시한다.
 *  영어 라벨 맵 (값 → 영어). 매핑 없으면 원문 노출. */
export const OPTION_EN: Record<string, string> = {
  // user types
  "학생": "Student",
  "학부모": "Parent",
  "직장인": "Professional",
  "외국인": "International",
  "크리에이터": "Creator",
  "B2B / 기업": "B2B / Company",
  "기타": "Other",
  // age groups
  "10대": "Teens",
  "20대": "20s",
  "30대": "30s",
  "40대": "40s",
  "50대 이상": "50+",
  // gender
  "남성": "Male",
  "여성": "Female",
  "선택 안 함": "Prefer not to say",
  // regions
  "서울": "Seoul",
  "경기 · 인천": "Gyeonggi · Incheon",
  "충청": "Chungcheong",
  "전라": "Jeolla",
  "경상": "Gyeongsang",
  "강원": "Gangwon",
  "제주": "Jeju",
  "해외": "Overseas",
  // languages
  "한국어": "Korean",
  "English": "English",
  "中文": "Chinese",
  // interests
  "입시 컨설팅": "Admissions Consulting",
  "멘탈 케어": "Mental Care",
  "피어 멘토링": "Peer Mentoring",
  "웰니스 라이프스타일": "Wellness Lifestyle",
  "이벤트 · 커뮤니티": "Events · Community",
  "프라이빗 멤버십": "Private Membership",
  "Sober Bar · 공간": "Sober Bar · Space",
  "B2B · 브랜드": "B2B · Brand",
  // referrals
  "인스타그램": "Instagram",
  "지인 추천": "Referral from a friend",
  "검색 (구글/네이버)": "Search (Google/Naver)",
  "오프라인 이벤트": "Offline event",
  "유튜브": "YouTube",
  // contact types
  "휴대폰": "Phone",
  "인스타그램 ID": "Instagram",
  "카카오톡 ID": "KakaoTalk ID",
  "이메일(다른)": "Email (other)",
};

export function optionLabel(value: string, locale: string): string {
  if (locale === "en") return OPTION_EN[value] ?? value;
  return value;
}

export const PROFILE_LABELS: Record<string, string> = {
  user_type: "사용자 유형",
  age_group: "연령대",
  gender: "성별",
  region: "거주 지역",
  language: "선호 언어",
  referral: "유입 경로",
};
