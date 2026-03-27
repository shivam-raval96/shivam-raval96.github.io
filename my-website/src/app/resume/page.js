"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Calendar } from "lucide-react";
import { experience } from "../data";

const Section = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="space-y-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-2"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
          {title}
        </span>
        {open ? (
          <ChevronUp size={14} style={{ color: "var(--muted)" }} />
        ) : (
          <ChevronDown size={14} style={{ color: "var(--muted)" }} />
        )}
      </button>
      {open && <div className="space-y-3">{children}</div>}
    </section>
  );
};

const Entry = ({ title, org, location, period, description, highlights, awards }) => (
  <div className="card p-5">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
      <div>
        <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
          {title}
        </p>
        <p className="text-xs font-medium mt-0.5" style={{ color: "var(--accent-text)" }}>
          {org}
        </p>
      </div>
      <div className="flex flex-col sm:items-end gap-0.5 shrink-0">
        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
          <MapPin size={11} /> {location}
        </span>
        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
          <Calendar size={11} /> {period}
        </span>
      </div>
    </div>

    {description && (
      <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--muted)" }}>
        {description}
      </p>
    )}

    {highlights?.length > 0 && (
      <ul className="space-y-1 mb-2">
        {highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className="mt-1.5 w-1 h-1 rounded-full shrink-0"
              style={{ background: "var(--accent)" }}
            />
            <span className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
              {h}
            </span>
          </li>
        ))}
      </ul>
    )}

    {awards?.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mt-2">
        {awards.map((a) => (
          <span key={a} className="award-badge">
            ★ {a}
          </span>
        ))}
      </div>
    )}
  </div>
);

const TalkEntry = ({ title, venue, location, date, type, description }) => (
  <div className="card p-5">
    <div className="flex items-start justify-between gap-3 mb-1">
      <p className="text-sm font-semibold leading-snug" style={{ color: "var(--text)" }}>
        {title}
      </p>
      <span className="tag shrink-0">{type}</span>
    </div>
    <p className="text-xs font-medium mb-1" style={{ color: "var(--accent-text)" }}>
      {venue}
    </p>
    <div className="flex gap-3 text-xs mb-2" style={{ color: "var(--muted)" }}>
      <span className="flex items-center gap-1">
        <MapPin size={11} /> {location}
      </span>
      <span className="flex items-center gap-1">
        <Calendar size={11} /> {date}
      </span>
    </div>
    {description && (
      <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
        {description}
      </p>
    )}
  </div>
);

export default function Resume() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
          Resume
        </h1>
      </div>

      <Section title="Education">
        {experience.education.map((e) => (
          <Entry key={e.org} {...e} />
        ))}
      </Section>

      <Section title="Industry Experience">
        {experience.industry.map((e) => (
          <Entry key={e.org} {...e} />
        ))}
      </Section>

      <Section title="Research Experience">
        {experience.research.map((e) => (
          <Entry key={e.org} {...e} />
        ))}
      </Section>

      <Section title="Leadership & Teaching">
        {experience.leadership.map((e) => (
          <Entry key={e.org} {...e} />
        ))}
      </Section>

      <Section title="Selected Talks">
        {experience.talks.map((t) => (
          <TalkEntry key={t.title} {...t} />
        ))}
      </Section>
    </div>
  );
}
