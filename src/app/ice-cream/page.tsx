"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Flavor = {
  name: string;
  color: string;
  highlight: string;
};

type OrderItem = Flavor;

type GamePhase = "menu" | "ordering" | "stacking" | "result";

// ── Constants ──────────────────────────────────────────────────────────────────
const FLAVORS: Flavor[] = [
  { name: "Vanilla", color: "#FFF8DC", highlight: "#F5E6B8" },
  { name: "Chocolate", color: "#6B3A2A", highlight: "#8B5A3A" },
  { name: "Strawberry", color: "#FF85A2", highlight: "#FF6B8A" },
  { name: "Mint Chip", color: "#98FB98", highlight: "#7AE87A" },
  { name: "Blueberry", color: "#7B8FD4", highlight: "#5B6FB4" },
  { name: "Mango", color: "#FFB347", highlight: "#FFA020" },
  { name: "Cookie Dough", color: "#D2B48C", highlight: "#C4A06C" },
  { name: "Pistachio", color: "#93C572", highlight: "#7DB55E" },
];

const CONE_WIDTH = 120;
const SCOOP_SIZE = 80;
const STACK_ZONE_WIDTH = 300;

const CUSTOMER_NAMES = [
  "Timmy", "Sarah", "Chef Marco", "Grandma Rose", "DJ Freeze",
  "Princess Lola", "Captain Cool", "Professor Swirl", "Tiny Ted", "Big Betty",
];

const CUSTOMER_REACTIONS = {
  perfect: ["Wow, perfect! ★★★", "Exactly what I wanted!", "You're amazing!"],
  good: ["Looks great!", "Nice job!", "Yummy!"],
  ok: ["Hmm, close enough!", "Not bad...", "I'll take it!"],
  bad: ["That's not right...", "Wrong flavors!", "I wanted something else!"],
  dropped: ["Oh no, it fell!", "My ice cream!", "The scoops tumbled!"],
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function generateOrder(level: number): OrderItem[] {
  const scoopCount = Math.min(2 + Math.floor(level / 2), 8);
  const order: OrderItem[] = [];
  for (let i = 0; i < scoopCount; i++) {
    order.push(FLAVORS[Math.floor(Math.random() * FLAVORS.length)]);
  }
  return order;
}

function getCustomerName(): string {
  return CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)];
}

function getReaction(type: keyof typeof CUSTOMER_REACTIONS): string {
  const reactions = CUSTOMER_REACTIONS[type];
  return reactions[Math.floor(Math.random() * reactions.length)];
}

// ── Components ─────────────────────────────────────────────────────────────────

function Cone({ x, scoops }: { x: number; scoops: PlacedScoop[] }) {
  const baseY = 500;
  return (
    <g>
      {/* Cone */}
      <polygon
        points={`${x - CONE_WIDTH / 2},${baseY - 20} ${x + CONE_WIDTH / 2},${baseY - 20} ${x},${baseY + 100}`}
        fill="#D2A060"
        stroke="#B8863C"
        strokeWidth={2}
      />
      {/* Waffle pattern */}
      {[...Array(4)].map((_, i) => (
        <line
          key={`l${i}`}
          x1={x - CONE_WIDTH / 2 + 10 + i * 25}
          y1={baseY - 15}
          x2={x - 5 + i * 8}
          y2={baseY + 90}
          stroke="#B8863C"
          strokeWidth={1}
          opacity={0.5}
        />
      ))}
      {[...Array(4)].map((_, i) => (
        <line
          key={`r${i}`}
          x1={x + CONE_WIDTH / 2 - 10 - i * 25}
          y1={baseY - 15}
          x2={x + 5 - i * 8}
          y2={baseY + 90}
          stroke="#B8863C"
          strokeWidth={1}
          opacity={0.5}
        />
      ))}

      {/* Stacked scoops */}
      {scoops.map((scoop, i) => {
        const scoopY = baseY - 30 - i * (SCOOP_SIZE * 0.65);
        const wobble = scoop.offsetX || 0;
        return (
          <g key={i}>
            {/* Shadow */}
            <ellipse
              cx={x + wobble}
              cy={scoopY + 15}
              rx={SCOOP_SIZE / 2 + 2}
              ry={12}
              fill="rgba(0,0,0,0.1)"
            />
            {/* Scoop */}
            <ellipse
              cx={x + wobble}
              cy={scoopY}
              rx={SCOOP_SIZE / 2}
              ry={SCOOP_SIZE / 2.5}
              fill={scoop.flavor.color}
              stroke={scoop.flavor.highlight}
              strokeWidth={2}
            />
            {/* Shine */}
            <ellipse
              cx={x + wobble - 12}
              cy={scoopY - 8}
              rx={8}
              ry={5}
              fill="rgba(255,255,255,0.35)"
            />
          </g>
        );
      })}
    </g>
  );
}

