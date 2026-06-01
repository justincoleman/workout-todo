/* Minimal dependency-free line chart rendered to a <canvas>.
 * Keeps the PWA small and fully offline — no Chart.js / CDN needed.
 *
 * drawLineChart(canvas, points, options)
 *   points: [{ x: Date|string|number, y: number }]  (assumed sorted by x)
 */
const Charts = (() => {
  function cssVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function drawLineChart(canvas, points, options = {}) {
    const accent = options.color || cssVar("--accent", "#4ade80");
    const grid = cssVar("--chart-grid", "rgba(255,255,255,0.08)");
    const text = cssVar("--chart-text", "rgba(255,255,255,0.6)");
    const fmtY = options.formatY || ((v) => String(v));

    // Handle high-DPI displays crisply.
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || 320;
    const cssH = canvas.clientHeight || 180;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    if (!points || points.length === 0) {
      ctx.fillStyle = text;
      ctx.font = "14px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("No data yet", cssW / 2, cssH / 2);
      return;
    }

    const padL = 38, padR = 12, padT = 12, padB = 24;
    const plotW = cssW - padL - padR;
    const plotH = cssH - padT - padB;

    const xs = points.map((p) => new Date(p.x).getTime());
    const ys = points.map((p) => p.y);
    let xMin = Math.min(...xs), xMax = Math.max(...xs);
    let yMin = Math.min(...ys), yMax = Math.max(...ys);
    if (xMin === xMax) { xMin -= 1; xMax += 1; }
    // Pad the y-range a little and clamp the floor at 0 for weights.
    const yPad = (yMax - yMin) * 0.15 || Math.max(1, yMax * 0.1);
    yMax += yPad;
    yMin = Math.max(0, yMin - yPad);
    if (yMin === yMax) { yMax += 1; }

    const xPix = (t) => padL + ((t - xMin) / (xMax - xMin)) * plotW;
    const yPix = (v) => padT + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

    // Horizontal grid + y labels (4 steps).
    ctx.font = "11px system-ui, sans-serif";
    ctx.fillStyle = text;
    ctx.strokeStyle = grid;
    ctx.lineWidth = 1;
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const v = yMin + (i / steps) * (yMax - yMin);
      const y = yPix(v);
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(cssW - padR, y);
      ctx.stroke();
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(fmtY(Math.round(v)), padL - 6, y);
    }

    // X labels: first and last date.
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const dFmt = { month: "short", day: "numeric" };
    ctx.fillText(new Date(xMin).toLocaleDateString(undefined, dFmt), xPix(xMin), cssH - padB + 6);
    if (xMax !== xMin)
      ctx.fillText(new Date(xMax).toLocaleDateString(undefined, dFmt), xPix(xMax), cssH - padB + 6);

    // Area fill under the line.
    const grad = ctx.createLinearGradient(0, padT, 0, padT + plotH);
    grad.addColorStop(0, hexToRgba(accent, 0.25));
    grad.addColorStop(1, hexToRgba(accent, 0));
    ctx.beginPath();
    points.forEach((p, i) => {
      const x = xPix(new Date(p.x).getTime());
      const y = yPix(p.y);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    const lastX = xPix(new Date(points[points.length - 1].x).getTime());
    const firstX = xPix(new Date(points[0].x).getTime());
    ctx.lineTo(lastX, padT + plotH);
    ctx.lineTo(firstX, padT + plotH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // The line itself.
    ctx.beginPath();
    points.forEach((p, i) => {
      const x = xPix(new Date(p.x).getTime());
      const y = yPix(p.y);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke();

    // Data point dots.
    ctx.fillStyle = accent;
    points.forEach((p) => {
      const x = xPix(new Date(p.x).getTime());
      const y = yPix(p.y);
      ctx.beginPath();
      ctx.arc(x, y, points.length > 30 ? 2 : 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function hexToRgba(color, alpha) {
    // Accept #rgb / #rrggbb. Fall back to the color as-is for named/rgb values.
    let m = color.match(/^#([0-9a-f]{3})$/i);
    if (m) {
      const h = m[1];
      const r = parseInt(h[0] + h[0], 16);
      const g = parseInt(h[1] + h[1], 16);
      const b = parseInt(h[2] + h[2], 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }
    m = color.match(/^#([0-9a-f]{6})$/i);
    if (m) {
      const h = m[1];
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    }
    return color;
  }

  return { drawLineChart };
})();
