"use client";

import { useEffect, useRef, useState } from "react";

const directions = [
  { icon: "🚇", title: "지하철", text: "여의도역(5·9호선) 1번 출구 도보 3분" },
  { icon: "🚌", title: "버스", text: "여의도 전경련 정류장 하차" },
  { icon: "🅿️", title: "주차", text: "FKI타워 지하주차장 이용 가능" },
];

export default function Location() {
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

  // Load Kakao roughmap
  useEffect(() => {
    if (!visible) return;
    const script = document.createElement("script");
    script.src = "https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js";
    script.charset = "UTF-8";
    script.onload = () => {
      // @ts-expect-error: daum roughmap global
      new daum.roughmap.Lander({
        timestamp: "1774321999285",
        key: "292vz75auuq6",
        mapWidth: "640",
        mapHeight: "360",
      }).render();
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [visible]);

  return (
    <section id="location" ref={ref} className="py-[120px] bg-[#F5F5F5]">
      <div className="max-w-[1400px] mx-auto px-10">
        {/* Header */}
        <div className={`text-center mb-16 fade-in-up ${visible ? "visible" : ""}`}>
          <p className="text-xs tracking-[0.25em] text-teal-600 uppercase mb-3 font-medium">
            LOCATION
          </p>
          <h2 className="text-[32px] leading-[48px] font-bold text-[#1F1F1F]">
            오시는길
          </h2>
        </div>

        {/* Map — 20px radius */}
        <div
          className={`w-full rounded-[20px] overflow-hidden mb-10 shadow-[0_4px_20px_0_rgba(0,0,0,0.12)] fade-in-up ${visible ? "visible" : ""} [&_.root_daum_roughmap]:!w-full [&_.root_daum_roughmap_.wrap_map]:!w-full [&_.root_daum_roughmap_.wrap_map>div]:!w-full`}
        >
          <div
            id="daumRoughmapContainer1774321999285"
            className="root_daum_roughmap root_daum_roughmap_landing"
          />
        </div>

        {/* Directions — 20px radius, matching card style */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-10 fade-in-up delay-1 ${visible ? "visible" : ""}`}>
          {directions.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-[20px] p-8 sm:p-10 border border-[#D3D3D3] shadow-[0_4px_20px_0_rgba(0,0,0,0.12)]"
            >
              <span className="text-3xl block mb-4">{item.icon}</span>
              <h4 className="font-bold text-[#1F1F1F] text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-[#555] font-light leading-[150%]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
