"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const POPUPS = [
  {
    id: "popup-1",
    src: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/4eeb25f6971f8.png",
    alt: "팝업 공지 1",
  },
  {
    id: "popup-2",
    src: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/c1f29b9d0b749.png",
    alt: "팝업 공지 2",
  },
  {
    id: "popup-3",
    src: "https://cdn.imweb.me/upload/S20260108b9005a7eb2710/a2ea8da8080fa.png",
    alt: "팝업 공지 3",
  },
];

function getTodayKey(id: string) {
  return `popup_hide_${id}_${new Date().toISOString().slice(0, 10)}`;
}

export default function PopupBanner() {
  const [visiblePopups, setVisiblePopups] = useState<string[]>([]);

  useEffect(() => {
    const visible = POPUPS.filter(
      (p) => !localStorage.getItem(getTodayKey(p.id))
    ).map((p) => p.id);
    setVisiblePopups(visible);
  }, []);

  function closePopup(id: string) {
    setVisiblePopups((prev) => prev.filter((v) => v !== id));
  }

  function closeToday(id: string) {
    localStorage.setItem(getTodayKey(id), "1");
    closePopup(id);
  }

  if (visiblePopups.length === 0) return null;

  const activePopups = POPUPS.filter((p) => visiblePopups.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => activePopups.forEach((p) => closePopup(p.id))}
      />

      {/* 팝업 컨테이너 — 모바일: 세로 스크롤 / 데스크탑: 가로 나열 */}
      <div className="relative z-10 w-full max-w-5xl max-h-[90dvh] overflow-y-auto px-4 py-4
                      flex flex-col gap-4 items-center
                      md:flex-row md:flex-wrap md:justify-center md:items-start md:overflow-visible md:max-h-none">
        {activePopups.map((popup, index) => (
          <div
            key={popup.id}
            className="relative bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col
                       w-[min(85vw,340px)] md:w-[clamp(260px,30vw,360px)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* X 닫기 버튼 */}
            <button
              onClick={() => closePopup(popup.id)}
              className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full text-sm font-bold transition-colors"
              aria-label="닫기"
            >
              ✕
            </button>

            {/* 팝업 이미지 */}
            <div
              className="relative w-full"
              style={{ aspectRatio: "1 / 1.2" }}
            >
              <Image
                src={popup.src}
                alt={popup.alt}
                fill
                className="object-cover"
                priority={index === 0}
                unoptimized
              />
            </div>

            {/* 하단 버튼 영역 */}
            <div className="flex border-t border-gray-200 text-sm">
              <button
                onClick={() => closeToday(popup.id)}
                className="flex-1 py-3 text-gray-500 hover:bg-gray-50 transition-colors border-r border-gray-200"
              >
                오늘 하루 보지 않기
              </button>
              <button
                onClick={() => closePopup(popup.id)}
                className="flex-1 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
