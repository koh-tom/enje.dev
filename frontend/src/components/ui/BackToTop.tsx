"use client";

import { useEffect, useState } from "react";
import { TfiArrowCircleUp } from "react-icons/tfi";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // 300px以上スクロールしたら表示
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="ページトップへ戻る"
      className={`
                group
                fixed bottom-6 right-6 z-50
                flex items-center gap-0 overflow-hidden
                h-12 w-12 hover:w-40
                px-3 rounded-full
                bg-gradient-to-r from-cyan-500 to-sky-600
                text-white shadow-lg
                hover:from-cyan-600 hover:to-sky-700
                hover:shadow-xl
                active:scale-95
                transition-all duration-300 ease-out
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }
            `}
    >
      <TfiArrowCircleUp size={24} className="flex-shrink-0" />
      <span
        className="
                    ml-2
                    text-sm font-medium
                    whitespace-nowrap
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200 delay-100
                "
      >
        トップへ戻る
      </span>
    </button>
  );
}
