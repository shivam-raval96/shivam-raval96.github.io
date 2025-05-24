"use client";

import React from "react";
import Link from "next/link";

const papers = [
  {
    id: 1,
    title:
      "Interpretable Sparse Autoencoders for Understanding Neural Network Representations",
    subtitle:
      "A comprehensive analysis of mechanistic interpretability through sparse coding",
    venue: "NeurIPS 2024",
    prizes: ["Best Paper Award", "Outstanding Paper"],
    teaserImage: "/images/sae-teaser.png", // You can replace with actual image paths
    link: "https://arxiv.org/paper1",
  },
  {
    id: 2,
    title: "Circuit Breaking: Targeted Interventions in Transformer Models",
    subtitle: "Novel methods for precise control of neural network behavior",
    venue: "ICML 2024",
    prizes: ["Spotlight Presentation"],
    teaserImage: "/images/circuit-breaking-teaser.png",
    link: "https://arxiv.org/paper2",
  },
  {
    id: 3,
    title: "Scaling Laws for Interactive Visualizations in Machine Learning",
    subtitle: "How visual complexity affects comprehension in ML education",
    venue: "CHI 2024",
    prizes: ["Honorable Mention"],
    teaserImage: "/images/scaling-laws-teaser.png",
    link: "https://arxiv.org/paper3",
  },
  {
    id: 4,
    title:
      "Emergent Communication Patterns in Multi-Agent Reinforcement Learning",
    subtitle:
      "Discovering language-like structures in artificial agent interactions",
    venue: "ICLR 2023",
    prizes: [],
    teaserImage: "/images/multiagent-teaser.png",
    link: "https://arxiv.org/paper4",
  },
];

const Papers = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Research Papers</h1>
      <div className="grid gap-8">
        {papers.map((paper) => (
          <Link
            key={paper.id}
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex flex-col md:flex-row">
              {/* Teaser Image */}
              <div className="md:w-1/3 p-6">
                <div className="aspect-video bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg flex items-center justify-center border border-gray-200">
                  {/* Placeholder for teaser image - replace with actual img tag when you have images */}
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 mx-auto mb-2 bg-teal-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-teal-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm">Interactive Visualization</span>
                  </div>
                  {/* When you have actual images, replace the above div with:
                  <img 
                    src={paper.teaserImage} 
                    alt={`${paper.title} teaser`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  */}
                </div>
              </div>

              {/* Paper Details */}
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800 pr-4">
                    {paper.title}
                  </h2>
                </div>

                <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                  {paper.subtitle}
                </p>

                <div className="flex items-center gap-4 mb-3">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    {paper.venue}
                  </span>
                </div>

                {paper.prizes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {paper.prizes.map((prize) => (
                      <span
                        key={prize}
                        className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm flex items-center gap-1"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {prize}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Click to view paper →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Google Scholar Section */}
      <div className="mt-12 text-center">
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            More Papers
          </h2>
          <p className="text-gray-600 mb-6">
            View my complete list of publications and citations
          </p>
          <Link
            href="https://scholar.google.com/citations?user=hs94v8AAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
            </svg>
            Google Scholar Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Papers;
