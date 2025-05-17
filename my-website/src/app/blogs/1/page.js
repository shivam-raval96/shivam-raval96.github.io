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
            <span className="text-sm text-gray-500">March 15, 2024</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">8 min read</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Visualizing Neural Networks in the Browser [Claude generated fluff]
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
              Machine Learning
            </span>
            <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
              Visualization
            </span>
            <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm">
              Web Development
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
              Introduction
            </h2>
            <p className="leading-relaxed">
              Neural networks are powerful computational models that form the
              backbone of modern AI systems. However, their complex
              architectures can be difficult to understand without proper
              visualization. In this blog post, we'll explore how to create
              interactive neural network visualizations using D3.js and React.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8">
              Understanding Neural Network Architectures
            </h2>
            <p className="leading-relaxed">
              Before diving into visualization techniques, let's understand what
              we're trying to represent. Neural networks consist of layers of
              interconnected neurons, with each connection having an associated
              weight. Data flows from the input layer through hidden layers to
              the output layer, with transformations applied at each step.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8">
              Building Interactive Visualizations with D3.js
            </h2>
            <p className="leading-relaxed">
              D3.js (Data-Driven Documents) is a powerful JavaScript library for
              creating dynamic, interactive data visualizations in web browsers.
              It's particularly well-suited for neural network visualization due
              to its robust handling of linked data and smooth transitions.
            </p>

            <p className="leading-relaxed">
              One approach to visualizing a neural network is to represent it as
              a directed graph, with nodes representing neurons and edges
              representing connections. D3's force-directed graph layout is
              perfect for this, as it automatically positions nodes based on the
              connections between them.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8">
              Integrating with React
            </h2>
            <p className="leading-relaxed">
              While D3.js is powerful, it can be challenging to integrate with
              React's declarative paradigm. There are several strategies for
              combining the two:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Let React handle the DOM, and use D3 for calculations only
              </li>
              <li>
                Let D3 handle a specific DOM element, while React manages the
                rest
              </li>
              <li>
                Use specialized libraries like react-d3-library or victory that
                bridge the gap
              </li>
            </ul>

            <p className="leading-relaxed">
              For our neural network visualization, we'll use the second
              approach, creating a React component that renders a container
              element and then lets D3 manipulate that element directly.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8">
              Adding Interactivity
            </h2>
            <p className="leading-relaxed">
              The real power of browser-based visualizations is interactivity.
              We can enhance our neural network visualization with features
              like:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Hover effects to highlight specific neurons and their
                connections
              </li>
              <li>Zooming and panning to explore large networks</li>
              <li>Animation to show data flowing through the network</li>
              <li>Controls to adjust network parameters and observe changes</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8">
              Performance Considerations
            </h2>
            <p className="leading-relaxed">
              Rendering complex neural networks with thousands of connections
              can be computationally intensive. To maintain smooth performance,
              consider techniques like:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Using WebGL for rendering large networks (via libraries like
                Three.js or regl)
              </li>
              <li>
                Implementing level-of-detail techniques to simplify the
                visualization when zoomed out
              </li>
              <li>
                Using Web Workers to perform calculations off the main thread
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8">
              Conclusion
            </h2>
            <p className="leading-relaxed">
              Interactive visualizations are powerful tools for understanding
              the complex architectures of neural networks. By combining the
              data visualization capabilities of D3.js with the component-based
              architecture of React, we can create engaging, educational
              experiences that help demystify these powerful AI systems.
            </p>

            <p className="leading-relaxed">
              In the next post, we'll explore how to visualize the training
              process of a neural network in real-time, showing how weights and
              activations change as the network learns.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
