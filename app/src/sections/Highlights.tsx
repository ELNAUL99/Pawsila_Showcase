import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    title: "Row-Level Security for Caregiver Sharing",
    body: "Built granular PostgreSQL RLS policies so pet owners can share specific pets with caregivers while keeping other data fully private. Caregivers get read-only access to shared pet health records and documents, with owner-controlled revocation.",
  },
  {
    title: "Pro Subscription Gating with RevenueCat",
    body: "Integrated RevenueCat SDK for iOS/Android in-app purchases. Built a complete paywall flow with entitlement checking, free trial handling, and feature gating across 12+ screens. Hardened edge cases like restore purchases and subscription lapses.",
  },
  {
    title: "Health Passport PDF Export",
    body: "Used expo-print to generate formatted PDF health passports from Supabase health record data. Includes pet profile photo, vaccination history, weight trends, and owner contact — essential for travel and vet visits.",
  },
  {
    title: "Notification System at Scale",
    body: "Implemented Expo Push Notifications with pagination, read states, and category-based grouping. Built a cron-based reminder engine for recurring vaccines and medications, with timezone-aware scheduling.",
  },
];

export default function Highlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, i) => {
        if (item) {
          gsap.from(item, {
            x: -20,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="highlights"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12"
      style={{ background: "var(--cream)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--green-deep)",
            }}
          >
            Challenges Solved
          </h2>
          <p
            className="text-base md:text-lg"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-secondary)",
            }}
          >
            Hard problems, thoughtful solutions.
          </p>
        </div>

        <div className="space-y-0">
          {highlights.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="border-b transition-colors duration-200"
              style={{ borderColor: "var(--border-color)" }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span
                  className="text-lg md:text-xl font-semibold pr-4 transition-colors duration-200 group-hover:text-[var(--green-dark)]"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--green-deep)",
                  }}
                >
                  {item.title}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: "var(--green-mid)",
                    transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: openIndex === i ? "200px" : "0",
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p
                  className="pb-6 text-sm md:text-base leading-relaxed"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
