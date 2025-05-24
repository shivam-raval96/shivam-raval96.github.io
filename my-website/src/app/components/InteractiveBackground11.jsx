"use client";

import React, { useEffect, useRef, useState } from "react";

const BackgroundSwitcher = () => {
  const canvasRef = useRef(null);
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);
  const [currentBackground, setCurrentBackground] = useState('particles');

  // Particle Flow Field (your original)
  const ParticleFlowField = (canvas, ctx) => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let particles = [];
    let time = 0;

    const generateRandomParams = () => ({
      particleCount: Math.floor(Math.random() * 3000) + 500,
      particleSpeed: Math.random() * 0.5 + 0.2,
      trailLength: Math.floor(Math.random() * 150) + 100,
      flowScale: Math.random() * 0.003 + 0.001,
      mouseInfluenceRadius: Math.random() * 150 + 100,
      fadeSpeed: Math.random() * 0.8 + 0.3,
    });

    let params = generateRandomParams();

    const noise = (() => {
      const permutation = Array.from({ length: 256 }, (_, i) => i);
      for (let i = 255; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
      }
      const p = [...permutation, ...permutation];

      const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
      const lerp = (t, a, b) => a + t * (b - a);

      const grad = (hash, x, y) => {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
      };

      return (x, y) => {
        let value = 0;
        let amplitude = 1;
        let frequency = 1;
        let maxValue = 0;

        for (let i = 0; i < 6; i++) {
          const X = Math.floor(x * frequency) & 255;
          const Y = Math.floor(y * frequency) & 255;
          const xf = x * frequency - Math.floor(x * frequency);
          const yf = y * frequency - Math.floor(y * frequency);
          const u = fade(xf);
          const v = fade(yf);
          const A = p[X] + Y;
          const B = p[X + 1] + Y;

          value +=
            amplitude *
            lerp(
              v,
              lerp(u, grad(p[A], xf, yf), grad(p[B], xf - 1, yf)),
              lerp(
                u,
                grad(p[A + 1], xf, yf - 1),
                grad(p[B + 1], xf - 1, yf - 1)
              )
            );

          maxValue += amplitude;
          amplitude *= 0.5;
          frequency *= 2;
        }

        return value / maxValue;
      };
    })();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 0.1 + 0.8;
        this.history = [];
        this.maxHistory = params.trailLength;
        this.speed = Math.random() * params.particleSpeed + 0.1;
        this.angle = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.history.unshift({ x: this.x, y: this.y });
        if (this.history.length > this.maxHistory) {
          this.history.pop();
        }

        const angle =
          noise(
            this.x * params.flowScale,
            this.y * params.flowScale + time * 0.0001
          ) *
          Math.PI *
          4;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const mouseAngle = Math.atan2(dy, dx);

        let mouseInfluence = Math.max(
          0,
          1 - distance / params.mouseInfluenceRadius
        );
        mouseInfluence = mouseInfluence * mouseInfluence;

        this.angle = angle * (1 - mouseInfluence) + mouseAngle * mouseInfluence;

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (
          this.x < 0 ||
          this.x > canvas.width ||
          this.y < 0 ||
          this.y > canvas.height
        ) {
          this.reset();
        }
      }

      draw(ctx) {
        if (this.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(this.history[0].x, this.history[0].y);

          for (let i = 1; i < this.history.length - 2; i++) {
            const xc = (this.history[i].x + this.history[i + 1].x) / 2;
            const yc = (this.history[i].y + this.history[i + 1].y) / 2;
            ctx.quadraticCurveTo(this.history[i].x, this.history[i].y, xc, yc);
          }

          const gradient = ctx.createLinearGradient(
            this.history[0].x,
            this.history[0].y,
            this.history[this.history.length - 1].x,
            this.history[this.history.length - 1].y
          );
          gradient.addColorStop(0, "rgba(0, 0, 0, 0.2)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.strokeStyle = gradient;
          ctx.lineWidth = this.size;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }
    }

    const initParticles = () => {
      particles = Array.from(
        { length: params.particleCount },
        () => new Particle()
      );
    };

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      ctx.fillStyle = `rgba(255, 255, 255, ${params.fadeSpeed})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(time);
        particle.draw(ctx);
      });

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    initParticles();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  };

  // Neural Network
  const NeuralNetwork = (canvas, ctx) => {
    let nodes = [];
    let connections = [];
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    class Node {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 3 + 2;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.connections = [];
      }

      update() {
        this.pulse += this.pulseSpeed;
        
        // Subtle mouse attraction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          const force = (150 - distance) / 150 * 0.5;
          this.x += (dx / distance) * force;
          this.y += (dy / distance) * force;
        }
      }

      draw() {
        const alpha = (Math.sin(this.pulse) + 1) * 0.3 + 0.2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(50, 50, 50, ${alpha})`;
        ctx.fill();
      }
    }

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < 100; i++) {
        nodes.push(new Node(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }

      // Create connections
      connections = [];
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach(otherNode => {
          const distance = Math.sqrt(
            (node.x - otherNode.x) ** 2 + (node.y - otherNode.y) ** 2
          );
          if (distance < 120) {
            connections.push([node, otherNode, distance]);
          }
        });
      });
    };

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach(([node1, node2, distance]) => {
        const alpha = Math.max(0, (120 - distance) / 120 * 0.3);
        ctx.beginPath();
        ctx.moveTo(node1.x, node1.y);
        ctx.lineTo(node2.x, node2.y);
        ctx.strokeStyle = `rgba(100, 100, 100, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    initNodes();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  };

  // Geometric Patterns
  const GeometricPatterns = (canvas, ctx) => {
    let time = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gridSize = 60;
      const mouseInfluence = 100;

      for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
          const centerX = x + gridSize / 2;
          const centerY = y + gridSize / 2;
          
          const distanceToMouse = Math.sqrt(
            (mouseX - centerX) ** 2 + (mouseY - centerY) ** 2
          );
          
          const influence = Math.max(0, 1 - distanceToMouse / mouseInfluence);
          const rotation = time * 0.01 + influence * Math.PI;
          const scale = 0.3 + influence * 0.4;

          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(rotation);
          ctx.scale(scale, scale);

          // Draw rotating squares
          ctx.strokeStyle = `rgba(80, 80, 80, ${0.1 + influence * 0.3})`;
          ctx.lineWidth = 2;
          ctx.strokeRect(-15, -15, 30, 30);
          ctx.strokeRect(-10, -10, 20, 20);

          ctx.restore();
        }
      }

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  };

  // Fluid Waves
  const FluidWaves = (canvas, ctx) => {
    let time = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const waveCount = 8;
      
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        
        const amplitude = 50 + (mouseY / canvas.height) * 100;
        const frequency = 0.005 + (mouseX / canvas.width) * 0.01;
        const phase = (time * 0.02) + (i * Math.PI / 4);
        
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = canvas.height / 2 + 
                   Math.sin(x * frequency + phase) * amplitude +
                   Math.sin(x * frequency * 2 + phase * 1.5) * (amplitude * 0.3) +
                   (i - waveCount/2) * 30;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        const alpha = 0.1 - (i * 0.01);
        ctx.strokeStyle = `rgba(100, 100, 100, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  };

  // Matrix Rain
  const MatrixRain = (canvas, ctx) => {
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {};
  };

  useEffect(() => {
    if (typeof window === "undefined" || currentBackground === 'none') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let cleanup;
    
    switch (currentBackground) {
      case 'particles':
        cleanup = ParticleFlowField(canvas, ctx);
        break;
      case 'neural':
        cleanup = NeuralNetwork(canvas, ctx);
        break;
      case 'geometric':
        cleanup = GeometricPatterns(canvas, ctx);
        break;
      case 'waves':
        cleanup = FluidWaves(canvas, ctx);
        break;
      case 'matrix':
        cleanup = MatrixRain(canvas, ctx);
        break;
      default:
        cleanup = () => {};
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (cleanup) cleanup();
    };
  }, [currentBackground]);

  const backgrounds = [
    { id: 'none', name: 'None', icon: '⬜' },
    { id: 'particles', name: 'Particles', icon: '✨' },
    { id: 'neural', name: 'Neural', icon: '🔗' },
    { id: 'geometric', name: 'Geometric', icon: '◼️' },
    { id: 'waves', name: 'Waves', icon: '🌊' },
    { id: 'matrix', name: 'Matrix', icon: '💚' }
  ];

  return (
    <div className="relative w-full h-screen">
      {currentBackground !== 'none' && (
        <canvas 
          ref={canvasRef} 
          className="fixed top-0 left-0 w-full h-full pointer-events-none" 
          style={{ zIndex: -1 }}
          aria-hidden="true"
        />
      )}
      
      {/* Sample content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center p-8 bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Interactive Backgrounds
          </h1>
          <p className="text-gray-600 text-lg">
            Choose a background animation below
          </p>
        </div>
      </div>

      {/* Background switcher */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2" style={{ zIndex: 9999 }}>
        <div className="flex gap-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          {backgrounds.map((bg) => (
            <button
              key={bg.id}
              onClick={() => setCurrentBackground(bg.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${currentBackground === bg.id 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
                }
              `}
              title={bg.name}
            >
              <span className="mr-1">{bg.icon}</span>
              {bg.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundSwitcher;