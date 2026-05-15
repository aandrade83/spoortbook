import Image from "next/image";
import Link from "next/link";

const LANDINGS = [
  {
    id: "1",
    name: "Landing 1",
    title: "Buckeye with LOBBY - Modern Sportsbook with Video Hero",
    description:
      "Modern Landing with Video Hero Scrolling, Login and Internal Lobby. Just login once and jump between Cashier, Casino, Sportsbooks.",
  },
  {
    id: "2",
    name: "Landing 2",
    title: "Classic Sportsbook — Cashier Button",
    description:
      "Classic sportsbook landing. Logo auto-loads from site domain, Cashier button opens the partner cashier via API lookup, Login posts directly to the book.",
  },
  {
    id: "3",
    name: "Landing 3",
    title: "Orange Neon — Carousel + Product Cards",
    description:
      "Dark orange neon theme with auto-carousel, Sportsbook/Casino/Racebook product cards, trust strip, and Cashier API lookup button.",
  },
  {
    id: "4",
    name: "Landing 4",
    title: "PPH Classic — Local Carousel + Cashier",
    description:
      "Classic black/red sportsbook style with a local image carousel (NBA, Baseball, NHL, Casino, Horses), Cashier API lookup, and direct login to the book.",
  },
] as const;

export default function Home() {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "#0a1228" }}
    >
      {/* Background image */}
      <Image
        src="/vrb-landing-background.png"
        alt="VRB Marketing — Landing Pages"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center" }}
      />

      {/* Dim overlay for contrast on the right side where buttons sit */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, transparent 50%, rgba(10,18,40,0.55) 75%, rgba(10,18,40,0.8) 100%)",
        }}
      />

      {/* Top-left logo (small, complementary to the background branding) */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
        <div className="relative w-10 h-10">
          <Image
            src="/vrb-landing-logo.png"
            alt="VRB"
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Buttons grid — pinned right, vertically centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-end px-6 md:px-12 lg:px-20 py-20">
        <div
          className="w-full md:w-1/2 lg:w-2/5"
          style={{ marginTop: "-250px", transform: "translateX(50px)" }}
        >
          <div className="mb-8 text-right">
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "#ff7a30", fontFamily: "var(--font-inter)" }}
            >
              Available Landings
            </span>
            <h1
              className="text-4xl md:text-5xl text-white mt-2"
              style={{
                fontFamily: "var(--font-bebas), Impact, sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              SELECT A LANDING
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LANDINGS.map((l) => (
              <Link
                key={l.id}
                href={`/landings/${l.id}`}
                className="group relative flex flex-col gap-2 p-5 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(10,18,40,0.7)",
                  border: "1px solid rgba(255,122,48,0.35)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                }}
              >
                <span
                  className="text-2xl text-white"
                  style={{
                    fontFamily: "var(--font-bebas), Impact, sans-serif",
                    letterSpacing: "0.08em",
                  }}
                >
                  {l.name.toUpperCase()}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "#8892a4", fontFamily: "var(--font-inter)" }}
                >
                  {l.title}
                </span>

                {/* Hover description popover */}
                <div
                  className="absolute top-full left-0 right-0 mt-2 p-3 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-20"
                  style={{
                    background: "rgba(10,18,40,0.95)",
                    border: "1px solid rgba(255,122,48,0.4)",
                    backdropFilter: "blur(14px)",
                    fontFamily: "var(--font-inter)",
                    color: "#cbd5e1",
                    fontSize: "12px",
                    lineHeight: "1.5",
                  }}
                >
                  {l.description}
                </div>

                {/* Hover glow */}
                <span
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: "0 0 30px rgba(232,93,28,0.45)" }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
