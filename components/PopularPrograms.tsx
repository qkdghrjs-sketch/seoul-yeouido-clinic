"use client";

import { useEffect, useRef, useState } from "react";

const programs = [
  {
    badge: "BEST",
    title: "트리플 토닝 10회",
    price: "70만원",
    desc: "미백앰플 + 초음파 + LED + 재생액",
  },
  {
    badge: "인기",
    title: "텐씨마(RF) 리프팅",
    price: "600샷 110만원 / 300샷 60만원",
    desc: "강력한 RF 에너지로 피부 탄력 개선",
  },
  {
    badge: "추천",
    title: "10분 수액",
    price: "4만원~",
    desc: "고용량 비타민C · 백옥 · 마늘주사",
  },
];

export default function PopularPrograms() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-[120px] bg-[#0f1923]">
      <div className="max-w-[1400px] mx-auto px-10">
        {/* Header */}
        <div className={`text-center mb-16 fade-in-up ${visible ? "visible" : ""}`}>
          <p className="text-xs tracking-[0.25em] text-teal-600 uppercase mb-3 font-medium">
            POPULAR PROGRAMS
          </p>
          <h2 className="text-[32px] leading-[48px] font-bold text-white">
            인기 프로그램
          </h2>
        </div>

        {/* Cards — 20px radius, reference border & hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {programs.map((program, idx) => (
            <div
              key={program.title}
              className={`relative bg-[#1a2332] rounded-[20px] p-10 sm:p-[48px] border border-white/10 hover:border-teal-600 hover:bg-[#1e2a3a] transition-all duration-300 fade-in-up ${visible ? "visible" : ""} delay-${Math.min(idx, 3)}`}
            >
              {/* Badge */}
              <span className="inline-block bg-teal-600 text-white text-xs font-bold px-3.5 py-1 rounded-md mb-8">
                {program.badge}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-4">
                {program.title}
              </h3>

              {/* Price */}
              <p className="text-3xl font-bold text-teal-600 mb-4">
                {program.price}
              </p>

              {/* Description */}
              <p className="text-sm text-[#858585] font-light leading-[150%]">
                {program.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
