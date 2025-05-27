"use client";
import { useTheme } from "next-themes";
import skillsData from "~/common/data/skills-data";
import { motion } from "motion/react";



export default function SkillsSection() {
  const { resolvedTheme } = useTheme();

  return (
    <section className="mt-28 px-4 sm:px-6">
      <div className="badge px-3 py-1.5 rounded-md font-semibold text-sm">
        Skills 🚀
      </div>
      <h1 className="text-accent-1/40 text-2xl sm:text-5xl font-black mt-1">What I&apos;m Good At</h1>

      <div className="flex flex-wrap justify-start items-center gap-4 mt-4">
        {skillsData.map((skill, index) => {
          const isNextJs = skill.title === "Next.js";
          const finalColor = isNextJs
            ? resolvedTheme === 'dark'
              ? skill.color
              : skill.darkModeColor
            : skill.color;

          return (
            <motion.div
              className="flex flex-col items-center gap-2 p-2 my-2 rounded-md border w-30 py-3 cursor-pointer"
              key={index}
              style={{
                backgroundColor: `${finalColor}20`,
                border: `1px solid ${finalColor}`,
              }}
              whileHover="hover"
              variants={{
                hover: {
                  scale: 1.03,
                  y: -2,
                  backgroundColor: `${finalColor}25`,
                  boxShadow: `0 6px 20px ${finalColor}20`,
                }
              }}
              transition={{
                type: "tween",
                ease: "easeOut",
                duration: 0.2
              }}
            >
              <motion.span
                variants={{
                  hover: {
                    scale: 1.08,
                    rotate: [0, -5, 5, 0],
                  }
                }}
                transition={{
                  scale: { type: "spring", stiffness: 300 },
                  rotate: { duration: 0.6, ease: "easeInOut" }
                }}
              >
                <skill.icon
                  style={{ fill: finalColor }}
                  className="size-8"
                />
              </motion.span>
              <motion.span
                className="text-sm font-bold"
                style={{ color: finalColor }}
                variants={{
                  hover: {
                    scale: 1.02,
                  }
                }}
              >
                {skill.title}
              </motion.span>
            </motion.div>
          )
        })}
      </div>

    </section>
  )
}
