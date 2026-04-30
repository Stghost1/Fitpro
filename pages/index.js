import { useState } from "react";
import {
  Home, Dumbbell, Apple, User, Flame, Clock, CheckCircle,
  Star, Trophy, Zap, X, ChevronRight, ArrowLeft, Play,
  BarChart3, Target, Award, Shield, Activity
} from "lucide-react";

/* ══════════════════════════════ GLOBAL STYLES ══════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: #060912;
      font-family: 'Outfit', sans-serif;
      color: #fff;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    .BN { font-family: 'Bebas Neue', cursive; letter-spacing: 0.5px; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: #A8FF3E; border-radius: 2px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 0 rgba(168,255,62,0); }
      60%       { box-shadow: 0 0 40px rgba(168,255,62,.35); }
    }

    .fu  { animation: fadeUp 0.4s ease forwards; }
    .glowing { animation: glow 2.5s infinite; }
    .spinning { animation: spin 0.7s linear infinite; }

    .card {
      background: rgba(12,18,32,.98);
      border: 1px solid rgba(255,255,255,.06);
      border-radius: 20px;
    }
    .glass {
      background: rgba(255,255,255,.04);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 14px;
      backdrop-filter: blur(10px);
    }

    /* ── Buttons ── */
    .pb {
      background: #A8FF3E; color: #060912; border: none;
      border-radius: 14px; padding: 16px;
      font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 16px;
      cursor: pointer; transition: .2s all; width: 100%; letter-spacing: .3px;
    }
    .pb:hover  { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(168,255,62,.4); }
    .pb:active { transform: translateY(0); }
    .pb:disabled { opacity: .35; cursor: not-allowed; transform: none; }

    .gb {
      background: transparent; color: rgba(255,255,255,.6);
      border: 1px solid rgba(255,255,255,.12); border-radius: 14px; padding: 16px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 16px;
      cursor: pointer; transition: .2s all; width: 100%;
    }
    .gb:hover { border-color: rgba(255,255,255,.35); color: #fff; }

    .goldbtn {
      background: linear-gradient(135deg,#FFB800,#FF7A00); color: #060912;
      border: none; border-radius: 14px; padding: 16px;
      font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 16px;
      cursor: pointer; transition: .2s all; width: 100%; letter-spacing: .3px;
    }
    .goldbtn:hover { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(255,184,0,.4); }
    .goldbtn:disabled { opacity: .35; cursor: not-allowed; transform: none; }

    /* ── Gradient text ── */
    .gt {
      background: linear-gradient(135deg,#A8FF3E,#00E5AA);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .gp {
      background: linear-gradient(135deg,#FFB800,#FF6B00);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ── Tab bar ── */
    .tabbar {
      position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
      width: 100%; max-width: 480px;
      background: rgba(6,9,18,.97);
      border-top: 1px solid rgba(255,255,255,.06);
      display: flex; justify-content: space-around;
      padding: 10px 0 24px; z-index: 500;
      backdrop-filter: blur(24px);
    }
    .tbtn {
      background: none; border: none; color: rgba(255,255,255,.3);
      cursor: pointer; display: flex; flex-direction: column;
      align-items: center; gap: 3px; padding: 8px 20px;
      border-radius: 12px; transition: .2s;
      font-family: 'Outfit', sans-serif; min-width: 60px;
    }
    .tbtn.on { color: #A8FF3E; }
    .tbtn span { font-size: 10px; font-weight: 600; letter-spacing: .4px; text-transform: uppercase; }

    /* ── Modals ── */
    .mbg {
      position: fixed; inset: 0; background: rgba(0,0,0,.88);
      z-index: 600; display: flex; align-items: flex-end; justify-content: center;
      backdrop-filter: blur(6px);
    }
    .mbox {
      background: #0a0f1e; border-radius: 28px 28px 0 0;
      padding: 28px 20px 44px; width: 100%; max-width: 480px;
      max-height: 88vh; overflow-y: auto;
      border-top: 1px solid rgba(255,255,255,.08);
    }

    /* ── Scrollable row ── */
    .sh { overflow-x: auto; -ms-overflow-style: none; scrollbar-width: none; }
    .sh::-webkit-scrollbar { display: none; }

    /* ── Inputs ── */
    input, select {
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 12px; color: #fff;
      font-family: 'Outfit', sans-serif; font-size: 15px;
      padding: 14px 16px; width: 100%; outline: none; transition: .2s;
    }
    input:focus, select:focus {
      border-color: #A8FF3E;
      background: rgba(168,255,62,.05);
    }
    input::placeholder { color: rgba(255,255,255,.28); }
    select option { background: #0a0f1e; }

    /* ── Top bar ── */
    .topbar {
      position: sticky; top: 0;
      background: rgba(6,9,18,.97);
      border-bottom: 1px solid rgba(255,255,255,.05);
      padding: 14px 20px; z-index: 400;
      backdrop-filter: blur(24px);
      display: flex; align-items: center; justify-content: space-between;
    }
  `}</style>
);

/* ══════════════════════════════ WORKOUT DATA ════════════════════════════════ */
const WORKOUT_DATA = {
  male: {
    weightLoss: [
      {
        id: 1, name: "HIIT Fat Burner", min: 30, cal: 380,
        lvl: "Beginner", tag: "HIIT", color: "#FF4757",
        desc: "Spike your metabolism and torch fat with explosive interval training",
        ex: [
          { n: "Jumping Jacks",    s: 3, r: "45 sec",  rest: "15s" },
          { n: "Mountain Climbers",s: 3, r: "30 sec",  rest: "15s" },
          { n: "Burpees",          s: 3, r: "8 reps",  rest: "30s" },
          { n: "High Knees",       s: 3, r: "45 sec",  rest: "15s" },
          { n: "Squat Jumps",      s: 3, r: "12 reps", rest: "30s" },
        ],
      },
      {
        id: 2, name: "Cardio Shred", min: 45, cal: 500,
        lvl: "Intermediate", tag: "Cardio", color: "#FF6B35",
        desc: "Progressive cardio engineered to strip body fat and build endurance",
        ex: [
          { n: "Sprint Intervals",      s: 8, r: "30 sec", rest: "30s" },
          { n: "Box Jumps",             s: 4, r: "10 reps", rest: "45s" },
          { n: "Battle Rope Slams",     s: 3, r: "30 sec", rest: "30s" },
          { n: "Jump Rope",             s: 3, r: "2 min",  rest: "30s" },
          { n: "Treadmill Incline Walk",s: 1, r: "10 min", rest: "—"  },
        ],
      },
      {
        id: 3, name: "Full Body Torch", min: 40, cal: 420,
        lvl: "Advanced", tag: "Strength+Cardio", color: "#A8FF3E",
        desc: "Heavy lifts fused with cardio bursts for elite fat-burning results",
        ex: [
          { n: "Deadlift",          s: 4, r: "10 reps", rest: "60s" },
          { n: "Kettlebell Swing",  s: 3, r: "15 reps", rest: "45s" },
          { n: "Pull-ups",          s: 3, r: "8 reps",  rest: "60s" },
          { n: "Dumbbell Thruster", s: 3, r: "12 reps", rest: "45s" },
          { n: "Plank Hold",        s: 3, r: "60 sec",  rest: "30s" },
        ],
      },
    ],
    muscleGain: [
      {
        id: 4, name: "Chest & Triceps", min: 50, cal: 280,
        lvl: "Intermediate", tag: "Push", color: "#4ECDC4",
        desc: "Classic push day targeting chest thickness and tricep definition",
        ex: [
          { n: "Bench Press",     s: 4, r: "8-10 reps", rest: "90s" },
          { n: "Incline DB Press",s: 3, r: "10 reps",   rest: "75s" },
          { n: "Cable Crossover", s: 3, r: "12 reps",   rest: "60s" },
          { n: "Tricep Dips",     s: 3, r: "10 reps",   rest: "60s" },
          { n: "Skull Crushers",  s: 3, r: "10 reps",   rest: "60s" },
        ],
      },
      {
        id: 5, name: "Back & Biceps", min: 55, cal: 300,
        lvl: "Intermediate", tag: "Pull", color: "#45B7D1",
        desc: "Pull day engineered for a wide back and peaked biceps",
        ex: [
          { n: "Barbell Deadlift",s: 4, r: "6-8 reps",  rest: "120s" },
          { n: "Pull-ups",        s: 3, r: "8 reps",    rest: "90s"  },
          { n: "Barbell Row",     s: 3, r: "10 reps",   rest: "75s"  },
          { n: "Hammer Curls",    s: 3, r: "12 reps",   rest: "60s"  },
          { n: "Face Pulls",      s: 3, r: "15 reps",   rest: "45s"  },
        ],
      },
      {
        id: 6, name: "Leg Power Day", min: 60, cal: 400,
        lvl: "Advanced", tag: "Legs", color: "#96CEB4",
        desc: "Heavy compound movements to build powerful, muscular legs",
        ex: [
          { n: "Back Squat",         s: 5, r: "5 reps",   rest: "150s" },
          { n: "Romanian Deadlift",  s: 4, r: "8 reps",   rest: "90s"  },
          { n: "Leg Press",          s: 3, r: "12 reps",  rest: "75s"  },
          { n: "Walking Lunges",     s: 3, r: "16 steps", rest: "60s"  },
          { n: "Calf Raises",        s: 4, r: "20 reps",  rest: "45s"  },
        ],
      },
      {
        id: 14, name: "Shoulder & Core", min: 45, cal: 260,
        lvl: "Intermediate", tag: "Push", color: "#A8FF3E",
        desc: "Sculpt boulder shoulders and build an iron core",
        ex: [
          { n: "Overhead Press",     s: 4, r: "8 reps",  rest: "90s" },
          { n: "Lateral Raises",     s: 3, r: "15 reps", rest: "45s" },
          { n: "Arnold Press",       s: 3, r: "10 reps", rest: "60s" },
          { n: "Ab Wheel Rollout",   s: 3, r: "10 reps", rest: "45s" },
          { n: "Hanging Leg Raises", s: 3, r: "12 reps", rest: "45s" },
        ],
      },
    ],
    generalFitness: [
      {
        id: 7, name: "Athletic Foundation", min: 45, cal: 320,
        lvl: "Beginner", tag: "Full Body", color: "#A8FF3E",
        desc: "Build balanced fitness through essential movement patterns",
        ex: [
          { n: "Bodyweight Squat", s: 3, r: "15 reps", rest: "45s" },
          { n: "Push-ups",         s: 3, r: "12 reps", rest: "45s" },
          { n: "Inverted Row",     s: 3, r: "10 reps", rest: "45s" },
          { n: "Plank Hold",       s: 3, r: "45 sec",  rest: "30s" },
          { n: "Glute Bridge",     s: 3, r: "15 reps", rest: "30s" },
        ],
      },
      {
        id: 15, name: "Mobility & Power", min: 40, cal: 290,
        lvl: "Intermediate", tag: "Athletic", color: "#00D4AA",
        desc: "Improve movement quality and build explosive athletic power",
        ex: [
          { n: "Hip 90/90 Stretch",  s: 1, r: "2 min",   rest: "—"   },
          { n: "Box Jumps",          s: 4, r: "6 reps",  rest: "60s" },
          { n: "Med Ball Slam",      s: 3, r: "10 reps", rest: "45s" },
          { n: "Single-Leg RDL",     s: 3, r: "8 each",  rest: "45s" },
          { n: "Turkish Get-Up",     s: 2, r: "3 each",  rest: "60s" },
        ],
      },
    ],
  },
  female: {
    weightLoss: [
      {
        id: 8, name: "Glute & Core Burn", min: 35, cal: 300,
        lvl: "Beginner", tag: "Toning", color: "#FF6B9D",
        desc: "Sculpt your glutes and tighten your core with targeted activation",
        ex: [
          { n: "Hip Thrusts",   s: 3, r: "15 reps",   rest: "45s" },
          { n: "Donkey Kicks",  s: 3, r: "15 each",   rest: "30s" },
          { n: "Glute Bridge",  s: 3, r: "20 reps",   rest: "30s" },
          { n: "Dead Bug",      s: 3, r: "10 each",   rest: "30s" },
          { n: "Side Plank",    s: 3, r: "30s each",  rest: "20s" },
        ],
      },
      {
        id: 9, name: "Dance Cardio HIIT", min: 30, cal: 350,
        lvl: "Beginner", tag: "Cardio", color: "#C77DFF",
        desc: "Fun dance-inspired cardio that burns fat and lifts your mood",
        ex: [
          { n: "Step Touch Warm-up", s: 1, r: "5 min",   rest: "—"   },
          { n: "Jumping Jacks",      s: 3, r: "45 sec",  rest: "15s" },
          { n: "Squat Pulse",        s: 3, r: "20 reps", rest: "30s" },
          { n: "Jump Step Combo",    s: 2, r: "2 min",   rest: "30s" },
          { n: "Cool Down Stretch",  s: 1, r: "5 min",   rest: "—"   },
        ],
      },
      {
        id: 10, name: "Full Body Lean", min: 40, cal: 380,
        lvl: "Intermediate", tag: "HIIT", color: "#FF4757",
        desc: "Full body HIIT to accelerate fat loss and tone every muscle group",
        ex: [
          { n: "Sumo Squat",       s: 4, r: "15 reps", rest: "45s" },
          { n: "Reverse Lunge",    s: 3, r: "12 each", rest: "45s" },
          { n: "Push-ups",         s: 3, r: "10 reps", rest: "30s" },
          { n: "Bicycle Crunches", s: 3, r: "20 reps", rest: "30s" },
          { n: "Burpees",          s: 3, r: "8 reps",  rest: "45s" },
        ],
      },
    ],
    muscleGain: [
      {
        id: 11, name: "Booty Builder", min: 50, cal: 280,
        lvl: "Intermediate", tag: "Glutes", color: "#FF6B9D",
        desc: "Science-backed glute training for shape, lift, and real strength",
        ex: [
          { n: "Barbell Hip Thrust", s: 4, r: "10 reps", rest: "90s" },
          { n: "Romanian Deadlift",  s: 3, r: "10 reps", rest: "75s" },
          { n: "Cable Kickback",     s: 3, r: "15 each", rest: "45s" },
          { n: "Sumo Deadlift",      s: 3, r: "10 reps", rest: "75s" },
          { n: "Seated Abductor",    s: 3, r: "20 reps", rest: "45s" },
        ],
      },
      {
        id: 12, name: "Upper Body Sculpt", min: 45, cal: 240,
        lvl: "Intermediate", tag: "Strength", color: "#A8FF3E",
        desc: "Lean toned arms and shoulders — definition without bulk",
        ex: [
          { n: "Dumbbell Chest Press", s: 3, r: "12 reps", rest: "60s" },
          { n: "Lateral Raises",       s: 3, r: "15 reps", rest: "45s" },
          { n: "Bent Over Row",        s: 3, r: "12 reps", rest: "60s" },
          { n: "Bicep Curls",          s: 3, r: "15 reps", rest: "45s" },
          { n: "Tricep Extensions",    s: 3, r: "15 reps", rest: "45s" },
        ],
      },
      {
        id: 16, name: "Strong Legs Circuit", min: 55, cal: 340,
        lvl: "Advanced", tag: "Legs", color: "#C77DFF",
        desc: "Build powerful, sculpted legs with this intense lower-body circuit",
        ex: [
          { n: "Goblet Squat",          s: 4, r: "12 reps", rest: "60s" },
          { n: "Bulgarian Split Squat", s: 3, r: "10 each",  rest: "75s" },
          { n: "Leg Curl Machine",      s: 3, r: "12 reps",  rest: "60s" },
          { n: "Step Ups",              s: 3, r: "12 each",  rest: "45s" },
          { n: "Wall Sit",              s: 3, r: "60 sec",   rest: "30s" },
        ],
      },
    ],
    generalFitness: [
      {
        id: 13, name: "Yoga Flow & Strength", min: 45, cal: 200,
        lvl: "Beginner", tag: "Yoga", color: "#00D4AA",
        desc: "Blend yoga mindfulness with bodyweight strength for total wellness",
        ex: [
          { n: "Sun Salutation", s: 3, r: "full flow", rest: "30s" },
          { n: "Warrior II",     s: 2, r: "60s each",  rest: "20s" },
          { n: "Chair Pose",     s: 3, r: "45 sec",    rest: "20s" },
          { n: "Downward Dog",   s: 3, r: "60 sec",    rest: "15s" },
          { n: "Child's Pose",   s: 1, r: "2 min",     rest: "—"   },
        ],
      },
      {
        id: 17, name: "Pilates Core Blast", min: 35, cal: 220,
        lvl: "Beginner", tag: "Pilates", color: "#FFB800",
        desc: "Strengthen deep core muscles and improve posture with pilates",
        ex: [
          { n: "The Hundred",    s: 1, r: "100 pumps",     rest: "—"   },
          { n: "Roll Up",        s: 3, r: "10 reps",       rest: "20s" },
          { n: "Leg Circles",    s: 2, r: "10 each way",   rest: "15s" },
          { n: "Scissor Kicks",  s: 3, r: "20 reps",       rest: "20s" },
          { n: "Swan Dive",      s: 3, r: "10 reps",       rest: "15s" },
        ],
      },
    ],
  },
};

/* ══════════════════════════════ NUTRITION DATA ══════════════════════════════ */
const NUTRITION_DATA = {
  weightLoss: {
    male:   { cal: 1800, p: 180, c: 150, f: 60 },
    female: { cal: 1500, p: 130, c: 120, f: 50 },
    meals: [
      {
        t: "🌅 Breakfast", name: "Protein Oats & Berries",
        cal: 320, p: 28, c: 42, f: 6, prep: "5 min",
        ing: ["1 cup rolled oats","1 scoop whey protein","100g mixed berries","1 tbsp chia seeds","200ml almond milk"],
      },
      {
        t: "☀️ Lunch", name: "Grilled Chicken Quinoa Bowl",
        cal: 450, p: 46, c: 38, f: 12, prep: "20 min",
        ing: ["200g chicken breast (grilled)","80g quinoa (cooked)","1 cup baby spinach","½ avocado","Lemon + olive oil dressing"],
      },
      {
        t: "🍎 Snack", name: "Greek Yogurt & Almonds",
        cal: 200, p: 16, c: 14, f: 9, prep: "2 min",
        ing: ["200g Greek yogurt (0% fat)","20g raw almonds","1 tsp honey","Pinch of cinnamon"],
      },
      {
        t: "🌙 Dinner", name: "Baked Salmon & Veggies",
        cal: 480, p: 44, c: 22, f: 20, prep: "30 min",
        ing: ["200g salmon fillet","1 cup broccoli florets","½ cup sweet potato","2 tbsp olive oil","Fresh herbs & lemon"],
      },
    ],
  },
  muscleGain: {
    male:   { cal: 2800, p: 220, c: 320, f: 80 },
    female: { cal: 2200, p: 165, c: 250, f: 65 },
    meals: [
      {
        t: "🌅 Breakfast", name: "Mass Builder Pancakes",
        cal: 680, p: 52, c: 78, f: 18, prep: "15 min",
        ing: ["3 large eggs","1 cup oats (blended)","1 ripe banana","2 scoops protein powder","250ml whole milk"],
      },
      {
        t: "☀️ Lunch", name: "Rice, Chicken & Eggs Bowl",
        cal: 720, p: 68, c: 82, f: 16, prep: "25 min",
        ing: ["250g chicken breast","200g cooked white rice","3 boiled eggs","1 cup stir-fried vegetables","Soy sauce & garlic"],
      },
      {
        t: "🍎 Snack", name: "PB Protein Shake",
        cal: 480, p: 38, c: 44, f: 18, prep: "3 min",
        ing: ["2 scoops protein powder","2 tbsp natural peanut butter","1 banana","350ml whole milk","Ice cubes"],
      },
      {
        t: "🌙 Dinner", name: "Beef & Sweet Potato Bowl",
        cal: 680, p: 54, c: 72, f: 22, prep: "35 min",
        ing: ["250g lean beef mince","2 medium sweet potatoes","1 cup mixed vegetables","Coconut oil","Garlic, herbs, salt"],
      },
    ],
  },
  generalFitness: {
    male:   { cal: 2200, p: 165, c: 240, f: 70 },
    female: { cal: 1800, p: 135, c: 185, f: 60 },
    meals: [
      {
        t: "🌅 Breakfast", name: "Avocado Toast & Eggs",
        cal: 420, p: 24, c: 38, f: 20, prep: "10 min",
        ing: ["2 poached eggs","2 slices wholegrain bread","1 ripe avocado","Cherry tomatoes","Black pepper & chilli flakes"],
      },
      {
        t: "☀️ Lunch", name: "Mediterranean Chickpea Bowl",
        cal: 480, p: 28, c: 52, f: 18, prep: "15 min",
        ing: ["150g chickpeas (canned)","50g feta cheese","Cucumber & olives","Mixed salad greens","Tahini + lemon dressing"],
      },
      {
        t: "🍎 Snack", name: "Apple & Protein Bar",
        cal: 280, p: 22, c: 32, f: 8, prep: "0 min",
        ing: ["1 medium apple","1 protein bar (20g protein)"],
      },
      {
        t: "🌙 Dinner", name: "Tofu Stir Fry & Noodles",
        cal: 520, p: 34, c: 56, f: 16, prep: "20 min",
        ing: ["200g firm tofu","120g rice noodles","Mixed bell peppers & pak choi","Soy sauce & sesame oil","Ginger & garlic"],
      },
    ],
  },
};

/* ══════════════════════════════ HELPER UTILS ════════════════════════════════ */
const GOAL_LABELS = {
  weightLoss: "Weight Loss",
  muscleGain: "Muscle Gain",
  generalFitness: "General Fitness",
};

const LEVEL_LABELS = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

/* ══════════════════════════════ LANDING PAGE ════════════════════════════════ */
function LandingPage({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", background: "#060912", maxWidth: 480, margin: "0 auto", overflowX: "hidden" }}>
      {/* Hero */}
      <div style={{ position: "relative", padding: "64px 24px 40px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 500, height: 500, background: "radial-gradient(circle,rgba(168,255,62,.1) 0%,transparent 65%)", pointerEvents: "none" }} />

        <div className="fu" style={{ animationDelay: ".1s", opacity: 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(168,255,62,.1)", border: "1px solid rgba(168,255,62,.22)", borderRadius: 30, padding: "7px 16px", marginBottom: 24 }}>
            <Zap size={13} color="#A8FF3E" />
            <span style={{ fontSize: 12, color: "#A8FF3E", fontWeight: 700 }}>AI-POWERED FITNESS PLATFORM</span>
          </div>
        </div>

        <div className="fu" style={{ animationDelay: ".2s", opacity: 0 }}>
          <h1 className="BN" style={{ fontSize: 78, lineHeight: 0.88, marginBottom: 22, letterSpacing: 1 }}>
            YOUR BODY<br /><span className="gt">REDEFINED.</span>
          </h1>
        </div>

        <div className="fu" style={{ animationDelay: ".3s", opacity: 0 }}>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 17, lineHeight: 1.65, maxWidth: 300, margin: "0 auto 36px" }}>
            Personalized workouts, smart nutrition, and real progress — for every body, every goal.
          </p>
          <button className="pb glowing" style={{ maxWidth: 300, display: "block", margin: "0 auto", fontSize: 18, padding: 20 }} onClick={onStart}>
            Start Free Today →
          </button>
          <p style={{ color: "rgba(255,255,255,.25)", fontSize: 12, marginTop: 12 }}>No card required · Free forever plan available</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "0 20px 28px" }}>
        {[["50K+", "Members"], ["200+", "Workouts"], ["4.9★", "Rating"]].map(([v, l], i) => (
          <div key={l} className={`glass fu`} style={{ padding: "16px 10px", textAlign: "center", animationDelay: `${0.4 + i * 0.1}s`, opacity: 0 }}>
            <div className="BN gt" style={{ fontSize: 28 }}>{v}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 3 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Feature Grid */}
      <div style={{ padding: "0 20px 32px" }}>
        <h2 className="BN" style={{ fontSize: 40, marginBottom: 6 }}>EVERYTHING<br />YOU NEED</h2>
        <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, marginBottom: 20 }}>One platform. All goals. Zero guesswork.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { e: "💪", t: "Gender-Specific Plans",  d: "Built for male & female physiology" },
            { e: "🔥", t: "HIIT & Strength",         d: "200+ workouts across all categories" },
            { e: "🥗", t: "Smart Nutrition",          d: "Macro-tracked meal plans (Pro)" },
            { e: "📊", t: "Progress Tracking",        d: "Streaks, stats & performance data" },
            { e: "⚡", t: "AI Recommendations",       d: "Adapts daily to your fitness level" },
            { e: "🏆", t: "Achievement System",        d: "Badges and rewards keep you going" },
          ].map((f, i) => (
            <div key={f.t} className={`card fu`} style={{ padding: "18px 14px", animationDelay: `${0.5 + i * 0.08}s`, opacity: 0 }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>{f.e}</div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{f.t}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", lineHeight: 1.45 }}>{f.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ padding: "0 20px 40px" }}>
        <h2 className="BN" style={{ fontSize: 40, marginBottom: 6 }}>SIMPLE PRICING</h2>
        <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, marginBottom: 20 }}>Start free. Upgrade when you're ready.</p>

        {/* Free */}
        <div className="card" style={{ padding: 20, marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Free</div>
          <div className="BN gt" style={{ fontSize: 46 }}>$0<span style={{ fontSize: 18, color: "rgba(255,255,255,.35)", fontFamily: "Outfit,sans-serif" }}>/month</span></div>
          <div style={{ margin: "16px 0", display: "flex", flexDirection: "column", gap: 9 }}>
            {["3 workouts per week", "Basic workout library", "Progress tracking", "Community access"].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: "rgba(255,255,255,.65)" }}>
                <CheckCircle size={14} color="#A8FF3E" />{f}
              </div>
            ))}
          </div>
          <button className="gb" onClick={onStart}>Get Started Free</button>
        </div>

        {/* Pro */}
        <div className="card" style={{ padding: 20, border: "1px solid rgba(255,184,0,.3)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, background: "linear-gradient(135deg,#FFB800,#FF6B00)", padding: "5px 16px", fontSize: 11, fontWeight: 700, color: "#060912", borderRadius: "0 20px 0 14px" }}>MOST POPULAR</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 18 }}>Pro</span>
            <span style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)", color: "#060912", fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 10 }}>PRO</span>
          </div>
          <div className="BN gp" style={{ fontSize: 46 }}>$9.99<span style={{ fontSize: 18, color: "rgba(255,255,255,.35)", fontFamily: "Outfit,sans-serif" }}>/month</span></div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.35)", marginBottom: 16 }}>or $79.99/year — save 33%</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 18 }}>
            {["Everything in Free", "Unlimited workouts & programs", "Full nutrition + 7-day meal plans", "Macro tracking & calorie targets", "Custom workout builder", "AI coaching & recommendations", "Ad-free experience"].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: "rgba(255,255,255,.8)" }}>
                <CheckCircle size={14} color="#FFB800" />{f}
              </div>
            ))}
          </div>
          <button className="goldbtn" onClick={onStart}>Start 7-Day Free Trial</button>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ padding: "10px 20px 80px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <h2 className="BN" style={{ fontSize: 52, marginBottom: 16 }}>READY TO<br /><span className="gt">TRANSFORM?</span></h2>
        <button className="pb" style={{ maxWidth: 300, display: "block", margin: "0 auto" }} onClick={onStart}>
          Begin My Journey
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════ ONBOARDING ══════════════════════════════════ */
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", gender: null, goal: null, level: null });
  const upd = (k, v) => setData(d => ({ ...d, [k]: v }));

  const steps = [
    /* Step 0 — Name */
    <div key="name" className="fu" style={{ padding: "44px 24px", opacity: 0 }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>👋</div>
        <h2 className="BN" style={{ fontSize: 52, marginBottom: 8 }}>WELCOME TO<br /><span className="gt">FITPRO</span></h2>
        <p style={{ color: "rgba(255,255,255,.45)", fontSize: 15 }}>Personalize your experience in 4 quick steps</p>
      </div>
      <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,.6)", marginBottom: 8 }}>What's your first name?</label>
      <input
        placeholder="e.g. Emmanuel"
        value={data.name}
        onChange={e => upd("name", e.target.value)}
        style={{ marginBottom: 28 }}
        autoFocus
      />
      <button className="pb" disabled={!data.name.trim()} onClick={() => setStep(1)}>Continue →</button>
    </div>,

    /* Step 1 — Gender */
    <div key="gender" className="fu" style={{ padding: "44px 24px", opacity: 0 }}>
      <h2 className="BN" style={{ fontSize: 52, marginBottom: 6 }}>I AM A...</h2>
      <p style={{ color: "rgba(255,255,255,.45)", fontSize: 15, marginBottom: 30 }}>We'll tailor workouts for your biology</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 30 }}>
        {[
          { v: "male",   e: "♂️", l: "Male",   d: "Optimised for male physiology & testosterone-driven training" },
          { v: "female", e: "♀️", l: "Female", d: "Designed for female biology, hormones & specific goals" },
        ].map(g => (
          <button key={g.v} onClick={() => upd("gender", g.v)} style={{
            background: data.gender === g.v ? "rgba(168,255,62,.1)" : "rgba(12,18,32,.98)",
            border: `2px solid ${data.gender === g.v ? "#A8FF3E" : "rgba(255,255,255,.08)"}`,
            borderRadius: 20, padding: "28px 16px", cursor: "pointer", textAlign: "center", transition: ".2s",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 52 }}>{g.e}</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{g.l}</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.4)", lineHeight: 1.4 }}>{g.d}</span>
            {data.gender === g.v && <CheckCircle size={18} color="#A8FF3E" />}
          </button>
        ))}
      </div>
      <button className="pb" disabled={!data.gender} onClick={() => setStep(2)}>Continue →</button>
    </div>,

    /* Step 2 — Goal */
    <div key="goal" className="fu" style={{ padding: "44px 24px", opacity: 0 }}>
      <h2 className="BN" style={{ fontSize: 52, marginBottom: 6 }}>MY GOAL IS...</h2>
      <p style={{ color: "rgba(255,255,255,.45)", fontSize: 15, marginBottom: 28 }}>This shapes your entire program</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {[
          { v: "weightLoss",     e: "🔥", l: "Lose Weight & Tone",       d: "Burn fat and reveal a leaner, defined physique" },
          { v: "muscleGain",     e: "💪", l: "Build Muscle & Strength",   d: "Add lean mass and increase strength progressively" },
          { v: "generalFitness", e: "⚡", l: "General Health & Fitness",  d: "Boost energy, endurance, and overall wellbeing" },
        ].map(g => (
          <button key={g.v} onClick={() => upd("goal", g.v)} style={{
            background: data.goal === g.v ? "rgba(168,255,62,.08)" : "rgba(12,18,32,.98)",
            border: `2px solid ${data.goal === g.v ? "#A8FF3E" : "rgba(255,255,255,.07)"}`,
            borderRadius: 16, padding: "18px 20px", cursor: "pointer", textAlign: "left", transition: ".2s",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <span style={{ fontSize: 36, flexShrink: 0 }}>{g.e}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{g.l}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>{g.d}</div>
            </div>
            {data.goal === g.v && <CheckCircle size={18} color="#A8FF3E" style={{ flexShrink: 0 }} />}
          </button>
        ))}
      </div>
      <button className="pb" disabled={!data.goal} onClick={() => setStep(3)}>Continue →</button>
    </div>,

    /* Step 3 — Level */
    <div key="level" className="fu" style={{ padding: "44px 24px", opacity: 0 }}>
      <h2 className="BN" style={{ fontSize: 52, marginBottom: 6 }}>FITNESS LEVEL?</h2>
      <p style={{ color: "rgba(255,255,255,.45)", fontSize: 15, marginBottom: 28 }}>Be honest — we'll find your perfect starting point</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {[
          { v: "beginner",     e: "🌱", l: "Beginner",     d: "New to fitness or returning after a long break" },
          { v: "intermediate", e: "🏃", l: "Intermediate", d: "Training consistently for 6+ months with solid form" },
          { v: "advanced",     e: "🦁", l: "Advanced",     d: "2+ years of structured, progressive training" },
        ].map(l => (
          <button key={l.v} onClick={() => upd("level", l.v)} style={{
            background: data.level === l.v ? "rgba(168,255,62,.08)" : "rgba(12,18,32,.98)",
            border: `2px solid ${data.level === l.v ? "#A8FF3E" : "rgba(255,255,255,.07)"}`,
            borderRadius: 16, padding: "18px 20px", cursor: "pointer", textAlign: "left", transition: ".2s",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <span style={{ fontSize: 36, flexShrink: 0 }}>{l.e}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{l.l}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>{l.d}</div>
            </div>
            {data.level === l.v && <CheckCircle size={18} color="#A8FF3E" style={{ flexShrink: 0 }} />}
          </button>
        ))}
      </div>
      <button className="pb" disabled={!data.level} onClick={() => onComplete(data)}>
        🚀 Launch My Program
      </button>
    </div>,
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#060912", maxWidth: 480, margin: "0 auto" }}>
      {/* Progress bar */}
      <div style={{ padding: "20px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.5)", padding: 0, display: "flex" }}>
              <ArrowLeft size={20} />
            </button>
          )}
          <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,.07)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg,#A8FF3E,#00E5AA)", borderRadius: 2, width: `${((step + 1) / 4) * 100}%`, transition: "width .35s ease" }} />
          </div>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.3)", fontWeight: 600, flexShrink: 0 }}>Step {step + 1} of 4</span>
        </div>
      </div>
      {steps[step]}
    </div>
  );
}

/* ══════════════════════════════ HOME TAB ════════════════════════════════════ */
function HomeTab({ user, setUser, onUpgrade, setActiveWO }) {
  const goalLabel = GOAL_LABELS[user.goal] || "Fitness";
  const allWO = getWorkouts(user);
  const todayWO = allWO[0] || null;

  return (
    <div style={{ padding: "24px 20px 110px" }}>
      {/* Greeting */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 26 }}>
        <div>
          <p style={{ color: "rgba(255,255,255,.38)", fontSize: 14, marginBottom: 2 }}>Good morning 👋</p>
          <h2 className="BN" style={{ fontSize: 40 }}>{user.name || "Athlete"}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 5 }}>
            <Flame size={14} color="#FF4757" />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,.55)" }}>
              <b style={{ color: "#FF4757" }}>{user.streak}</b> day streak 🔥
            </span>
          </div>
        </div>
        <div style={{ textAlign: "right", background: "rgba(168,255,62,.08)", border: "1px solid rgba(168,255,62,.18)", borderRadius: 14, padding: "10px 14px" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", fontWeight: 600, letterSpacing: .6, marginBottom: 3 }}>GOAL</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#A8FF3E", maxWidth: 90, textAlign: "right" }}>{goalLabel}</div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="card" style={{ padding: 20, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Weekly Progress</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.38)", marginTop: 2 }}>{user.weeklyDone} of {user.weeklyGoal} workouts done</div>
          </div>
          <div className="BN gt" style={{ fontSize: 42 }}>{Math.round((user.weeklyDone / user.weeklyGoal) * 100)}%</div>
        </div>
        <div style={{ height: 7, background: "rgba(255,255,255,.07)", borderRadius: 4, marginBottom: 14, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg,#A8FF3E,#00E5AA)", borderRadius: 4, width: `${(user.weeklyDone / user.weeklyGoal) * 100}%`, transition: "width .6s ease" }} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ width: "100%", aspectRatio: "1", borderRadius: 8, marginBottom: 4, background: i < user.weeklyDone ? "#A8FF3E" : "rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "center", transition: ".2s" }}>
                {i < user.weeklyDone && <CheckCircle size={11} color="#060912" />}
              </div>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,.25)", fontWeight: 600 }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[
          { l: "Workouts",  v: user.total,                       icon: <Trophy size={15} color="#FFB800" /> },
          { l: "This Week", v: `${user.weeklyDone}/${user.weeklyGoal}`, icon: <Target size={15} color="#A8FF3E" /> },
          { l: "Day Streak",v: `${user.streak}d`,               icon: <Flame  size={15} color="#FF4757" /> },
        ].map(s => (
          <div key={s.l} className="glass" style={{ padding: "14px 10px", textAlign: "center" }}>
            <div style={{ marginBottom: 6, display: "flex", justifyContent: "center" }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{s.v}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)", marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Today's Workout */}
      {todayWO && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Today's Workout</div>
          </div>
          <div className="card" style={{ padding: 20, cursor: "pointer", border: "1px solid rgba(168,255,62,.14)", transition: ".2s" }} onClick={() => setActiveWO(todayWO)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ flex: 1, paddingRight: 14 }}>
                <span style={{ background: todayWO.color + "22", color: todayWO.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 8 }}>{todayWO.tag}</span>
                <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 5 }}>{todayWO.name}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.4 }}>{todayWO.desc}</div>
              </div>
              <div style={{ background: `${todayWO.color}18`, border: `1px solid ${todayWO.color}35`, borderRadius: 14, padding: "12px 14px", textAlign: "center", flexShrink: 0 }}>
                <div className="BN" style={{ fontSize: 28, color: todayWO.color, lineHeight: 1 }}>{todayWO.min}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)" }}>MIN</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, marginBottom: 16 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(255,255,255,.45)" }}><Flame    size={12} color="#FF4757" />{todayWO.cal} kcal</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(255,255,255,.45)" }}><Activity  size={12} color="#A8FF3E" />{todayWO.lvl}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(255,255,255,.45)" }}><Clock     size={12} color="#45B7D1" />{todayWO.ex.length} exercises</span>
            </div>
            <button className="pb" style={{ padding: 13 }} onClick={e => { e.stopPropagation(); setActiveWO(todayWO); }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Play size={15} fill="#060912" />Start Workout
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Pro Banner / Active Badge */}
      {!user.isPro ? (
        <div style={{ background: "linear-gradient(135deg,rgba(255,184,0,.12),rgba(255,107,0,.08))", border: "1px solid rgba(255,184,0,.22)", borderRadius: 20, padding: 20, cursor: "pointer" }} onClick={onUpgrade}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <Star size={18} color="#FFB800" fill="#FFB800" />
            <span style={{ fontWeight: 700, fontSize: 15 }}>Unlock Pro Features</span>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.5, marginBottom: 14 }}>Full nutrition plans, unlimited workouts, macro tracking, and AI coaching — all yours.</p>
          <div style={{ display: "inline-block", background: "linear-gradient(135deg,#FFB800,#FF7A00)", color: "#060912", fontWeight: 700, fontSize: 14, padding: "11px 20px", borderRadius: 12, cursor: "pointer" }}>
            Upgrade — $9.99/mo
          </div>
        </div>
      ) : (
        <div style={{ background: "rgba(168,255,62,.06)", border: "1px solid rgba(168,255,62,.12)", borderRadius: 20, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ background: "rgba(168,255,62,.12)", borderRadius: 14, padding: 12, flexShrink: 0 }}><Award size={22} color="#A8FF3E" /></div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Pro Member 🏆</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.4)", marginTop: 2 }}>All features unlocked. Keep pushing!</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════ WORKOUTS TAB ════════════════════════════════ */
function WorkoutsTab({ user, setActiveWO }) {
  const [wFilter, setWFilter] = useState("all");
  const allWO = getWorkouts(user);
  const tags = ["all", ...new Set(allWO.map(w => w.tag))];
  const filtered = wFilter === "all" ? allWO : allWO.filter(w => w.tag === wFilter);

  return (
    <div style={{ padding: "24px 20px 110px" }}>
      <h2 className="BN" style={{ fontSize: 44, marginBottom: 4 }}>YOUR WORKOUTS</h2>
      <p style={{ color: "rgba(255,255,255,.38)", fontSize: 14, marginBottom: 20 }}>{allWO.length} workouts · {GOAL_LABELS[user.goal] || "Fitness"}</p>

      {/* Filter pills */}
      <div className="sh" style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 20, paddingBottom: 2 }}>
        {tags.map(t => (
          <button key={t} onClick={() => setWFilter(t)} style={{
            background: wFilter === t ? "#A8FF3E" : "rgba(255,255,255,.05)",
            color: wFilter === t ? "#060912" : "rgba(255,255,255,.55)",
            border: "none", borderRadius: 30, padding: "8px 18px",
            fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
            fontFamily: "'Outfit',sans-serif", transition: ".2s", flexShrink: 0,
          }}>{t === "all" ? "All" : t}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(w => (
          <div key={w.id} className="card" style={{ padding: 18, cursor: "pointer", transition: ".15s" }} onClick={() => setActiveWO(w)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ flex: 1, paddingRight: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{w.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", lineHeight: 1.4 }}>{w.desc}</div>
              </div>
              <div style={{ background: `${w.color}18`, border: `1px solid ${w.color}30`, borderRadius: 12, padding: "10px 12px", flexShrink: 0, textAlign: "center" }}>
                <div className="BN" style={{ fontSize: 24, color: w.color, lineHeight: 1 }}>{w.min}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.3)" }}>MIN</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "rgba(255,255,255,.4)" }}><Flame    size={11} color="#FF4757" />{w.cal} kcal</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "rgba(255,255,255,.4)" }}><BarChart3 size={11} color="#A8FF3E" />{w.lvl}</span>
              <span style={{ marginLeft: "auto", background: `${w.color}22`, color: w.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{w.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════ NUTRITION TAB ═══════════════════════════════ */
function NutritionTab({ user, onUpgrade }) {
  const [mealOpen, setMealOpen] = useState(null);

  if (!user.isPro) {
    return (
      <div style={{ padding: "60px 24px 110px", textAlign: "center" }}>
        <div style={{ fontSize: 68, marginBottom: 20 }}>🥗</div>
        <h2 className="BN" style={{ fontSize: 52, marginBottom: 12 }}>NUTRITION<br />IS A <span className="gp">PRO</span><br />FEATURE</h2>
        <p style={{ color: "rgba(255,255,255,.45)", fontSize: 15, lineHeight: 1.7, maxWidth: 280, margin: "0 auto 32px" }}>
          Unlock personalized meal plans, macro targets, and daily nutrition guidance.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          {["Daily macro calculator (protein, carbs, fat)", "7-day personalized meal plans", "Ingredient lists & prep times", "Calorie targets for your goal", "Pro nutrition tips & guidance"].map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,184,0,.07)", border: "1px solid rgba(255,184,0,.14)", borderRadius: 12, padding: "12px 16px", textAlign: "left", fontSize: 13, color: "rgba(255,255,255,.7)" }}>
              <CheckCircle size={13} color="#FFB800" style={{ flexShrink: 0 }} />{f}
            </div>
          ))}
        </div>
        <button className="goldbtn" onClick={onUpgrade}>Unlock Nutrition — $9.99/mo</button>
      </div>
    );
  }

  const goal   = user.goal   || "generalFitness";
  const gender = user.gender || "male";
  const macros = NUTRITION_DATA[goal]?.[gender] || { cal: 2000, p: 150, c: 200, f: 65 };
  const meals  = NUTRITION_DATA[goal]?.meals || [];

  // Simulate partial daily progress
  const done = { p: Math.round(macros.p * 0.62), c: Math.round(macros.c * 0.55), f: Math.round(macros.f * 0.68) };

  return (
    <div style={{ padding: "24px 20px 110px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <h2 className="BN" style={{ fontSize: 44 }}>NUTRITION</h2>
        <span style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)", color: "#060912", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 10, alignSelf: "center" }}>PRO</span>
      </div>
      <p style={{ color: "rgba(255,255,255,.38)", fontSize: 14, marginBottom: 22 }}>Optimized for {GOAL_LABELS[goal]}</p>

      {/* Macro Tracker */}
      <div className="card" style={{ padding: 20, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Daily Targets</span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,.4)" }}><b style={{ color: "#A8FF3E", fontSize: 18 }}>{macros.cal}</b> kcal</span>
        </div>
        {[
          { l: "Protein",      v: done.p, max: macros.p, c: "#4ECDC4" },
          { l: "Carbohydrates",v: done.c, max: macros.c, c: "#A8FF3E" },
          { l: "Fats",         v: done.f, max: macros.f, c: "#FFB800" },
        ].map(m => (
          <div key={m.l} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
              <span style={{ color: "rgba(255,255,255,.65)", fontWeight: 600 }}>{m.l}</span>
              <span style={{ color: "rgba(255,255,255,.35)" }}><b style={{ color: "#fff" }}>{m.v}g</b> / {m.max}g</span>
            </div>
            <div style={{ height: 8, background: "rgba(255,255,255,.06)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", background: m.c, borderRadius: 4, width: `${Math.min((m.v / m.max) * 100, 100)}%`, transition: "width .5s ease" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Macro summary pills */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        {[{ l: "Protein", v: macros.p, c: "#4ECDC4" }, { l: "Carbs", v: macros.c, c: "#A8FF3E" }, { l: "Fat", v: macros.f, c: "#FFB800" }].map(n => (
          <div key={n.l} className="glass" style={{ padding: "14px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: n.c }}>{n.v}<span style={{ fontSize: 12 }}>g</span></div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.38)", marginTop: 3 }}>{n.l}</div>
          </div>
        ))}
      </div>

      {/* Meal plan */}
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Today's Meal Plan</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {meals.map((meal, i) => (
          <div key={i} className="card" style={{ padding: "16px 18px", cursor: "pointer", border: mealOpen === i ? "1px solid rgba(168,255,62,.18)" : "1px solid rgba(255,255,255,.04)", transition: ".2s" }} onClick={() => setMealOpen(mealOpen === i ? null : i)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", marginBottom: 3 }}>{meal.t}</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{meal.name}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 14 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#A8FF3E" }}>{meal.cal}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.28)" }}>kcal</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              {[{ l: "P", v: meal.p, c: "#4ECDC4" }, { l: "C", v: meal.c, c: "#A8FF3E" }, { l: "F", v: meal.f, c: "#FFB800" }].map(n => (
                <span key={n.l} style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}><b style={{ color: n.c }}>{n.v}g</b> {n.l}</span>
              ))}
              <div style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,.28)", display: "flex", alignItems: "center", gap: 3 }}>
                <Clock size={10} />{meal.prep}
              </div>
            </div>
            {mealOpen === i && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.05)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.35)", letterSpacing: .8, marginBottom: 10, textTransform: "uppercase" }}>Ingredients</div>
                {meal.ing.map((ing, j) => (
                  <div key={j} style={{ fontSize: 13, color: "rgba(255,255,255,.65)", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.04)", display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ color: "#A8FF3E", fontSize: 16, lineHeight: 1 }}>·</span>{ing}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════ PROFILE TAB ═════════════════════════════════ */
function ProfileTab({ user, onUpgrade, onReset }) {
  const goalLabel = GOAL_LABELS[user.goal] || "—";

  return (
    <div style={{ padding: "24px 20px 110px" }}>
      {/* Avatar + Name */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: "linear-gradient(135deg,#A8FF3E,#00E5AA)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span className="BN" style={{ fontSize: 30, color: "#060912" }}>{(user.name || "A")[0].toUpperCase()}</span>
        </div>
        <div>
          <h2 className="BN" style={{ fontSize: 36 }}>{user.name || "Athlete"}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            {user.isPro
              ? <span style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)", color: "#060912", fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 10 }}>PRO</span>
              : <span style={{ background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.45)", fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 10 }}>FREE</span>
            }
            <span style={{ fontSize: 13, color: "rgba(255,255,255,.35)" }}>Member</span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
        {[
          { e: "🔥", l: "Day Streak",    v: user.streak },
          { e: "💪", l: "Workouts Done", v: user.total },
          { e: "🎯", l: "Goal",          v: goalLabel.split(" ").slice(0, 2).join(" ") },
          { e: "⚡", l: "Level",         v: LEVEL_LABELS[user.level] || "—" },
        ].map(s => (
          <div key={s.l} className="card" style={{ padding: "16px 14px" }}>
            <div style={{ fontSize: 26, marginBottom: 6 }}>{s.e}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{s.v}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.38)" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Program details */}
      <div style={{ fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,.28)", letterSpacing: .9, marginBottom: 10, textTransform: "uppercase" }}>Program</div>
      <div className="card" style={{ padding: "2px 0", marginBottom: 16 }}>
        {[
          { l: "Gender", v: user.gender === "male" ? "Male ♂" : "Female ♀" },
          { l: "Goal",   v: goalLabel },
          { l: "Level",  v: LEVEL_LABELS[user.level] || "—" },
        ].map((item, i, arr) => (
          <div key={item.l} style={{ padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none" }}>
            <span style={{ fontSize: 15, color: "rgba(255,255,255,.65)" }}>{item.l}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,.38)" }}>{item.v}</span>
          </div>
        ))}
      </div>

      {!user.isPro
        ? <button className="goldbtn" style={{ marginBottom: 12 }} onClick={onUpgrade}>⭐ Upgrade to Pro — $9.99/mo</button>
        : <div style={{ background: "rgba(168,255,62,.05)", border: "1px solid rgba(168,255,62,.1)", borderRadius: 16, padding: 16, textAlign: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>🏆</div>
            <div style={{ fontWeight: 700 }}>Pro Active — All Features Unlocked</div>
          </div>
      }
      <button className="gb" onClick={onReset}>← Return to Start</button>
    </div>
  );
}

/* ══════════════════════════════ WORKOUT MODAL ═══════════════════════════════ */
function WorkoutModal({ wo, onClose, onComplete }) {
  if (!wo) return null;
  return (
    <div className="mbg" onClick={onClose}>
      <div className="mbox" onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ flex: 1, paddingRight: 12 }}>
            <span style={{ background: wo.color + "22", color: wo.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 8 }}>{wo.tag}</span>
            <h3 className="BN" style={{ fontSize: 38, lineHeight: 1, marginBottom: 6 }}>{wo.name}</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.5 }}>{wo.desc}</p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.07)", border: "none", borderRadius: 10, padding: 8, cursor: "pointer", flexShrink: 0 }}>
            <X size={18} color="rgba(255,255,255,.6)" />
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {[{ v: `${wo.min} min`, l: "Duration", c: "#A8FF3E" }, { v: `${wo.cal} kcal`, l: "Calories", c: "#FF4757" }, { v: wo.lvl, l: "Level", c: "#FFB800" }].map(s => (
            <div key={s.l} style={{ flex: 1, background: "rgba(255,255,255,.04)", borderRadius: 12, padding: "12px 8px", textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: s.c, marginBottom: 3 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)" }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.3)", letterSpacing: .9, textTransform: "uppercase", marginBottom: 12 }}>
          Exercises · {wo.ex.length} total
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {wo.ex.map((e, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,.04)", borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: `${wo.color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: wo.color }}>{i + 1}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{e.n}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.38)", marginTop: 2 }}>{e.s} sets × {e.r}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.25)", marginBottom: 1 }}>Rest</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.5)" }}>{e.rest}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="pb" onClick={onComplete}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <CheckCircle size={16} />Mark Workout Complete
          </span>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════ UPGRADE MODAL ═══════════════════════════════ */
function UpgradeModal({ onClose, onPay }) {
  const [processing, setProcessing] = useState(false);
  const handlePay = () => {
    setProcessing(true);
    onPay(() => setProcessing(false));
  };
  return (
    <div className="mbg" onClick={onClose}>
      <div className="mbox" onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <Star size={18} color="#FFB800" fill="#FFB800" />
              <span style={{ fontWeight: 700, fontSize: 18 }}>Upgrade to Pro</span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)" }}>Unlock everything · Cancel anytime</p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,.07)", border: "none", borderRadius: 10, padding: 8, cursor: "pointer" }}>
            <X size={18} color="rgba(255,255,255,.6)" />
          </button>
        </div>

        <div style={{ background: "linear-gradient(135deg,rgba(255,184,0,.12),rgba(255,107,0,.08))", border: "1px solid rgba(255,184,0,.2)", borderRadius: 16, padding: "16px 20px", marginBottom: 18 }}>
          <div className="BN gp" style={{ fontSize: 50 }}>$9.99<span style={{ fontSize: 20, color: "rgba(255,255,255,.35)", fontFamily: "Outfit,sans-serif" }}>/month</span></div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.35)", marginTop: 2 }}>or $79.99/year · save 33% 🎉</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {[
            { e: "🥗", t: "Full Nutrition Plans",   d: "7-day meal plans + macro tracking" },
            { e: "💪", t: "Unlimited Workouts",      d: "Access all 200+ programs" },
            { e: "🤖", t: "AI Coaching",              d: "Daily personalized guidance" },
            { e: "📊", t: "Advanced Analytics",       d: "Deep progress tracking & insights" },
            { e: "🎯", t: "Custom Programs",           d: "Build your own workout schedules" },
            { e: "🚫", t: "Ad-Free",                  d: "Zero interruptions" },
          ].map(f => (
            <div key={f.t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
              <span style={{ fontSize: 22, width: 30, textAlign: "center", flexShrink: 0 }}>{f.e}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{f.t}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.38)", marginTop: 1 }}>{f.d}</div>
              </div>
              <CheckCircle size={14} color="#FFB800" style={{ flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* Stripe Payment Form UI */}
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Shield size={14} color="#A8FF3E" />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)", fontWeight: 600, letterSpacing: .3 }}>SECURED BY STRIPE</span>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              {["💳", "🔒"].map(e => <span key={e} style={{ fontSize: 14 }}>{e}</span>)}
            </div>
          </div>
          <input placeholder="Card number  1234 5678 9012 3456" style={{ marginBottom: 10, fontSize: 14 }} readOnly />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <input placeholder="MM / YY" style={{ fontSize: 14 }} readOnly />
            <input placeholder="CVC" style={{ fontSize: 14 }} readOnly />
          </div>
          <input placeholder="Full name on card" style={{ fontSize: 14 }} readOnly />
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.25)", marginTop: 10, textAlign: "center" }}>
            🔒 256-bit SSL encryption · PCI DSS compliant
          </div>
        </div>

        <button className="goldbtn" onClick={handlePay} disabled={processing}>
          {processing
            ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #060912", borderTopColor: "transparent", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
                Processing Payment...
              </span>
            : "🔒 Subscribe — $9.99/month"
          }
        </button>
        <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,.25)", marginTop: 10 }}>
          7-day free trial · Cancel anytime · No hidden fees
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════ HELPERS ═════════════════════════════════════ */
function getWorkouts(user) {
  const genderData = WORKOUT_DATA[user.gender] || WORKOUT_DATA.male;
  const goalKey    = user.goal || "generalFitness";
  const goalWOs    = genderData[goalKey]    || [];
  const generalWOs = genderData.generalFitness || [];
  const merged = [...goalWOs, ...generalWOs];
  // Deduplicate by id
  return merged.filter((w, i, arr) => arr.findIndex(x => x.id === w.id) === i);
}

