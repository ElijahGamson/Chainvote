// Full view for a single proposal with description, results bar, and vote buttons
// Voting is local-only right now, blockchain write replaces this later

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dummyProposals from "../dummyData";

export default function ProposalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the matching proposal from dummy data
  const proposal = dummyProposals.find((p) => p.id === Number(id));

  // Track whether the user voted (local state only for now)
  const [voted, setVoted] = useState(false);
  const [votedFor, setVotedFor] = useState(null);

  if (!proposal) {
    return (
      <p style={{ textAlign: "center", color: "#f87171", padding: "64px 0" }}>Proposal not found.</p>
    );
  }

  const total = proposal.votesFor + proposal.votesAgainst;
  const forPercent = total > 0 ? Math.round((proposal.votesFor / total) * 100) : 50;

  function shortAddr(addr) {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  }

  function formatDate(ms) {
    return new Date(ms).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // Placeholder vote handler
  function handleVote(support) {
    setVoted(true);
    setVotedFor(support);
    alert("Vote recorded locally. Blockchain transaction goes here later.");
  }

  // Shared button style
  const btnBase = {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
      {/* Back link */}
      <button
        onClick={() => navigate("/proposals")}
        style={{
          background: "none",
          border: "none",
          color: "#475569",
          cursor: "pointer",
          fontSize: "14px",
          marginBottom: "24px",
          fontFamily: "inherit",
        }}
      >
        ← Back to Proposals
      </button>

      <div
        style={{
          background: "rgba(30, 41, 59, 0.6)",
          border: "1px solid rgba(99, 102, 241, 0.15)",
          borderRadius: "16px",
          padding: "32px",
        }}
      >
        {/* Header with proposal number and date */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <span style={{ fontSize: "14px", color: "#6366f1", fontWeight: 600, fontFamily: "monospace" }}>
            Proposal #{proposal.id}
          </span>
          <span style={{ fontSize: "13px", color: "#475569" }}>{formatDate(proposal.createdAt)}</span>
        </div>

        <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#f1f5f9", margin: "0 0 12px 0" }}>
          {proposal.title}
        </h2>

        <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: 1.7, marginBottom: "16px" }}>
          {proposal.description}
        </p>

        <p
          style={{
            fontSize: "13px",
            color: "#475569",
            fontFamily: "monospace",
            marginBottom: "28px",
          }}
        >
          Created by {shortAddr(proposal.creator)}
        </p>

        {/* Vote results */}
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            <span style={{ color: "#818cf8", fontWeight: 600 }}>For: {proposal.votesFor}</span>
            <span style={{ color: "#f87171", fontWeight: 600 }}>Against: {proposal.votesAgainst}</span>
          </div>
          <div
            style={{
              height: "10px",
              background: "rgba(239, 68, 68, 0.25)",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: forPercent + "%",
                background: "linear-gradient(90deg, #6366f1, #818cf8)",
                borderRadius: "5px",
              }}
            />
          </div>
          <p style={{ textAlign: "center", color: "#475569", fontSize: "13px", marginTop: "8px" }}>
            {total} total vote{total !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Vote buttons or confirmation message */}
        {!voted ? (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              style={{
                ...btnBase,
                background: "linear-gradient(135deg, #6366f1, #818cf8)",
                color: "white",
                border: "none",
              }}
              onClick={() => handleVote(true)}
            >
              Vote For
            </button>
            <button
              style={{
                ...btnBase,
                background: "transparent",
                border: "1px solid rgba(248, 113, 113, 0.4)",
                color: "#f87171",
              }}
              onClick={() => handleVote(false)}
            >
              Vote Against
            </button>
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#475569", fontStyle: "italic" }}>
            You voted {votedFor ? "For" : "Against"} this proposal
          </p>
        )}
      </div>
    </div>
  );
}