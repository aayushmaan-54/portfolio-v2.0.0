import EducationSection from "./_components/education-section";
import ExperienceSection from "./_components/experience-section";



export default function Experience() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center mt-7 mb-20">
        <h1 className="font-calistoga text-3xl sm:text-5xl">
          Experience & Education
        </h1>
        <h3 className="text-accent-1/40 text-xl font-black mt-1">My Journey So Far</h3>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <ExperienceSection />
        <EducationSection />
      </div>
    </>
  );
}
