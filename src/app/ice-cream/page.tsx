"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Flavor = {
  name: string;
  color: string;
  highlight: string;
  emoji: string;
};

type Topping = {
  name: string;
  emoji: string;
  color: string;
};

type GamePhase = "menu" | "playing" | "result";

type Customer = {
  id: number;
  name: string;
  skinTone: string;
  shirtColor: string;
  hairColor: string;
  hat: boolean;
  order: Flavor[];
  toppings: Topping[];
  x: number;
  targetX: number;
  y: number;
  state: "walking-in" | "waiting" | "served" | "walking-out";
  reaction: string;
  patience: number;
  sitting: boolean;
};

// ── Constants ──────────────────────────────────────────────────────────────────
const FLAVORS: Flavor[] = [
  { name: "Vanilla", color: "#FFF8DC", highlight: "#F5E6B8", emoji: "🍦" },
  { name: "Chocolate", color: "#6B3A2A", highlight: "#8B5A3A", emoji: "🍫" },
  { name: "Strawberry", color: "#FF85A2", highlight: "#FF6B8A", emoji: "🍓" },
  { name: "Mint Chip", color: "#98FB98", highlight: "#7AE87A", emoji: "🌿" },
  { name: "Blueberry", color: "#7B8FD4", highlight: "#5B6FB4", emoji: "🫐" },
  { name: "Mango", color: "#FFB347", highlight: "#FFA020", emoji: "🥭" },
];

const CUSTOMER_NAMES = [
  "Timmy", "Sarah", "Marco", "Rose", "DJ Freeze",
  "Lola", "Captain C", "Prof. Swirl", "Tiny Ted", "Big Betty",
  "Mia", "Jake", "Zoe", "Oliver", "Luna",
];

const SKIN_TONES = ["#FFDBB4", "#E8B88A", "#C68642", "#8D5524", "#6B3E26"];
const SHIRT_COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#FF8C69", "#87CEEB"];
const HAIR_COLORS = ["#2C1B0E", "#5C3317", "#8B6914", "#D4A017", "#C04000", "#1A1A2E"];

const TOPPINGS: Topping[] = [
  { name: "Sprinkles", emoji: "✨", color: "#FF69B4" },
  { name: "Cherries", emoji: "🍒", color: "#DC143C" },
  { name: "Whipped Cream", emoji: "☁️", color: "#FFFDD0" },
  { name: "Hot Fudge", emoji: "🍫", color: "#3D1C02" },
  { name: "Gummy Bears", emoji: "🐻", color: "#FF6347" },
];

const REACTIONS = {
  happy: ["Yay!", "Thanks!", "Yummy!", "Perfect!", "Love it!"],
  impatient: ["Hurry!", "Um...", "Hello?", "Waiting..."],
};

const COUNTER_Y = 340;
const FLOOR_Y = 460;
const STORE_WIDTH = 420;

// ── Helpers ────────────────────────────────────────────────────────────────────
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOrder(level: number): Flavor[] {
  const count = Math.min(1 + Math.floor((level + 1) / 2), 6);
  return Array.from({ length: count }, () => pick(FLAVORS));
}

function generateToppings(level: number): Topping[] {
  if (level < 2) return [];
  const chance = Math.min(0.3 + level * 0.1, 0.8);
  if (Math.random() > chance) return [];
  const count = Math.min(1 + Math.floor(level / 3), 3);
  const chosen: Topping[] = [];
  const available = [...TOPPINGS];
  for (let i = 0; i < count && available.length > 0; i++) {
    const idx = Math.floor(Math.random() * available.length);
    chosen.push(available.splice(idx, 1)[0]);
  }
  return chosen;
}

// ── Sound helpers ─────────────────────────────────────────────────────────────
function playDing() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.type = "sine";
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
    // Second ding (higher)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.setValueAtTime(1600, ctx.currentTime + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);
    gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc2.type = "sine";
    osc2.start(ctx.currentTime + 0.1);
    osc2.stop(ctx.currentTime + 0.5);
  } catch { /* audio not available */ }
}

