"use client"
import projectData from "~/common/data/project-data";
import MacBrowserMock from "./mac-browser-mock";
import Link from "next/link";
import Icons from "~/common/icons/icons";

function highlightDownloads(text: string) {
  const downloadRegex = /([\d,]+\s*downloads?)/gi;
  const parts = text.split(downloadRegex);

  return parts.map((part, index) => {
    if (downloadRegex.test(part)) {
      return (
        <span key={index} className="text-accent-3 underline font-semibold">
          {part}
        </span>
      );
    }
    return part;
  });
}



export default function ProjectsSection() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
        {projectData.map((project, index) => (
          <div key={index} className="group max-w-2xl lg:max-w-none mx-auto lg:mx-0 mb-14">
            {/* Browser Mock Container */}
            <div className="relative mb-6">
              <div
                className="p-3 bg-gradient-to-b from-primary-3/80 to-transparent border border-primary-3 border-b-0 rounded-md rounded-b-none relative transition-all duration-300 overflow-hidden"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(to bottom, ${project.color}80, transparent)`;
                  e.currentTarget.style.borderColor = project.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <MacBrowserMock
                  browserUrl={project.liveLink}
                  browserPageImage={project.projectImage}
                />
              </div>
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-9 bg-gradient-to-t from-primary-1 to-transparent" />
            </div>

            {/* Project Info Container */}
            <div className="px-2 space-y-5">
              {/* Title and Description */}
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold group-hover:text-opacity-90 transition-colors duration-200">
                  {project.name}
                </h2>
                <p className="text-accent-3/80 text-sm sm:text-base leading-relaxed">
                  {highlightDownloads(project.description)}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="badge rounded-full px-2.5 py-1 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <Link
                  target="_blank"
                  href={project.githubLink}
                  className="flex items-center gap-2 bg-accent-3 text-primary-1 px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent-3/90 shadow-sm duration-200 transition-all"
                >
                  <Icons.GitHub className="size-4 fill-primary-1" />
                  <span>Source</span>
                </Link>

                <Link
                  target="_blank"
                  href={project.liveLink}
                  className="flex items-center gap-2 bg-primary-3/20 border border-primary-3/30 text-accent-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent-3/10 shadow-sm duration-200 transition-all"
                >
                  <Icons.Earth className="size-4 stroke-accent-3" />
                  <span>Live</span>
                </Link>

                {project.npmLink && (
                  <Link
                    target="_blank"
                    href={project.npmLink}
                    className="flex items-center gap-2 bg-[#CB3837] text-white px-3 py-2 text-sm font-medium rounded-lg hover:bg-[#CB3837]/90 transition-all duration-200 shadow-sm"
                  >
                    <Icons.NPM className="size-4 fill-white" />
                    <span>NPM</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
