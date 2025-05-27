import Hero from "./_components/hero";
import RecentBlogsSection from "./_components/recent-blogs-section";
import SkillsSection from "./_components/skills-section";


export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <SkillsSection />
        <RecentBlogsSection />
      </div>
    </>
  );
}
