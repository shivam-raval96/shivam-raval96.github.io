"use client";

import React from "react";
import Link from "next/link";
import { papers, profile } from "../data";

const AuthorList = ({ authors }) => (
  <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
    {authors.map((a, i) =>
      typeof a === "string" ? (
        <span key={i}>{a}</span>
      ) : (
        <strong key={i} style={{ color: "var(--text)" }}>
          {a.name}
        </strong>
      )
    )}
  </p>
);

export default function Research() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
          Research
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Selected publications and workshop papers.
        </p>
      </div>

      {papers.map((paper) => (
        <Link
          key={paper.id}
          href={paper.link}
          target="_blank"
          rel="noopener noreferrer"
          className="card card-hover flex flex-col md:flex-row gap-0 overflow-hidden"
        >
          {/* Teaser */}
          <div
            className="md:w-48 shrink-0 flex items-center justify-center p-4"
            style={{ background: "var(--surface-2)" }}
          >
            <img
              src={paper.teaserImage}
              alt={paper.title}
              className="w-full h-28 object-cover rounded-lg"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2 p-5 flex-1">
            <h2 className="text-sm font-semibold leading-snug" style={{ color: "var(--text)" }}>
              {paper.title}
            </h2>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {paper.subtitle}
            </p>
            <AuthorList authors={paper.authors} />
            <div className="flex flex-wrap gap-2 mt-auto pt-1">
              <span className="tag">{paper.venue}</span>
              {paper.prizes.map((prize) => (
                <span key={prize} className="award-badge">
                  ★ {prize}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}

      {/* Google Scholar CTA */}
      <div
        className="card p-6 text-center"
        style={{ background: "var(--surface-2)" }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: "var(--text)" }}>
          Full publication list
        </p>
        <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
          Including citations, preprints, and workshop papers.
        </p>
        <Link
          href={profile.scholar}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            background: "var(--accent)",
            color: "#fff",
          }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
          </svg>
          Google Scholar
        </Link>
      </div>
    </div>
  );
}
