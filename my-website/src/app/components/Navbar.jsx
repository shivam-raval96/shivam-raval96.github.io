"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const links = [
  { path: "/", label: "About" },
  { path: "/research", label: "Research" },
  { path: "/resume", label: "Resume" },
  { path: "/blogs", label: "Writing" },
  { path: "/visuals", label: "Visuals" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <nav
      className="flex items-center justify-between px-6 py-0"
      style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
    >
      <div className="flex items-center gap-1">
        {links.map(({ path, label }) => {
          const active = pathname === path;
          return (
            <Link
              key={path}
              href={path}
              className="relative px-3 py-4 text-sm font-medium transition-colors"
              style={{ color: active ? "var(--accent)" : "var(--muted)" }}
            >
              {label}
              {active && (
                <span
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="p-2 rounded-lg transition-colors"
        style={{ color: "var(--muted)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--surface-2)";
          e.currentTarget.style.color = "var(--text)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--muted)";
        }}
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </nav>
  );
};

export default Navbar;