/* ══════════════════════════════ ROOT COMPONENT ══════════════════════════════ */
export default function FitPro() {
  const [view, setView]           = useState("landing");   // landing | onboarding | app
  const [tab, setTab]             = useState("home");
  const [showUpgrade, setUpgrade] = useState(false);
  const [activeWO, setActiveWO]   = useState(null);
  const [user, setUser] = useState({
    name: "", gender: null, goal: null, level: null,
    isPro: false, streak: 7, total: 12, weeklyGoal: 4, weeklyDone: 2,
  });

  const updUser = (k, v) => setUser(u => ({ ...u, [k]: v }));

  const handleOnboardComplete = (data) => {
    setUser(u => ({ ...u, ...data }));
    setView("app");
    setTab("home");
  };

  const handlePay = (onDone) => {
    setTimeout(() => {
      updUser("isPro", true);
      setUpgrade(false);
      onDone();
    }, 2200);
  };

  const handleMarkComplete = () => {
    updUser("total", user.total + 1);
    updUser("weeklyDone", Math.min(user.weeklyDone + 1, user.weeklyGoal));
    setActiveWO(null);
  };

  /* ── Landing ── */
  if (view === "landing") {
    return (
      <>
        <GlobalStyles />
        <LandingPage onStart={() => setView("onboarding")} />
      </>
    );
  }

  /* ── Onboarding ── */
  if (view === "onboarding") {
    return (
      <>
        <GlobalStyles />
        <Onboarding onComplete={handleOnboardComplete} />
      </>
    );
  }

  /* ── Main App ── */
  const TABS = [
    { id: "home",      label: "Home",      icon: <Home      size={22} /> },
    { id: "workouts",  label: "Workouts",  icon: <Dumbbell  size={22} /> },
    { id: "nutrition", label: "Nutrition", icon: <Apple     size={22} /> },
    { id: "profile",   label: "Profile",   icon: <User      size={22} /> },
  ];

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: "100vh", background: "#060912", maxWidth: 480, margin: "0 auto", position: "relative" }}>

        {/* Top Nav */}
        <div className="topbar">
          <span className="BN gt" style={{ fontSize: 26 }}>FITPRO</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {user.isPro
              ? <span style={{ background: "linear-gradient(135deg,#FFB800,#FF6B00)", color: "#060912", fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 10 }}>PRO ✓</span>
              : <button onClick={() => setUpgrade(true)} style={{ background: "rgba(255,184,0,.1)", border: "1px solid rgba(255,184,0,.25)", borderRadius: 10, padding: "6px 14px", fontSize: 12, fontWeight: 700, color: "#FFB800", cursor: "pointer", fontFamily: "'Outfit',sans-serif", letterSpacing: .3 }}>
                  ⭐ Go Pro
                </button>
            }
          </div>
        </div>

        {/* Tab Content */}
        {tab === "home"      && <HomeTab      user={user} setUser={setUser} onUpgrade={() => setUpgrade(true)} setActiveWO={setActiveWO} />}
        {tab === "workouts"  && <WorkoutsTab  user={user} setActiveWO={setActiveWO} />}
        {tab === "nutrition" && <NutritionTab user={user} onUpgrade={() => setUpgrade(true)} />}
        {tab === "profile"   && <ProfileTab   user={user} onUpgrade={() => setUpgrade(true)} onReset={() => setView("landing")} />}

        {/* Tab Bar */}
        <div className="tabbar">
          {TABS.map(t => (
            <button key={t.id} className={`tbtn${tab === t.id ? " on" : ""}`} onClick={() => setTab(t.id)}>
              {t.icon}<span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Modals */}
        <WorkoutModal
          wo={activeWO}
          onClose={() => setActiveWO(null)}
          onComplete={handleMarkComplete}
        />
        {showUpgrade && (
          <UpgradeModal
            onClose={() => setUpgrade(false)}
            onPay={handlePay}
          />
        )}
      </div>
    </>
  );
}
