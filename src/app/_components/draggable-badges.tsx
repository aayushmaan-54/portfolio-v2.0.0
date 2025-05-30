"use client";
import {
  useEffect,
  useRef,
  useState,
  useTransition
} from "react";
import { motion } from "motion/react";
import getCurrentDayTimeEmoji from "~/common/utils/get-current-day-time-emoji";
import formatShortDateTime from "~/common/utils/format-short-date-time";
import { Client, Databases } from "appwrite";
import incrementHeartAction from "~/actions/increment-heart.action";
import toast from "react-hot-toast";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const LIKES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_LIKES_COLLECTION_ID!;
const LIKES_DOCUMENT_ID = process.env.NEXT_PUBLIC_APPWRITE_LIKES_DOCUMENT_ID!;




export default function DraggableBadges() {
  const [currentHeartCount, setCurrentHeartCount] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const badgesContainerRef = useRef<HTMLDivElement>(null)

  const [dayPeriod, setDayPeriod] = useState(getCurrentDayTimeEmoji())
  const [currentDateTime, setCurrentDateTime] = useState(formatShortDateTime(new Date()))
  const [isMounted, setIsMounted] = useState(false)


  useEffect(() => {
    const fetchGlobalCount = async () => {
      try {
        const doc = await databases.getDocument(
          DATABASE_ID,
          LIKES_COLLECTION_ID,
          LIKES_DOCUMENT_ID
        );
        setCurrentHeartCount((doc.heart_count as number) || 0);
      } catch (error) {
        console.error('Error fetching global heart count:', error);
        setMessage('Failed to load likes.');
      }
    };
    fetchGlobalCount();
  }, []);


  const handleLike = async () => {
    setMessage(null);
    startTransition(async () => {
      const result = await incrementHeartAction();
      if (result.success && result.newHeartCount !== undefined) {
        setCurrentHeartCount(result.newHeartCount);
      } else {
        setMessage(result.message || 'Failed to like.');
      }
    });
  };


  useEffect(() => {
    if(!message) return;
    toast.error(message);
  }, [message]);


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
    dragElastic: 0.2,
    dragMomentum: true,
    dragTransition: {
      power: 0.2,
      timeConstant: 200,
      bounceStiffness: 300,
      bounceDamping: 30,
      restDelta: 0.5,
      restSpeed: 5
    },
    whileDrag: {
      scale: 1.05,
      zIndex: 50,
      transition: { duration: 0.1 }
    },
    whileHover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
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
        <button
          onClick={handleLike}
          disabled={isPending}
          className="whitespace-nowrap"
        >
          🫀 {currentHeartCount} {isPending ? 'Liking...' : 'Likes'}
        </button>
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
