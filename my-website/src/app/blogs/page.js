"use client";

import React from "react";
import Link from "next/link";

const blogPosts = [
  {
    id: 0,
    title: "Why SAEs fail (and why CLTs might too)",
    description: "An interactive exploration of SAEs and CLTs",
    date: "2025-05-15",
    readTime: "xxx min read",
    tags: ["Machine Learning", "Visualization", "Interpretability"],
    link: "https://shivam-raval96.github.io/Explorable-SAE/",
  },
  {
    id: 2,
    title: "The Future of Interactive Academic Papers",
    description:
      "How interactive visualizations are changing the way we communicate research",
    date: "2024-02-28",
    readTime: "12 min read",
    tags: ["Research", "Academic Writing", "Interactive Media"],
  },
];

const Blogs = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Blog Posts</h1>
      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Link
            key={post.id}
            href={post.id == 0 ? post.link : `/blogs/${post.id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h2>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-4">{post.date}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