function createMusicContext(): { ctx: AudioContext; stop: () => void } | null {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Fun looping melody - ice cream truck vibes
    const notes = [
      523, 587, 659, 698, 784, 698, 659, 587, // C5 D5 E5 F5 G5 F5 E5 D5
      523, 659, 784, 880, 784, 659, 523, 440, // C5 E5 G5 A5 G5 E5 C5 A4
      523, 523, 587, 587, 659, 659, 698, 784, // repeat pattern
      880, 784, 698, 659, 587, 523, 440, 523, // descending
    ];
    const noteDuration = 0.22;
    const loopLength = notes.length * noteDuration;
    let stopped = false;

    function scheduleLoop(startTime: number) {
      if (stopped) return;
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.connect(noteGain);
        noteGain.connect(masterGain);
        osc.type = "triangle";
        const t = startTime + i * noteDuration;
        osc.frequency.setValueAtTime(freq, t);
        noteGain.gain.setValueAtTime(0, t);
        noteGain.gain.linearRampToValueAtTime(0.5, t + 0.02);
        noteGain.gain.linearRampToValueAtTime(0.3, t + noteDuration * 0.5);
        noteGain.gain.linearRampToValueAtTime(0, t + noteDuration * 0.95);
        osc.start(t);
        osc.stop(t + noteDuration);
      });
      // Schedule next loop
      setTimeout(() => scheduleLoop(startTime + loopLength), (loopLength - 1) * 1000);
    }

    scheduleLoop(ctx.currentTime + 0.1);

    return {
      ctx,
      stop: () => {
        stopped = true;
        masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
        setTimeout(() => ctx.close(), 600);
      },
    };
  } catch {
    return null;
  }
}

function createCustomer(id: number, level: number): Customer {
  const order = generateOrder(level);
  const toppings = generateToppings(level);
  return {
    id,
    name: pick(CUSTOMER_NAMES),
    skinTone: pick(SKIN_TONES),
    shirtColor: pick(SHIRT_COLORS),
    hairColor: pick(HAIR_COLORS),
    hat: Math.random() > 0.7,
    order,
    toppings,
    x: STORE_WIDTH + 10,
    targetX: 140 + Math.random() * 80,
    y: FLOOR_Y,
    state: "walking-in",
    reaction: "",
    patience: 100,
    sitting: Math.random() > 0.6,
  };
}

// ── SVG Components ─────────────────────────────────────────────────────────────

function StoreBackground() {
  return (
    <g>
      {/* Back wall */}
      <rect x={0} y={0} width={STORE_WIDTH} height={FLOOR_Y + 40} fill="#FFF5EE" />

      {/* Wallpaper stripes */}
      {Array.from({ length: 15 }, (_, i) => (
        <rect key={i} x={i * 30} y={0} width={2} height={COUNTER_Y - 40} fill="#FFE4E1" opacity={0.4} />
      ))}

      {/* Shelf on wall */}
      <rect x={20} y={60} width={140} height={8} rx={2} fill="#B8863C" />
      <rect x={260} y={80} width={120} height={8} rx={2} fill="#B8863C" />

      {/* Jars on shelves */}
      {[30, 65, 100, 130].map((jx, i) => (
        <g key={`jar${i}`}>
          <rect x={jx} y={35} width={18} height={25} rx={4} fill={FLAVORS[i].color} stroke={FLAVORS[i].highlight} strokeWidth={1} />
          <rect x={jx + 2} y={32} width={14} height={5} rx={2} fill="#DDD" />
        </g>
      ))}
      {[275, 310, 345].map((jx, i) => (
        <g key={`jar2${i}`}>
          <rect x={jx} y={55} width={18} height={25} rx={4} fill={FLAVORS[i + 3]?.color || "#DDD"} stroke={FLAVORS[i + 3]?.highlight || "#CCC"} strokeWidth={1} />
          <rect x={jx + 2} y={52} width={14} height={5} rx={2} fill="#DDD" />
        </g>
      ))}

      {/* Menu board */}
      <rect x={170} y={30} width={80} height={60} rx={4} fill="#2C1B0E" />
      <text x={210} y={52} textAnchor="middle" fill="#FFF" fontSize={8} fontWeight="bold">MENU</text>
      <text x={210} y={65} textAnchor="middle" fill="#FFD700" fontSize={6}>Scoops: $1-$3</text>
      <text x={210} y={76} textAnchor="middle" fill="#FFD700" fontSize={6}>Cones: $0.50</text>

      {/* Counter / display case */}
      <rect x={0} y={COUNTER_Y - 40} width={STORE_WIDTH} height={50} rx={4} fill="#F5DEB3" stroke="#D2A060" strokeWidth={2} />
      {/* Glass display */}
      <rect x={10} y={COUNTER_Y - 35} width={STORE_WIDTH - 20} height={35} rx={3} fill="rgba(200,230,255,0.3)" stroke="rgba(150,200,240,0.5)" strokeWidth={1} />

      {/* Ice cream tubs in display */}
      {FLAVORS.map((f, i) => (
        <g key={`tub${i}`}>
          <rect
            x={20 + i * 63}
            y={COUNTER_Y - 28}
            width={50}
            height={22}
            rx={6}
            fill={f.color}
            stroke={f.highlight}
            strokeWidth={1.5}
          />
          <ellipse cx={45 + i * 63} cy={COUNTER_Y - 28} rx={25} ry={5} fill={f.color} stroke={f.highlight} strokeWidth={1} />
          <text x={45 + i * 63} y={COUNTER_Y - 12} textAnchor="middle" fontSize={5} fill="#666">{f.emoji}</text>
        </g>
      ))}

      {/* Counter top surface */}
      <rect x={0} y={COUNTER_Y + 5} width={STORE_WIDTH} height={8} fill="#D2A060" />

      {/* Floor */}
      <rect x={0} y={COUNTER_Y + 13} width={STORE_WIDTH} height={FLOOR_Y - COUNTER_Y} fill="#F0E6D3" />
      {/* Checkered floor tiles */}
      {Array.from({ length: 14 }, (_, i) =>
        Array.from({ length: 5 }, (_, j) => (
          <rect
            key={`tile${i}${j}`}
            x={i * 32}
            y={COUNTER_Y + 13 + j * 32}
            width={32}
            height={32}
            fill={(i + j) % 2 === 0 ? "#F5E6D0" : "#E8D5BC"}
            opacity={0.7}
          />
        ))
      )}

      {/* Door on right */}
      <rect x={STORE_WIDTH - 55} y={COUNTER_Y + 20} width={45} height={FLOOR_Y - COUNTER_Y - 20} fill="#8B6914" stroke="#6B4F12" strokeWidth={2} rx={2} />
      <circle cx={STORE_WIDTH - 20} cy={COUNTER_Y + 70} r={3} fill="#FFD700" />
      <text x={STORE_WIDTH - 32} y={COUNTER_Y + 40} textAnchor="middle" fontSize={6} fill="#FFF">OPEN</text>

      {/* Hanging light */}
      <line x1={140} y1={0} x2={140} y2={18} stroke="#333" strokeWidth={1} />
      <polygon points="130,18 150,18 145,28 135,28" fill="#FFD700" opacity={0.8} />
      <ellipse cx={140} cy={30} rx={20} ry={6} fill="#FFFACD" opacity={0.2} />

      <line x1={280} y1={0} x2={280} y2={22} stroke="#333" strokeWidth={1} />
      <polygon points="270,22 290,22 285,32 275,32" fill="#FFD700" opacity={0.8} />
    </g>
  );
}

