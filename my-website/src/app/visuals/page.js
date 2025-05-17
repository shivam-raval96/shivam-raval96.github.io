"use client";

import React from "react";
import Link from "next/link";

const visualPosts = [
  {
    id: "attractor",
    title: "Some strange attractors",
    description: "An interactive exploration of non-linear dynamics and chaos",
    date: "2024-03-15",
    tags: ["Machine Learning", "Visualization", "Web Development"],
  },
];

const Visuals = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Visuals</h1>
      <div className="grid gap-6">
        {visualPosts.map((post) => (
          <Link
            key={post.id}
            href={`/visuals/${post.id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h2>
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

export default Visuals;
