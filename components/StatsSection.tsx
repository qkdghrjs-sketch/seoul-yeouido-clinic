"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { number: "30+", label: "풍부한 진료 경험", suffix: "년" },
  { number: "4", label: "전문 진료 분야", suffix: "개" },
  { number: "02-782", label: "여의도 직통", suffix: "" },
  { number: "B1", label: "FKI타워", suffix: "층" },
];

export default function StatsSection() {
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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-[120px] bg-white">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`text-center fade-in-up ${visible ? "visible" : ""} delay-${Math.min(idx, 3)}`}
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-teal-600 mb-3">
                {stat.number}
                {stat.suffix && (
                  <span className="text-2xl sm:text-3xl font-light text-teal-600/70">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base text-[#555] font-light leading-[150%]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
