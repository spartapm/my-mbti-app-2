import { supabase, RESULTS_TABLE } from "./supabaseClient";
import { AnsweredQuestion } from "./types";

export async function fetchParticipantCount(): Promise<number> {
  const { count, error } = await supabase
    .from(RESULTS_TABLE)
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("참여자 수 조회 실패:", error.message);
    return 0;
  }

  return count ?? 0;
}

export async function saveMbtiResult(
  mbtiType: string,
  answers: AnsweredQuestion[]
): Promise<void> {
  const { error } = await supabase.from(RESULTS_TABLE).insert({
    mbti_type: mbtiType,
    answers,
  });

  if (error) {
    console.error("결과 저장 실패:", error.message);
  }
}
