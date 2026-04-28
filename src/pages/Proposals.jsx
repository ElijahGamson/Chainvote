// Shows all proposals as a grid of clickable cards
// Pulls from dummy data for now, blockchain reads replace this later

import dummyProposals from "../dummyData";
import ProposalCard from "../components/ProposalCard";

export default function Proposals() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 600, color: "#f1f5f9", marginBottom: "24px" }}>
        All Proposals
      </h2>

      {dummyProposals.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 24px",
            border: "1px dashed rgba(99, 102, 241, 0.3)",
            borderRadius: "16px",
          }}
        >
          <p style={{ color: "#475569" }}>No proposals yet. Be the first to create one.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "20px",
          }}
        >
          {dummyProposals.map((p) => (
            <ProposalCard key={p.id} proposal={p} />
          ))}
        </div>
      )}
    </div>
  );
}