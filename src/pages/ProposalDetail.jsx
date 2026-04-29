// Full view for a single proposal
// Reads real data from the blockchain but voting is not yet wired up

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContract } from "@thirdweb-dev/react";

const CONTRACT_ADDRESS = "0x7b15C88a3DE5e5d3F5A756554fb284411Ce620F1";

export default function ProposalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contract } = useContract(CONTRACT_ADDRESS);

  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [votedFor, setVotedFor] = useState(null);

  // Fetch this proposal's data from the contract
  useEffect(() => {
    async function fetch() {
      if (!contract) return;
      try {
        const p = await contract.call("getProposal", [id]);
        setProposal({
          id: Number(id),
          title: p.title,
          description: p.description,
          creator: p.creator,
          votesFor: p.votesFor.toNumber(),
          votesAgainst: p.votesAgainst.toNumber(),
          createdAt: p.createdAt.toNumber() * 1000,
        });
      } catch (err) {
        console.error("Failed to load proposal:", err);
      }
      setLoading(false);
    }
    fetch();
  }, [contract, id]);

  // Placeholder vote handler, blockchain write coming next
  function handleVote(support) {
    setVoted(true);
    setVotedFor(support);
    alert("Vote recorded locally. Blockchain transaction coming soon.");
  }

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

  if (loading) {
    return <p style={{ textAlign: "center", color: "#475569", padding: "64px 0" }}>Loading...</p>;
  }

  if (!proposal) {
    return <p style={{ textAlign: "center", color: "#f87171", padding: "64px 0" }}>Proposal not found.</p>;
  }

  const total = proposal.votesFor + proposal.votesAgainst;
  const forPercent = total > 0 ? Math.round((proposal.votesFor / total) * 100) : 50;

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

        <p style={{ fontSize: "13px", color: "#475569", fontFamily: "monospace", marginBottom: "28px" }}>
          Created by {shortAddr(proposal.creator)}
        </p>

        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "8px" }}>
            <span style={{ color: "#818cf8", fontWeight: 600 }}>For: {proposal.votesFor}</span>
            <span style={{ color: "#f87171", fontWeight: 600 }}>Against: {proposal.votesAgainst}</span>
          </div>
          <div style={{ height: "10px", background: "rgba(239, 68, 68, 0.25)", borderRadius: "5px", overflow: "hidden" }}>
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

        {!voted ? (
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              style={{ ...btnBase, background: "linear-gradient(135deg, #6366f1, #818cf8)", color: "white", border: "none" }}
              onClick={() => handleVote(true)}
            >
              Vote For
            </button>
            <button
              style={{ ...btnBase, background: "transparent", border: "1px solid rgba(248, 113, 113, 0.4)", color: "#f87171" }}
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