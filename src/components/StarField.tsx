import { useEffect, useRef } from "react";

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Satellites
    const satellites = Array.from({ length: 3 }, () => ({
      x: -50 - Math.random() * 300,
      y: Math.random() * canvas.height * 0.4 + 30,
      speed: Math.random() * 0.3 + 0.15,
      size: Math.random() * 2 + 1.5,
      opacity: Math.random() * 0.25 + 0.1,
      blinkPhase: Math.random() * Math.PI * 2,
    }));

    // Spaceships (small triangular shapes)
    const ships = Array.from({ length: 2 }, () => ({
      x: canvas.width + 50 + Math.random() * 200,
      y: Math.random() * canvas.height * 0.5 + 50,
      speed: Math.random() * 0.4 + 0.2,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.2 + 0.08,
    }));

    // Earth
    const earth = {
      x: canvas.width * 0.82,
      y: canvas.height - 10,
      radius: Math.min(canvas.width, canvas.height) * 0.18,
      rotation: 0,
      rotationSpeed: 0.0003,
    };

    let animId: number;
    let time = 0;

    const drawSatellite = (sat: typeof satellites[0]) => {
      const blink = Math.sin(time * 0.03 + sat.blinkPhase) * 0.5 + 0.5;
      const alpha = sat.opacity * (0.6 + blink * 0.4);

      ctx.save();
      ctx.globalAlpha = alpha;

      // Body
      ctx.fillStyle = "rgba(180, 200, 220, 1)";
      ctx.fillRect(sat.x - sat.size, sat.y - sat.size * 0.3, sat.size * 2, sat.size * 0.6);

      // Solar panels
      ctx.fillStyle = "rgba(100, 140, 200, 0.8)";
      ctx.fillRect(sat.x - sat.size * 3, sat.y - sat.size * 0.15, sat.size * 1.8, sat.size * 0.3);
      ctx.fillRect(sat.x + sat.size * 1.2, sat.y - sat.size * 0.15, sat.size * 1.8, sat.size * 0.3);

      // Blinking light
      ctx.beginPath();
      ctx.arc(sat.x, sat.y, sat.size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 80, 80, ${blink * 0.8})`;
      ctx.fill();

      ctx.restore();
    };

    const drawShip = (ship: typeof ships[0]) => {
      ctx.save();
      ctx.globalAlpha = ship.opacity;
      ctx.translate(ship.x, ship.y);

      // Triangular ship pointing left (moving left)
      ctx.beginPath();
      ctx.moveTo(-ship.size * 2, 0);
      ctx.lineTo(ship.size, -ship.size * 0.8);
      ctx.lineTo(ship.size, ship.size * 0.8);
      ctx.closePath();
      ctx.fillStyle = "rgba(200, 210, 230, 0.9)";
      ctx.fill();

      // Engine glow
      ctx.beginPath();
      ctx.arc(ship.size + 1, 0, ship.size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100, 180, 255, ${0.3 + Math.sin(time * 0.1) * 0.2})`;
      ctx.fill();

      ctx.restore();
    };

    const drawEarth = () => {
      const { x, y, radius, rotation } = earth;
      ctx.save();
      ctx.globalAlpha = 0.12;

      // Planet base
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      const earthGrad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, radius * 0.1, x, y, radius);
      earthGrad.addColorStop(0, "hsl(210, 70%, 50%)");
      earthGrad.addColorStop(0.5, "hsl(200, 60%, 35%)");
      earthGrad.addColorStop(1, "hsl(220, 40%, 15%)");
      ctx.fillStyle = earthGrad;
      ctx.fill();

      // Continents (simplified rotating patches)
      ctx.globalAlpha = 0.08;
      const continents = [
        { offset: 0, w: 0.3, h: 0.25 },
        { offset: 1.8, w: 0.2, h: 0.35 },
        { offset: 3.5, w: 0.25, h: 0.2 },
        { offset: 5.0, w: 0.15, h: 0.3 },
      ];

      continents.forEach((c) => {
        const angle = rotation + c.offset;
        const cx = x + Math.cos(angle) * radius * 0.5;
        const cy = y + Math.sin(angle) * radius * 0.3 - radius * 0.1;
        const dist = Math.cos(angle);
        if (dist > -0.2) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, radius * c.w * Math.max(0.1, dist), radius * c.h, 0, 0, Math.PI * 2);
          ctx.fillStyle = "hsl(140, 40%, 35%)";
          ctx.fill();
        }
      });

      // Atmosphere glow
      ctx.globalAlpha = 0.06;
      ctx.beginPath();
      ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
      ctx.strokeStyle = "hsl(200, 80%, 60%)";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      // Draw earth behind everything
      earth.rotation += earth.rotationSpeed;
      drawEarth();

      // Stars
      stars.forEach((s) => {
        s.opacity += s.twinkleSpeed;
        if (s.opacity > 1 || s.opacity < 0.2) s.twinkleSpeed *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${s.opacity})`;
        ctx.fill();
      });

      // Satellites (left to right)
      satellites.forEach((sat) => {
        sat.x += sat.speed;
        if (sat.x > canvas.width + 100) {
          sat.x = -80;
          sat.y = Math.random() * canvas.height * 0.4 + 30;
        }
        drawSatellite(sat);
      });

      // Ships (right to left)
      ships.forEach((ship) => {
        ship.x -= ship.speed;
        if (ship.x < -80) {
          ship.x = canvas.width + 80;
          ship.y = Math.random() * canvas.height * 0.5 + 50;
        }
        drawShip(ship);
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      resize();
      earth.x = canvas.width * 0.82;
      earth.y = canvas.height - 10;
      earth.radius = Math.min(canvas.width, canvas.height) * 0.18;
    };
    window.removeEventListener("resize", resize);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default StarField;
