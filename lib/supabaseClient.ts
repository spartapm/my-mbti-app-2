import { createClient } from "@supabase/supabase-js";

// docs/supabase-info.md 에 기재된 프로젝트 정보를 직접 하드코딩하여 연동합니다.
const SUPABASE_URL = "https://ubovcczzbxcxdjjrhbyw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_yY3v-yjqZOdT2yk0hig6yw_pn5P9Bh3";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export const RESULTS_TABLE = "mbti_results";
