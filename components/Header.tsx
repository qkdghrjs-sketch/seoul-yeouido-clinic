"use client";

import { useState, useEffect } from "react";

const navItems = [
  { label: "진료안내", href: "#hours" },
  { label: "진료과목", href: "#services" },
  { label: "수액·접종", href: "#services" },
  { label: "오시는길", href: "#location" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white shadow-[inset_0_-1px_0_0_#E8E8E8]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="shrink-0">
            <span
              className={`font-bold text-lg tracking-tight transition-colors duration-500 ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              여의도서울의원
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-base font-medium transition-colors duration-300 hover:text-teal-600 ${
                  scrolled ? "text-gray-700" : "text-white/90"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:02-782-0051"
              className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors duration-300"
            >
              📞 02-782-0051
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2"
            onClick={() => setDrawerOpen(true)}
            aria-label="메뉴 열기"
          >
            <svg
              className={`w-6 h-6 transition-colors duration-500 ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Fullscreen drawer */}
      <div
        className={`fixed inset-0 z-[60] bg-white transition-transform duration-500 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
          <span className="font-bold text-lg text-gray-900">
            여의도서울의원
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2"
            aria-label="메뉴 닫기"
          >
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col px-6 pt-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setDrawerOpen(false)}
              className="py-5 text-2xl font-light text-gray-900 border-b border-gray-100 hover:text-teal-600 transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href="tel:02-782-0051"
            className="mt-10 flex items-center justify-center gap-2 bg-teal-600 text-white text-lg font-medium px-6 py-4 rounded-lg"
          >
            📞 02-782-0051
          </a>
        </nav>
      </div>
    </>
  );
}
