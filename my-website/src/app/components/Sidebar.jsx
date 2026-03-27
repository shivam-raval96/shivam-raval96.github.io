"use client";

import React from "react";
import Link from "next/link";
import { Mail, Github, Linkedin, BookOpen } from "lucide-react";
import { profile } from "../data";

const Sidebar = () => (
  <aside
    style={{ width: "var(--sidebar-w)", borderRight: "1px solid var(--border)" }}
    className="fixed h-full flex-shrink-0 flex flex-col items-center px-5 py-8 gap-5"
    aria-label="Sidebar"
  >
    {/* Avatar */}
    <img
      src={profile.headshot}
      alt={profile.name}
      className="w-20 h-20 rounded-full object-cover ring-2"
      style={{ ringColor: "var(--border)" }}
    />

    {/* Name + title */}
    <div className="text-center">
      <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>
        {profile.name}
      </p>
      <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
        {profile.title}
      </p>
      <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
        {profile.tagline}
      </p>
    </div>

    {/* Social icons */}
    <div className="flex gap-3">
      {[
        { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
        { href: profile.github, icon: Github, label: "GitHub" },
        { href: profile.linkedin, icon: Linkedin, label: "LinkedIn" },
        { href: profile.scholar, icon: BookOpen, label: "Google Scholar" },
      ].map(({ href, icon: Icon, label }) => (
        <Link
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          className="transition-colors"
          style={{ color: "var(--muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          <Icon size={16} />
        </Link>
      ))}
    </div>

    <hr className="w-full" style={{ borderColor: "var(--border)" }} />

    {/* Interests */}
    <div className="w-full">
      <p className="section-label">Interests</p>
      <ul className="space-y-1.5">
        {profile.interests.map((interest) => (
          <li
            key={interest}
            className="text-xs leading-snug"
            style={{ color: "var(--muted)" }}
          >
            {interest}
          </li>
        ))}
      </ul>
    </div>

    {/* Spacer + email */}
    <div className="mt-auto w-full">
      <p className="text-xs" style={{ color: "var(--muted)" }}>
        Get in touch:{" "}
        <Link
          href={`mailto:${profile.email}`}
          className="transition-colors"
          style={{ color: "var(--accent-text)" }}
        >
          {profile.email}
        </Link>
      </p>
    </div>
  </aside>
);

export default Sidebar;
