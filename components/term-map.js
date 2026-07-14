(function () {
const { useState, useEffect, useRef } = React;
const { ArrowLeft, X, ClipboardList, Check, Lock, Sparkles, Paintbrush2, Heart, BookOpen, Hand, Globe, RotateCcw, Save, Plus, Trash2, Palette } = window.ArtExplorerIcons;

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const DAY_TYPE_LABEL = {
  discover: "Discover",
  expA: "Experiment A",
  expB: "Experiment B",
  create: "Create",
  reflect: "Reflect & Share",
};

const DAY_TYPE_TIMING = {
  discover: [
    ["Introduction", 12],
    ["Activity One", 22],
    ["Closure and Reflection", 6],
  ],
  expA: [
    ["Introduction", 5],
    ["Activity One", 30],
    ["Closure and Reflection", 5],
  ],
  expB: [
    ["Introduction", 5],
    ["Activity One", 30],
    ["Closure and Reflection", 5],
  ],
  create: [
    ["Introduction", 5],
    ["Activity One", 30],
    ["Closure and Reflection", 5],
  ],
  reflect: [
    ["Introduction", 5],
    ["Gallery Walk & Share", 25],
    ["Closure and Reflection", 10],
  ],
};

function waltFor(type, focus) {
  switch (type) {
    case "discover":
      return [
        `Notice ${focus.toLowerCase()} in the world and in artists' work.`,
        "Begin using art vocabulary to describe what we see.",
      ];
    case "expA":
      return [
        `Experiment with ${focus.toLowerCase()} in a low-stakes, playful way.`,
        "Make choices and explain why we made them.",
      ];
    case "expB":
      return [
        `Explore ${focus.toLowerCase()} through a different material or method.`,
        "Compare this way of working with yesterday's.",
      ];
    case "create":
      return [
        `Use ${focus.toLowerCase()} with control and intention in our own artwork.`,
        "Persevere through a full creative process.",
      ];
    case "reflect":
    default:
      return [
        `Describe how ${focus.toLowerCase()} was used in our own and others' artwork.`,
        "Give and receive kind, useful feedback.",
      ];
  }
}

const WEEKS = [
  {
    focus: "Line",
    title: "Elements of Art — Intro & Line",
    strand: "Developing Practical Knowledge",
    ao: "Explore, select, and use art-making conventions (line, shape, colour, texture) purposefully.",
    days: [
      { type: "discover", title: "What Makes Art, Art?", activity: "Interactive \u201Cspot the 7 elements\u201D slider over famous and NZ artworks; introduce the 7 Elements as a visual poster/word wall.", resources: "Interactive slider tool, projector, printable Elements poster" },
      { type: "expA", title: "Lines Have Feelings", activity: "Digital line-drawing tool: students draw \u201Cangry,\u201D \u201Ccalm,\u201D \u201Cbouncy,\u201D and \u201Csleepy\u201D lines, then compare as a class.", resources: "Tablet/laptop drawing tool, stylus or finger-draw" },
      { type: "expB", title: "Line Hunt", activity: "Photo and sketch exploration: find and record contour, implied, zigzag, and curved lines around the classroom and playground.", resources: "Clipboards, pencils, cameras/tablets" },
      { type: "create", title: "My Line Story", activity: "Create a small artwork using only line (ink pen or digital) to tell a mood or story — no shapes allowed.", resources: "Fine liners or digital line tool, A5 paper" },
      { type: "reflect", title: "Gallery Walk: Line", activity: "Share artworks and use vocabulary (contour, gesture, implied line) to describe a partner's work; save to portfolio.", resources: "Portfolio app, display space" },
    ],
  },
  {
    focus: "Shape & Form",
    title: "Shape & Form",
    strand: "Developing Practical Knowledge",
    ao: "Select and use materials, processes, and technologies to represent shape and form.",
    days: [
      { type: "discover", title: "Flat vs. Solid", activity: "Visual sort of geometric vs organic shapes; compare shape and form (circle vs sphere, square vs cube).", resources: "Sorting cards, real objects (ball, box, cone)" },
      { type: "expA", title: "Shape Builder", activity: "Interactive drag-and-drop tool: build a creature or building from geometric and organic shapes.", resources: "Shape-builder tool, tablet/laptop" },
      { type: "expB", title: "Form From Shading", activity: "Explore how shading turns a flat circle into a sphere using a light-source experiment and a digital shading slider.", resources: "Shading slider tool, torch, round objects" },
      { type: "create", title: "Shape City", activity: "Create a skyline, creature, or pattern artwork that combines geometric and organic shapes with intention.", resources: "Coloured paper, scissors, glue, or digital canvas" },
      { type: "reflect", title: "Gallery Walk: Shape & Form", activity: "Peer share; identify shape versus form in each other's finished work.", resources: "Portfolio app, display space" },
    ],
  },
  {
    focus: "Colour",
    title: "Colour",
    strand: "Developing Practical Knowledge",
    ao: "Understand how colour is built from hue, value, and intensity, and use it to communicate mood.",
    days: [
      { type: "discover", title: "Colour Detective", activity: "Interactive colour wheel exploring hue families and warm versus cool colour.", resources: "Interactive colour wheel tool" },
      { type: "expA", title: "Mixing Lab", activity: "Digital paint-mixing tool: mix hues, then lighten (tint) and darken (shade) and watch value change live.", resources: "Digital mixing-lab tool" },
      { type: "expB", title: "Turn Up the Volume", activity: "Intensity slider tool: dull a colour down or make it pop, then match colours to moods.", resources: "Intensity slider tool" },
      { type: "create", title: "Colour Mood Painting", activity: "Paint or digital artwork expressing a chosen emotion using colour choices alone.", resources: "Paint and brushes, or digital canvas" },
      { type: "reflect", title: "Gallery Walk: Colour", activity: "Guess the mood of a partner's painting from colour alone; discuss as a class.", resources: "Portfolio app, display space" },
    ],
  },
  {
    focus: "Value & Space",
    title: "Value & Space",
    strand: "Developing Practical Knowledge",
    ao: "Use value and positive/negative space to create the illusion of depth.",
    days: [
      { type: "discover", title: "Light to Dark", activity: "Interactive value scale (1–10 greyscale); spot value ranges in black-and-white photos.", resources: "Value-scale tool, black-and-white photo set" },
      { type: "expA", title: "Shadow Play", activity: "Torch-and-object shadow exploration, photographed or drawn to show a range of values.", resources: "Torches, small objects, paper" },
      { type: "expB", title: "Positive & Negative", activity: "Cut-paper silhouette activity exploring figure/ground reversal digitally and physically.", resources: "Black paper, scissors, digital cut-out tool" },
      { type: "create", title: "Depth Illusion Artwork", activity: "Create a piece using value shading and positive/negative space to suggest 3D depth.", resources: "Pencils/charcoal or digital shading tool" },
      { type: "reflect", title: "Gallery Walk: Value & Space", activity: "Identify where value creates depth and where negative space is used in peers' work.", resources: "Portfolio app, display space" },
    ],
  },
  {
    focus: "Texture",
    title: "Texture + Elements Synthesis",
    strand: "Communicating and Interpreting",
    ao: "Represent texture and identify how all seven Elements of Art work together in a composition.",
    days: [
      { type: "discover", title: "Touch and See", activity: "Sensory table comparing real textures (bark, fabric, sand, feathers) with visual/implied texture in images.", resources: "Sensory table materials, texture images" },
      { type: "expA", title: "Rubbing & Marking", activity: "Texture-rubbing activity with crayons, plus a digital texture-brush exploration.", resources: "Crayons, textured surfaces, digital texture brush tool" },
      { type: "expB", title: "Fake It", activity: "Create implied texture using only line, shading, and pattern — no real texture materials allowed.", resources: "Fine liners, pencils" },
      { type: "create", title: "7 Elements Treasure Hunt Artwork", activity: "Create one artwork that deliberately includes all 7 elements, using a self-checklist along the way.", resources: "Mixed materials, self-checklist handout" },
      { type: "reflect", title: "Elements Showcase & Quiz", activity: "Gallery walk plus a fun interactive quiz reviewing all 7 Elements before moving on to Principles.", resources: "Interactive quiz tool, portfolio app" },
    ],
  },
  {
    focus: "Balance",
    title: "Principles of Design — Intro & Balance",
    strand: "Developing Ideas",
    ao: "Develop and revisit visual ideas, using balance to arrange the Elements of Art purposefully.",
    days: [
      { type: "discover", title: "From Ingredients to Recipe", activity: "Introduce the 6 Principles as \u201Crules\u201D for using elements; compare balanced and unbalanced compositions.", resources: "Comparison image set, Principles poster" },
      { type: "expA", title: "Symmetry Mirror", activity: "Interactive symmetrical-balance tool — build one half and watch it mirror automatically.", resources: "Symmetry mirror tool" },
      { type: "expB", title: "Balancing Act", activity: "Explore asymmetrical and radial balance with movable shape pieces in a digital collage.", resources: "Digital collage tool with movable shapes" },
      { type: "create", title: "Balanced Composition Artwork", activity: "Create an artwork demonstrating a chosen type of balance.", resources: "Mixed materials or digital canvas" },
      { type: "reflect", title: "Gallery Walk: Balance", activity: "Peers identify symmetrical, asymmetrical, or radial balance in each other's work.", resources: "Portfolio app, display space" },
    ],
  },
  {
    focus: "Emphasis & Movement",
    title: "Emphasis & Movement/Rhythm",
    strand: "Developing Ideas",
    ao: "Use emphasis and movement to guide a viewer's eye through a composition.",
    days: [
      { type: "discover", title: "Find the Star", activity: "Visual search to spot the focal point in famous artworks and discuss how the artist drew the eye there.", resources: "Artwork image set" },
      { type: "expA", title: "Spotlight Tool", activity: "Interactive activity using colour, contrast, and size to create emphasis on a plain scene.", resources: "Spotlight/emphasis tool" },
      { type: "expB", title: "Eye Journey", activity: "Explore movement and rhythm using repeated shapes or lines that lead the eye across a composition.", resources: "Repeating shape stickers or digital tool" },
      { type: "create", title: "Focal Point Artwork", activity: "Create an artwork with one clear focal point and a sense of visual movement.", resources: "Mixed materials or digital canvas" },
      { type: "reflect", title: "Gallery Walk: Emphasis & Movement", activity: "Peers trace with a finger or cursor where their eye travels in a partner's work.", resources: "Portfolio app, display space" },
    ],
  },
  {
    focus: "Pattern",
    title: "Pattern",
    strand: "Communicating and Interpreting",
    ao: "Design and repeat pattern with control, including patterns drawn from nature and culture.",
    days: [
      { type: "discover", title: "Pattern Spotting", activity: "Visual hunt for pattern in nature, buildings, fabric, and NZ/M\u0101ori k\u014dwhaiwhai and tukutuku designs.", resources: "Pattern image set, k\u014dwhaiwhai/tukutuku examples" },
      { type: "expA", title: "Build a Repeat", activity: "Interactive digital tile tool: design one motif and watch it tile and repeat automatically.", resources: "Digital tiling tool" },
      { type: "expB", title: "Pattern Remix", activity: "Hands-on stamping or printmaking exploration to create a physical repeating pattern.", resources: "Stamps/printing blocks, ink or paint" },
      { type: "create", title: "Pattern Artwork", activity: "Create a finished pattern-based artwork (digital or physical) with a clear repeat unit.", resources: "Mixed materials or digital canvas" },
      { type: "reflect", title: "Gallery Walk: Pattern", activity: "Share and identify the repeat unit in each other's patterns.", resources: "Portfolio app, display space" },
    ],
  },
  {
    focus: "Proportion & Unity",
    title: "Proportion/Scale & Unity/Variety",
    strand: "Developing Ideas",
    ao: "Use proportion and scale for effect, balancing unity with variety in a composition.",
    days: [
      { type: "discover", title: "Big & Small", activity: "Visual comparison of realistic versus exaggerated scale in art (giant flowers, tiny people).", resources: "Image set with exaggerated scale examples" },
      { type: "expA", title: "Scale Playground", activity: "Interactive resize tool: change the proportions of objects in a scene and discuss the effect.", resources: "Scale/resize tool" },
      { type: "expB", title: "Same but Different", activity: "Unity versus variety sorting activity; fix a composition that's \u201Ctoo samey\u201D or \u201Ctoo chaotic.\u201D", resources: "Sorting cards, example compositions" },
      { type: "create", title: "Proportion & Unity Artwork", activity: "Create an artwork playing with unusual scale while keeping overall unity.", resources: "Mixed materials or digital canvas" },
      { type: "reflect", title: "Gallery Walk: Proportion & Unity/Variety", activity: "Peers discuss what's exaggerated and what ties the piece together.", resources: "Portfolio app, display space" },
    ],
  },
  {
    focus: "Synthesis",
    title: "Final Synthesis: Design a World",
    strand: "All strands",
    ao: "Combine multiple Elements and Principles intentionally in one finished artwork, and talk about choices like an artist.",
    days: [
      { type: "discover", title: "Plan Your World", activity: "Recap all 13 concepts via an interactive review game; choose 3+ elements and 2+ principles to focus on, then sketch a plan.", resources: "Review game, planning sheet" },
      { type: "expA", title: "Build — Session 1", activity: "Studio time: begin the final artwork (digital or physical) with the teacher conferring one-to-one using the planning sheet.", resources: "Chosen media, planning sheet" },
      { type: "expB", title: "Build — Session 2", activity: "Continue the final artwork with peer check-ins using a simple elements/principles checklist.", resources: "Chosen media, checklist handout" },
      { type: "create", title: "Finish & Write", activity: "Complete the artwork and write or record a short artist statement naming the elements/principles used and why.", resources: "Chosen media, statement template" },
      { type: "reflect", title: "Class Exhibition", activity: "Whole-class gallery walk / exhibition (physical display and/or app portfolio showcase); celebrate and reflect on the term.", resources: "Display space, portfolio app" },
    ],
  },
];

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function dayId(weekIdx, dayIdx) {
  return `${weekIdx}-${dayIdx}`;
}

function hueFor(weekIdx) {
  return Math.round((weekIdx / WEEKS.length) * 360);
}

function splitFocusLabel(label) {
  if (label.length <= 9) return [label];
  if (label.includes(" & ")) {
    const [a, b] = label.split(" & ");
    return [`${a} &`, b];
  }
  const words = label.split(" ");
  if (words.length === 1) return [label];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

/* angle 0 = 12 o'clock, increasing clockwise */
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeDonutSegment(cx, cy, innerR, outerR, startAngle, endAngle) {
  const outerStart = polarToCartesian(cx, cy, outerR, endAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, startAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", outerStart.x, outerStart.y,
    "A", outerR, outerR, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
    "L", innerStart.x, innerStart.y,
    "A", innerR, innerR, 0, largeArcFlag, 1, innerEnd.x, innerEnd.y,
    "Z",
  ].join(" ");
}

/* ------------------------------------------------------------------ */
/*  LESSON PLAN TEXT BUILDER                                           */
/* ------------------------------------------------------------------ */

function buildLessonPlan(week, weekIdx, day, dayIdx) {
  const timing = DAY_TYPE_TIMING[day.type];
  const walt = waltFor(day.type, week.focus);
  return {
    overview: `A ${DAY_TYPE_LABEL[day.type].toLowerCase()} session exploring ${week.focus.toLowerCase()} through "${day.title}". Part of Week ${weekIdx + 1}: ${week.title}.`,
    walt,
    ao: week.ao,
    strand: week.strand,
    competencies: [
      "Managing Self — persevering and managing materials/time during open-ended exploration.",
      "Relating to Others — sharing ideas and giving/receiving feedback.",
      "Thinking — experimenting and making creative decisions.",
    ],
    resources: day.resources,
    structure: timing.map(([label, mins], i) => ({
      label,
      mins,
      body:
        i === 0
          ? `Hook the class with a visual example, model the day's vocabulary, and set up: "${day.activity}"`
          : timing.length - 1 === i
          ? "Students share one thing they explored or enjoyed; check vocabulary; save work to the portfolio."
          : day.activity,
    })),
    assessment: {
      formative: `Observe engagement, material choices, and use of ${week.focus.toLowerCase()}-related vocabulary.`,
      summative: `Student work and comments show understanding of ${week.focus.toLowerCase()} appropriate to Level 3.`,
      reflection: "Self and peer reflection: \u201CWhat did you try today, and what would you try differently next time?\u201D",
    },
    extension: `Challenge confident students to combine ${week.focus.toLowerCase()} with a concept from an earlier week, or to research/reference a NZ or M\u0101ori art example that uses it.`,
    notes: "Draft preview — this plan auto-fills from the term map. Full day-by-day detail will be finalised when this week is built out in the app.",
  };
}

/* ------------------------------------------------------------------ */
/*  STORAGE HELPERS                                                    */
/* ------------------------------------------------------------------ */

async function loadProgress() {
  try {
    const res = await window.storage.get("art-explorer-progress", false);
    if (res && res.value) return JSON.parse(res.value);
  } catch (e) {
    /* no saved progress yet */
  }
  return {};
}

async function saveProgress(progress) {
  try {
    await window.storage.set("art-explorer-progress", JSON.stringify(progress), false);
  } catch (e) {
    console.error("Could not save progress", e);
  }
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

function ArtExplorerTermMap() {
  const [view, setView] = useState("map"); // 'map' | 'week'
  const [weekIdx, setWeekIdx] = useState(0);
  const [selectedDayIdx, setSelectedDayIdx] = useState(null);
  const [teacherMode, setTeacherMode] = useState(false);
  const [lessonPlanOpen, setLessonPlanOpen] = useState(false);
  const [completed, setCompleted] = useState({});
  const [loaded, setLoaded] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    loadProgress().then((p) => {
      setCompleted(p);
      setLoaded(true);
    });
  }, []);

  function toggleComplete(id) {
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      saveProgress(next);
      return next;
    });
  }

  const totalComplete = Object.values(completed).filter(Boolean).length;
  const totalDays = WEEKS.length * 5;

  function isWeekComplete(w) {
    return [0, 1, 2, 3, 4].every((d) => completed[dayId(w, d)]);
  }
  function weekCompletedCount(w) {
    return [0, 1, 2, 3, 4].filter((d) => completed[dayId(w, d)]).length;
  }
  function isWeekUnlocked(w) {
    if (teacherMode) return true;
    if (w === 0) return true;
    return isWeekComplete(w - 1);
  }
  function isDayUnlocked(w, d) {
    if (teacherMode) return true;
    if (d === 0) return isWeekUnlocked(w);
    return completed[dayId(w, d - 1)] || false;
  }

  const activeWeek = WEEKS[weekIdx];
  const activeDay = selectedDayIdx !== null ? activeWeek.days[selectedDayIdx] : null;
  const activeHue = hueFor(weekIdx);

  return (
    <div className="ae-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=DM+Sans:wght@400;500;700&display=swap');

        .ae-root {
          --paper: #fdf8ef;
          --ink: #201b3d;
          --ink-soft: #6c6390;
          --panel: #fffdf9;
          --line: rgba(32,27,61,0.12);
          --pop-red: #ef5b3d;
          --pop-yellow: #f7b418;
          --pop-teal: #14a893;
          --pop-blue: #3f66e8;
          --pop-purple: #8b5cf6;
          font-family: 'DM Sans', sans-serif;
          color: var(--ink);
          background: var(--paper);
          position: relative;
          overflow: hidden;
          min-height: 100%;
          padding: 28px 20px 60px;
          box-sizing: border-box;
        }
        .ae-root * { box-sizing: border-box; }
        .ae-display { font-family: 'Fraunces', serif; }

        /* ---- painterly animated wash ---- */
        .ae-wash { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
        .ae-blob {
          position: absolute; border-radius: 50%; filter: blur(70px); mix-blend-mode: multiply; opacity: 0.5;
          will-change: transform;
        }
        .ae-blob-1 {
          width: 46vw; height: 46vw; top: -14%; left: -10%;
          background: radial-gradient(circle, var(--pop-red), transparent 70%);
          animation: ae-drift-a 11s ease-in-out infinite;
        }
        .ae-blob-2 {
          width: 40vw; height: 40vw; top: -12%; right: -8%;
          background: radial-gradient(circle, var(--pop-yellow), transparent 70%);
          animation: ae-drift-b 13s ease-in-out infinite;
        }
        .ae-blob-3 {
          width: 48vw; height: 48vw; bottom: -18%; right: -12%;
          background: radial-gradient(circle, var(--pop-blue), transparent 70%);
          animation: ae-drift-c 15s ease-in-out infinite;
        }
        .ae-blob-4 {
          width: 42vw; height: 42vw; bottom: -16%; left: -10%;
          background: radial-gradient(circle, var(--pop-teal), transparent 70%);
          animation: ae-drift-d 14s ease-in-out infinite;
        }
        .ae-blob-5 {
          width: 30vw; height: 30vw; top: 32%; left: 38%;
          background: radial-gradient(circle, var(--pop-purple), transparent 70%);
          opacity: 0.28;
          transform: translate(-50%, -50%);
          animation: ae-drift-e 17s ease-in-out infinite;
        }
        .ae-grain {
          position: absolute; inset: -20%; z-index: 1; pointer-events: none; opacity: 0.05;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        }

        @keyframes ae-drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10%, 12%) scale(1.1); }
          66% { transform: translate(-7%, 15%) scale(0.94); }
        }
        @keyframes ae-drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-13%, 9%) scale(0.92); }
          75% { transform: translate(-5%, -10%) scale(1.08); }
        }
        @keyframes ae-drift-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35% { transform: translate(-11%, -12%) scale(1.1); }
          70% { transform: translate(8%, -6%) scale(0.93); }
        }
        @keyframes ae-drift-d {
          0%, 100% { transform: translate(0, 0) scale(1); }
          30% { transform: translate(11%, -9%) scale(0.93); }
          65% { transform: translate(6%, 11%) scale(1.08); }
        }
        @keyframes ae-drift-e {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-38%, -60%) scale(1.2); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ae-blob { animation: none !important; }
        }

        .ae-header, .ae-progress-bar-wrap, .ae-wheel-wrap, .ae-week-wrap { position: relative; z-index: 2; }

        .ae-header {
          max-width: 1100px;
          margin: 0 auto 22px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .ae-title { font-size: clamp(28px, 4vw, 40px); font-weight: 700; line-height: 1.05; margin: 0; }
        .ae-subtitle { color: var(--ink-soft); margin-top: 6px; font-size: 15px; }

        .ae-toggle-wrap { display: flex; align-items: center; gap: 10px; }
        .ae-toggle-label { font-size: 13px; color: var(--ink-soft); font-weight: 500; }
        .ae-tube {
          width: 58px; height: 30px; border-radius: 999px; border: 2px solid var(--ink);
          background: var(--panel); position: relative; cursor: pointer; padding: 0; flex-shrink: 0;
          transition: background 0.2s ease;
        }
        .ae-tube[data-on="true"] { background: var(--pop-purple); border-color: var(--pop-purple); }
        .ae-tube-dot {
          position: absolute; top: 2px; left: 2px; width: 22px; height: 22px; border-radius: 999px;
          background: var(--ink); transition: transform 0.2s ease;
        }
        .ae-tube[data-on="true"] .ae-tube-dot { transform: translateX(28px); background: #fff; }

        .ae-progress-bar-wrap { max-width: 1100px; margin: 0 auto 26px; }
        .ae-progress-track { height: 9px; border-radius: 999px; background: var(--line); overflow: hidden; }
        .ae-progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--pop-red), var(--pop-yellow), var(--pop-teal), var(--pop-blue), var(--pop-purple)); transition: width 0.4s ease; }
        .ae-progress-text { font-size: 12.5px; color: var(--ink-soft); margin-top: 6px; }

        /* ---- MAP VIEW: COLOUR WHEEL ---- */
        .ae-wheel-wrap { max-width: 720px; margin: 0 auto; position: relative; }
        .ae-wheel-svg { width: 100%; height: auto; display: block; overflow: visible; }

        .ae-wedge { cursor: pointer; }
        .ae-wedge-inner {
          transform-box: fill-box;
          transform-origin: center;
          transition: transform 0.18s ease, filter 0.18s ease;
          filter: drop-shadow(0 3px 7px rgba(32,27,61,0.22));
        }
        .ae-wedge:hover .ae-wedge-inner {
          transform: translate(var(--tx, 0px), var(--ty, 0px)) scale(1.035);
          filter: drop-shadow(0 10px 18px rgba(32,27,61,0.32));
        }
        .ae-wedge:focus-visible .ae-wedge-inner { outline: 3px solid var(--ink); outline-offset: 2px; }
        .ae-wedge[data-locked="true"] { cursor: not-allowed; }
        .ae-wedge[data-locked="true"]:hover .ae-wedge-inner { transform: none; filter: drop-shadow(0 3px 6px rgba(32,27,61,0.12)); }

        .ae-wedge-label {
          font-family: 'DM Sans', sans-serif;
          text-align: center;
          line-height: 1.15;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .ae-wedge-week { font-size: 12px; font-weight: 700; opacity: 0.85; letter-spacing: 0.02em; }
        .ae-wedge-focus { font-size: 14.5px; font-weight: 700; margin-top: 1px; }
        .ae-wedge-count {
          font-size: 10.5px; font-weight: 700; margin-top: 5px; padding: 1px 7px; border-radius: 999px;
          background: rgba(255,255,255,0.28);
        }

        .ae-hub {
          filter: drop-shadow(0 4px 14px rgba(32,27,61,0.18));
        }
        .ae-hub-content {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          height: 100%; text-align: center; pointer-events: none;
        }
        .ae-hub-title { font-family: 'Fraunces', serif; font-weight: 700; font-size: 16px; line-height: 1.1; }
        .ae-hub-frac { font-size: 12.5px; color: var(--ink-soft); font-weight: 600; margin-top: 3px; }

        /* ---- WEEK VIEW ---- */

        .ae-week-wrap { max-width: 900px; margin: 0 auto; }
        .ae-back-btn {
          display: inline-flex; align-items: center; gap: 6px; background: none; border: none;
          color: var(--ink); font-size: 14px; font-weight: 600; cursor: pointer; padding: 6px 0; margin-bottom: 18px;
        }
        .ae-week-banner {
          border-radius: 20px; padding: 22px 26px; margin-bottom: 28px;
          border: 1px solid var(--line);
        }
        .ae-week-eyebrow { font-size: 12.5px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; opacity: 0.75; }
        .ae-week-title { font-size: clamp(22px, 3vw, 30px); font-weight: 700; margin: 4px 0 8px; }
        .ae-week-ao { font-size: 14px; opacity: 0.85; max-width: 60ch; }

        .ae-trail {
          display: flex; align-items: flex-end; justify-content: space-between; gap: 8px;
          position: relative; padding: 10px 4px 0;
        }
        .ae-trail::before {
          content: ''; position: absolute; left: 6%; right: 6%; top: 44px; height: 3px;
          background: repeating-linear-gradient(90deg, var(--line) 0 10px, transparent 10px 18px);
          z-index: 0;
        }
        .ae-stone {
          position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; align-items: center;
          background: none; border: none; cursor: pointer; padding: 0; font-family: inherit;
        }
        .ae-stone[data-locked="true"] { cursor: not-allowed; }
        .ae-stone-dab {
          width: 64px; height: 64px; border-radius: 50%; border: 3px solid var(--ink);
          display: flex; align-items: center; justify-content: center; margin-bottom: 10px;
          transition: transform 0.18s ease, box-shadow 0.18s ease; position: relative;
        }
        .ae-stone:not([data-locked="true"]):hover .ae-stone-dab {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 6px 16px rgba(32,27,61,0.22);
        }
        .ae-stone-title { font-size: 12.5px; font-weight: 600; text-align: center; max-width: 110px; line-height: 1.25; margin-top: 2px; }
        .ae-check-badge {
          position: absolute; bottom: -4px; right: -4px; width: 22px; height: 22px; border-radius: 50%;
          background: #2f8f6e; border: 2px solid var(--paper); display: flex; align-items: center; justify-content: center;
        }

        /* ---- DAY DETAIL PANEL ---- */
        .ae-day-panel {
          margin-top: 30px; background: var(--panel); border: 1px solid var(--line); border-radius: 20px;
          padding: 26px; animation: ae-rise 0.25s ease;
        }
        @keyframes ae-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .ae-day-eyebrow { font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; }
        .ae-day-title { font-size: clamp(20px, 2.6vw, 26px); font-weight: 700; margin: 6px 0 14px; }
        .ae-walt-list { margin: 0 0 16px; padding-left: 20px; font-size: 14.5px; line-height: 1.6; }
        .ae-activity { font-size: 14.5px; line-height: 1.6; color: var(--ink-soft); max-width: 68ch; margin-bottom: 20px; }
        .ae-day-actions { display: flex; flex-wrap: wrap; gap: 10px; }
        .ae-btn {
          display: inline-flex; align-items: center; gap: 7px; font-size: 13.5px; font-weight: 700;
          padding: 10px 16px; border-radius: 999px; border: 2px solid var(--ink); background: none; cursor: pointer;
          font-family: inherit; color: var(--ink);
          transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
        }
        .ae-btn:hover { background: var(--ink); color: var(--paper); transform: translateY(-2px); box-shadow: 0 6px 14px rgba(32,27,61,0.2); }
        .ae-btn[data-active="true"] { background: var(--pop-teal); border-color: var(--pop-teal); color: #fff; }
        .ae-btn[data-active="true"]:hover { background: var(--pop-teal); box-shadow: 0 6px 14px rgba(20,168,147,0.35); }
        .ae-btn-solid { background: var(--pop-purple); border-color: var(--pop-purple); color: #fff; }
        .ae-btn-solid:hover { background: var(--pop-purple); opacity: 0.9; box-shadow: 0 6px 14px rgba(139,92,246,0.35); }

        /* ---- LESSON PLAN MODAL ---- */
        .ae-modal-overlay {
          position: fixed; inset: 0; background: rgba(20,18,15,0.55); display: flex; align-items: center;
          justify-content: center; z-index: 50; padding: 20px; backdrop-filter: blur(2px);
        }
        .ae-modal {
          background: var(--panel); border-radius: 18px; max-width: 640px; width: 100%; max-height: 86vh;
          overflow-y: auto; padding: 30px 32px; position: relative; animation: ae-rise 0.2s ease;
        }
        .ae-modal-close {
          position: absolute; top: 18px; right: 18px; background: none; border: none; cursor: pointer;
          color: var(--ink-soft); padding: 4px;
        }
        .ae-modal h2.ae-display { font-size: 22px; margin: 0 0 2px; padding-right: 30px; }
        .ae-modal .ae-modal-kicker { font-size: 12.5px; color: var(--ink-soft); margin-bottom: 18px; }
        .ae-modal-section { margin-bottom: 18px; }
        .ae-modal-section h3 {
          font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;
          color: var(--ink-soft); margin: 0 0 8px;
        }
        .ae-modal-section p, .ae-modal-section li { font-size: 14px; line-height: 1.6; }
        .ae-modal-section ul { margin: 0; padding-left: 18px; }
        .ae-struct-row { display: flex; gap: 10px; margin-bottom: 10px; }
        .ae-struct-min {
          flex-shrink: 0; font-size: 12px; font-weight: 700; background: var(--paper); border: 1px solid var(--line);
          border-radius: 8px; padding: 4px 8px; height: fit-content;
        }
        .ae-draft-note {
          font-size: 12.5px; color: var(--ink-soft); border-top: 1px dashed var(--line); padding-top: 12px; margin-top: 4px;
          display: flex; gap: 8px; align-items: flex-start;
        }

        @media (max-width: 640px) {
          .ae-trail { flex-wrap: wrap; }
          .ae-trail::before { display: none; }
          .ae-stone { flex: 1 1 30%; }
        }
      `}</style>

      {/* ---------------- ANIMATED PAINTERLY WASH ---------------- */}
      <div className="ae-wash" aria-hidden="true">
        <div className="ae-blob ae-blob-1" />
        <div className="ae-blob ae-blob-2" />
        <div className="ae-blob ae-blob-3" />
        <div className="ae-blob ae-blob-4" />
        <div className="ae-blob ae-blob-5" />
      </div>
      <div className="ae-grain" aria-hidden="true" />

      {/* ---------------- HEADER ---------------- */}
      <div className="ae-header">
        <div>
          <h1 className="ae-title ae-display">
            Art Explorer <Paintbrush2 size={26} style={{ display: "inline", verticalAlign: "-2px", marginLeft: 4 }} />
          </h1>
          <p className="ae-subtitle">Elements of Art &amp; Principles of Design · Term Map · Year 5–6</p>
        </div>
        <div className="ae-toggle-wrap">
          <span className="ae-toggle-label">Teacher Mode</span>
          <button
            className="ae-tube"
            data-on={teacherMode}
            onClick={() => setTeacherMode((v) => !v)}
            aria-pressed={teacherMode}
            aria-label="Toggle teacher mode"
          >
            <span className="ae-tube-dot" />
          </button>
        </div>
      </div>

      <div className="ae-progress-bar-wrap">
        <div className="ae-progress-track">
          <div className="ae-progress-fill" style={{ width: `${(totalComplete / totalDays) * 100}%` }} />
        </div>
        <div className="ae-progress-text">
          {loaded ? `${totalComplete} of ${totalDays} lessons complete` : "Loading progress…"}
        </div>
      </div>

      {/* ---------------- MAP VIEW: COLOUR WHEEL ---------------- */}
      {view === "map" && (
        <div className="ae-wheel-wrap">
          <svg ref={mapRef} className="ae-wheel-svg" viewBox="0 0 1000 1000" role="img" aria-label="Term map: 10 weeks arranged around a colour wheel">
            <defs>
              <radialGradient id="ae-sheen" cx="38%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {(() => {
              const cx = 500, cy = 500, innerR = 175, outerR = 460, gap = 1.6;
              return WEEKS.map((w, i) => {
                const rawStart = i * 36;
                const rawEnd = (i + 1) * 36;
                const start = rawStart + gap;
                const end = rawEnd - gap;
                const mid = (rawStart + rawEnd) / 2;
                const hue = hueFor(i);
                const unlocked = isWeekUnlocked(i);
                const doneCount = weekCompletedCount(i);
                const complete = doneCount === 5;
                const fill = unlocked ? `hsl(${hue} 82% 56%)` : `hsl(${hue} 40% 87%)`;
                const path = describeDonutSegment(cx, cy, innerR, outerR, start, end);
                const labelR = (innerR + outerR) / 2;
                const labelPos = polarToCartesian(cx, cy, labelR, mid);
                const dir = polarToCartesian(0, 0, 1, mid);
                const badgePos = polarToCartesian(cx, cy, outerR - 32, mid);

                return (
                  <g
                    key={i}
                    className="ae-wedge"
                    data-locked={!unlocked}
                    style={{ "--tx": `${dir.x * 22}px`, "--ty": `${dir.y * 22}px` }}
                    tabIndex={unlocked ? 0 : -1}
                    role="button"
                    aria-label={`Week ${i + 1}: ${w.title}${unlocked ? "" : " (locked)"}`}
                    onClick={() => {
                      if (!unlocked) return;
                      setWeekIdx(i);
                      setSelectedDayIdx(null);
                      setView("week");
                    }}
                    onKeyDown={(e) => {
                      if ((e.key === "Enter" || e.key === " ") && unlocked) {
                        setWeekIdx(i);
                        setSelectedDayIdx(null);
                        setView("week");
                      }
                    }}
                  >
                    <g className="ae-wedge-inner">
                      <path
                        d={path}
                        fill={fill}
                        stroke={complete ? "#f7b418" : "var(--paper)"}
                        strokeWidth={complete ? 6 : 4}
                        strokeLinejoin="round"
                      />
                      <path d={path} fill="url(#ae-sheen)" />
                      {!unlocked && (
                        <foreignObject x={labelPos.x - 12} y={labelPos.y - 34} width="24" height="24">
                          <Lock size={22} color="var(--ink-soft)" />
                        </foreignObject>
                      )}
                      <foreignObject x={labelPos.x - 75} y={labelPos.y - (unlocked ? 30 : 6)} width="150" height="70">
                        <div className="ae-wedge-label">
                          {unlocked && <div className="ae-wedge-week" style={{ color: "#fff" }}>WEEK {i + 1}</div>}
                          <div className="ae-wedge-focus" style={{ color: unlocked ? "#fff" : "var(--ink-soft)" }}>
                            {splitFocusLabel(w.focus).map((line, li) => (
                              <div key={li}>{line}</div>
                            ))}
                          </div>
                          {unlocked && <div className="ae-wedge-count" style={{ color: "#fff" }}>{doneCount}/5</div>}
                        </div>
                      </foreignObject>
                      {complete && (
                        <foreignObject x={badgePos.x - 13} y={badgePos.y - 13} width="26" height="26">
                          <div
                            style={{
                              width: 26, height: 26, borderRadius: "50%", background: "#f7b418",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              border: "2px solid var(--paper)",
                            }}
                          >
                            <Check size={14} color="#221b3d" strokeWidth={3} />
                          </div>
                        </foreignObject>
                      )}
                    </g>
                  </g>
                );
              });
            })()}

            {/* ---- centre hub: overall progress ---- */}
            <g className="ae-hub">
              <circle cx="500" cy="500" r="161" fill="var(--panel)" stroke="var(--line)" strokeWidth="2" />
              <circle
                cx="500" cy="500" r="171" fill="none" stroke="var(--line)" strokeWidth="10"
              />
              <circle
                cx="500" cy="500" r="171" fill="none" stroke="var(--pop-teal)" strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 171}`}
                strokeDashoffset={`${2 * Math.PI * 171 * (1 - totalComplete / totalDays)}`}
                transform="rotate(-90 500 500)"
                style={{ transition: "stroke-dashoffset 0.5s ease" }}
              />
              <foreignObject x="360" y="420" width="280" height="160">
                <div className="ae-hub-content">
                  <Paintbrush2 size={26} color="var(--ink)" />
                  <div className="ae-hub-title">Art Explorer</div>
                  <div className="ae-hub-frac">{totalComplete}/{totalDays} lessons</div>
                </div>
              </foreignObject>
            </g>
          </svg>
          <p style={{ textAlign: "center", color: "var(--ink-soft)", fontSize: 13, marginTop: 10 }}>
            {teacherMode
              ? "Teacher Mode: every week is unlocked for planning ahead."
              : "Complete a week to unlock the next one."}
          </p>
        </div>
      )}

      {/* ---------------- WEEK VIEW ---------------- */}
      {view === "week" && (
        <div className="ae-week-wrap">
          <button
            className="ae-back-btn"
            onClick={() => {
              setView("map");
              setSelectedDayIdx(null);
            }}
          >
            <ArrowLeft size={16} /> Back to term map
          </button>

          <div
            className="ae-week-banner"
            style={{ background: `hsl(${activeHue} 60% 93%)` }}
          >
            <div className="ae-week-eyebrow">Week {weekIdx + 1} of {WEEKS.length}</div>
            <div className="ae-week-title ae-display">{activeWeek.title}</div>
            <div className="ae-week-ao">{activeWeek.ao}</div>
          </div>

          <div className="ae-trail">
            {activeWeek.days.map((d, i) => {
              const id = dayId(weekIdx, i);
              const unlocked = isDayUnlocked(weekIdx, i);
              const done = !!completed[id];
              const selected = selectedDayIdx === i;
              return (
                <button
                  key={i}
                  className="ae-stone"
                  data-locked={!unlocked}
                  onClick={() => unlocked && setSelectedDayIdx(i)}
                  aria-label={`${DAY_NAMES[i]}: ${d.title}${unlocked ? "" : " (locked)"}`}
                >
                  <div
                    className="ae-stone-dab"
                    style={{
                      background: unlocked ? `hsl(${activeHue} 68% ${selected ? 50 : 88}%)` : "#e5e0d4",
                      borderColor: selected ? "var(--ink)" : unlocked ? "var(--line)" : "var(--line)",
                    }}
                  >
                    {!unlocked ? (
                      <Lock size={18} color="#a39c8c" />
                    ) : (
                      <span style={{ fontSize: 12, fontWeight: 700, color: selected ? "#fff" : "var(--ink)" }}>
                        {DAY_NAMES[i]}
                      </span>
                    )}
                    {done && (
                      <span className="ae-check-badge">
                        <Check size={13} color="#fff" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <div className="ae-stone-title">{d.title}</div>
                </button>
              );
            })}
          </div>

          {activeDay && (
            <div className="ae-day-panel">
              <div className="ae-day-eyebrow" style={{ color: `hsl(${activeHue} 55% 40%)` }}>
                {DAY_NAMES[selectedDayIdx]} · {DAY_TYPE_LABEL[activeDay.type]}
              </div>
              <div className="ae-day-title ae-display">{activeDay.title}</div>
              <ul className="ae-walt-list">
                {waltFor(activeDay.type, activeWeek.focus).map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
              <p className="ae-activity">{activeDay.activity}</p>
              <div className="ae-day-actions">
                <button
                  className="ae-btn"
                  data-active={!!completed[dayId(weekIdx, selectedDayIdx)]}
                  onClick={() => toggleComplete(dayId(weekIdx, selectedDayIdx))}
                >
                  <Check size={15} />
                  {completed[dayId(weekIdx, selectedDayIdx)] ? "Marked complete" : "Mark complete"}
                </button>
                {teacherMode && (
                  <button className="ae-btn ae-btn-solid" onClick={() => setLessonPlanOpen(true)}>
                    <ClipboardList size={15} /> Lesson Plan
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------------- LESSON PLAN MODAL ---------------- */}
      {lessonPlanOpen && activeDay && (
        <div className="ae-modal-overlay" onClick={() => setLessonPlanOpen(false)}>
          <div className="ae-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ae-modal-close" onClick={() => setLessonPlanOpen(false)} aria-label="Close lesson plan">
              <X size={20} />
            </button>
            {(() => {
              const plan = buildLessonPlan(activeWeek, weekIdx, activeDay, selectedDayIdx);
              return (
                <>
                  <h2 className="ae-display">{activeDay.title}</h2>
                  <div className="ae-modal-kicker">
                    Week {weekIdx + 1}, {DAY_NAMES[selectedDayIdx]} · {DAY_TYPE_LABEL[activeDay.type]}
                  </div>

                  <div className="ae-modal-section">
                    <h3>Overview</h3>
                    <p>{plan.overview}</p>
                  </div>

                  <div className="ae-modal-section">
                    <h3>Learning Objectives (WALT)</h3>
                    <ul>
                      {plan.walt.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="ae-modal-section">
                    <h3>Curriculum Links</h3>
                    <p>
                      <strong>The Arts – Visual Arts (Level 3)</strong>
                      <br />
                      Achievement Objective: {plan.ao}
                      <br />
                      Strand: {plan.strand}
                    </p>
                    <ul>
                      {plan.competencies.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="ae-modal-section">
                    <h3>Resources Needed</h3>
                    <p>{plan.resources}</p>
                  </div>

                  <div className="ae-modal-section">
                    <h3>Lesson Plan Structure</h3>
                    {plan.structure.map((s, i) => (
                      <div className="ae-struct-row" key={i}>
                        <span className="ae-struct-min">{s.mins} min</span>
                        <p style={{ margin: 0 }}>
                          <strong>{s.label}</strong>
                          <br />
                          {s.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="ae-modal-section">
                    <h3>Assessment</h3>
                    <p>
                      <strong>Formative:</strong> {plan.assessment.formative}
                      <br />
                      <strong>Summative:</strong> {plan.assessment.summative}
                      <br />
                      {plan.assessment.reflection}
                    </p>
                  </div>

                  <div className="ae-modal-section">
                    <h3>Extension for Advanced Learners</h3>
                    <p>{plan.extension}</p>
                  </div>

                  <div className="ae-draft-note">
                    <Sparkles size={15} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{plan.notes}</span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

  window.ArtExplorerTermMap = ArtExplorerTermMap;
})();
