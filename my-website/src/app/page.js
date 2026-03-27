import { about, profile, papers, experience } from "./data";
import Link from "next/link";

export default function About() {
  // Show 1 most recent paper as a teaser
  const featuredPaper = papers[papers.length - 1];
  const recentTalk = experience.talks[0];

  return (
    <div className="space-y-8">
      {/* Bio */}
      <section className="card p-7">
        <p className="section-label">About</p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text)" }}>
          {about.bio}
        </p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
          {about.philosophy}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {about.impact}
        </p>
        {about.quote && (
          <blockquote
            className="mt-5 pl-3 text-sm italic"
            style={{ borderLeft: "2px solid var(--accent)", color: "var(--muted)" }}
          >
            &ldquo;{about.quote}&rdquo;
          </blockquote>
        )}
      </section>

      {/* Two-column: featured paper + recent talk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Featured paper */}
        <Link
          href="/research"
          className="card card-hover p-5 flex flex-col gap-2 group"
        >
          <p className="section-label">Latest Paper</p>
          <p className="text-sm font-semibold leading-snug" style={{ color: "var(--text)" }}>
            {featuredPaper.title}
          </p>
          <span className="tag self-start">{featuredPaper.venue}</span>
          {featuredPaper.prizes.length > 0 && (
            <span className="award-badge self-start">
              ★ {featuredPaper.prizes[0]}
            </span>
          )}
          <span
            className="text-xs mt-auto pt-2 transition-colors"
            style={{ color: "var(--muted)" }}
          >
            View all research →
          </span>
        </Link>

        {/* Recent talk */}
        <div className="card p-5 flex flex-col gap-2">
          <p className="section-label">Recent Talk</p>
          <p className="text-sm font-semibold leading-snug" style={{ color: "var(--text)" }}>
            {recentTalk.title}
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            {recentTalk.venue}
          </p>
          <div className="flex gap-2 flex-wrap mt-auto pt-2">
            <span className="tag">{recentTalk.type}</span>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {recentTalk.date}
            </span>
          </div>
        </div>
      </div>

      {/* Current positions */}
      <section className="card p-6">
        <p className="section-label">Current Positions</p>
        <ul className="space-y-3">
          {[...experience.industry, ...experience.research]
            .filter((e) => e.period.includes("Ongoing"))
            .map((item) => (
              <li key={item.org} className="flex flex-col gap-0.5">
                <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                  {item.title}
                </span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>
                  {item.org} · {item.period}
                </span>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
