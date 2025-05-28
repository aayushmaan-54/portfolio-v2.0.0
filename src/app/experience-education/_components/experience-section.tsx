import Image from "next/image";
import experienceData from "~/common/data/experience-data";
import Icons from "~/common/icons/icons";



export default function ExperienceSection() {
  return (
    <>
      <h4 className="flex items-center justify-center gap-2 mb-6 mt-14">
        <span className="bg-blue-500/20 border flex items-center justify-center border-blue-500 size-10 rounded-md">
          <Icons.BriefcaseBusiness className="stroke-blue-500" />
        </span>
        <span className="text-3xl font-semibold">Experience</span>
        <div className="flex-1 h-px bg-gradient-to-r from-primary-3 to-transparent" />
      </h4>

      <div className="space-y-10 sm:space-y-20 mb-20 sm:mb-40">
        {experienceData.map((experience, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 px-3 sm:px-10">
            <div
              className="flex-shrink-0 size-12 sm:size-14 rounded-lg overflow-hidden border flex items-center justify-center p-1 mx-auto sm:mx-0"
              style={{
                backgroundColor: experience.color + '1A',
                borderColor: experience.color,
              }}
            >
              <Image
                src={experience.logo}
                alt={`${experience.company} logo`}
                className="w-full h-full object-contain"
                width={56}
                height={56}
              />
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between">
                <h5 className="text-lg font-semibold" style={{ color: experience.color }}>
                  {experience.title}
                </h5>
                <span className="badge px-3 text-sm rounded-full flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 mb-2">
                  {experience.duration}
                </span>
              </div>
              <p className="text-sm mb-2">
                {experience.company}
                <span className="text-accent-1/60 mx-1 sm:mx-2">•</span>
                {experience.location}
                <span className="mx-1 sm:mx-2">•</span>
                {experience.type}
              </p>
              <p className="text-sm sm:text-base">
                {experience.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
