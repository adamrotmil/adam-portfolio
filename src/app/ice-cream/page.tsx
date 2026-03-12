"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Flavor = {
  name: string;
  colors: [string, string, string]; // light, mid, dark
  emoji: string;
};

type Topping = {
  name: string;
  emoji: string;
};

type GamePhase = "menu" | "playing" | "result";

type Customer = {
  id: number;
  name: string;
  spriteIdx: number;
  order: Flavor[];
  toppings: Topping[];
  x: number;
  targetX: number;
  state: "walking-in" | "waiting" | "served" | "walking-out";
  reaction: string;
  waitTicks: number;
};

// ── Constants ──────────────────────────────────────────────────────────────────
const FLAVORS: Flavor[] = [
  { name: "Vanilla",    colors: ["#FFF8DC", "#F5E6B8", "#D4C090"], emoji: "\u{1F366}" },
  { name: "Chocolate",  colors: ["#8B5E3C", "#5C2E0E", "#3D1A00"], emoji: "\u{1F36B}" },
  { name: "Strawberry", colors: ["#FFB0CB", "#FF7EA8", "#D4567A"], emoji: "\u{1F353}" },
  { name: "Mint",       colors: ["#B8FFE0", "#8EEDC7", "#5CC49A"], emoji: "\u{1F33F}" },
  { name: "Blueberry",  colors: ["#A5B5F0", "#7B8FD4", "#4E5FA0"], emoji: "\u{1FAD0}" },
  { name: "Mango",      colors: ["#FFD470", "#FFB830", "#D48E00"], emoji: "\u{1F96D}" },
];

const TOPPINGS: Topping[] = [
  { name: "Sprinkles",     emoji: "\u2728" },
  { name: "Cherry",        emoji: "\u{1F352}" },
  { name: "Whipped Cream", emoji: "\u2601\uFE0F" },
  { name: "Hot Fudge",     emoji: "\u{1F36B}" },
  { name: "Gummy Bears",   emoji: "\u{1F43B}" },
];

const CUSTOMER_NAMES = [
  "Timmy", "Sarah", "Marco", "Rose", "Lola",
  "Jake", "Zoe", "Oliver", "Luna", "Mia",
];

const NUDGES = ["...", "~", "hmm", "\u266A", "\u2764\uFE0F", "!", "yay~"];
const HAPPY_REACTIONS = ["YAY!", "\u2764\uFE0F", "TYSM!", "WOW!", "\u2728"];

const PX = 4; // pixel scale
const W = 128; // game viewport width in "pixels"
const H = 112; // game viewport height in "pixels"
const CANVAS_W = W * PX; // 512
const CANVAS_H = H * PX; // 448

// Tamagotchi-style blob palettes (body color, accent, eye color)
const TAMA_PALETTES = [
  { body: "#FFE066", accent: "#FFD700", eyes: "#1A1A2E" },  // Yellow Mametchi-style
  { body: "#87CEEB", accent: "#5BB5E0", eyes: "#1A1A2E" },  // Blue
  { body: "#FFB0CB", accent: "#FF85A2", eyes: "#1A1A2E" },  // Pink
  { body: "#B8FFE0", accent: "#8EEDC7", eyes: "#1A1A2E" },  // Mint green
  { body: "#FFD4A0", accent: "#FFB870", eyes: "#2C1B0E" },  // Orange
  { body: "#DDA0DD", accent: "#CC80CC", eyes: "#1A1A2E" },  // Purple
  { body: "#FFFFFF", accent: "#E0E0E0", eyes: "#333" },      // White
  { body: "#FF8C69", accent: "#FF6B4A", eyes: "#1A1A2E" },  // Coral
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOrder(level: number): Flavor[] {
  const count = Math.min(1 + Math.floor((level + 1) / 2), 4);
  return Array.from({ length: count }, () => pick(FLAVORS));
}

function generateToppings(level: number): Topping[] {
  if (level < 2) return [];
  if (Math.random() > 0.5) return [];
  const count = Math.min(1 + Math.floor(level / 3), 2);
  const chosen: Topping[] = [];
  const available = [...TOPPINGS];
  for (let i = 0; i < count && available.length > 0; i++) {
    const idx = Math.floor(Math.random() * available.length);
    chosen.push(available.splice(idx, 1)[0]);
  }
  return chosen;
}

function createCustomer(id: number, level: number): Customer {
  return {
    id,
    name: pick(CUSTOMER_NAMES),
    spriteIdx: Math.floor(Math.random() * TAMA_PALETTES.length),
    order: generateOrder(level),
    toppings: generateToppings(level),
    x: W + 10,
    targetX: 20 + Math.random() * 20,
    state: "walking-in",
    reaction: "",
    waitTicks: 0,
  };
}

// ── Sound helpers (shared AudioContext for mobile compatibility) ──────────────
// Mobile browsers require AudioContext to be created/resumed during a user gesture.
// We create ONE shared context on first interaction and reuse it for all sounds.
let sharedAudioCtx: AudioContext | null = null;
let audioReady = false;

function getAudioCtx(): AudioContext | null {
  if (!audioReady) return null;
  return sharedAudioCtx;
}

// Must be called from a user gesture handler (click/tap). Awaits resume() so
// subsequent getAudioCtx() calls return a fully-running context.
async function initAudio(): Promise<void> {
  try {
    if (!sharedAudioCtx || sharedAudioCtx.state === "closed") {
      sharedAudioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (sharedAudioCtx.state === "suspended") {
      await sharedAudioCtx.resume();
    }
    audioReady = true;
  } catch { /* browser blocked audio */ }
}

function playDing() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.type = "sine"; osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2); gain2.connect(ctx.destination);
    osc2.frequency.setValueAtTime(1600, ctx.currentTime + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);
    gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc2.type = "sine"; osc2.start(ctx.currentTime + 0.1); osc2.stop(ctx.currentTime + 0.5);
  } catch { /* */ }
}

function playBoop() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = "square"; osc.frequency.setValueAtTime(660, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.12);
  } catch { /* */ }
}

