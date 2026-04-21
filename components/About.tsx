"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const features = [
  "점심시간 진료 가능",
  "진료 없이 바로 맞는 10분 수액",
  "내과+피부+비만 원스톱 진료",
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

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
    <section ref={ref} className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Left: Image */}
        <div
          className={`relative h-80 lg:h-auto fade-in-up ${visible ? "visible" : ""}`}
        >
          {imgError ? (
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center">
              <span className="text-white/30 text-2xl font-light tracking-widest">
                YEOUIDO SEOUL CLINIC
              </span>
            </div>
          ) : (
            <Image
              src="/images/about.jpg"
              alt="여의도서울의원 내부"
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Right: Content — 64px padding matching reference cards */}
        <div className="flex items-center bg-white px-10 sm:px-16 lg:px-[64px] py-[120px]">
          <div
            className={`max-w-lg fade-in-up delay-1 ${visible ? "visible" : ""}`}
          >
            <p className="text-xs tracking-[0.25em] text-teal-600 uppercase mb-4 font-medium">
              ABOUT US
            </p>
            <h2 className="text-[32px] leading-[48px] font-bold text-[#1F1F1F] mb-8 whitespace-pre-line">
              {"여의도 직장인의\n건강을 책임집니다"}
            </h2>
            <p className="text-[#555] leading-[150%] mb-12 font-light text-base">
              여의도서울의원은 FKI타워 지하 1층에 위치한 내과·피부·비만 전문
              의원입니다. 바쁜 직장인들을 위해 빠르고 편리한 진료 환경을 갖추고
              있습니다.
            </p>
            <ul className="space-y-5 mb-12">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[#1F1F1F]">
                  <span className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="font-medium text-base">{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#services"
              className="inline-flex items-center gap-2 border border-teal-600 text-teal-600 px-6 py-3 rounded-lg text-base font-medium hover:bg-teal-600 hover:text-white transition-all duration-300"
            >
              자세히 알아보기
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
