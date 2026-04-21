"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/images/hero1.jpg",
    title: "건강한 여의도\n직장인의 선택",
    sub: "내과·피부·비만 전문 | FKI타워 B1",
  },
  {
    image: "/images/hero2.jpg",
    title: "10분 수액으로\n빠른 건강충전",
    sub: "진료 없이 바로 맞는 비타민·백옥·마늘 수액",
  },
  {
    image: "/images/hero3.jpg",
    title: "피부 리프팅부터\n레이저까지",
    sub: "텐씨마·텐쎄라·루카스 레이저토닝",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % slides.length),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const handleImgError = (idx: number) => {
    setImgErrors((prev) => new Set(prev).add(idx));
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-[1.25s] ease-in-out ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {imgErrors.has(idx) ? (
            <div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800" />
          ) : (
            <Image
              src={slide.image}
              alt={slide.title.replace("\n", " ")}
              fill
              className="object-cover"
              onError={() => handleImgError(idx)}
              priority={idx === 0}
            />
          )}

          {/* Overlay — rgba(0,0,0,0.4) matching reference */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <p className="text-xs sm:text-sm tracking-[0.3em] text-white/70 uppercase mb-8 font-light">
          YEOUIDO SEOUL CLINIC
        </p>

        <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[48px] sm:leading-[56px] lg:leading-[68px] font-bold text-white mb-10 whitespace-pre-line">
          {slides[current].title}
        </h1>

        <div className="w-12 h-px bg-white/60 mb-10" />

        <p className="text-base sm:text-lg text-white/80 font-light max-w-lg leading-[150%]">
          {slides[current].sub}
        </p>
      </div>

      {/* Dot navigation — 12px dots, border style */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              idx === current
                ? "border-teal-600 bg-teal-600"
                : "border-white/50 bg-transparent hover:border-white"
            }`}
            aria-label={`슬라이드 ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce-down">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
