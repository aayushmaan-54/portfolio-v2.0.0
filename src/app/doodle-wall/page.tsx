"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import DoodleBoardModal from "./_components/doodle-board-modal";
import { Models } from "appwrite";
import { getRandomDoodles } from "~/actions/get-random-doodle.action";
import Icons from "~/common/icons/icons";
import { AnimatePresence, motion } from "framer-motion";
import { DoodleCardPosition } from "~/common/types/types";
import formatDateToDDMMYYYY from "~/common/utils/format-date";



export default function DoodleWallPage() {
  const [doodles, setDoodles] = useState<Models.Document[]>([]);
  const [doodlePositions, setDoodlePositions] = useState<DoodleCardPosition[]>([]);
  const [isLoadingDoodles, setIsLoadingDoodles] = useState(true);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const [dragConstraints, setDragConstraints] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);


  const generateRandomPositions = useCallback(() => {
    if (!containerRef.current || doodles.length === 0) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const cardWidth = 300;
    const cardHeight = 220;

    setDragConstraints({
      left: 0,
      right: Math.max(0, containerWidth - cardWidth),
      top: 0,
      bottom: Math.max(0, containerHeight - cardHeight),
    });

    const cols = Math.max(1, Math.ceil(Math.sqrt(doodles.length * containerWidth / containerHeight)));
    const rows = Math.max(1, Math.ceil(doodles.length / cols));

    const cellWidth = containerWidth / cols;
    const cellHeight = containerHeight / rows;

    const newPositions: DoodleCardPosition[] = doodles.map((doodle, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);

      const baseX = col * cellWidth + (cellWidth - cardWidth) / 2;
      const baseY = row * cellHeight + (cellHeight - cardHeight) / 2;

      const randomFactor = Math.min(0.5, 0.1 + (doodles.length / 20));
      const randomOffsetX = (Math.random() - 0.5) * (cellWidth * randomFactor);
      const randomOffsetY = (Math.random() - 0.5) * (cellHeight * randomFactor);

      const x = Math.min(Math.max(0, baseX + randomOffsetX), containerWidth - cardWidth);
      const y = Math.min(Math.max(0, baseY + randomOffsetY), containerHeight - cardHeight);

      return {
        id: doodle.$id,
        x,
        y,
        rotation: (Math.random() - 0.5) * 15,
        scale: 0.95 + Math.random() * 0.1,
      };
    });

    setDoodlePositions(newPositions);
  }, [doodles]);


  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (doodles.length > 0) {
          generateRandomPositions();
        }
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [doodles, generateRandomPositions]);


  const fetchDoodles = async () => {
    try {
      setIsLoadingDoodles(true);
      const fetchedDoodles = await getRandomDoodles(15);
      setDoodles(fetchedDoodles || []);
    } catch (error) {
      console.error("Error fetching doodles:", error);
      setDoodles([]);
    } finally {
      setIsLoadingDoodles(false);
    }
  };


  useEffect(() => {
    fetchDoodles();
  }, []);


  useEffect(() => {
    if (!isLoadingDoodles && doodles.length > 0) {
      generateRandomPositions();
    }
  }, [isLoadingDoodles, doodles, generateRandomPositions]);


  const handleShuffleDoodles = () => {
    fetchDoodles();
  };


  const handleNewDoodle = (newDoodle: Models.Document) => {
    setDoodles(prevDoodles => [newDoodle, ...prevDoodles]);

    if (containerRef.current) {
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const cardWidth = 300;
      const cardHeight = 220;

      const centerX = (containerWidth - cardWidth) / 2;
      const y = Math.min(50 + Math.random() * 100, containerHeight - cardHeight);

      const newPosition: DoodleCardPosition = {
        id: newDoodle.$id,
        x: centerX + (Math.random() - 0.5) * 100,
        y,
        rotation: (Math.random() - 0.5) * 15,
        scale: 1.05,
      };

      setDoodlePositions(prevPositions => [newPosition, ...prevPositions]);
      setActiveCardId(newDoodle.$id);
    }
  };


  const doodleCardConfig = {
    initial: { scale: 0, rotate: 0, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    hover: {
      scale: 1.05,
      rotate: 0,
      zIndex: 50,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    drag: {
      scale: 1.1,
      rotate: 5,
      zIndex: 100,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };


  const processSvgData = (svgData: string): string => {
    if (!svgData) return "";

    let modifiedSvgData = svgData;

    modifiedSvgData = modifiedSvgData.replace(/viewBox\s*=\s*["'][^"']*["']/g, '');
    modifiedSvgData = modifiedSvgData.replace(/width\s*=\s*["'][^"']*["']/g, '');
    modifiedSvgData = modifiedSvgData.replace(/height\s*=\s*["'][^"']*["']/g, '');

    modifiedSvgData = modifiedSvgData.replace(
      /<svg([^>]*)>/,
      '<svg$1 viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">'
    );

    return modifiedSvgData;
  };


  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-end gap-3 mb-6">
          <button
            onClick={handleShuffleDoodles}
            className="button-1 flex items-center justify-center gap-2 font-semibold"
            disabled={isLoadingDoodles}
          >
            <Icons.Dices className="size-5" />
            {isLoadingDoodles ? "Shuffling..." : "Shuffle Doodles"}
          </button>
          <DoodleBoardModal onDoodleCreated={handleNewDoodle} />
        </div>

        <motion.div
          ref={containerRef}
          className="relative min-h-[600px] sm:min-h-[800px] w-full overflow-hidden"
          style={{ height: "calc(100vh - 200px)" }}
        >
          <AnimatePresence>
            {doodlePositions.map((position, index) => {
              const doodle = doodles.find((d) => d.$id === position.id);
              if (!doodle) return null;

              const processedSvgData = processSvgData(doodle.svgData);
              const isActive = activeCardId === doodle.$id;

              return (
                <motion.div
                  key={doodle.$id}
                  className="absolute cursor-grab active:cursor-grabbing"
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileDrag="drag"
                  variants={doodleCardConfig}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  drag
                  dragConstraints={dragConstraints}
                  dragElastic={0.1}
                  dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                  onDragStart={() => setActiveCardId(doodle.$id)}
                  style={{
                    x: position.x,
                    y: position.y,
                    rotate: position.rotation,
                    scale: position.scale,
                    zIndex: isActive ? 100 : 10,
                  }}
                >
                  <div className="w-[250px] bg-primary-3 rounded-lg shadow-lg border border-primary-4">
                    <div className="p-3">
                      <div className="w-full flex items-center justify-center">
                        <div
                          dangerouslySetInnerHTML={{ __html: processedSvgData }}
                          className="w-[150px] sm:w-[250px] h-auto block"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 p-3 pt-0">
                      <p className="text-xs text-accent-2/40 font-medium">
                        {formatDateToDDMMYYYY(doodle.$createdAt)}
                      </p>
                      <h3 className="font-bold text-base text-accent-3 truncate">
                        {doodle.name}
                      </h3>
                      <p className="text-sm text-accent-2/70 line-clamp-2 leading-relaxed">
                        {doodle.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
