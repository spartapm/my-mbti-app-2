export type Letter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export type DimensionKey = "EI" | "SN" | "TF" | "JP";

export interface QuizOption {
  label: string;
  value: Letter;
}

export interface QuizQuestion {
  id: number;
  dimension: DimensionKey;
  question: string;
  options: [QuizOption, QuizOption];
}

export interface MatchInfo {
  type: string;
  title: string;
  reason: string;
}

export interface Persona {
  type: string;
  title: string;
  tagline: string;
  traits: [string, string, string];
  bestMatch: MatchInfo;
  toughMatch: MatchInfo;
}

export interface AnsweredQuestion {
  questionId: number;
  question: string;
  selectedLabel: string;
  selectedValue: Letter;
}
