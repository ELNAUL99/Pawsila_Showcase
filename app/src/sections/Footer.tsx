import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ background: "var(--green-dark)" }}
    >
      <div
        ref={contentRef}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Paw mark */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 40 40"
          fill="none"
          className="mx-auto mb-6"
        >
          <circle cx="20" cy="24" r="10" fill="rgba(254,250,244,0.9)" />
          <circle cx="10" cy="14" r="5" fill="rgba(254,250,244,0.9)" />
          <circle cx="20" cy="8" r="5" fill="rgba(254,250,244,0.9)" />
          <circle cx="30" cy="14" r="5" fill="rgba(254,250,244,0.9)" />
        </svg>

        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--cream)",
          }}
        >
          Building something meaningful
        </h2>
        <p
          className="text-base md:text-lg mb-8 leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(254, 250, 244, 0.75)",
          }}
        >
          Pawsila is currently in private beta. Interested in the full case
          study, codebase walkthrough, or collaboration?
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href="mailto:thanhluanle@gmail.com"
            className="px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
            style={{
              background: "var(--amber)",
              color: "white",
              fontFamily: "var(--font-body)",
            }}
          >
            Get in Touch
          </a>
          <a
            href="https://github.com/ELNAUL99"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: "rgba(254,250,244,0.4)",
              color: "var(--cream)",
              fontFamily: "var(--font-body)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            View GitHub
          </a>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/thanh-luan-le/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/15 hover:-translate-y-0.5"
            style={{ border: "1px solid rgba(254,250,244,0.3)" }}
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(254,250,244,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="mailto:thanhluanle@gmail.com"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/15 hover:-translate-y-0.5"
            style={{ border: "1px solid rgba(254,250,244,0.3)" }}
            aria-label="Email"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(254,250,244,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>

        <div
          className="mt-12 pt-6 text-xs"
          style={{
            borderTop: "1px solid rgba(254,250,244,0.15)",
            color: "rgba(254,250,244,0.5)",
            fontFamily: "var(--font-body)",
          }}
        >
          © 2025 Luan Le. Built with React Native, Expo & Supabase.
        </div>
      </div>
    </section>
  );
}
