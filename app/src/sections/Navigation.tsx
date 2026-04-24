import { useEffect, useState, useRef } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(254, 250, 244, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-color)" : "1px solid transparent",
      }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-2 group"
      >
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none" className="transition-transform duration-300 group-hover:scale-110">
          <circle cx="20" cy="24" r="10" fill="#2D6A4F" />
          <circle cx="10" cy="14" r="5" fill="#2D6A4F" />
          <circle cx="20" cy="8" r="5" fill="#2D6A4F" />
          <circle cx="30" cy="14" r="5" fill="#2D6A4F" />
        </svg>
        <span
          className="text-lg font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--green-deep)" }}
        >
          Pawsila
        </span>
      </button>

      <div className="hidden md:flex items-center gap-8">
        {[
          { label: "Overview", id: "overview" },
          { label: "Features", id: "features" },
          { label: "Architecture", id: "architecture" },
          { label: "Highlights", id: "highlights" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="text-sm font-medium transition-colors duration-200 hover:text-[var(--green-dark)]"
            style={{ color: "var(--text-secondary)" }}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo("contact")}
          className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
          style={{
            background: "var(--amber)",
            color: "white",
            fontFamily: "var(--font-body)",
          }}
        >
          Get in Touch
        </button>
      </div>
    </nav>
  );
}
