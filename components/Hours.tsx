"use client";

import { useEffect, useRef, useState } from "react";

const schedule = [
  { day: "평일 (월~금)", time: "09:00 ~ 18:00" },
  { day: "토요일", time: "09:00 ~ 13:00" },
  { day: "일·공휴일", time: "휴진" },
  { day: "점심시간", time: "13:00 ~ 14:00" },
];

export default function Hours() {
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
    <section id="hours" ref={ref} className="py-[120px] bg-white">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[64px]">
          {/* Left: Schedule */}
          <div className={`fade-in-up ${visible ? "visible" : ""}`}>
            <p className="text-xs tracking-[0.25em] text-teal-600 uppercase mb-3 font-medium">
              OFFICE HOURS
            </p>
            <h2 className="text-[32px] leading-[48px] font-bold text-[#1F1F1F] mb-12">
              진료시간 안내
            </h2>
            <table className="w-full">
              <tbody>
                {schedule.map((row) => (
                  <tr
                    key={row.day}
                    className="border-b border-[#E8E8E8] last:border-0"
                  >
                    <td className="py-6 text-[#555] font-light text-base">
                      {row.day}
                    </td>
                    <td className="py-6 text-right text-lg font-bold text-[#1F1F1F]">
                      {row.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right: Contact card — 20px radius, 64px padding */}
          <div
            className={`fade-in-up delay-1 ${visible ? "visible" : ""}`}
          >
            <div className="bg-teal-600 rounded-[20px] p-10 sm:p-[64px] text-white h-full flex flex-col justify-center">
              <p className="text-sm text-white/70 mb-2 font-light">
                전화 예약·문의
              </p>
              <a
                href="tel:02-782-0051"
                className="text-3xl sm:text-4xl font-bold mb-10 hover:text-white/90 transition-colors duration-300 inline-block"
              >
                📞 02-782-0051
              </a>

              <div className="w-full h-px bg-white/20 mb-10" />

              <p className="text-sm text-white/70 mb-2 font-light">주소</p>
              <p className="text-lg font-medium mb-10 leading-[150%]">
                서울 영등포구 여의도동 FKI타워 B1
              </p>

              <a
                href="tel:02-782-0051"
                className="inline-flex items-center justify-center gap-2 bg-white text-teal-600 font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition-colors duration-300 text-base"
              >
                전화 연결하기
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
      </div>
    </section>
  );
}
