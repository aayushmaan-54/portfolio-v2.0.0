"use client";
import randomGreetingsEmoji from "~/common/utils/random-greetings-emoji";
import RandomSvgUnderline from "~/common/components/random-svg-underline";
import Image from "next/image";
import DraggableBadges from "./draggable-badges";
import { useEffect, useState } from "react";
import Link from "next/link";
import navLinks from "~/common/data/nav-links-data";



export default function Hero() {
  const [greetingsEmoji, setGreetingsEmoji] = useState('👋');

  useEffect(() => {
    setGreetingsEmoji(randomGreetingsEmoji());
  }, []);

  return (
    <>
      <section className="flex flex-col items-center justify-center pt-12 relative overflow-hidden px-4">
        <Image
          src={'/memoji.png'}
          width={140}
          height={140}
          alt="Memoji of Aayushmaan Soni"
          className="w-[100px] md:w-[140px] pt-7"
        />

        <div className="badge px-4 py-1.5 md:px-5 md:py-2 rounded-full font-medium text-sm md:text-[14px] flex items-center justify-center">
          <div className="relative size-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
            <span className="absolute inline-flex h-full w-full rounded-full bg-success" />
          </div>
          <p className="pl-2">Available for work</p>
        </div>

        <p className="font-calistoga text-[21px] md:text-4xl mt-4 text-center">
          Hi, I am Aayushmaan Soni {greetingsEmoji}
        </p>

        <p className="text-4xl/tight md:text-6xl/20 font-black text-center mt-2">
          Learning,
          <RandomSvgUnderline
            className="stroke-accent-1/80"
            strokeWidth={10}
          >
            <span>Building</span>
          </RandomSvgUnderline> <br />
          {" "}& Exploring
        </p>

        <p className="text-accent-1/75 w-full md:w-[700px] text-center mt-2 mb-5 text-sm md:text-base px-4">
          <span className="text-accent-3">Full Stack Web Developer</span>,
          specializing in the <span className="text-accent-3">MERN stack</span>,
          with a passion for building user-focused, scalable, and innovative web applications.
        </p>

        <Link
          href={navLinks.find((link) => link.title === "Contact")?.url || ""}
          target="_blank"
          className="button-1"
        >
          Connect with me 🤝
        </Link>

        <DraggableBadges />
      </section>
    </>
  );
}
