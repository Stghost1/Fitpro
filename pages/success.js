/**
 * pages/success.js
 * Shown to users after a successful Stripe Checkout payment.
 */
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after 4 seconds
    const timer = setTimeout(() => router.push("/"), 4000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060912; font-family: 'Outfit', sans-serif; color: #fff; }
        .BN { font-family: 'Bebas Neue', cursive; }
        .gt { background: linear-gradient(135deg,#A8FF3E,#00E5AA); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24 }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🏆</div>
        <h1 className="BN gt" style={{ fontSize: 64, marginBottom: 12 }}>YOU'RE PRO!</h1>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,.6)", marginBottom: 8, maxWidth: 300, lineHeight: 1.6 }}>
          Your subscription is active. All features are now unlocked.
        </p>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.3)", marginBottom: 32 }}>
          Redirecting you back to the app…
        </p>

        <div style={{ width: 240, height: 4, background: "rgba(255,255,255,.07)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg,#A8FF3E,#00E5AA)", borderRadius: 2, animation: "fill 4s linear forwards" }} />
        </div>

        <style>{`
          @keyframes fill { from { width: 0; } to { width: 100%; } }
        `}</style>
      </div>
    </>
  );
}
