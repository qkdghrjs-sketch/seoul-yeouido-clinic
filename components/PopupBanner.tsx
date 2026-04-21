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
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const visible = POPUPS.filter(
      (p) => !localStorage.getItem(getTodayKey(p.id))
    ).map((p) => p.id);
    setVisiblePopups(visible);
  }, []);

  function closePopup(id: string) {
    setVisiblePopups((prev) => {
      const next = prev.filter((v) => v !== id);
      // 현재 캐러셀 인덱스가 범위를 벗어나지 않도록 조정
      setMobileIndex((i) => Math.min(i, Math.max(next.length - 1, 0)));
      return next;
    });
  }

  function closeToday(id: string) {
    localStorage.setItem(getTodayKey(id), "1");
    closePopup(id);
  }

  if (visiblePopups.length === 0) return null;

  const activePopups = POPUPS.filter((p) => visiblePopups.includes(p.id));
  const currentPopup = activePopups[mobileIndex] ?? activePopups[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => activePopups.forEach((p) => closePopup(p.id))}
      />

      {/* ─── 모바일: 캐러셀 (1개씩) ─── */}
      <div className="relative z-10 md:hidden flex flex-col items-center w-full px-4">
        <div
          className="relative bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col w-full"
          style={{ maxWidth: "min(92vw, 360px)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* X 닫기 */}
          <button
            onClick={() => closePopup(currentPopup.id)}
            className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full text-sm font-bold transition-colors"
            aria-label="닫기"
          >
            ✕
          </button>

          {/* 팝업 이미지 — 화면 높이에서 버튼 영역 뺀 만큼만 */}
          <div
            className="relative w-full"
            style={{
              aspectRatio: "1 / 1.2",
              maxHeight: "calc(80dvh - 48px)",
            }}
          >
            <Image
              src={currentPopup.src}
              alt={currentPopup.alt}
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>

          {/* 하단 버튼 */}
          <div className="flex border-t border-gray-200 text-sm">
            <button
              onClick={() => closeToday(currentPopup.id)}
              className="flex-1 py-3 text-gray-500 active:bg-gray-100 transition-colors border-r border-gray-200"
            >
              오늘 하루 보지 않기
            </button>
            <button
              onClick={() => closePopup(currentPopup.id)}
              className="flex-1 py-3 text-gray-700 font-medium active:bg-gray-100 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>

        {/* 페이지 도트 (2개 이상일 때만) */}
        {activePopups.length > 1 && (
          <div className="flex gap-2 mt-3">
            {activePopups.map((p, i) => (
              <button
                key={p.id}
                onClick={(e) => { e.stopPropagation(); setMobileIndex(i); }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === mobileIndex ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`팝업 ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ─── 데스크탑: 가로 나열 ─── */}
      <div className="relative z-10 hidden md:flex flex-wrap gap-4 justify-center items-start px-4 max-w-5xl w-full">
        {activePopups.map((popup, index) => (
          <div
            key={popup.id}
            className="relative bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col"
            style={{ width: "clamp(260px, 30vw, 360px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => closePopup(popup.id)}
              className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full text-sm font-bold transition-colors"
              aria-label="닫기"
            >
              ✕
            </button>

            <div className="relative w-full" style={{ aspectRatio: "1 / 1.2" }}>
              <Image
                src={popup.src}
                alt={popup.alt}
                fill
                className="object-cover"
                priority={index === 0}
                unoptimized
              />
            </div>

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
