import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const BlogPost = () => {
  return (
    <article className="max-w-3xl mx-auto">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/blogs"
          className="inline-flex items-center text-teal-600 hover:text-teal-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all blogs
        </Link>
      </div>

      {/* Blog content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          {/* Metadata */}
          <div className="flex items-center mb-4">
            <span className="text-sm text-gray-500">February 28, 2024</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">12 min read</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            The Future of Interactive Academic Papers [Claude generated fluff]
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
              Research
            </span>
            <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
              Academic Writing
            </span>
            <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
              Interactive Media
            </span>
          </div>

          {/* Author */}
          <div className="flex items-center mb-8">
            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-4">
              <img
                src="/headshot.jpg"
                alt="Shivam Raval"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-800">Shivam Raval</p>
              <p className="text-sm text-gray-600">
                Researcher focused on AI interpretability and visualization
              </p>
            </div>
          </div>

          {/* Blog content - explicitly styled instead of using dangerouslySetInnerHTML */}
          <div className="space-y-6 text-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 mt-8">
              Reimagining Academic Publishing
            </h2>
            <p className="leading-relaxed">
              For centuries, academic papers have followed the same static
              format: text, figures, tables, and citations organized into a
              linear narrative. This format served science well in the age of
              print, but in the digital era, we have the opportunity to
              fundamentally rethink how research is communicated. Interactive
              visualizations are at the forefront of this transformation.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8">
              Beyond Static Figures
            </h2>
            <p className="leading-relaxed">
              Traditional academic papers rely on static figures to communicate
              complex data and models. These figures represent a significant
              compromise—they show only a single perspective on the data, often
              chosen to best support the author's conclusions. Interactive
              visualizations break free from these constraints, allowing readers
              to:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Explore different dimensions and subsets of the data</li>
              <li>Test alternative hypotheses and parameters</li>
              <li>Verify claims by directly manipulating the evidence</li>
              <li>
                Discover insights that might have been missed by the authors
              </li>
            </ul>

            <p className="leading-relaxed">
              This shift from passive consumption to active exploration
              represents a fundamental change in how scientific knowledge is
              transmitted and verified.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8">
              Challenges in Implementation
            </h2>
            <p className="leading-relaxed">
              Despite their potential, interactive academic papers face several
              challenges:
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              Technical Infrastructure
            </h3>
            <p className="leading-relaxed">
              Most academic publishing platforms aren't designed to support
              interactive content. While solutions like Jupyter notebooks and
              Observable have gained traction, they often exist outside the
              traditional publishing ecosystem.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              Preservation and Reproducibility
            </h3>
            <p className="leading-relaxed">
              Interactive visualizations rely on specific technologies that may
              become obsolete. Ensuring that these interactions remain
              functional decades later is a significant challenge for digital
              archivists.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              Peer Review
            </h3>
            <p className="leading-relaxed">
              Reviewing interactive content requires new skills and approaches.
              Reviewers must evaluate not just the conclusions, but also the
              interactive experience and its potential to reveal or obscure
              important aspects of the data.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              Accessibility
            </h3>
            <p className="leading-relaxed">
              Interactive visualizations must be designed with accessibility in
              mind, ensuring that researchers with disabilities can fully engage
              with the content.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8">
              Pioneering Examples
            </h2>
            <p className="leading-relaxed">
              Several publications and platforms are leading the way in
              interactive academic content:
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              Distill.pub
            </h3>
            <p className="leading-relaxed">
              This machine learning journal specializes in interactive
              explanations of complex concepts, with articles that respond to
              user input in real-time.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              PLOS Computational Biology
            </h3>
            <p className="leading-relaxed">
              This journal has embraced interactive figures that allow readers
              to explore different parameters and conditions of computational
              models.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6">
              The Parametric Press
            </h3>
            <p className="leading-relaxed">
              This digital magazine publishes interactive articles on scientific
              and technological topics, demonstrating how interactivity can
              enhance understanding.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8">
              Building the Infrastructure
            </h2>
            <p className="leading-relaxed">
              To make interactive papers mainstream, we need:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Standards for embedding interactive content in academic
                publications
              </li>
              <li>
                Tools that make creating interactive visualizations accessible
                to researchers without programming expertise
              </li>
              <li>
                Publishing platforms that support and preserve interactive
                elements
              </li>
              <li>
                Citation systems that can reference specific states of an
                interactive visualization
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8">
              The Way Forward
            </h2>
            <p className="leading-relaxed">
              Interactive academic papers represent not just a technological
              evolution, but a cultural one. They challenge us to rethink the
              relationship between authors and readers, making scientific
              communication more collaborative and transparent.
            </p>

            <p className="leading-relaxed">
              As these technologies mature, we can expect to see a new
              generation of research publications that don't just present
              conclusions, but invite readers to participate in the process of
              discovery. This transformation promises to accelerate scientific
              progress by making complex research more accessible and
              verifiable.
            </p>

            <p className="leading-relaxed">
              In my next post, I'll explore specific tools and frameworks that
              researchers can use today to create interactive visualizations for
              their own work.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
