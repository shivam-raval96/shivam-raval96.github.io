"use client";

import React, { useEffect, useRef } from "react";

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Ensure we're running in browser environment
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let particles = [];

    // Function to generate random parameters
    const generateRandomParams = () => ({
      particleCount: Math.floor(Math.random() * 3000) + 5000, // 3000-6000 particles
      particleSpeed: Math.random() * 0.5 + 0.2,
      trailLength: Math.floor(Math.random() * 150) + 100, // 100-250 length
      flowScale: Math.random() * 0.003 + 0.001, // 0.001-0.004
      mouseInfluenceRadius: Math.random() * 150 + 100, // 100-250 radius
      fadeSpeed: Math.random() * 0.8 + 0.3, // 0.3-0.6
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

    const restartAnimation = () => {
      // Generate new random parameters
      params = generateRandomParams();
      // Clear existing particles and create new ones
      particles = [];
      initParticles();

      // Schedule next restart
      timeoutRef.current = setTimeout(restartAnimation, 60000); // 1 minute
    };

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    let time = 0;
    const animate = () => {
      ctx.fillStyle = `rgba(255, 255, 255, ${params.fadeSpeed})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(time);
        particle.draw(ctx);
      });

      time++;
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    animate();
    timeoutRef.current = setTimeout(restartAnimation, 60000); // Initial restart schedule

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0" 
      aria-hidden="true"
    />
  );
};

export default InteractiveBackground;