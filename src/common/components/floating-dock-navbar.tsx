"use client";
import { useState, useEffect } from "react";
import floatingDockNavbarData from "~/common/data/floating-dock-navbar-data";
import { motion } from "motion/react";
import { FloatDockNavItem } from "~/common/types/types";
import Link from "next/link";
import { usePathname } from 'next/navigation';



export default function FloatingDockNavbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname();


  const flattenedItems: FloatDockNavItem[] = [];
  let globalIndex = 0;


  floatingDockNavbarData.navigations.forEach((item) => {
    flattenedItems.push({
      ...item,
      globalIndex,
      type: 'navigation',
      color: 'text-blue-400'
    });
    globalIndex++;
  });

  flattenedItems.push({ type: 'separator', globalIndex });
  globalIndex++;


  Object.entries(floatingDockNavbarData.socials).forEach(([key, social]) => {
    flattenedItems.push({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      url: social.url,
      icon: social.icon,
      globalIndex,
      type: 'social',
    });
    globalIndex++;
  });

  flattenedItems.push({ type: 'separator', globalIndex });
  globalIndex++;


  Object.entries(floatingDockNavbarData.extras).forEach(([key, extra]) => {
    flattenedItems.push({
      title: key === 'downloadResume' ? 'Resume' : key,
      url: extra.url,
      icon: extra.icon,
      globalIndex,
      type: 'extra',
      color: 'text-green-400'
    });
    globalIndex++;
  });


  useEffect(() => {
    const currentPath = pathname;
    const foundIndex = flattenedItems.findIndex(item =>
      item.type === 'navigation' && item.url === currentPath
    );
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
  }, [pathname, flattenedItems]);



  const getScale = (index: number) => {
    return hoveredIndex === index ? 1.2 : 1;
  };


  const getSpacing = (index: number) => {
    if (hoveredIndex === null) return 0;
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 6;
    if (distance === 1) return 4;
    if (distance === 2) return 2;
    return 0;
  };


  return (
    <>
      <div className="fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50 p-2 sm:p-4">
        <div className="bg-accent-1/10 backdrop-blur-lg border border-primary-2 rounded-full p-2 sm:p-3 shadow-2xl">
          <div className="flex items-center">
            {flattenedItems.map((item, index) => {
              if (item.type === 'separator') {
                return (
                  <motion.div
                    key={`separator-${index}`}
                    className="w-px h-6 sm:h-8 bg-accent-1/40 mx-1 sm:mx-2"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  />
                );
              }

              const nonSeparatorItem = item as Exclude<FloatDockNavItem, { type: 'separator' }>;


              if (!nonSeparatorItem.title || !nonSeparatorItem.icon) {
                console.warn("Non-separator item is missing title or icon:", nonSeparatorItem);
                return null;
              }


              const Icon = nonSeparatorItem.icon;
              const scale = getScale(index);
              const spacing = getSpacing(index);

              const isExternalLink = nonSeparatorItem.type === 'social' || nonSeparatorItem.type === 'extra';
              const isSocial = nonSeparatorItem.type === 'social';


              const ButtonContent = (
                <motion.button
                  className={`relative p-2 sm:p-3 rounded-full transition-colors duration-200 ${activeIndex === index
                    ? 'bg-accent-1/20 shadow-lg'
                    : 'hover:bg-accent-1/10'
                    }`}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: scale,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                    mass: 0.8,
                    delay: 0,
                  }}
                >
                  <Icon
                    size={20}
                    className={`transition-colors duration-200 w-5 h-5 sm:w-6 sm:h-6 ${isSocial ? 'fill-accent-1' : 'stroke-accent-1'}`}
                  />

                  {/* Active Navbar Dot */}
                  {activeIndex === index && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-1 h-1 bg-accent-3 rounded-full"
                      layoutId="activeIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                      }}
                      style={{ x: '-50%' }}
                    />
                  )}
                </motion.button>
              );

              return (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    paddingLeft: spacing,
                    paddingRight: spacing,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    mass: 0.8
                  }}
                >
                  {/* ToolTip */}
                  <motion.div
                    className="absolute -top-10 sm:-top-12 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-accent-3 text-primary-1 text-xs rounded-md whitespace-nowrap pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      scale: hoveredIndex === index ? 1 : 0.8
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    {nonSeparatorItem.title}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-accent-1"></div>
                  </motion.div>

                  {isExternalLink ? (
                    <a href={nonSeparatorItem.url} target="_blank" rel="noopener noreferrer">
                      {ButtonContent}
                    </a>
                  ) : (
                    <Link href={nonSeparatorItem.url!}>
                      {ButtonContent}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
