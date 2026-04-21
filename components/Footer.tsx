export default function Footer() {
  return (
    <footer className="bg-[#383838] text-white">
      {/* Teal accent line */}
      <div className="h-1 bg-teal-600" />

      <div className="max-w-[1400px] mx-auto px-10 py-16">
        <div className="flex flex-col items-center text-center gap-5">
          <p className="font-bold text-xl">여의도서울의원</p>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm text-white/70">
            <span>서울 영등포구 여의도동 FKI타워 B1층 (전경련회관)</span>
            <span className="hidden sm:block opacity-30">|</span>
            <a
              href="tel:02-782-0051"
              className="hover:text-white transition-colors duration-300"
            >
              Tel. 02-782-0051
            </a>
          </div>

          <div className="w-16 h-px bg-white/20" />

          <p className="text-xs text-white/40">
            &copy; 2025 여의도서울의원. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
