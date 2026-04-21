"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "내과",
    english: "Internal Medicine",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    items: ["고혈압", "당뇨", "고지혈증", "갑상선", "통풍", "골다공증", "만성질환관리", "건강검진"],
    footer: "혈액검사 · X-ray · 건강검진",
  },
  {
    title: "피부관리",
    english: "Skin Care",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
      </svg>
    ),
    items: ["텐씨마(RF) 리프팅", "텐쎄라(HIFU) 리프팅", "루카스 레이저토닝", "색소레이저(기미·주근깨·점)", "리쥬란", "물광주사", "보톡스"],
    footer: "피부 리프팅 · 레이저 · 스킨부스터",
  },
  {
    title: "비만클리닉",
    english: "Obesity Clinic",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
      </svg>
    ),
    items: ["마운자로(GLP-1 비만주사)", "이중턱 지방분해주사", "체계적인 체중관리 프로그램"],
    footer: "맞춤형 비만 치료 프로그램",
  },
  {
    title: "수액·예방접종",
    english: "IV Drip & Vaccine",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
    items: ["비타민C 수액", "백옥 수액", "마늘 수액", "숙취 수액", "아르기닌 수액", "성인 예방접종(폐렴·대상포진·독감)"],
    footer: "진료 없이 바로 맞는 10분 수액",
  },
];

export default function Services() {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="py-[120px] bg-[#F5F5F5]">
      <div className="max-w-[1400px] mx-auto px-10">
        {/* Section header */}
        <div className={`text-center mb-16 fade-in-up ${visible ? "visible" : ""}`}>
          <p className="text-xs tracking-[0.25em] text-teal-600 uppercase mb-3 font-medium">
            OUR SERVICES
          </p>
          <h2 className="text-[32px] leading-[48px] font-bold text-[#1F1F1F]">
            진료과목
          </h2>
        </div>

        {/* Cards — 2x2, 20px radius, 64px padding, reference shadow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className={`group bg-white rounded-[20px] p-10 sm:p-[64px] border border-[#D3D3D3] shadow-[0_4px_20px_0_rgba(0,0,0,0.12)] hover:scale-[1.02] hover:border-t-[3px] hover:border-t-teal-600 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] fade-in-up ${visible ? "visible" : ""} delay-${Math.min(idx, 3)}`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-teal-600 flex items-center justify-center mb-8">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[#1F1F1F] mb-1">
                {service.title}
              </h3>
              <p className="text-sm text-[#858585] font-light mb-8">
                {service.english}
              </p>

              {/* Items */}
              <ul className="space-y-3 mb-10">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-base text-[#555] leading-[150%]"
                  >
                    <span className="text-teal-600 mt-0.5 shrink-0 font-bold">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="pt-6 border-t border-[#E8E8E8]">
                <p className="text-sm text-teal-600 font-medium tracking-wide">
                  {service.footer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
