"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { path: "/", label: "About" },
    { path: "/resume", label: "Resume" },
    { path: "/blogs", label: "Blogs" },
    { path: "/visuals", label: "Visuals" },
    { path: "/idle", label: "Idle" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-end space-x-10">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`py-4 px-3 text-base md:text-lg font-medium transition-colors duration-200
                ${
                  pathname === link.path
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-500 hover:text-teal-600"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;