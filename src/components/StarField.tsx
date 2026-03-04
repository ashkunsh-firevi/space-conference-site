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
      size: Math.random() * 4 + 4,
      opacity: Math.random() * 0.3 + 0.15,
      blinkPhase: Math.random() * Math.PI * 2,
    }));

    // Spaceships (larger triangular shapes)
    const ships = Array.from({ length: 2 }, () => ({
      x: canvas.width + 50 + Math.random() * 200,
      y: Math.random() * canvas.height * 0.5 + 50,
      speed: Math.random() * 0.4 + 0.2,
      size: Math.random() * 5 + 5,
      opacity: Math.random() * 0.25 + 0.12,
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

      // Clip to circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.clip();

      // Ocean base
      ctx.globalAlpha = 0.18;
      const oceanGrad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.4, radius * 0.05, x, y, radius);
      oceanGrad.addColorStop(0, "hsl(205, 75%, 55%)");
      oceanGrad.addColorStop(0.4, "hsl(210, 70%, 42%)");
      oceanGrad.addColorStop(0.8, "hsl(215, 60%, 30%)");
      oceanGrad.addColorStop(1, "hsl(220, 50%, 15%)");
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);

      // Continents
      ctx.globalAlpha = 0.16;
      const continents = [
        // Africa + Europe
        { offset: 0, cx: 0.15, cy: -0.1, shapes: [
          { dx: 0, dy: 0, w: 0.18, h: 0.35, rot: 0.1 },
          { dx: -0.05, dy: -0.25, w: 0.15, h: 0.12, rot: -0.1 },
        ]},
        // Americas
        { offset: 2.2, cx: -0.3, cy: -0.05, shapes: [
          { dx: 0, dy: -0.15, w: 0.14, h: 0.25, rot: 0.15 },
          { dx: 0.03, dy: 0.15, w: 0.12, h: 0.3, rot: -0.05 },
        ]},
        // Asia
        { offset: 0.8, cx: 0.35, cy: -0.25, shapes: [
          { dx: 0, dy: 0, w: 0.3, h: 0.2, rot: 0.05 },
          { dx: 0.1, dy: 0.12, w: 0.12, h: 0.15, rot: 0.2 },
        ]},
        // Australia
        { offset: 1.5, cx: 0.4, cy: 0.2, shapes: [
          { dx: 0, dy: 0, w: 0.12, h: 0.09, rot: 0.3 },
        ]},
        // Antarctica
        { offset: 0, cx: 0, cy: 0.45, shapes: [
          { dx: 0, dy: 0, w: 0.35, h: 0.08, rot: 0 },
        ]},
      ];

      continents.forEach((cont) => {
        const baseAngle = rotation + cont.offset;
        const visibility = Math.cos(baseAngle);
        if (visibility < -0.3) return;
        const fade = Math.max(0, Math.min(1, visibility + 0.3));

        cont.shapes.forEach((s) => {
          const sx = x + (cont.cx + s.dx + Math.sin(baseAngle) * 0.15) * radius;
          const sy = y + (cont.cy + s.dy) * radius;
          const scaleX = radius * s.w * Math.max(0.05, visibility);

          ctx.save();
          ctx.globalAlpha = 0.14 * fade;
          ctx.translate(sx, sy);
          ctx.rotate(s.rot);
          ctx.beginPath();
          ctx.ellipse(0, 0, scaleX, radius * s.h, 0, 0, Math.PI * 2);
          // Land gradient
          const landGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, scaleX);
          landGrad.addColorStop(0, "hsl(120, 35%, 40%)");
          landGrad.addColorStop(0.6, "hsl(90, 30%, 35%)");
          landGrad.addColorStop(1, "hsl(50, 35%, 32%)");
          ctx.fillStyle = landGrad;
          ctx.fill();
          ctx.restore();
        });
      });

      // Clouds
      ctx.globalAlpha = 0.07;
      const cloudTime = rotation * 1.3;
      const clouds = [
        { cx: 0.2, cy: -0.15, w: 0.25, h: 0.04, phase: 0 },
        { cx: -0.15, cy: -0.3, w: 0.2, h: 0.035, phase: 1.5 },
        { cx: 0.1, cy: 0.1, w: 0.3, h: 0.03, phase: 3.0 },
        { cx: -0.25, cy: 0.05, w: 0.18, h: 0.04, phase: 4.2 },
        { cx: 0.3, cy: -0.05, w: 0.15, h: 0.03, phase: 5.5 },
      ];
      clouds.forEach((cl) => {
        const cloudAngle = cloudTime + cl.phase;
        const vis = Math.cos(cloudAngle);
        if (vis < 0) return;
        const cx2 = x + (cl.cx + Math.sin(cloudAngle) * 0.2) * radius;
        const cy2 = y + cl.cy * radius;
        ctx.beginPath();
        ctx.ellipse(cx2, cy2, radius * cl.w * vis, radius * cl.h, 0.1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
      });

      ctx.restore(); // Remove clip

      // Atmosphere glow
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.beginPath();
      ctx.arc(x, y, radius + 6, 0, Math.PI * 2);
      const atmoGrad = ctx.createRadialGradient(x, y, radius - 2, x, y, radius + 8);
      atmoGrad.addColorStop(0, "transparent");
      atmoGrad.addColorStop(0.5, "hsla(200, 80%, 65%, 0.4)");
      atmoGrad.addColorStop(1, "transparent");
      ctx.fillStyle = atmoGrad;
      ctx.fill();

      // Thin bright edge
      ctx.globalAlpha = 0.12;
      ctx.beginPath();
      ctx.arc(x, y, radius + 1, 0, Math.PI * 2);
      ctx.strokeStyle = "hsl(195, 90%, 70%)";
      ctx.lineWidth = 2;
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