function playWrong() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = "square"; osc.frequency.setValueAtTime(180, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.15);
  } catch { /* */ }
}

function playCoinSound() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    // Coin collect jingle - rising arpeggio
    const notes = [880, 1108, 1318, 1760];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "square";
      const t = ctx.currentTime + i * 0.08;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
      osc.start(t); osc.stop(t + 0.15);
    });
  } catch { /* */ }
}

function createMusicContext(): { stop: () => void } | null {
  const audioCtx = getAudioCtx();
  if (!audioCtx) return null;
  const ctx = audioCtx;
  try {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
    masterGain.connect(ctx.destination);
    const notes = [
      523, 587, 659, 698, 784, 698, 659, 587,
      523, 659, 784, 880, 784, 659, 523, 440,
      523, 523, 587, 587, 659, 659, 698, 784,
      880, 784, 698, 659, 587, 523, 440, 523,
    ];
    const dur = 0.22;
    const loopLen = notes.length * dur;
    let stopped = false;
    function scheduleLoop(t: number) {
      if (stopped) return;
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g); g.connect(masterGain);
        osc.type = "square";
        const nt = t + i * dur;
        osc.frequency.setValueAtTime(freq, nt);
        g.gain.setValueAtTime(0, nt);
        g.gain.linearRampToValueAtTime(0.4, nt + 0.02);
        g.gain.linearRampToValueAtTime(0.2, nt + dur * 0.5);
        g.gain.linearRampToValueAtTime(0, nt + dur * 0.95);
        osc.start(nt); osc.stop(nt + dur);
      });
      setTimeout(() => scheduleLoop(t + loopLen), (loopLen - 1) * 1000);
    }
    scheduleLoop(ctx.currentTime + 0.1);
    return {
      stop: () => { stopped = true; masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5); },
    };
  } catch { return null; }
}


// ── Pixel Art Drawing Helpers ─────────────────────────────────────────────────
// All drawing uses a "virtual pixel" grid. 1 virtual pixel = PX screen pixels.
// This gives us that chunky Tamagotchi look.

function px(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x * PX, y * PX, w * PX, h * PX);
}

