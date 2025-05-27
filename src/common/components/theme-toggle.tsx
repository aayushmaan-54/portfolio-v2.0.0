"use client";
import { useTheme } from "next-themes";
import cn from "~/common/utils/cn";
import Icons from "~/common/icons/icons";



export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const isRotated = isDark;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  }


  return (
    <>
      <button
        onClick={toggleTheme}
        className={cn(
          "size-10 flex items-center justify-center cursor-pointer transition-all ease-in-out hover:scale-110",
          isRotated && "rotate-180 hover:scale-110",
        )}
        aria-label="Toggle dark mode"
      >
        <Icons.ToggleTheme className={cn(
          "size-6",
          isDark ? "fill-accent-3" : "fill-accent-3",
        )} />
      </button>
    </>
  )
}
