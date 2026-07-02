import HomeClient from "@/components/HomeClient";
import BackgroundDecor from "@/components/BackgroundDecor";
import { fetchParticipantCount } from "@/lib/resultsApi";

export const revalidate = 0;

export default async function Home() {
  const initialCount = await fetchParticipantCount();

  return (
    <>
      <BackgroundDecor />
      <HomeClient initialCount={initialCount} />
    </>
  );
}
