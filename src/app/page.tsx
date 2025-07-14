import Navigation from "@/components/Navigation";
import FeedContainer from "@/features/feeds/list";

export default function Home() {
  return (
    <main>
      <FeedContainer />
      <Navigation />
    </main>
  );
}
