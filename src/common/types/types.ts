import { Models } from "appwrite";
import { StaticImageData } from "next/image";




export interface RandomSvgUnderlineProps {
  strokeWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  className?: string;
  children: React.ReactNode;
  strokeColor?: string;
}



export interface FloatDockNavItem {
  url?: string;
  type: 'navigation' | 'social' | 'extra' | 'separator';
  globalIndex: number;
  title?: string;
  icon?: React.ComponentType<{ size: number; className: string }>;
  color?: string;
}



export interface MacBrowserMockProps {
  browserUrl: string;
  browserPageImage: StaticImageData;
}



export interface sendContactEmailActionProps {
  status: 'success' | 'error' | '';
  message: string;
}



export interface CircularProgressBarProps {
  max?: number;
  value: number;
  min?: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  className?: string;
}



export interface IncrementHeartActionResult {
  success: boolean;
  newHeartCount?: number;
  message?: string;
}



export interface SubmitDoodleActionResult {
  success: boolean;
  message?: string;
  data?: Models.Document;
}



export interface DoodleCardPosition {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}



export interface BlogFrontMatter {
  title: string;
  description?: string;
  date: string;
  readingTime?: string;
}
