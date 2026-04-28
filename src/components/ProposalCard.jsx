// Reusable card that shows a proposal summary
// Used on both the Proposals page and the My Votes page

import { useNavigate } from "react-router-dom";

export default function ProposalCard({ proposal, voteLabel }) {
  const navigate = useNavigate();

  const total = proposal.votesFor + proposal.votesAgainst;
  const forPercent = total > 0 ? Math.round((proposal.votesFor / total) * 100) : 50;

  // Shorten wallet addresses so they fit nicely
  function shortAddr(addr) {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  // Turn a timestamp into a readable date
  function formatDate(ms) {
    return new Date(ms).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div
      onClick={() => navigate("/proposal/" + proposal.id)}
      style={{
        background: "rgba(30, 41, 59, 0.6)",
        border: "1px solid rgba(99, 102, 241, 0.15)",
        borderRadius: "16px",
        padding: "24px",
        cursor: "pointer",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.4)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.15)")}
    >
      {/* ID and date */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <span style={{ fontSize: "13px", color: "#6366f1", fontWeight: 600, fontFamily: "monospace" }}>
          #{proposal.id}
        </span>
        <span style={{ fontSize: "12px", color: "#475569" }}>{formatDate(proposal.createdAt)}</span>
      </div>

      <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#f1f5f9", margin: "0 0 8px 0" }}>
        {proposal.title}
      </h3>

      {/* Truncate long descriptions */}
      <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.6, margin: "0 0 12px 0" }}>
        {proposal.description.length > 120
          ? proposal.description.slice(0, 120) + "..."
          : proposal.description}
      </p>

      <p style={{ fontSize: "12px", color: "#475569", fontFamily: "monospace", marginBottom: "16px" }}>
        by {shortAddr(proposal.creator)}
      </p>

      {/* Vote progress bar */}
      <div
        style={{
          height: "6px",
          background: "rgba(239, 68, 68, 0.3)",
          borderRadius: "3px",
          overflow: "hidden",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: forPercent + "%",
            background: "linear-gradient(90deg, #6366f1, #818cf8)",
            borderRadius: "3px",
          }}
        />
      </div>

      {/* Vote counts */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
        <span style={{ color: "#818cf8", fontWeight: 500 }}>For: {proposal.votesFor}</span>
        <span style={{ color: "#f87171", fontWeight: 500 }}>Against: {proposal.votesAgainst}</span>
      </div>

      {/* If the user voted on this, show which way */}
      {voteLabel && (
        <p
          style={{
            marginTop: "12px",
            fontSize: "12px",
            fontStyle: "italic",
            textAlign: "center",
            color: voteLabel === "For" ? "#818cf8" : "#f87171",
          }}
        >
          You voted {voteLabel}
        </p>
      )}
    </div>
  );
}