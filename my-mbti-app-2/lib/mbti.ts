import { AnsweredQuestion, Letter } from "./types";

const DIMENSION_PAIRS: [Letter, Letter][] = [
  ["E", "I"],
  ["S", "N"],
  ["T", "F"],
  ["J", "P"],
];

// 동점일 경우 우선순위를 두는 알파벳 (I, N, T, P)
const TIE_BREAK: Record<Letter, Letter> = {
  E: "I",
  I: "I",
  S: "N",
  N: "N",
  T: "T",
  F: "T",
  J: "P",
  P: "P",
};

export function calculateMbti(answers: AnsweredQuestion[]): string {
  const letters = answers.map((a) => a.selectedValue);

  return DIMENSION_PAIRS.map(([left, right]) => {
    const leftCount = letters.filter((l) => l === left).length;
    const rightCount = letters.filter((l) => l === right).length;

    if (leftCount === rightCount) return TIE_BREAK[left];
    return leftCount > rightCount ? left : right;
  }).join("");
}
