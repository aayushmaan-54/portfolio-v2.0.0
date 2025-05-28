import Image from "next/image";
import educationData from "~/common/data/education-data";
import Icons from "~/common/icons/icons";



export default function EducationSection() {
  return (
    <>
      <h4 className="flex items-center justify-center gap-2 mb-6 mt-14">
        <span className="bg-purple-500/20 border flex items-center justify-center border-purple-500 size-10 rounded-md">
          <Icons.GraduationCap className="stroke-purple-500" />
        </span>
        <span className="text-3xl font-semibold">Education</span>
        <div className="flex-1 h-px bg-gradient-to-r from-primary-3 to-transparent" />
      </h4>

      <div className="space-y-10 sm:space-y-20 mb-20">
        {educationData.map((education, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 px-3 sm:px-10">
            <div
              className="flex-shrink-0 size-12 sm:size-14 rounded-lg overflow-hidden border flex items-center justify-center p-1 mx-auto sm:mx-0"
              style={{
                backgroundColor: education.color + '1A',
                borderColor: education.color,
              }}
            >
              <Image
                src={education.logo}
                alt={`${education.title} logo`}
                className="w-full h-full object-contain"
                width={56}
                height={56}
              />
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between">
                <div className="flex flex-col items-center sm:items-start">
                  <h5 className="text-lg font-semibold">
                    {education.title}
                  </h5>
                  <p className="text-sm font-medium" style={{ color: education.color }}>
                    {education.institution}
                  </p>
                </div>
                <span className="badge px-3 text-sm rounded-full flex-shrink-0 mt-2 sm:mt-0 sm:ml-4">
                  {education.duration}
                </span>
              </div>
              <p className="text-sm text-accent-1/50 mb-2">
                {education.location}
              </p>
              <p className="text-sm sm:text-base">
                {education.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
