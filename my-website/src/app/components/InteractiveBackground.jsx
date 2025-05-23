"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);
  const [currentBackground, setCurrentBackground] = useState('particles');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Constellation Stars
  const ConstellationStars = (canvas, ctx) => {
    let stars = [];
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.twinkle = Math.random() * Math.PI * 2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.brightness = Math.random() * 0.8 + 0.2;
      }

      update() {
        this.twinkle += this.twinkleSpeed;
      }

      draw() {
        const alpha = this.brightness * (Math.sin(this.twinkle) * 0.3 + 0.7);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 255, ${alpha})`;
        ctx.fill();
      }
    }

    const initStars = () => {
      stars = Array.from({ length: 200 }, () => new Star());
    };

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw constellation lines
      stars.forEach((star, i) => {
        stars.slice(i + 1).forEach(otherStar => {
          const distance = Math.sqrt(
            (star.x - otherStar.x) ** 2 + (star.y - otherStar.y) ** 2
          );
          if (distance < 100) {
            const alpha = Math.max(0, (100 - distance) / 100 * 0.2);
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(otherStar.x, otherStar.y);
            ctx.strokeStyle = `rgba(150, 150, 200, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    initStars();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  };

  // Fireflies
  const Fireflies = (canvas, ctx) => {
    let fireflies = [];
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    class Firefly {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 2;
        this.glow = Math.random() * Math.PI * 2;
        this.glowSpeed = Math.random() * 0.05 + 0.02;
        this.hue = Math.random() * 60 + 30; // Yellow to orange
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.glow += this.glowSpeed;

        // Mouse attraction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          const force = (200 - distance) / 200 * 0.3;
          this.vx += (dx / distance) * force * 0.1;
          this.vy += (dy / distance) * force * 0.1;
        }

        // Boundary wrapping
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Damping
        this.vx *= 0.99;
        this.vy *= 0.99;
      }

      draw() {
        const intensity = (Math.sin(this.glow) + 1) * 0.5;
        const alpha = intensity * 0.8 + 0.2;
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${alpha * 0.1})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 80%, ${alpha})`;
        ctx.fill();
      }
    }

    const initFireflies = () => {
      fireflies = Array.from({ length: 80 }, () => new Firefly());
    };

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireflies.forEach(firefly => {
        firefly.update();
        firefly.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    initFireflies();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  };

  // Spiral Galaxy
  const SpiralGalaxy = (canvas, ctx) => {
    let particles = [];
    let time = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    class SpiralParticle {
      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * 300 + 50;
        this.speed = Math.random() * 0.01 + 0.005;
        this.size = Math.random() * 2 + 0.5;
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        this.armOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.angle += this.speed;
        
        // Spiral arms
        const armAngle = this.angle + this.armOffset + (this.radius * 0.01);
        this.x = this.centerX + Math.cos(armAngle) * this.radius;
        this.y = this.centerY + Math.sin(armAngle) * this.radius;

        // Mouse influence
        const dx = mouseX - this.centerX;
        const dy = mouseY - this.centerY;
        this.centerX += dx * 0.01;
        this.centerY += dy * 0.01;
      }

      draw() {
        const alpha = Math.max(0, 1 - this.radius / 350);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 100, 255, ${alpha * 0.6})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = Array.from({ length: 800 }, () => new SpiralParticle());
    };

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
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
      case 'constellation':
        cleanup = ConstellationStars(canvas, ctx);
        break;
      case 'fireflies':
        cleanup = Fireflies(canvas, ctx);
        break;
      case 'spiral':
        cleanup = SpiralGalaxy(canvas, ctx);
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
    { id: 'matrix', name: 'Matrix', icon: '🕶️' },
    { id: 'constellation', name: 'Stars', icon: '⭐' },
    { id: 'fireflies', name: 'Fireflies', icon: '🪲' },
    { id: 'spiral', name: 'Spiral', icon: '🌀' },
  ];

  const BackgroundSwitcher = () => (
    <div 
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-auto" 
      style={{ zIndex: 99999 }}
    >
      <div className="flex gap-1 bg-white bg-opacity-95 backdrop-blur-sm rounded-full p-1 shadow-xl border border-gray-200">
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentBackground(bg.id);
              console.log('Clicked:', bg.name); // Debug log
            }}
            className={`
              px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer
              ${currentBackground === bg.id 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }
            `}
            title={bg.name}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 1 }}
          >
            <span className="text-xs">{bg.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Background Canvas */}
      {currentBackground !== 'none' && (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          aria-hidden="true"
        />
      )}
      
      {/* Background Switcher - Rendered in portal at body level */}
      {mounted && createPortal(<BackgroundSwitcher />, document.body)}
    </>
  );
};

export default InteractiveBackground;