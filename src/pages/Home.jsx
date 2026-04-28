// Landing page that introduces ChainVote
// First thing users see, explains what the app does

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // Shared button styling
  const btnBase = {
    padding: "14px 32px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    border: "none",
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
      <h1
        style={{
          fontSize: "48px",
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: "20px",
          color: "#818cf8",
        }}
      >
        Voting You Can Verify
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#94a3b8",
          lineHeight: 1.7,
          maxWidth: "520px",
          margin: "0 auto 40px auto",
        }}
      >
        Create proposals, cast votes, and trust the results. Every vote is recorded on the
        blockchain where anyone can verify it.
      </p>

      {/* Main call-to-action buttons */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "80px" }}>
        <button
          style={{ ...btnBase, background: "linear-gradient(135deg, #6366f1, #a78bfa)", color: "white" }}
          onClick={() => navigate("/proposals")}
        >
          View Proposals
        </button>
        <button
          style={{
            ...btnBase,
            background: "transparent",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            color: "#94a3b8",
          }}
          onClick={() => navigate("/create")}
        >
          Create One
        </button>
      </div>

      {/* Three feature cards explaining the value of on-chain voting */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", textAlign: "left" }}>
        {[
          {
            icon: "🔗",
            title: "On-Chain",
            desc: "Votes are stored on the Ethereum blockchain, not a private server",
          },
          {
            icon: "🔒",
            title: "One Wallet, One Vote",
            desc: "Smart contract prevents double voting automatically",
          },
          {
            icon: "👁",
            title: "Fully Transparent",
            desc: "Anyone can verify results by reading the contract directly",
          },
        ].map((f, i) => (
          <div
            key={i}
            style={{
              background: "rgba(30, 41, 59, 0.6)",
              border: "1px solid rgba(99, 102, 241, 0.15)",
              borderRadius: "14px",
              padding: "24px",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>{f.icon}</div>
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#f1f5f9", marginBottom: "8px" }}>
              {f.title}
            </h3>
            <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.5 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}