function PersonSprite({
  x,
  y,
  skinTone,
  shirtColor,
  hairColor,
  hat,
  facing,
  walking,
}: {
  x: number;
  y: number;
  skinTone: string;
  shirtColor: string;
  hairColor: string;
  hat: boolean;
  facing: "left" | "right";
  walking: boolean;
}) {
  const scale = facing === "left" ? -1 : 1;
  const legOffset = walking ? Math.sin(Date.now() / 150) * 4 : 0;
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale}, 1)`}>
      {/* Legs */}
      <rect x={-5} y={20} width={5} height={16} rx={2} fill="#4A4A6A" transform={`rotate(${legOffset}, -2.5, 20)`} />
      <rect x={2} y={20} width={5} height={16} rx={2} fill="#3A3A5A" transform={`rotate(${-legOffset}, 4.5, 20)`} />
      {/* Shoes */}
      <ellipse cx={-2.5 + legOffset * 0.3} cy={36} rx={4} ry={2.5} fill="#333" />
      <ellipse cx={4.5 - legOffset * 0.3} cy={36} rx={4} ry={2.5} fill="#333" />
      {/* Body */}
      <rect x={-8} y={2} width={18} height={20} rx={5} fill={shirtColor} />
      {/* Arms */}
      <rect x={-12} y={4} width={5} height={14} rx={3} fill={shirtColor} />
      <rect x={9} y={4} width={5} height={14} rx={3} fill={shirtColor} />
      {/* Hands */}
      <circle cx={-10} cy={18} r={3} fill={skinTone} />
      <circle cx={12} cy={18} r={3} fill={skinTone} />
      {/* Head */}
      <ellipse cx={1} cy={-6} rx={10} ry={11} fill={skinTone} />
      {/* Hair */}
      <ellipse cx={1} cy={-13} rx={10} ry={6} fill={hairColor} />
      {hat && <rect x={-12} y={-20} width={26} height={5} rx={2} fill={shirtColor} />}
      {hat && <rect x={-6} y={-26} width={14} height={8} rx={3} fill={shirtColor} />}
      {/* Eyes */}
      <circle cx={-3} cy={-6} r={1.5} fill="#333" />
      <circle cx={6} cy={-6} r={1.5} fill="#333" />
      {/* Smile */}
      <path d="M -2,-1 Q 2,3 6,-1" stroke="#333" strokeWidth={1} fill="none" />
    </g>
  );
}

function SpeechBubble({
  x,
  y,
  order,
  scoopsDone,
  reaction,
}: {
  x: number;
  y: number;
  order: Flavor[];
  scoopsDone: number;
  reaction: string;
}) {
  const bubbleW = Math.max(80, order.length * 28 + 20);
  const bubbleH = reaction ? 30 : 40;
  const bx = Math.max(5, Math.min(x - bubbleW / 2, STORE_WIDTH - bubbleW - 5));
  const by = y - 65;

  return (
    <g>
      {/* Bubble */}
      <rect x={bx} y={by} width={bubbleW} height={bubbleH} rx={10} fill="white" stroke="#DDD" strokeWidth={1.5} />
      {/* Tail */}
      <polygon
        points={`${x - 5},${by + bubbleH} ${x + 5},${by + bubbleH} ${x},${by + bubbleH + 10}`}
        fill="white"
        stroke="#DDD"
        strokeWidth={1}
      />
      <line x1={x - 4} y1={by + bubbleH} x2={x + 4} y2={by + bubbleH} stroke="white" strokeWidth={2} />

      {reaction ? (
        <text x={bx + bubbleW / 2} y={by + 20} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#333">
          {reaction}
        </text>
      ) : (
        <>
          {order.map((item, i) => {
            const done = i < scoopsDone;
            const isNext = i === scoopsDone;
            const sx = bx + 14 + i * 28;
            return (
              <g key={i} opacity={done ? 0.4 : 1}>
                <circle
                  cx={sx}
                  cy={by + 16}
                  r={10}
                  fill={item.color}
                  stroke={isNext ? "#333" : item.highlight}
                  strokeWidth={isNext ? 2.5 : 1.5}
                />
                {done && (
                  <text x={sx} y={by + 20} textAnchor="middle" fontSize={10} fill="#4CAF50" fontWeight="bold">✓</text>
                )}
                <text x={sx} y={by + 34} textAnchor="middle" fontSize={5} fill="#999">{item.name}</text>
              </g>
            );
          })}
        </>
      )}
    </g>
  );
}

function ConeStack({ x, y, scoops }: { x: number; y: number; scoops: Flavor[] }) {
  const coneH = 50;
  const scoopR = 16;

  return (
    <g>
      {/* Cone */}
      <polygon
        points={`${x - 14},${y} ${x + 14},${y} ${x},${y + coneH}`}
        fill="#D2A060"
        stroke="#B8863C"
        strokeWidth={1.5}
      />
      {/* Waffle lines */}
      <line x1={x - 10} y1={y + 5} x2={x - 3} y2={y + 42} stroke="#B8863C" strokeWidth={0.5} opacity={0.5} />
      <line x1={x} y1={y + 2} x2={x} y2={y + 45} stroke="#B8863C" strokeWidth={0.5} opacity={0.5} />
      <line x1={x + 10} y1={y + 5} x2={x + 3} y2={y + 42} stroke="#B8863C" strokeWidth={0.5} opacity={0.5} />

      {/* Scoops */}
      {scoops.map((scoop, i) => {
        const sy = y - 5 - i * (scoopR * 1.3);
        return (
          <g key={i}>
            <ellipse cx={x} cy={sy + 4} rx={scoopR + 1} ry={6} fill="rgba(0,0,0,0.08)" />
            <ellipse cx={x} cy={sy} rx={scoopR} ry={scoopR * 0.75} fill={scoop.color} stroke={scoop.highlight} strokeWidth={1.5} />
            <ellipse cx={x - 5} cy={sy - 4} rx={4} ry={3} fill="rgba(255,255,255,0.3)" />
          </g>
        );
      })}
    </g>
  );
}

// Background people walking around (non-interactive)
function BackgroundPerson({ seed }: { seed: number }) {
  const [x, setX] = useState(50 + (seed * 73) % 300);
  const dir = useRef(seed % 2 === 0 ? 1 : -1);
  const skinTone = SKIN_TONES[seed % SKIN_TONES.length];
  const shirt = SHIRT_COLORS[(seed * 3) % SHIRT_COLORS.length];
  const hair = HAIR_COLORS[(seed * 2) % HAIR_COLORS.length];

  useEffect(() => {
    const interval = setInterval(() => {
      setX((prev) => {
        let next = prev + dir.current * 0.3;
        if (next > STORE_WIDTH - 70) dir.current = -1;
        if (next < 60) dir.current = 1;
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <PersonSprite
      x={x}
      y={FLOOR_Y - 10}
      skinTone={skinTone}
      shirtColor={shirt}
      hairColor={hair}
      hat={seed % 3 === 0}
      facing={dir.current > 0 ? "right" : "left"}
      walking={true}
    />
  );
}

// ── Main Game ──────────────────────────────────────────────────────────────────
export default function IceCreamGame() {
  const [phase, setPhase] = useState<GamePhase>("menu");
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [customersServed, setCustomersServed] = useState(0);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [scoopsDone, setScoopsDone] = useState(0);
  const [coneScoops, setConeScoops] = useState<Flavor[]>([]);
  const [highScore, setHighScore] = useState(0);
  const [missedCustomers, setMissedCustomers] = useState(0);
  const [animatingScoop, setAnimatingScoop] = useState<Flavor | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [toppingsDone, setToppingsDone] = useState(0);
  const [toppingsPhase, setToppingsPhase] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const customerIdRef = useRef(0);
  const walkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const musicRef = useRef<{ ctx: AudioContext; stop: () => void } | null>(null);

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

  // Walk customer in (from the door on the right)
  const walkCustomerIn = useCallback((c: Customer) => {
    setCustomer({ ...c });
    playDing();
    if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);

    walkIntervalRef.current = setInterval(() => {
      setCustomer((prev) => {
        if (!prev || prev.state !== "walking-in") return prev;
        const newX = prev.x - 3;
        if (newX <= prev.targetX) {
          return { ...prev, x: prev.targetX, state: "waiting" };
        }
        return { ...prev, x: newX };
      });
    }, 20);
  }, []);

  // Walk customer out (back out the door on the right)
  const walkCustomerOut = useCallback(() => {
    if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);

    walkIntervalRef.current = setInterval(() => {
      setCustomer((prev) => {
        if (!prev || prev.state !== "walking-out") return prev;
        const newX = prev.x + 4;
        if (newX > STORE_WIDTH + 60) {
          clearInterval(walkIntervalRef.current!);
          return null;
        }
        return { ...prev, x: newX };
      });
    }, 20);
  }, []);

  // Patience timer
  useEffect(() => {
    if (!customer || customer.state !== "waiting" || phase !== "playing") return;

    const interval = setInterval(() => {
      setCustomer((prev) => {
        if (!prev || prev.state !== "waiting") return prev;
        const newPatience = prev.patience - 0.5;

        if (newPatience <= 30 && newPatience > 29.5) {
          return { ...prev, patience: newPatience, reaction: pick(REACTIONS.impatient) };
        }

        if (newPatience <= 0) {
          setMissedCustomers((m) => m + 1);
          return { ...prev, patience: 0, state: "walking-out", reaction: "😤 Too slow!" };
        }
        return { ...prev, patience: newPatience };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [customer?.state, customer?.id, phase]);

  // Walk out after being served
  useEffect(() => {
    if (customer?.state === "walking-out") {
      walkCustomerOut();
    }
  }, [customer?.state, walkCustomerOut]);

  // Send next customer after current leaves
  useEffect(() => {
    if (phase !== "playing") return;
    if (customer === null) {
      const timer = setTimeout(() => {
        customerIdRef.current += 1;
        const c = createCustomer(customerIdRef.current, level);
        setScoopsDone(0);
        setConeScoops([]);
        setAnimatingScoop(null);
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

  // Game over at 3 missed
  useEffect(() => {
    if (missedCustomers >= 3 && phase === "playing") {
      setPhase("result");
      if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
      if (musicRef.current) { musicRef.current.stop(); musicRef.current = null; setMusicOn(false); }
    }
  }, [missedCustomers, phase]);

  // Complete the order (scoops + toppings done)
  const completeOrder = useCallback(() => {
    if (!customer) return;
    const bonus = Math.ceil(customer.patience / 10) * 10;
    const toppingBonus = customer.toppings.length * 25;
    setScore((s) => s + 100 + bonus + toppingBonus);
    setCustomersServed((c) => c + 1);
    setCustomer((prev) =>
      prev
        ? { ...prev, reaction: pick(REACTIONS.happy), state: "served" }
        : prev
    );
    setTimeout(() => {
      setCustomer((prev) =>
        prev ? { ...prev, state: "walking-out" } : prev
      );
    }, 1200);
  }, [customer]);

  // Tap a flavor
  const tapFlavor = useCallback(
    (flavor: Flavor) => {
      if (!customer || customer.state !== "waiting") return;
      if (toppingsPhase) return; // toppings use separate buttons
      if (scoopsDone >= customer.order.length) return;

      const expectedFlavor = customer.order[scoopsDone];

      // Add scoop animation
      setAnimatingScoop(flavor);
      setTimeout(() => setAnimatingScoop(null), 300);

      if (flavor.name === expectedFlavor.name) {
        // Correct!
        const newScoops = [...coneScoops, flavor];
        setConeScoops(newScoops);
        const newDone = scoopsDone + 1;
        setScoopsDone(newDone);

        if (newDone === customer.order.length) {
          if (customer.toppings.length > 0) {
            // Move to toppings phase
            setToppingsPhase(true);
          } else {
            completeOrder();
          }
        }
      } else {
        // Wrong flavor — just shake, no penalty, let them try again
        setCustomer((prev) =>
          prev ? { ...prev, reaction: "Wrong one!" } : prev
        );
        setTimeout(() => {
          setCustomer((prev) =>
            prev && prev.state === "waiting" ? { ...prev, reaction: "" } : prev
          );
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
        const newDone = toppingsDone + 1;
        setToppingsDone(newDone);
        if (newDone === customer.toppings.length) {
          completeOrder();
        }
      } else {
        setCustomer((prev) =>
          prev ? { ...prev, reaction: "Wrong topping!" } : prev
        );
        setTimeout(() => {
          setCustomer((prev) =>
            prev && prev.state === "waiting" ? { ...prev, reaction: "" } : prev
          );
        }, 600);
      }
    },
    [customer, toppingsPhase, toppingsDone, completeOrder]
  );

  const startGame = useCallback(() => {
    setLevel(1);
    setScore(0);
    setCustomersServed(0);
    setMissedCustomers(0);
    setCustomer(null);
    setScoopsDone(0);
    setConeScoops([]);
    setToppingsDone(0);
    setToppingsPhase(false);
    customerIdRef.current = 0;
    setPhase("playing");
    // Start music
    if (musicRef.current) musicRef.current.stop();
    musicRef.current = createMusicContext();
    setMusicOn(true);
  }, []);

  // Toggle music
  const toggleMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.stop();
      musicRef.current = null;
      setMusicOn(false);
    } else {
      musicRef.current = createMusicContext();
      setMusicOn(true);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
      if (musicRef.current) { musicRef.current.stop(); musicRef.current = null; }
    };
  }, []);

  // ── Menu ─────────────────────────────────────────────────────────────────────
  if (phase === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-100 via-pink-50 to-sky-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {FLAVORS.map((f, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                backgroundColor: f.color,
                width: 80 + i * 25,
                height: 80 + i * 25,
                left: `${5 + (i * 27) % 75}%`,
                top: `${8 + (i * 19) % 80}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          <div className="text-8xl mb-2">🍦</div>
          <h1
            className="text-5xl md:text-6xl font-bold mb-1"
            style={{ fontFamily: "var(--font-instrument-serif)", color: "#D2691E" }}
          >
            Scoop Shop
          </h1>
          <p className="text-lg text-gray-500 mb-8">Serve customers, stack scoops!</p>

          <button
            onClick={startGame}
            className="bg-pink-400 hover:bg-pink-500 text-white font-bold text-xl px-10 py-4 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 mb-4"
          >
            Open Shop
          </button>

          <button
            onClick={() => setShowTutorial(!showTutorial)}
            className="block mx-auto text-gray-400 underline text-sm mt-2"
          >
            How to Play
          </button>

          {showTutorial && (
            <div className="mt-4 bg-white/90 backdrop-blur rounded-xl p-5 text-left max-w-xs mx-auto shadow-lg">
              <ol className="space-y-2 text-sm text-gray-700">
                <li><strong>1.</strong> Customers walk in and show their order</li>
                <li><strong>2.</strong> Tap the right flavors in order</li>
                <li><strong>3.</strong> Scoops stack on the cone</li>
                <li><strong>4.</strong> Serve before they lose patience!</li>
                <li><strong>5.</strong> 3 missed customers = game over</li>
              </ol>
            </div>
          )}

          {highScore > 0 && (
            <p className="mt-6 text-gray-400 text-sm">High Score: {highScore}</p>
          )}
        </div>
      </div>
    );
  }

  // ── Result ───────────────────────────────────────────────────────────────────
  if (phase === "result") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-100 via-pink-50 to-sky-100 flex flex-col items-center justify-center p-4">
        <div className="text-7xl mb-4">🍦</div>
        <h2
          className="text-3xl font-bold text-gray-800 mb-2"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          Shop Closed!
        </h2>
        <p className="text-xl text-gray-600 mb-1">Score: {score}</p>
        <p className="text-gray-500 mb-1">Customers served: {customersServed}</p>
        <p className="text-gray-500 mb-4">Reached level: {level}</p>
        {score >= highScore && score > 0 && (
          <p className="text-pink-500 font-bold text-lg mb-4">New High Score!</p>
        )}
        <button
          onClick={startGame}
          className="bg-pink-400 hover:bg-pink-500 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Reopen Shop
        </button>
      </div>
    );
  }

  // ── Playing ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center p-3 select-none">
      {/* HUD */}
      <div className="w-full max-w-md flex justify-between items-center mb-2">
        <div className="bg-white/90 backdrop-blur rounded-lg px-3 py-1 shadow text-xs font-bold text-gray-700">
          Level {level}
        </div>
        <div className="bg-white/90 backdrop-blur rounded-lg px-3 py-1 shadow text-xs font-bold text-gray-700">
          Score: {score}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMusic}
            className="bg-white/90 backdrop-blur rounded-lg px-2 py-1 shadow text-xs text-gray-700 hover:bg-white transition-colors"
          >
            {musicOn ? "🔊" : "🔇"}
          </button>
          <div className="bg-white/90 backdrop-blur rounded-lg px-3 py-1 shadow text-xs text-gray-700">
            {"❤️".repeat(3 - missedCustomers)}
            {"🖤".repeat(missedCustomers)}
          </div>
        </div>
      </div>

      {/* Store Scene */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-3" style={{ width: STORE_WIDTH, maxWidth: "100%" }}>
        <svg width={STORE_WIDTH} height={FLOOR_Y + 30} viewBox={`0 0 ${STORE_WIDTH} ${FLOOR_Y + 30}`}>
          <StoreBackground />

          {/* Background people */}
          <BackgroundPerson seed={1} />
          <BackgroundPerson seed={4} />

          {/* Active customer */}
          {customer && (
            <>
              <PersonSprite
                x={customer.x}
                y={customer.sitting && customer.state === "waiting" ? customer.y - 4 : customer.y - 10}
                skinTone={customer.skinTone}
                shirtColor={customer.shirtColor}
                hairColor={customer.hairColor}
                hat={customer.hat}
                facing={customer.state === "walking-out" ? "right" : "left"}
                walking={customer.state === "walking-in" || customer.state === "walking-out"}
              />
              {/* Stool if sitting */}
              {customer.sitting && customer.state === "waiting" && (
                <g>
                  <rect x={customer.x - 12} y={customer.y + 22} width={24} height={5} rx={2} fill="#B8863C" />
                  <rect x={customer.x - 8} y={customer.y + 27} width={4} height={12} fill="#8B6914" />
                  <rect x={customer.x + 4} y={customer.y + 27} width={4} height={12} fill="#8B6914" />
                </g>
              )}

              {/* Speech bubble with order */}
              {(customer.state === "waiting" || customer.state === "served") && (
                <SpeechBubble
                  x={customer.x}
                  y={customer.y - 45}
                  order={customer.order}
                  scoopsDone={scoopsDone}
                  reaction={customer.reaction}
                />
              )}

              {/* Patience bar */}
              {customer.state === "waiting" && (
                <g>
                  <rect x={customer.x - 20} y={customer.y - 50} width={40} height={4} rx={2} fill="#EEE" />
                  <rect
                    x={customer.x - 20}
                    y={customer.y - 50}
                    width={Math.max(0, customer.patience * 0.4)}
                    height={4}
                    rx={2}
                    fill={customer.patience > 50 ? "#4CAF50" : customer.patience > 25 ? "#FF9800" : "#F44336"}
                  />
                </g>
              )}
            </>
          )}

          {/* Cone being built (on counter) */}
          {customer && customer.state === "waiting" && (
            <ConeStack x={300} y={COUNTER_Y - 5} scoops={coneScoops} />
          )}
          {customer && customer.state === "served" && (
            <ConeStack x={300} y={COUNTER_Y - 5} scoops={coneScoops} />
          )}

          {/* Scoop animation */}
          {animatingScoop && (
            <ellipse
              cx={300}
              cy={COUNTER_Y - 15 - coneScoops.length * 18}
              rx={14}
              ry={10}
              fill={animatingScoop.color}
              opacity={0.6}
            >
              <animate attributeName="cy" from={COUNTER_Y - 60} to={COUNTER_Y - 15 - coneScoops.length * 18} dur="0.25s" />
              <animate attributeName="opacity" from="1" to="0.6" dur="0.25s" />
            </ellipse>
          )}
        </svg>
      </div>

      {/* Large Order Display */}
      {customer && customer.state === "waiting" && (
        <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-2xl shadow-lg p-4 mb-3">
          <div className="text-center mb-2">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              {customer.name}&apos;s Order
            </span>
          </div>

          {/* Scoops display */}
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {customer.order.map((item, i) => {
              const done = i < scoopsDone;
              const isNext = !toppingsPhase && i === scoopsDone;
              return (
                <div
                  key={i}
                  className="flex items-center gap-1 px-3 py-2 rounded-full text-base font-bold transition-all"
                  style={{
                    backgroundColor: done ? `${item.color}66` : item.color,
                    border: isNext ? "3px solid #333" : "2px solid transparent",
                    opacity: done ? 0.5 : 1,
                    color: item.name === "Chocolate" || item.name === "Blueberry" ? "white" : "#333",
                    transform: isNext ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span>{item.name}</span>
                  {done && <span className="text-green-600 ml-1">✓</span>}
                </div>
              );
            })}
          </div>

          {/* Toppings display */}
          {customer.toppings.length > 0 && (
            <>
              <div className="text-center text-xs text-gray-400 mb-1">+ Toppings</div>
              <div className="flex flex-wrap justify-center gap-2">
                {customer.toppings.map((t, i) => {
                  const done = i < toppingsDone;
                  const isNext = toppingsPhase && i === toppingsDone;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-1 px-3 py-2 rounded-full text-base font-bold transition-all"
                      style={{
                        backgroundColor: done ? "#e0e0e0" : `${t.color}33`,
                        border: isNext ? "3px solid #333" : "2px solid #ddd",
                        opacity: done ? 0.5 : 1,
                        transform: isNext ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      <span className="text-lg">{t.emoji}</span>
                      <span>{t.name}</span>
                      {done && <span className="text-green-600 ml-1">✓</span>}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Current instruction */}
          <div className="text-center mt-3">
            {!toppingsPhase && scoopsDone < customer.order.length ? (
              <p className="text-lg font-bold text-gray-700">
                👇 Tap <span style={{ color: customer.order[scoopsDone]?.highlight }}>{customer.order[scoopsDone]?.emoji} {customer.order[scoopsDone]?.name}</span>
                <span className="text-gray-400 text-sm ml-2">({scoopsDone + 1}/{customer.order.length})</span>
              </p>
            ) : toppingsPhase && toppingsDone < customer.toppings.length ? (
              <p className="text-lg font-bold text-gray-700">
                👇 Add <span>{customer.toppings[toppingsDone]?.emoji} {customer.toppings[toppingsDone]?.name}</span>
                <span className="text-gray-400 text-sm ml-2">({toppingsDone + 1}/{customer.toppings.length})</span>
              </p>
            ) : null}
          </div>
        </div>
      )}

      {/* Flavor buttons */}
      <div className="w-full max-w-md">
        {!toppingsPhase ? (
          <div className="grid grid-cols-3 gap-2">
            {FLAVORS.map((f) => {
              const isNext =
                customer?.state === "waiting" &&
                !toppingsPhase &&
                scoopsDone < (customer?.order.length || 0) &&
                customer?.order[scoopsDone]?.name === f.name;
              return (
                <button
                  key={f.name}
                  onClick={() => tapFlavor(f)}
                  className="py-3 px-2 rounded-xl text-sm font-semibold transition-all active:scale-95 border-2 shadow-sm"
                  style={{
                    backgroundColor: f.color,
                    borderColor: isNext ? "#333" : f.highlight,
                    color:
                      f.name === "Chocolate" || f.name === "Blueberry"
                        ? "white"
                        : "#444",
                    boxShadow: isNext ? "0 0 12px rgba(0,0,0,0.2)" : undefined,
                  }}
                >
                  {f.emoji} {f.name}
                </button>
              );
            })}
          </div>
        ) : (
          /* Topping buttons */
          <div className="grid grid-cols-2 gap-2">
            {TOPPINGS.map((t) => {
              const isNext =
                customer?.state === "waiting" &&
                toppingsPhase &&
                toppingsDone < (customer?.toppings.length || 0) &&
                customer?.toppings[toppingsDone]?.name === t.name;
              return (
                <button
                  key={t.name}
                  onClick={() => tapTopping(t)}
                  className="py-3 px-3 rounded-xl text-sm font-semibold transition-all active:scale-95 border-2 shadow-sm"
                  style={{
                    backgroundColor: `${t.color}22`,
                    borderColor: isNext ? "#333" : "#ddd",
                    color: "#444",
                    boxShadow: isNext ? "0 0 12px rgba(0,0,0,0.2)" : undefined,
                  }}
                >
                  {t.emoji} {t.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
