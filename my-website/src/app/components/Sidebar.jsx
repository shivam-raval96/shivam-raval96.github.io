"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  const getSidebarText = () => {
    switch (pathname) {
      case "/":
        return "Current interests: AI interpretability and safety, high dimensional data analysis and visualization";
      case "/resume":
        return "Experience in academia and industry";
      case "/blogs":
        return "Thoughts on ML, visualization, and research";
      case "/visuals":
        return "Interactive data visualizations";
      case "/projects":
        return "Recent research projects and collaborations";
      default:
        return "Research scientist focused on interpretable ML";
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 fixed h-full">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <img
            src="/headshot.jpg"
            alt="Profile"
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Shivam Raval</h2>
        <p className="text-sm text-gray-600 mt-2 mb-6">
          AI Research Scientist. <br/>
          Generalist.  <br/>
          Eternally curious.
        </p>

        <div className="flex space-x-4 mb-8">
          <Link href="mailto:sraval@g.harvard.edu" aria-label="Email">
            <Mail className="w-5 h-5 text-gray-600 hover:text-teal-600 cursor-pointer" />
          </Link>
          <Link href="https://github.com/shivam-raval96" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="w-5 h-5 text-gray-600 hover:text-teal-600 cursor-pointer" />
          </Link>
          <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="w-5 h-5 text-gray-600 hover:text-teal-600 cursor-pointer" />
          </Link>
          <Link href="https://www.linkedin.com/in/shivam-raval-27820484/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 text-gray-600 hover:text-teal-600 cursor-pointer" />
          </Link>
        </div>
        <p className="text-sm text-gray-600 mb-8 text-left">
          {getSidebarText()}
        </p>
        <div className="email-at">
          <p>
            Feel free to get in touch. My email is{" "}
            <Link href="mailto:sraval@g.harvard.edu">
              sraval@g.harvard.edu
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;