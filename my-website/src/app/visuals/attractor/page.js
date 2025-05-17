"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function cliffordOrbit(length, x0, y0, a, b, c, d) {
  let n = length;
  const { sin, cos } = Math;
  const value = new Float64Array([x0, y0]);
  return {
    length,
    next() {
      if (n === 0) return { done: true };
      n -= 1;
      const x = value[0];
      const y = value[1];
      value[0] = sin(a * y) + c * cos(a * x);
      value[1] = sin(b * x) + d * cos(b * y);
      return { value, done: false };
    },
  };
}

const DrawAttractor = ({ params }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    const width = 600;
    const height = 600;

    // Handle high DPI displays
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(pixelRatio, pixelRatio);

    function drawAttractor() {
      const myscale = d3.scaleLinear().domain([-3, 3]).range([0, height]);
      const myscalex = d3.scaleLinear().domain([-3, 3]).range([0, width]);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const it = cliffordOrbit(
        params.n,
        0,
        0,
        params.a,
        params.b,
        params.c,
        params.d
      );
      let result = it.next();
      while (!result.done) {
        ctx.beginPath();
        ctx.globalAlpha = params.alpha;
        ctx.arc(
          myscalex(result.value[0]),
          myscale(result.value[1]),
          params.size,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = params.color;
        ctx.fill();
        result = it.next();
      }
    }

    drawAttractor();

    // Cleanup function
    return () => {
      // Any cleanup code would go here
    };
  }, [params]); // Re-render when params change

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "relative",
        overflow: "visible",
        margin: "0 auto",
        display: "block",
        maxWidth: "100%",
      }}
      aria-label="Clifford Attractor Visualization"
    />
  );
};

const AttractorPage = () => {
  const [params, setParams] = useState({
    a: -1.7,
    b: -1.5,
    c: -1.6,
    d: -1.9,
    n: 50000,
    color: "#4682b4", // steelblue
    size: 0.5,
    alpha: 0.9,
  });

  const [presets, setPresets] = useState([
    { name: "Torus", a: -2.5, b: -2.5, c: -0.86, d: -1.59 },
    { name: "Shell", a: 1.84, b: 1.73, c: 0.6, d: 1.2 },
    { name: "Vortex", a: 0.98, b: -1.12, c: -1.38, d: -1.3 },
    { name: "Alien", a: -1.58, b: 1.24, c: 0.0, d: 1.22 },
  ]);

  const handleParamChange = (e) => {
    const { name, value } = e.target;
    setParams((prev) => ({
      ...prev,
      [name]: name === "n" ? parseInt(value) : parseFloat(value),
    }));
  };

  const handleColorChange = (e) => {
    setParams((prev) => ({
      ...prev,
      color: e.target.value,
    }));
  };

  const applyPreset = (preset) => {
    setParams((prev) => ({
      ...prev,
      a: preset.a,
      b: preset.b,
      c: preset.c,
      d: preset.d,
    }));
  };

  const randomizeParams = () => {
    setParams((prev) => ({
      ...prev,
      a: Math.random() * 4 - 2,
      b: Math.random() * 4 - 2,
      c: Math.random() * 4 - 2,
      d: Math.random() * 4 - 2,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        Clifford Attractor Visualization
      </h1>
      <p className="mb-6">
        This visualization shows a Clifford strange attractor, a type of chaotic
        system defined by four parameters (a, b, c, d). Adjust the parameters to
        see how they affect the pattern.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex flex-col">
            <label
              htmlFor="param-a"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Parameter a: {params.a.toFixed(2)}
            </label>
            <input
              id="param-a"
              type="range"
              name="a"
              min="-2.5"
              max="2.5"
              step="0.01"
              value={params.a}
              onChange={handleParamChange}
              className="w-40"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="param-b"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Parameter b: {params.b.toFixed(2)}
            </label>
            <input
              id="param-b"
              type="range"
              name="b"
              min="-2.5"
              max="2.5"
              step="0.01"
              value={params.b}
              onChange={handleParamChange}
              className="w-40"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="param-c"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Parameter c: {params.c.toFixed(2)}
            </label>
            <input
              id="param-c"
              type="range"
              name="c"
              min="-2.5"
              max="2.5"
              step="0.01"
              value={params.c}
              onChange={handleParamChange}
              className="w-40"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="param-d"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Parameter d: {params.d.toFixed(2)}
            </label>
            <input
              id="param-d"
              type="range"
              name="d"
              min="-2.5"
              max="2.5"
              step="0.01"
              value={params.d}
              onChange={handleParamChange}
              className="w-40"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-col">
            <label
              htmlFor="point-size"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Point Size: {params.size.toFixed(1)}
            </label>
            <input
              id="point-size"
              type="range"
              name="size"
              min="0.1"
              max="2"
              step="0.1"
              value={params.size}
              onChange={handleParamChange}
              className="w-40"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="alpha"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Opacity: {params.alpha.toFixed(1)}
            </label>
            <input
              id="alpha"
              type="range"
              name="alpha"
              min="0.1"
              max="1"
              step="0.1"
              value={params.alpha}
              onChange={handleParamChange}
              className="w-40"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="num-points"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Number of Points: {params.n}
            </label>
            <input
              id="num-points"
              type="range"
              name="n"
              min="5000"
              max="100000"
              step="5000"
              value={params.n}
              onChange={handleParamChange}
              className="w-40"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="color"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Color
            </label>
            <input
              id="color"
              type="color"
              value={params.color}
              onChange={handleColorChange}
              className="w-20 h-8"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={randomizeParams}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
          >
            Randomize
          </button>

          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>

        <DrawAttractor params={params} />
      </div>
    </div>
  );
};

export default AttractorPage;
