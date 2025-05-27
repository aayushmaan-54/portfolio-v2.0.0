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
