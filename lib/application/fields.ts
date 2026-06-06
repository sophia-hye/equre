export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "date"
  | "textarea"
  | "select"
  | "checkbox";

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  hint?: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
};

export type Section = {
  title: string;
  description?: string;
  fields: Field[];
};

/**
 * 국제학생 전형 Pre-Application Form (PDF 기반).
 * 모든 답변은 영문(여권과 동일)으로 작성하도록 안내.
 */
export const APPLICATION_SECTIONS: Section[] = [
  {
    title: "1. 학생 기본 인적 사항",
    description: "모든 답변은 영문(여권과 동일)으로 작성해 주세요.",
    fields: [
      { key: "student_name_en", label: "학생 영문 이름 (여권과 동일)", type: "text", required: true },
      { key: "gender", label: "학생 성별", type: "select", options: ["Male", "Female"] },
      { key: "birth_date", label: "학생 생년월일", type: "date" },
      {
        key: "student_email",
        label: "학생 이메일 주소",
        type: "email",
        hint: "지원과 입학 관련 중요한 이메일 수령 가능한 주소로 기재",
      },
      { key: "student_phone", label: "학생 연락처 (휴대폰 번호)", type: "tel" },
      { key: "address_domestic", label: "학생 국내 거주지 주소", type: "text" },
      { key: "address_overseas", label: "해외 거주지 주소 (해외에 있다면)", type: "text" },
      { key: "birth_city", label: "학생 출생 도시", type: "text" },
    ],
  },
  {
    title: "2. 비상 연락처 (부모님)",
    fields: [
      { key: "emergency_relation", label: "학생과의 관계", type: "text" },
      { key: "emergency_name_en", label: "영문명 (여권과 동일)", type: "text" },
      { key: "emergency_phone", label: "연락처 (휴대폰 번호)", type: "tel" },
      { key: "emergency_email", label: "이메일 주소", type: "email" },
      {
        key: "emergency_address",
        label: "현재 거주지 주소 (학생 현거주지와 다를 경우)",
        type: "text",
      },
    ],
  },
  {
    title: "3. 학력",
    fields: [
      {
        key: "high_school_1",
        label: "(첫번째) 고등학교명 / 재학 기간",
        type: "text",
        placeholder: "예) XX고등학교 / 2003.03 ~ 2006.02",
      },
      { key: "high_school_2", label: "(두번째) 고등학교명 / 재학 기간", type: "text" },
      {
        key: "university",
        label: "대학교명 / 재학 기간",
        type: "text",
        placeholder: "예) XX대학교 / 2006.03 ~ 2010.02",
      },
      { key: "desired_major", label: "희망 전공 / 관심 영역", type: "text" },
    ],
  },
  {
    title: "4. 학업 공백 & 시험",
    fields: [
      {
        key: "gap_check",
        label: "마지막 학업 종료일로부터 현재까지 3개월 이상 공백이 있습니다",
        type: "checkbox",
      },
      {
        key: "gap_detail",
        label: "공백 기간 활동 내용",
        type: "textarea",
        hint: "예) 영어 공부, 어학 연수 등",
      },
      {
        key: "english_test",
        label: "공인영어시험 점수",
        type: "text",
        hint: "예) 토플, 듀오링고, IELTS",
      },
      {
        key: "gpa",
        label: "현재(또는 최종) 고등학교 내신등급",
        type: "text",
        hint: "각 과목 전체가 아닌 평균 내신",
      },
    ],
  },
  {
    title: "5. 비자 & 학업 비용",
    fields: [
      {
        key: "us_visa_before",
        label: "미국 비자를 발급받은 적이 있나요?",
        type: "text",
        hint: "예: 관광 또는 이전 학업 목적",
      },
      { key: "visa_types", label: "과거에 어떤 종류의 비자를 발급받았나요?", type: "text", hint: "해당되는 모든 비자 유형" },
      { key: "visa_expiry", label: "학생비자의 만료일은 언제인가요?", type: "text" },
      { key: "i20_transfer", label: "I-20 전학(이전) 진행 중인가요?", type: "text" },
      {
        key: "visa_rejection",
        label: "최근 3년 이내에 비자 거절(불허) 이력이 있나요?",
        type: "textarea",
        hint: "학생비자 외 다른 비자 유형 포함",
      },
      {
        key: "funding",
        label: "학업 비용은 어떻게 지불할 계획인가요?",
        type: "textarea",
        hint: "개인자금 / 가족의 서포트 / 외부기관 장학금",
      },
    ],
  },
];

export const APPLICATION_FIELDS: Field[] = APPLICATION_SECTIONS.flatMap(
  (s) => s.fields
);

export type ApplicationData = Record<string, string | boolean>;

/** label/value 쌍 목록 (이메일/요약 렌더용) */
export function toLabelValuePairs(data: ApplicationData) {
  return APPLICATION_FIELDS.map((f) => {
    const raw = data?.[f.key];
    const value =
      f.type === "checkbox"
        ? raw
          ? "예"
          : "아니오"
        : (raw as string) || "—";
    return { label: f.label, value };
  });
}
