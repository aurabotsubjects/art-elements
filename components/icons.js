// Minimal stroke-icon set (no dependency on lucide-react / npm).
// Mirrors the small part of lucide's API this app actually uses:
// <IconName size={16} color="currentColor" strokeWidth={2} className="..." style={{...}} />
const { createElement: h } = React;

function makeIcon(paths) {
  return function Icon({ size = 24, color = "currentColor", strokeWidth = 2, className, style, ...rest }) {
    return h(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className,
        style,
        ...rest,
      },
      paths.map((p, i) => h(p.tag, { key: i, ...p.attrs }))
    );
  };
}

const ArrowLeft = makeIcon([
  { tag: "line", attrs: { x1: 19, y1: 12, x2: 5, y2: 12 } },
  { tag: "polyline", attrs: { points: "12 19 5 12 12 5" } },
]);

const X = makeIcon([
  { tag: "line", attrs: { x1: 18, y1: 6, x2: 6, y2: 18 } },
  { tag: "line", attrs: { x1: 6, y1: 6, x2: 18, y2: 18 } },
]);

const Check = makeIcon([{ tag: "polyline", attrs: { points: "20 6 9 17 4 12" } }]);

const Lock = makeIcon([
  { tag: "rect", attrs: { x: 3, y: 11, width: 18, height: 11, rx: 2 } },
  { tag: "path", attrs: { d: "M7 11V7a5 5 0 0 1 10 0v4" } },
]);

const ClipboardList = makeIcon([
  { tag: "rect", attrs: { x: 5, y: 4, width: 14, height: 17, rx: 2 } },
  { tag: "path", attrs: { d: "M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" } },
  { tag: "line", attrs: { x1: 8, y1: 10, x2: 16, y2: 10 } },
  { tag: "line", attrs: { x1: 8, y1: 14, x2: 16, y2: 14 } },
  { tag: "line", attrs: { x1: 8, y1: 18, x2: 13, y2: 18 } },
]);

const Sparkles = makeIcon([
  { tag: "path", attrs: { d: "M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" } },
  { tag: "path", attrs: { d: "M19 15l0.8 2.2L22 18l-2.2 0.8L19 21l-0.8-2.2L16 18l2.2-0.8z" } },
]);

const Paintbrush2 = makeIcon([
  { tag: "path", attrs: { d: "M14 3l7 7-8.5 8.5a3 3 0 0 1-4.2 0l-2.8-2.8a3 3 0 0 1 0-4.2z" } },
  { tag: "path", attrs: { d: "M3 21c1-2 2-4 2-6" } },
  { tag: "line", attrs: { x1: 17.5, y1: 5.5, x2: 18.5, y2: 6.5 } },
]);

const Heart = makeIcon([
  { tag: "path", attrs: { d: "M12 21s-7.2-4.6-9.6-9.1C0.7 8.4 1.8 4.2 6 4.2c2.1 0 3.9 1.5 6 3.9 2.1-2.4 3.9-3.9 6-3.9 4.2 0 5.3 4.2 3.6 7.7C19.2 16.4 12 21 12 21z" } },
]);

const BookOpen = makeIcon([
  { tag: "path", attrs: { d: "M2 5.5c2-1.2 5.2-1.2 7 0v13.5c-1.8-1.2-5-1.2-7 0V5.5z" } },
  { tag: "path", attrs: { d: "M22 5.5c-2-1.2-5.2-1.2-7 0v13.5c1.8-1.2 5-1.2 7 0V5.5z" } },
]);

const Hand = makeIcon([
  { tag: "path", attrs: { d: "M12 2.5a2.5 2.5 0 0 0-2.5 2.5v7H8a2 2 0 0 0-2 2c0 4.2 3 8.5 6.5 8.5S19 18.2 19 14a2 2 0 0 0-2-2h-.5V6a2.5 2.5 0 0 0-4.5-1.5" } },
]);

const Globe = makeIcon([
  { tag: "circle", attrs: { cx: 12, cy: 12, r: 10 } },
  { tag: "line", attrs: { x1: 2, y1: 12, x2: 22, y2: 12 } },
  { tag: "path", attrs: { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" } },
]);

const RotateCcw = makeIcon([
  { tag: "path", attrs: { d: "M3.5 12a8.5 8.5 0 1 0 2.8-6.3" } },
  { tag: "polyline", attrs: { points: "3 3 3 9 9 9" } },
]);

const Save = makeIcon([
  { tag: "path", attrs: { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" } },
  { tag: "polyline", attrs: { points: "17 21 17 13 7 13 7 21" } },
  { tag: "polyline", attrs: { points: "7 3 7 8 15 8" } },
]);

const Plus = makeIcon([
  { tag: "line", attrs: { x1: 12, y1: 5, x2: 12, y2: 19 } },
  { tag: "line", attrs: { x1: 5, y1: 12, x2: 19, y2: 12 } },
]);

const Trash2 = makeIcon([
  { tag: "polyline", attrs: { points: "3 6 5 6 21 6" } },
  { tag: "path", attrs: { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" } },
  { tag: "line", attrs: { x1: 10, y1: 11, x2: 10, y2: 17 } },
  { tag: "line", attrs: { x1: 14, y1: 11, x2: 14, y2: 17 } },
  { tag: "path", attrs: { d: "M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" } },
]);

const Palette = makeIcon([
  { tag: "path", attrs: { d: "M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.3c2.6 0 4.7-2.1 4.7-4.7C22 5.6 17.5 2 12 2z" } },
  { tag: "circle", attrs: { cx: 7, cy: 12, r: 1.3 } },
  { tag: "circle", attrs: { cx: 10, cy: 8, r: 1.3 } },
  { tag: "circle", attrs: { cx: 15, cy: 8, r: 1.3 } },
]);

window.ArtExplorerIcons = {
  ArrowLeft, X, Check, Lock, ClipboardList, Sparkles, Paintbrush2,
  Heart, BookOpen, Hand, Globe, RotateCcw, Save, Plus, Trash2, Palette,
};