type PlacedScoop = {
  flavor: Flavor;
  offsetX: number;
};

function FlavorPalette({
  flavors,
  onSelect,
  selected,
}: {
  flavors: Flavor[];
  onSelect: (f: Flavor) => void;
  selected: Flavor | null;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
      {flavors.map((f) => (
        <button
          key={f.name}
          onClick={() => onSelect(f)}
          className="px-3 py-2 rounded-full text-sm font-medium transition-all border-2"
          style={{
            backgroundColor: f.color,
            borderColor: selected?.name === f.name ? "#333" : f.highlight,
            color:
              f.name === "Chocolate" || f.name === "Blueberry"
                ? "white"
                : "#333",
            transform: selected?.name === f.name ? "scale(1.1)" : "scale(1)",
            boxShadow:
              selected?.name === f.name ? "0 4px 12px rgba(0,0,0,0.3)" : "none",
          }}
        >
          {f.name}
        </button>
      ))}
    </div>
  );
}

function OrderDisplay({ order, placed }: { order: OrderItem[]; placed: PlacedScoop[] }) {
  return (
    <div className="bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg">
      <h3 className="font-bold text-sm mb-2 text-gray-700">ORDER:</h3>
      <div className="flex flex-wrap gap-1.5">
        {order.map((item, i) => {
          const isPlaced = i < placed.length;
          const isCorrect = isPlaced && placed[i].flavor.name === item.name;
          const isWrong = isPlaced && !isCorrect;
          return (
            <div
              key={i}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border"
              style={{
                backgroundColor: isPlaced ? (isCorrect ? "#E8F5E9" : "#FFEBEE") : item.color + "40",
                borderColor: isPlaced ? (isCorrect ? "#4CAF50" : "#F44336") : item.highlight,
                color: "#333",
                opacity: isPlaced ? 0.7 : 1,
                textDecoration: isPlaced ? "line-through" : "none",
              }}
            >
              <span
                className="w-3 h-3 rounded-full inline-block border"
                style={{ backgroundColor: item.color, borderColor: item.highlight }}
              />
              {item.name}
              {isCorrect && " ✓"}
              {isWrong && " ✗"}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CustomerBubble({ name, message }: { name: string; message: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg max-w-xs relative">
      <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white rotate-45 shadow-lg" />
      <p className="font-bold text-sm text-gray-800">{name}:</p>
      <p className="text-gray-600 text-sm mt-1">&quot;{message}&quot;</p>
    </div>
  );
}

// ── Main Game Component ────────────────────────────────────────────────────────
export default function IceCreamGame() {
  const [phase, setPhase] = useState<GamePhase>("menu");
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [placedScoops, setPlacedScoops] = useState<PlacedScoop[]>([]);
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerMessage, setCustomerMessage] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [wobbleAnim, setWobbleAnim] = useState(false);
  const [dropPosition, setDropPosition] = useState(STACK_ZONE_WIDTH / 2);
  const [isDropping, setIsDropping] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const dropRef = useRef(dropPosition);
  const movingRef = useRef<number | null>(null);
  const directionRef = useRef(1);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("icecream-highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("icecream-highscore", score.toString());
    }
  }, [score, highScore]);

  // Moving scoop animation during stacking
  const startMoving = useCallback(() => {
    if (movingRef.current) return;
    const speed = Math.max(1.5, 4 - level * 0.3);
    const move = () => {
      dropRef.current += directionRef.current * speed;
      if (dropRef.current > STACK_ZONE_WIDTH - 40) directionRef.current = -1;
      if (dropRef.current < 40) directionRef.current = 1;
      setDropPosition(dropRef.current);
      movingRef.current = requestAnimationFrame(move);
    };
    movingRef.current = requestAnimationFrame(move);
  }, [level]);

  const stopMoving = useCallback(() => {
    if (movingRef.current) {
      cancelAnimationFrame(movingRef.current);
      movingRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (phase === "stacking" && !isDropping) {
      startMoving();
    } else {
      stopMoving();
    }
    return stopMoving;
  }, [phase, isDropping, startMoving, stopMoving]);

  // Start a new level
  const startLevel = useCallback(() => {
    const newOrder = generateOrder(level);
    const name = getCustomerName();
    setOrder(newOrder);
    setPlacedScoops([]);
    setSelectedFlavor(null);
    setCustomerName(name);
    setCustomerMessage(
      `Hi! I'd like ${newOrder.length} scoops please! ${newOrder.map((o) => o.name).join(", ")}.`
    );
    setDropPosition(STACK_ZONE_WIDTH / 2);
    dropRef.current = STACK_ZONE_WIDTH / 2;
    directionRef.current = 1;
    setIsDropping(false);
    setPhase("ordering");
    setTimeout(() => setPhase("stacking"), 2500);
  }, [level]);

  // Drop a scoop
  const dropScoop = useCallback(() => {
    if (!selectedFlavor || isDropping) return;
    setIsDropping(true);
    stopMoving();

    const centerX = STACK_ZONE_WIDTH / 2;
    const offsetX = dropRef.current - centerX;

    // Check if scoop is too far off center — it falls!
    const maxOffset = SCOOP_SIZE * 0.6 + (placedScoops.length > 0 ? 10 : 30);
    const totalWobble =
      placedScoops.reduce((acc, s) => acc + Math.abs(s.offsetX), 0) +
      Math.abs(offsetX);
    const wobbleThreshold = 60 + (8 - placedScoops.length) * 15;
    const fell = Math.abs(offsetX) > maxOffset || totalWobble > wobbleThreshold;

    if (fell && placedScoops.length > 0) {
      // Scoop fell off!
      setWobbleAnim(true);
      setTimeout(() => {
        setWobbleAnim(false);
        setCustomerMessage(getReaction("dropped"));
        setLives((l) => l - 1);
        if (lives <= 1) {
          setResultMessage(`Game over! Final score: ${score}`);
          setPhase("result");
        } else {
          // Restart this level
          setTimeout(() => startLevel(), 1500);
        }
      }, 600);
      return;
    }

    const newScoop: PlacedScoop = { flavor: selectedFlavor, offsetX };
    const newPlaced = [...placedScoops, newScoop];
    setPlacedScoops(newPlaced);
    setSelectedFlavor(null);

    // Check if order is complete
    if (newPlaced.length === order.length) {
      // Score the order
      setTimeout(() => {
        let correct = 0;
        for (let i = 0; i < order.length; i++) {
          if (newPlaced[i].flavor.name === order[i].name) correct++;
        }
        const accuracy = correct / order.length;
        const levelBonus = level * 50;
        let reactionType: keyof typeof CUSTOMER_REACTIONS;

        if (accuracy === 1) {
          reactionType = "perfect";
          setScore((s) => s + levelBonus + 100);
        } else if (accuracy >= 0.7) {
          reactionType = "good";
          setScore((s) => s + levelBonus + 50);
        } else if (accuracy >= 0.4) {
          reactionType = "ok";
          setScore((s) => s + levelBonus);
        } else {
          reactionType = "bad";
          setLives((l) => l - 1);
        }

        setCustomerMessage(getReaction(reactionType));
        setTimeout(() => {
          if (lives <= 0 && accuracy < 0.4) {
            setResultMessage(`Game over! Final score: ${score}`);
            setPhase("result");
          } else {
            setLevel((l) => l + 1);
          }
        }, 2000);
      }, 500);
    } else {
      // More scoops to place
      setTimeout(() => {
        setIsDropping(false);
        dropRef.current = STACK_ZONE_WIDTH / 2;
        directionRef.current = 1;
      }, 300);
    }
  }, [selectedFlavor, isDropping, placedScoops, order, level, lives, score, startLevel, stopMoving]);

  // Start next level when level changes
  useEffect(() => {
    if (phase !== "result" && phase !== "menu" && level > 1) {
      startLevel();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  // Keyboard / tap to drop
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" && phase === "stacking" && selectedFlavor) {
        e.preventDefault();
        dropScoop();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, selectedFlavor, dropScoop]);

  // ── Render ───────────────────────────────────────────────────────────────────
  if (phase === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-200 via-yellow-100 to-blue-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative background scoops */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {FLAVORS.map((f, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-15"
              style={{
                backgroundColor: f.color,
                width: 60 + i * 20,
                height: 60 + i * 20,
                left: `${10 + (i * 23) % 80}%`,
                top: `${5 + (i * 17) % 85}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          <div className="text-7xl mb-4">🍦</div>
          <h1
            className="text-5xl md:text-6xl font-bold mb-2"
            style={{ fontFamily: "var(--font-instrument-serif)", color: "#D2691E" }}
          >
            Scoop Stack
          </h1>
          <p className="text-lg text-gray-600 mb-8">Stack it high, don&apos;t let it fall!</p>

          <button
            onClick={() => {
              setLevel(1);
              setScore(0);
              setLives(3);
              startLevel();
            }}
            className="bg-pink-400 hover:bg-pink-500 text-white font-bold text-xl px-10 py-4 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 mb-4"
          >
            Start Game
          </button>

          <button
            onClick={() => setShowTutorial(!showTutorial)}
            className="block mx-auto text-gray-500 underline text-sm mt-2"
          >
            How to Play
          </button>

          {showTutorial && (
            <div className="mt-4 bg-white/80 backdrop-blur rounded-xl p-5 text-left max-w-sm mx-auto shadow-lg">
              <ol className="space-y-2 text-sm text-gray-700">
                <li><strong>1.</strong> A customer orders specific flavors</li>
                <li><strong>2.</strong> Pick the right flavor from the palette</li>
                <li><strong>3.</strong> Time your drop — tap/click/spacebar to place the scoop</li>
                <li><strong>4.</strong> Stack them straight! Off-center scoops wobble and fall</li>
                <li><strong>5.</strong> Each level adds more scoops and speeds up</li>
              </ol>
            </div>
          )}

          {highScore > 0 && (
            <p className="mt-6 text-gray-500 text-sm">High Score: {highScore}</p>
          )}
        </div>
      </div>
    );
  }

  if (phase === "result") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-200 via-yellow-100 to-blue-100 flex flex-col items-center justify-center p-4">
        <div className="text-6xl mb-6">🍦</div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: "var(--font-instrument-serif)" }}>
          {resultMessage}
        </h2>
        <p className="text-xl text-gray-600 mb-2">You reached Level {level}</p>
        {score > highScore && (
          <p className="text-pink-500 font-bold text-lg mb-4">New High Score!</p>
        )}
        <p className="text-gray-500 mb-8">High Score: {Math.max(score, highScore)}</p>
        <button
          onClick={() => {
            setPhase("menu");
          }}
          className="bg-pink-400 hover:bg-pink-500 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-all hover:scale-105"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-pink-50 to-yellow-50 flex flex-col items-center p-4 select-none">
      {/* HUD */}
      <div className="w-full max-w-lg flex justify-between items-center mb-4">
        <div className="bg-white/80 backdrop-blur rounded-lg px-3 py-1.5 shadow text-sm font-bold">
          Level {level}
        </div>
        <div className="bg-white/80 backdrop-blur rounded-lg px-3 py-1.5 shadow text-sm font-bold">
          Score: {score}
        </div>
        <div className="bg-white/80 backdrop-blur rounded-lg px-3 py-1.5 shadow text-sm">
          {"❤️".repeat(lives)}{"🖤".repeat(3 - lives)}
        </div>
      </div>

      {/* Customer */}
      <div className="mb-4">
        <CustomerBubble name={customerName} message={customerMessage} />
      </div>

      {/* Order tracker */}
      <div className="mb-4 w-full max-w-lg">
        <OrderDisplay order={order} placed={placedScoops} />
      </div>

      {/* Stacking area */}
      {phase === "stacking" && (
        <>
          <div
            className="relative bg-white/40 backdrop-blur rounded-2xl shadow-inner mb-4 overflow-hidden cursor-pointer"
            style={{ width: STACK_ZONE_WIDTH, height: 450 }}
            onClick={dropScoop}
          >
            {/* Moving indicator */}
            {selectedFlavor && !isDropping && (
              <div
                className="absolute top-4 transition-none"
                style={{ left: dropPosition - SCOOP_SIZE / 2 }}
              >
                <svg width={SCOOP_SIZE} height={SCOOP_SIZE / 1.5}>
                  <ellipse
                    cx={SCOOP_SIZE / 2}
                    cy={SCOOP_SIZE / 2.5}
                    rx={SCOOP_SIZE / 2}
                    ry={SCOOP_SIZE / 2.5}
                    fill={selectedFlavor.color}
                    stroke={selectedFlavor.highlight}
                    strokeWidth={2}
                    opacity={0.8}
                  />
                  <ellipse
                    cx={SCOOP_SIZE / 2 - 12}
                    cy={SCOOP_SIZE / 2.5 - 8}
                    rx={8}
                    ry={5}
                    fill="rgba(255,255,255,0.35)"
                  />
                </svg>
                <div className="text-center text-xs text-gray-400 mt-1">
                  tap to drop!
                </div>
              </div>
            )}

            {!selectedFlavor && !isDropping && placedScoops.length < order.length && (
              <div className="absolute inset-0 flex items-start justify-center pt-8">
                <p className="text-gray-400 text-sm animate-pulse">
                  ← pick a flavor below →
                </p>
              </div>
            )}

            {/* Cone + scoops SVG */}
            <svg
              width={STACK_ZONE_WIDTH}
              height={450}
              className={wobbleAnim ? "animate-wobble" : ""}
            >
              <Cone x={STACK_ZONE_WIDTH / 2} scoops={placedScoops} />
            </svg>
          </div>

          {/* Flavor palette */}
          {placedScoops.length < order.length && (
            <div className="w-full max-w-lg">
              <FlavorPalette
                flavors={FLAVORS}
                onSelect={setSelectedFlavor}
                selected={selectedFlavor}
              />
              <p className="text-center text-xs text-gray-400 mt-2">
                Next: <strong>{order[placedScoops.length]?.name}</strong>
                {" · "}Scoop {placedScoops.length + 1} of {order.length}
              </p>
            </div>
          )}
        </>
      )}

      {phase === "ordering" && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center animate-pulse">
            <div className="text-5xl mb-4">🍦</div>
            <p className="text-gray-500">Preparing order...</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes wobble {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(8deg); }
          60% { transform: rotate(-5deg); }
          80% { transform: rotate(5deg); }
        }
        .animate-wobble {
          animation: wobble 0.5s ease-in-out;
          transform-origin: bottom center;
        }
      `}</style>
    </div>
  );
}