function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, size: number = 1) {
  ctx.fillStyle = color;
  ctx.font = `bold ${size * 5 * PX}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x * PX, y * PX);
}

// ── Pixel Art Sprites ─────────────────────────────────────────────────────────

function drawBackground(ctx: CanvasRenderingContext2D) {
  // Sky / wall - bright pastel with polka dots like Tamagotchi
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (y < 70) {
        // Wall area - pastel yellow with polka dots
        const isPolka = (x % 10 < 2 && y % 10 < 2);
        px(ctx, x, y, 1, 1, isPolka ? "#FFD36E" : "#FFF4B8");
      } else if (y < 74) {
        // Counter top
        px(ctx, x, y, 1, 1, y === 70 ? "#E8A040" : y === 71 ? "#D49030" : y === 72 ? "#C08020" : "#B07018");
      } else {
        // Floor - pink/green stripes like Tamagotchi
        const stripe = Math.floor(y / 4) % 2;
        px(ctx, x, y, 1, 1, stripe ? "#FFD6E8" : "#C8F7C5");
      }
    }
  }

  // Awning at top - striped pink/white like ice cream shop
  for (let x = 0; x < W; x++) {
    const stripe = Math.floor(x / 6) % 2;
    for (let y = 0; y < 8; y++) {
      px(ctx, x, y, 1, 1, stripe ? "#FF9EBA" : "#FFFFFF");
    }
    // Awning scallop edge
    if (Math.floor(x / 3) % 2 === 0) {
      px(ctx, x, 8, 1, 1, "#FF9EBA");
    }
  }

  // Ice cream tubs on counter (display case)
  const tubY = 63;
  FLAVORS.forEach((f, i) => {
    const tx = 8 + i * 20;
    // Tub container
    for (let dy = 0; dy < 6; dy++) {
      for (let dx = 0; dx < 14; dx++) {
        px(ctx, tx + dx, tubY + dy, 1, 1, "#FFFFFF");
      }
    }
    // Ice cream in tub
    for (let dx = 1; dx < 13; dx++) {
      px(ctx, tx + dx, tubY, 1, 1, f.colors[0]);
      px(ctx, tx + dx, tubY + 1, 1, 1, f.colors[1]);
      px(ctx, tx + dx, tubY + 2, 1, 1, f.colors[1]);
    }
    // Tub border
    for (let dx = 0; dx < 14; dx++) {
      px(ctx, tx + dx, tubY - 1, 1, 1, "#DDD");
      px(ctx, tx + dx, tubY + 6, 1, 1, "#DDD");
    }
  });

  // Door on right side
  const dx = W - 18;
  for (let dy = 20; dy < 70; dy++) {
    for (let ddx = 0; ddx < 14; ddx++) {
      const isBorder = ddx === 0 || ddx === 13 || dy === 20;
      px(ctx, dx + ddx, dy, 1, 1, isBorder ? "#A07020" : "#C09040");
    }
  }
  // Door window
  for (let dy = 24; dy < 38; dy++) {
    for (let ddx = 3; ddx < 11; ddx++) {
      px(ctx, dx + ddx, dy, 1, 1, "#87CEEB");
    }
  }
  // Door handle
  px(ctx, dx + 3, 50, 2, 2, "#FFD700");

  // "OPEN" sign on door
  drawText(ctx, "OPEN", dx + 7, 42, "#FF4444", 0.6);

  // Bell above door
  px(ctx, dx + 7, 17, 2, 2, "#FFD700");
  px(ctx, dx + 7, 19, 1, 1, "#DAA520");
}

function drawCustomerSprite(ctx: CanvasRenderingContext2D, x: number, y: number, paletteIdx: number, walking: boolean, facing: "left" | "right") {
  const pal = TAMA_PALETTES[paletteIdx % TAMA_PALETTES.length];
  const bobY = walking ? Math.floor(Math.sin(Date.now() / 200) * 1.5) : 0;
  const legAnim = walking ? Math.floor(Math.sin(Date.now() / 150) * 1) : 0;

  // Shadow on ground
  px(ctx, x - 5, y + 12, 11, 2, "rgba(0,0,0,0.08)");

  // Tiny feet/legs (Tamagotchi style - very small)
  px(ctx, x - 3, y + 10 + bobY + legAnim, 2, 3, pal.accent);
  px(ctx, x + 2, y + 10 + bobY - legAnim, 2, 3, pal.accent);

  // Round blob body (big oval - the main Tamagotchi shape)
  for (let dy = -10; dy <= 9; dy++) {
    // Ellipse: wider in middle, narrower at top/bottom
    const progress = (dy + 10) / 19;
    const halfW = Math.round(7 * Math.sin(progress * Math.PI));
    if (halfW <= 0) continue;
    for (let dx = -halfW; dx <= halfW; dx++) {
      const isOuterEdge = Math.abs(dx) === halfW;
      px(ctx, x + dx, y + dy + bobY, 1, 1, isOuterEdge ? pal.accent : pal.body);
    }
  }

  // Body highlight (light reflection on upper left)
  for (let dy = -7; dy <= -3; dy++) {
    px(ctx, x - 3, y + dy + bobY, 2, 1, lightenColor(pal.body, 40));
  }

  // Tiny arms (stubby Tamagotchi limbs)
  px(ctx, x - 7, y + 1 + bobY, 2, 2, pal.accent);
  px(ctx, x + 6, y + 1 + bobY, 2, 2, pal.accent);

  // Eyes - big and round (Tamagotchi signature)
  // Left eye
  px(ctx, x - 3, y - 3 + bobY, 3, 3, pal.eyes);
  px(ctx, x - 3, y - 3 + bobY, 1, 1, "#FFF"); // shine
  // Right eye
  px(ctx, x + 2, y - 3 + bobY, 3, 3, pal.eyes);
  px(ctx, x + 2, y - 3 + bobY, 1, 1, "#FFF"); // shine

  // Mouth - small happy curve
  px(ctx, x - 1, y + 2 + bobY, 3, 1, "#E06060");
  px(ctx, x - 2, y + 1 + bobY, 1, 1, "#E06060");
  px(ctx, x + 3, y + 1 + bobY, 1, 1, "#E06060");

  // Cheek blush
  px(ctx, x - 6, y + bobY, 2, 2, "#FFB0B0");
  px(ctx, x + 5, y + bobY, 2, 2, "#FFB0B0");
}

function drawShopkeeper(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const pal = { body: "#90EE90", accent: "#6BC56B", eyes: "#1A1A2E" }; // green shopkeeper

  // Body behind counter (only upper half visible)
  for (let dy = -14; dy <= 0; dy++) {
    const progress = (dy + 14) / 14;
    const halfW = Math.round(6 * Math.sin(progress * Math.PI * 0.7 + 0.3));
    if (halfW <= 0) continue;
    for (let dx = -halfW; dx <= halfW; dx++) {
      const isOuterEdge = Math.abs(dx) === halfW;
      px(ctx, x + dx, y + dy, 1, 1, isOuterEdge ? pal.accent : pal.body);
    }
  }

  // Highlight
  for (let dy = -12; dy <= -9; dy++) {
    px(ctx, x - 3, y + dy, 2, 1, lightenColor(pal.body, 40));
  }

  // Eyes
  px(ctx, x - 3, y - 9, 3, 3, pal.eyes);
  px(ctx, x - 3, y - 9, 1, 1, "#FFF");
  px(ctx, x + 2, y - 9, 3, 3, pal.eyes);
  px(ctx, x + 2, y - 9, 1, 1, "#FFF");

  // Happy mouth
  px(ctx, x - 1, y - 4, 3, 1, "#E06060");
  px(ctx, x - 2, y - 5, 1, 1, "#E06060");
  px(ctx, x + 3, y - 5, 1, 1, "#E06060");

  // Blush
  px(ctx, x - 5, y - 6, 2, 2, "#FFB0B0");
  px(ctx, x + 4, y - 6, 2, 2, "#FFB0B0");

  // Little chef hat
  for (let dx = -4; dx <= 4; dx++) {
    px(ctx, x + dx, y - 15, 1, 1, "#FFFFFF");
    px(ctx, x + dx, y - 16, 1, 1, "#FFFFFF");
  }
  for (let dx = -3; dx <= 3; dx++) {
    px(ctx, x + dx, y - 17, 1, 1, "#FFFFFF");
    px(ctx, x + dx, y - 18, 1, 1, "#FFFFFF");
  }
  // Hat band
  for (let dx = -4; dx <= 4; dx++) {
    px(ctx, x + dx, y - 15, 1, 1, "#FF69B4");
  }

  // Name tag on counter
  const tagW = 22;
  const tagX = x - Math.floor(tagW / 2);
  const tagY = y + 1;
  for (let dx = 0; dx < tagW; dx++) {
    for (let dy = 0; dy < 6; dy++) {
      const isBorder = dy === 0 || dy === 5 || dx === 0 || dx === tagW - 1;
      px(ctx, tagX + dx, tagY + dy, 1, 1, isBorder ? "#333" : "#FFF");
    }
  }
  drawText(ctx, "SCOOPY", x, tagY + 3, "#FF69B4", 0.4);
}

function lightenColor(hex: string, amt: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amt);
  const g = Math.min(255, ((num >> 8) & 0xff) + amt);
  const b = Math.min(255, (num & 0xff) + amt);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function drawCone(ctx: CanvasRenderingContext2D, x: number, y: number, scoops: Flavor[], toppings: Topping[], toppingsDone: number) {
  // Waffle cone
  const coneTop = y;
  const coneBot = y + 16;
  for (let dy = 0; dy <= 16; dy++) {
    const halfW = Math.max(1, Math.floor(6 - dy * 0.3));
    for (let dx = -halfW; dx <= halfW; dx++) {
      const isWaffle = (dx + dy) % 3 === 0;
      px(ctx, x + dx, coneTop + dy, 1, 1, isWaffle ? "#C08830" : "#D4A040");
    }
  }

  // Scoops
  scoops.forEach((scoop, i) => {
    const sy = coneTop - 3 - i * 6;
    for (let dy = -3; dy <= 2; dy++) {
      const halfW = dy <= -2 ? 3 : dy <= 0 ? 5 : 4;
      for (let dx = -halfW; dx <= halfW; dx++) {
        const shade = (dy < -1) ? scoop.colors[0] : (dy < 1) ? scoop.colors[1] : scoop.colors[2];
        px(ctx, x + dx, sy + dy, 1, 1, shade);
      }
    }
    // Highlight pixel
    px(ctx, x - 2, sy - 2, 1, 1, "#FFFFFF");
  });

  // Toppings visible on top scoop
  if (scoops.length > 0) {
    const topY = coneTop - 3 - (scoops.length - 1) * 6;
    for (let ti = 0; ti < toppingsDone; ti++) {
      const topping = toppings[ti];
      if (!topping) continue;
      if (topping.name === "Sprinkles") {
        // Colorful dots
        const sprinkleColors = ["#FF0000", "#00FF00", "#FFFF00", "#FF69B4", "#00BFFF"];
        for (let si = 0; si < 5; si++) {
          const sx = x - 3 + (si * 2);
          const sy2 = topY - 4 + (si % 2);
          px(ctx, sx, sy2, 1, 1, sprinkleColors[si]);
        }
      } else if (topping.name === "Cherry") {
        // Red cherry on top
        px(ctx, x - 1, topY - 5, 3, 3, "#DC143C");
        px(ctx, x, topY - 6, 1, 1, "#228B22"); // stem
        px(ctx, x, topY - 5, 1, 1, "#FF6B6B"); // highlight
      } else if (topping.name === "Whipped Cream") {
        // White dollop
        for (let dx = -3; dx <= 3; dx++) {
          px(ctx, x + dx, topY - 5, 1, 1, "#FFFDF0");
          if (Math.abs(dx) < 3) px(ctx, x + dx, topY - 6, 1, 1, "#FFFFFF");
        }
        px(ctx, x, topY - 7, 1, 1, "#FFFFFF");
      } else if (topping.name === "Hot Fudge") {
        // Dark drizzle lines
        for (let dx = -4; dx <= 4; dx++) {
          px(ctx, x + dx, topY - 4, 1, 1, "#3D1C02");
          if (dx % 2 === 0) px(ctx, x + dx, topY - 3, 1, 1, "#3D1C02");
        }
      } else if (topping.name === "Gummy Bears") {
        // Small colored bears
        const bearColors = ["#FF0000", "#FFD700", "#00CC00"];
        bearColors.forEach((bc, bi) => {
          const bx = x - 3 + bi * 3;
          px(ctx, bx, topY - 5, 2, 2, bc);
          px(ctx, bx, topY - 6, 1, 1, bc); // ears
          px(ctx, bx + 1, topY - 6, 1, 1, bc);
        });
      }
    }
  }
}

function drawSpeechBubble(ctx: CanvasRenderingContext2D, cx: number, cy: number, order: Flavor[], scoopsDone: number, toppings: Topping[], toppingsDone: number, toppingsPhase: boolean, reaction: string) {
  if (reaction) {
    // Big round Tamagotchi-style reaction bubble
    const bw = Math.max(28, reaction.length * 5 + 12);
    const bh = 16;
    const bx = Math.max(1, Math.min(cx - Math.floor(bw / 2), W - bw - 1));
    const by = cy - 20;

    // Rounded bubble with thick border (Tamagotchi style)
    for (let dy = 0; dy < bh; dy++) {
      for (let dx = 0; dx < bw; dx++) {
        // Round corners
        const cornerDist = Math.min(
          Math.sqrt(dx * dx + dy * dy),
          Math.sqrt((bw - 1 - dx) ** 2 + dy * dy),
          Math.sqrt(dx * dx + (bh - 1 - dy) ** 2),
          Math.sqrt((bw - 1 - dx) ** 2 + (bh - 1 - dy) ** 2)
        );
        if (cornerDist < 2.5) continue;
        const isBorder = dy <= 1 || dy >= bh - 2 || dx <= 1 || dx >= bw - 2;
        px(ctx, bx + dx, by + dy, 1, 1, isBorder ? "#333" : "#FFFDE8");
      }
    }
    // Rounded tail
    px(ctx, cx - 1, by + bh, 4, 2, "#333");
    px(ctx, cx, by + bh + 2, 2, 1, "#333");
    px(ctx, cx, by + bh, 2, 2, "#FFFDE8");
    drawText(ctx, reaction, bx + bw / 2, by + bh / 2, "#FF69B4", 0.7);
    return;
  }

  // Large Tamagotchi-style order bubble with scoop circles
  const itemCount = order.length + (toppings.length > 0 ? toppings.length + 1 : 0);
  const bw = Math.max(30, itemCount * 9 + 10);
  const bh = 18;
  const bx = Math.max(1, Math.min(cx - Math.floor(bw / 2), W - bw - 1));
  const by = cy - 24;

  // Rounded bubble background (thick border, warm white fill)
  for (let dy = 0; dy < bh; dy++) {
    for (let dx = 0; dx < bw; dx++) {
      const cornerDist = Math.min(
        Math.sqrt(dx * dx + dy * dy),
        Math.sqrt((bw - 1 - dx) ** 2 + dy * dy),
        Math.sqrt(dx * dx + (bh - 1 - dy) ** 2),
        Math.sqrt((bw - 1 - dx) ** 2 + (bh - 1 - dy) ** 2)
      );
      if (cornerDist < 3) continue;
      const isBorder = dy <= 1 || dy >= bh - 2 || dx <= 1 || dx >= bw - 2;
      px(ctx, bx + dx, by + dy, 1, 1, isBorder ? "#333" : "#FFFDE8");
    }
  }
  // Rounded tail pointing down
  px(ctx, cx - 1, by + bh, 4, 2, "#333");
  px(ctx, cx, by + bh + 2, 2, 1, "#333");
  px(ctx, cx, by + bh, 2, 2, "#FFFDE8");

  // Draw scoop circles in bubble (bigger, 5x5)
  order.forEach((item, i) => {
    const done = i < scoopsDone;
    const isNext = !toppingsPhase && i === scoopsDone;
    const ix = bx + 6 + i * 9;
    const iy = by + 5;

    // Scoop dot (5x5 pixel circle)
    for (let dy = 0; dy < 5; dy++) {
      for (let dx = 0; dx < 5; dx++) {
        const dist = Math.abs(dx - 2) + Math.abs(dy - 2);
        if (dist <= 3) {
          px(ctx, ix + dx, iy + dy, 1, 1, done ? "#CCC" : item.colors[1]);
        }
      }
    }
    if (done) {
      // Checkmark
      px(ctx, ix + 1, iy + 2, 1, 1, "#4CAF50");
      px(ctx, ix + 2, iy + 3, 1, 1, "#4CAF50");
      px(ctx, ix + 3, iy + 2, 1, 1, "#4CAF50");
      px(ctx, ix + 4, iy + 1, 1, 1, "#4CAF50");
    }
    if (isNext) {
      const blink = Math.floor(Date.now() / 300) % 2;
      if (blink) {
        // Blinking highlight border
        for (let dx = -1; dx <= 5; dx++) {
          px(ctx, ix + dx, iy - 1, 1, 1, "#FF69B4");
          px(ctx, ix + dx, iy + 5, 1, 1, "#FF69B4");
        }
        for (let dy = 0; dy < 5; dy++) {
          px(ctx, ix - 1, iy + dy, 1, 1, "#FF69B4");
          px(ctx, ix + 5, iy + dy, 1, 1, "#FF69B4");
        }
      }
    }
  });

  // Topping indicators
  if (toppings.length > 0) {
    const tx = bx + 6 + order.length * 9;
    const ty = by + 4;
    // Separator
    px(ctx, tx - 2, ty, 1, 8, "#DDD");
    px(ctx, tx - 3, ty, 1, 8, "#EEE");

    toppings.forEach((_, ti) => {
      const done = ti < toppingsDone;
      const isNext = toppingsPhase && ti === toppingsDone;
      const tix = tx + 1 + ti * 7;
      // Star shape for toppings
      px(ctx, tix + 1, ty + 1, 3, 3, done ? "#4CAF50" : isNext ? "#FF69B4" : "#DDD");
      px(ctx, tix + 2, ty, 1, 1, done ? "#4CAF50" : isNext ? "#FF69B4" : "#DDD");
      px(ctx, tix + 2, ty + 4, 1, 1, done ? "#4CAF50" : isNext ? "#FF69B4" : "#DDD");
      px(ctx, tix, ty + 2, 1, 1, done ? "#4CAF50" : isNext ? "#FF69B4" : "#DDD");
      px(ctx, tix + 4, ty + 2, 1, 1, done ? "#4CAF50" : isNext ? "#FF69B4" : "#DDD");
      if (isNext) {
        const blink = Math.floor(Date.now() / 300) % 2;
        if (blink) {
          for (let dx = -1; dx <= 5; dx++) {
            px(ctx, tix + dx, ty - 1, 1, 1, "#FF69B4");
            px(ctx, tix + dx, ty + 5, 1, 1, "#FF69B4");
          }
        }
      }
    });
  }
}

// Gold coin drawing helper
function drawGoldCoin(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  // Outer ring
  for (let dy = -size; dy <= size; dy++) {
    for (let dx = -size; dx <= size; dx++) {
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= size) {
        const isEdge = dist > size - 1.5;
        px(ctx, cx + dx, cy + dy, 1, 1, isEdge ? "#B8860B" : "#FFD700");
      }
    }
  }
  // Shine
  px(ctx, cx - 1, cy - 1, 1, 1, "#FFED80");
  // Dollar sign or G in center
  drawText(ctx, "G", cx + 0.5, cy + 0.5, "#B8860B", 0.35);
}


// ── Main Game ──────────────────────────────────────────────────────────────────
export default function IceCreamGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<GamePhase>("menu");
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [customersServed, setCustomersServed] = useState(0);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [scoopsDone, setScoopsDone] = useState(0);
  const [coneScoops, setConeScoops] = useState<Flavor[]>([]);
  const [highScore, setHighScore] = useState(0);
  const [toppingsDone, setToppingsDone] = useState(0);
  const [toppingsPhase, setToppingsPhase] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const customerIdRef = useRef(0);
  const walkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const musicRef = useRef<{ stop: () => void } | null>(null);
  const animFrameRef = useRef<number>(0);
  const [goldCoins, setGoldCoins] = useState<{ x: number; y: number; age: number }[]>([]);
  const [totalGold, setTotalGold] = useState(0);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("scoopstack-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("scoopstack-highscore", score.toString());
    }
  }, [score, highScore]);

  // ── Canvas rendering loop ─────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      drawBackground(ctx);

      // Draw shopkeeper behind counter
      drawShopkeeper(ctx, 64, 70);

      // Draw customer
      const cust = customer;
      if (cust) {
        drawCustomerSprite(
          ctx,
          Math.round(cust.x),
          76,
          cust.spriteIdx,
          cust.state === "walking-in" || cust.state === "walking-out",
          cust.state === "walking-out" ? "right" : "left"
        );

        // Speech bubble
        if (cust.state === "waiting" || cust.state === "served") {
          drawSpeechBubble(
            ctx,
            Math.round(cust.x),
            38,
            cust.order,
            scoopsDone,
            cust.toppings,
            toppingsDone,
            toppingsPhase,
            cust.reaction,
          );

          // Name tag below the character
          const nameW = cust.name.length * 3 + 6;
          const nx = Math.round(cust.x) - Math.floor(nameW / 2);
          const ny = 90;
          for (let dx = 0; dx < nameW; dx++) {
            for (let dy = 0; dy < 6; dy++) {
              const isBorder = dy === 0 || dy === 5 || dx === 0 || dx === nameW - 1;
              px(ctx, nx + dx, ny + dy, 1, 1, isBorder ? "#333" : "#FFFDE8");
            }
          }
          drawText(ctx, cust.name, Math.round(cust.x) + 1, ny + 3, "#FF69B4", 0.4);
        }
      }

      // Draw cone on counter
      if (cust && (cust.state === "waiting" || cust.state === "served")) {
        drawCone(ctx, 100, 52, coneScoops, cust.toppings, toppingsDone);
      }

      // Draw floating gold coins
      goldCoins.forEach((coin) => {
        const floatY = coin.y - coin.age * 0.3;
        const alpha = Math.max(0, 1 - coin.age / 60);
        if (alpha > 0) {
          ctx.globalAlpha = alpha;
          drawGoldCoin(ctx, coin.x, Math.round(floatY), 3);
          ctx.globalAlpha = 1;
        }
      });

      // HUD on canvas
      drawText(ctx, `LV.${level}`, 16, 13, "#FF69B4", 0.65);
      // Gold coin counter instead of pts
      drawGoldCoin(ctx, 52, 12, 2);
      drawText(ctx, `${totalGold}`, 62, 13, "#FFD700", 0.65);

      // Hearts
      const heartX = 105;
      for (let i = 0; i < 3; i++) {
        const served = customersServed >= 0; // always show hearts full (no miss mechanic)
        if (served) {
          px(ctx, heartX + i * 6, 10, 2, 2, "#FF4444");
          px(ctx, heartX + i * 6 + 2, 10, 2, 2, "#FF4444");
          px(ctx, heartX + i * 6 + 1, 12, 2, 2, "#FF4444");
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase, customer, scoopsDone, coneScoops, toppingsDone, toppingsPhase, level, score, customersServed, goldCoins, totalGold]);

  // Walk customer in
  const walkCustomerIn = useCallback((c: Customer) => {
    setCustomer({ ...c });
    playDing();
    if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
    walkIntervalRef.current = setInterval(() => {
      setCustomer((prev) => {
        if (!prev || prev.state !== "walking-in") return prev;
        const newX = prev.x - 1;
        if (newX <= prev.targetX) return { ...prev, x: prev.targetX, state: "waiting" };
        return { ...prev, x: newX };
      });
    }, 30);
  }, []);

  // Walk customer out
  const walkCustomerOut = useCallback(() => {
    if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
    walkIntervalRef.current = setInterval(() => {
      setCustomer((prev) => {
        if (!prev || prev.state !== "walking-out") return prev;
        const newX = prev.x + 1.5;
        if (newX > W + 20) { clearInterval(walkIntervalRef.current!); return null; }
        return { ...prev, x: newX };
      });
    }, 30);
  }, []);

  // Gentle nudges (no timer - customers never leave)
  useEffect(() => {
    if (!customer || customer.state !== "waiting" || phase !== "playing") return;
    const interval = setInterval(() => {
      setCustomer((prev) => {
        if (!prev || prev.state !== "waiting") return prev;
        const newTicks = prev.waitTicks + 1;
        // Every ~5 seconds, show a gentle nudge
        if (newTicks % 50 === 0 && !prev.reaction) {
          return { ...prev, waitTicks: newTicks, reaction: pick(NUDGES) };
        }
        // Clear nudge after 2 seconds
        if (prev.reaction && newTicks % 50 === 20) {
          return { ...prev, waitTicks: newTicks, reaction: "" };
        }
        return { ...prev, waitTicks: newTicks };
      });
    }, 100);
    return () => clearInterval(interval);
  }, [customer?.state, customer?.id, phase]);

  // Walk out after served
  useEffect(() => {
    if (customer?.state === "walking-out") walkCustomerOut();
  }, [customer?.state, walkCustomerOut]);

  // Send next customer
  useEffect(() => {
    if (phase !== "playing") return;
    if (customer === null) {
      const timer = setTimeout(() => {
        customerIdRef.current += 1;
        const c = createCustomer(customerIdRef.current, level);
        setScoopsDone(0);
        setConeScoops([]);
        setToppingsDone(0);
        setToppingsPhase(false);
        walkCustomerIn(c);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [customer, phase, level, walkCustomerIn]);

  // Level up every 3 customers
  useEffect(() => {
    if (customersServed > 0 && customersServed % 3 === 0) {
      setLevel(Math.floor(customersServed / 3) + 1);
    }
  }, [customersServed]);

  // Gold coin animation aging
  useEffect(() => {
    if (goldCoins.length === 0) return;
    const interval = setInterval(() => {
      setGoldCoins((prev) => {
        const updated = prev.map((c) => ({ ...c, age: c.age + 1 })).filter((c) => c.age < 60);
        return updated;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [goldCoins.length]);

  // Complete order
  const completeOrder = useCallback(() => {
    if (!customer) return;
    const coinCount = 1 + customer.order.length + customer.toppings.length;
    setScore((s) => s + 100 + customer.toppings.length * 25);
    setTotalGold((g) => g + coinCount);
    setCustomersServed((c) => c + 1);
    playCoinSound();

    // Spawn floating gold coins around the customer
    const newCoins = Array.from({ length: coinCount }, (_, i) => ({
      x: Math.round(customer.x) - 5 + i * 6,
      y: 70,
      age: 0,
    }));
    setGoldCoins((prev) => [...prev, ...newCoins]);

    setCustomer((prev) => prev ? { ...prev, reaction: `+${coinCount}G!`, state: "served" } : prev);
    setTimeout(() => {
      setCustomer((prev) => prev ? { ...prev, reaction: pick(HAPPY_REACTIONS) } : prev);
    }, 600);
    setTimeout(() => {
      setCustomer((prev) => prev ? { ...prev, state: "walking-out" } : prev);
    }, 1400);
  }, [customer]);

  // Tap a flavor
  const tapFlavor = useCallback(
    (flavor: Flavor) => {
      if (!customer || customer.state !== "waiting" || toppingsPhase) return;
      if (scoopsDone >= customer.order.length) return;

      const expected = customer.order[scoopsDone];
      if (flavor.name === expected.name) {
        playBoop();
        const newScoops = [...coneScoops, flavor];
        setConeScoops(newScoops);
        const newDone = scoopsDone + 1;
        setScoopsDone(newDone);
        if (newDone === customer.order.length) {
          if (customer.toppings.length > 0) {
            setToppingsPhase(true);
          } else {
            completeOrder();
          }
        }
      } else {
        playWrong();
        setCustomer((prev) => prev ? { ...prev, reaction: "Nope!" } : prev);
        setTimeout(() => {
          setCustomer((prev) => prev && prev.state === "waiting" ? { ...prev, reaction: "" } : prev);
        }, 600);
      }
    },
    [customer, scoopsDone, coneScoops, toppingsPhase, completeOrder]
  );

  // Tap a topping
  const tapTopping = useCallback(
    (topping: Topping) => {
      if (!customer || customer.state !== "waiting" || !toppingsPhase) return;
      if (toppingsDone >= customer.toppings.length) return;
      const expected = customer.toppings[toppingsDone];
      if (topping.name === expected.name) {
        playBoop();
        const newDone = toppingsDone + 1;
        setToppingsDone(newDone);
        if (newDone === customer.toppings.length) completeOrder();
      } else {
        playWrong();
        setCustomer((prev) => prev ? { ...prev, reaction: "Nope!" } : prev);
        setTimeout(() => {
          setCustomer((prev) => prev && prev.state === "waiting" ? { ...prev, reaction: "" } : prev);
        }, 600);
      }
    },
    [customer, toppingsPhase, toppingsDone, completeOrder]
  );

  const startGame = useCallback(async () => {
    // Initialize shared audio context on user gesture (critical for mobile)
    await initAudio();
    setLevel(1); setScore(0); setCustomersServed(0); setCustomer(null);
    setScoopsDone(0); setConeScoops([]); setToppingsDone(0); setToppingsPhase(false);
    setGoldCoins([]); setTotalGold(0);
    customerIdRef.current = 0; setPhase("playing");
    if (musicRef.current) musicRef.current.stop();
    musicRef.current = createMusicContext();
    setMusicOn(true);
  }, []);

  const toggleMusic = useCallback(() => {
    if (musicRef.current) { musicRef.current.stop(); musicRef.current = null; setMusicOn(false); }
    else { musicRef.current = createMusicContext(); setMusicOn(true); }
  }, []);

  useEffect(() => {
    return () => {
      if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
      if (musicRef.current) { musicRef.current.stop(); musicRef.current = null; }
    };
  }, []);


  // ── Menu Screen ─────────────────────────────────────────────────────────
  if (phase === "menu") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FFF4B8 0%, #FFD6E8 50%, #C8F7C5 100%)" }}>
        {/* Polka dot overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, #FFD36E 2px, transparent 2px)",
            backgroundSize: "24px 24px",
          }} />

        <div className="relative z-10 text-center">
          {/* Pixel art ice cream icon using CSS pixels */}
          <div className="mx-auto mb-4 flex justify-center">
            <div style={{
              width: 64, height: 96,
              imageRendering: "pixelated",
              background: `
                linear-gradient(to bottom,
                  transparent 0px, transparent 8px,
                  #FFB0CB 8px, #FFB0CB 32px,
                  #FFF5D6 32px, #FFF5D6 48px,
                  #8EEDC7 48px, #8EEDC7 64px,
                  #D4A040 64px, #D4A040 96px
                )
              `,
              borderRadius: "32px 32px 8px 8px",
              border: "4px solid #333",
            }} />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-2"
            style={{
              fontFamily: "monospace",
              color: "#FF69B4",
              textShadow: "3px 3px 0 #FFD6E8, -1px -1px 0 #D4567A",
              letterSpacing: "2px",
            }}>
            SCOOP SHOP
          </h1>
          <p className="text-lg mb-8" style={{ color: "#C44569", fontFamily: "monospace" }}>
            ~ serve scoops, make friends ~
          </p>

          <button onClick={startGame}
            className="font-bold text-xl px-10 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 border-b-4"
            style={{
              fontFamily: "monospace",
              background: "linear-gradient(180deg, #FF9EBA, #FF69B4)",
              borderColor: "#D4567A",
              color: "#FFF",
              boxShadow: "0 4px 0 #C44569, 0 6px 12px rgba(196,69,105,0.3)",
              textShadow: "1px 1px 0 #D4567A",
            }}>
            OPEN SHOP!
          </button>

          <button onClick={() => setShowTutorial(!showTutorial)}
            className="block mx-auto mt-4 text-sm transition-colors"
            style={{ color: "#C44569", fontFamily: "monospace" }}>
            [ how to play ]
          </button>

          {showTutorial && (
            <div className="mt-4 rounded-xl p-5 text-left max-w-xs mx-auto border-2"
              style={{ background: "#FFF", borderColor: "#FFD6E8", fontFamily: "monospace" }}>
              <div className="space-y-2 text-sm" style={{ color: "#666" }}>
                <p>✨ Customers walk in</p>
                <p>🍦 Read their order bubble</p>
                <p>👇 Tap the right flavors</p>
                <p>🍒 Add toppings too!</p>
                <p>🎉 No rush - take your time!</p>
              </div>
            </div>
          )}

          {highScore > 0 && (
            <p className="mt-6 text-sm" style={{ color: "#C44569", fontFamily: "monospace" }}>
              🏆 best: {highScore}pts
            </p>
          )}
        </div>
      </div>
    );
  }

  // ── Result Screen ───────────────────────────────────────────────────────
  if (phase === "result") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{ background: "linear-gradient(180deg, #FFF4B8 0%, #FFD6E8 50%, #C8F7C5 100%)" }}>
        <div className="rounded-2xl p-8 text-center max-w-sm border-4"
          style={{ background: "#FFF", borderColor: "#FF69B4", fontFamily: "monospace" }}>
          <div className="text-5xl mb-3">🍦</div>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#FF69B4" }}>
            CLOSED!
          </h2>
          <div className="rounded-xl p-4 mb-4" style={{ background: "#FFF4B8" }}>
            <div className="text-3xl font-bold" style={{ color: "#FF69B4" }}>{score}</div>
            <div className="text-xs" style={{ color: "#C44569" }}>POINTS</div>
          </div>
          <div className="flex justify-center gap-6 mb-4 text-sm" style={{ color: "#666" }}>
            <div><div className="text-xl font-bold" style={{ color: "#FF69B4" }}>{customersServed}</div>served</div>
            <div><div className="text-xl font-bold" style={{ color: "#FF69B4" }}>{level}</div>level</div>
          </div>
          {score >= highScore && score > 0 && (
            <p className="mb-4 font-bold" style={{ color: "#FFD700" }}>⭐ NEW BEST! ⭐</p>
          )}
          <button onClick={startGame}
            className="w-full font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 border-b-4"
            style={{
              background: "linear-gradient(180deg, #FF9EBA, #FF69B4)",
              borderColor: "#D4567A", color: "#FFF",
              boxShadow: "0 4px 0 #C44569",
            }}>
            PLAY AGAIN
          </button>
        </div>
      </div>
    );
  }

  // ── Playing Screen ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col items-center p-3 select-none"
      style={{ background: "linear-gradient(180deg, #FFF4B8 0%, #FFD6E8 50%, #C8F7C5 100%)" }}>

      {/* Music toggle */}
      <div className="w-full max-w-lg flex justify-end mb-1">
        <button onClick={toggleMusic}
          className="rounded-lg px-3 py-1 text-xs border-2 transition-colors"
          style={{
            fontFamily: "monospace",
            background: "#FFF",
            borderColor: "#FFD6E8",
            color: "#FF69B4",
          }}>
          {musicOn ? "🔊 music" : "🔇 music"}
        </button>
      </div>

      {/* Game Canvas */}
      <div className="rounded-2xl overflow-hidden border-4 mb-3"
        style={{
          borderColor: "#FF69B4",
          boxShadow: "0 6px 0 #C44569, 0 8px 20px rgba(196,69,105,0.2)",
          width: CANVAS_W,
          maxWidth: "100%",
        }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{
            width: "100%",
            height: "auto",
            imageRendering: "pixelated",
            display: "block",
          }}
        />
      </div>

      {/* Order instruction - big readable text below canvas */}
      {customer && customer.state === "waiting" && (
        <div className="w-full max-w-lg rounded-xl p-3 mb-3 text-center border-2"
          style={{ background: "#FFF", borderColor: "#FFD6E8", fontFamily: "monospace" }}>
          {!toppingsPhase && scoopsDone < customer.order.length ? (
            <p className="text-xl font-bold" style={{ color: "#333" }}>
              tap{" "}
              <span className="inline-block px-3 py-1 rounded-lg"
                style={{
                  background: customer.order[scoopsDone]?.colors[1],
                  color: customer.order[scoopsDone]?.name === "Chocolate" || customer.order[scoopsDone]?.name === "Blueberry" ? "#FFF" : "#333",
                }}>
                {customer.order[scoopsDone]?.emoji} {customer.order[scoopsDone]?.name}
              </span>
              <span className="text-sm ml-2" style={{ color: "#AAA" }}>
                ({scoopsDone + 1}/{customer.order.length})
              </span>
            </p>
          ) : toppingsPhase && toppingsDone < customer.toppings.length ? (
            <p className="text-xl font-bold" style={{ color: "#333" }}>
              add{" "}
              <span className="inline-block px-3 py-1 rounded-lg" style={{ background: "#FFD6E8" }}>
                {customer.toppings[toppingsDone]?.emoji} {customer.toppings[toppingsDone]?.name}
              </span>
            </p>
          ) : null}
        </div>
      )}

      {/* Flavor / Topping buttons - pixel-style */}
      <div className="w-full max-w-lg">
        {!toppingsPhase ? (
          <div className="grid grid-cols-3 gap-2">
            {FLAVORS.map((f) => {
              const isNext =
                customer?.state === "waiting" &&
                !toppingsPhase &&
                scoopsDone < (customer?.order.length || 0) &&
                customer?.order[scoopsDone]?.name === f.name;
              return (
                <button key={f.name} onClick={() => tapFlavor(f)}
                  className={`py-3 px-2 rounded-xl font-bold transition-all active:scale-90 border-b-4 ${isNext ? "scale-105" : ""}`}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "14px",
                    background: `linear-gradient(180deg, ${f.colors[0]}, ${f.colors[1]})`,
                    borderBottomColor: f.colors[2],
                    color: f.name === "Chocolate" || f.name === "Blueberry" ? "#FFF" : "#444",
                    boxShadow: isNext
                      ? `0 0 0 3px #FF69B4, 0 4px 0 ${f.colors[2]}`
                      : `0 3px 0 ${f.colors[2]}`,
                  }}>
                  <span className="text-lg block">{f.emoji}</span>
                  {f.name}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {TOPPINGS.map((t) => {
              const isNext =
                customer?.state === "waiting" &&
                toppingsPhase &&
                toppingsDone < (customer?.toppings.length || 0) &&
                customer?.toppings[toppingsDone]?.name === t.name;
              return (
                <button key={t.name} onClick={() => tapTopping(t)}
                  className={`py-3 px-3 rounded-xl font-bold transition-all active:scale-90 border-b-4 ${isNext ? "scale-105" : ""}`}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "14px",
                    background: "linear-gradient(180deg, #FFF, #FFD6E8)",
                    borderBottomColor: "#FF9EBA",
                    color: "#444",
                    boxShadow: isNext
                      ? "0 0 0 3px #FF69B4, 0 4px 0 #FF9EBA"
                      : "0 3px 0 #FF9EBA",
                  }}>
                  <span className="text-lg block">{t.emoji}</span>
                  {t.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
