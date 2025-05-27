"use client";
import {
  useEffect,
  useRef,
  useState
} from "react";
import { motion } from "motion/react";
import getCurrentDayTimeEmoji from "~/common/utils/get-current-day-time-emoji";
import formatShortDateTime from "~/common/utils/format-short-date-time";



export default function DraggableBadges() {
  const badgesContainerRef = useRef<HTMLDivElement>(null)

  const [dayPeriod, setDayPeriod] = useState(getCurrentDayTimeEmoji())
  const [likeCount, setLikeCount] = useState(45)
  const [currentDateTime, setCurrentDateTime] = useState(formatShortDateTime(new Date()))
  const [isMounted, setIsMounted] = useState(false)

  const likeClickHandler = () => {
    setLikeCount((prev) => prev + 1)
  }


  useEffect(() => {
    setIsMounted(true)

    const timeInterval = setInterval(() => {
      setDayPeriod(getCurrentDayTimeEmoji())
      setCurrentDateTime(formatShortDateTime(new Date()))
    }, 60000)

    return () => clearInterval(timeInterval)
  }, [])


  const dragConfig = {
    drag: true,
    dragConstraints: badgesContainerRef,
    dragElastic: 0.65,
    dragTransition: {
      power: 0.5,
      timeConstant: 500,
      bounceStiffness: 400,
      bounceDamping: 0,
    },
  }

  if (!isMounted) {
    return null
  }


  return (
    <aside
      ref={badgesContainerRef}
      className="absolute inset-0 z-10 overflow-hidden text-xs sm:text-base"
    >
      <motion.div
        {...dragConfig}
        className="badge px-3 py-1 rounded-full shadow-md cursor-grab active:cursor-grabbing absolute
          top-[40%] left-[10%] sm:top-[40%] sm:left-[15%] lg:left-[25%]"
        initial={{ rotate: 25 }}
        animate={{ rotate: 25 }}
      >
        <span onClick={likeClickHandler} className="whitespace-nowrap">
          🫀 {likeCount}
        </span>
      </motion.div>

      <motion.div
        {...dragConfig}
        className="badge px-3 py-1 rounded-full shadow-md cursor-grab active:cursor-grabbing absolute
          top-[15%] right-[5%] sm:right-[20%] lg:right-[30%]"
        initial={{ rotate: 40 }}
        animate={{ rotate: 40 }}
      >
        <span className="whitespace-nowrap">📍 India, Jaipur</span>
      </motion.div>

      <motion.div
        {...dragConfig}
        className="badge px-3 py-1 rounded-full shadow-md cursor-grab active:cursor-grabbing absolute
          top-[3%] left-[40%] sm:top-[2%] sm:left-[45%] lg:left-[47%]"
        initial={{ rotate: -15 }}
        animate={{ rotate: -15 }}
      >
        <span className="whitespace-nowrap">{dayPeriod.emoji}</span>
      </motion.div>

      <motion.div
        {...dragConfig}
        className="badge px-3 py-1 rounded-full shadow-md cursor-grab active:cursor-grabbing absolute
          top-[15%] left-[10%] lg:left-[30%]"
        initial={{ rotate: -50 }}
        animate={{ rotate: -50 }}
      >
        <span className="whitespace-nowrap">⏳ {currentDateTime}</span>
      </motion.div>
    </aside>
  )
}
