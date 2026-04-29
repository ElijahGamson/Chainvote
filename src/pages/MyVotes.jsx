// Shows which proposals the connected user has voted on
// Uses hardcoded data for now, blockchain reads get added later

import ProposalCard from "../components/ProposalCard";
import dummyProposals from "../dummyData";

const myVotes = [
  { proposalId: 1, support: "For" },
  { proposalId: 3, support: "Against" },
];

export default function MyVotes() {
  const votedItems = myVotes
    .map((v) => ({
      proposal: dummyProposals.find((p) => p.id === v.proposalId),
      support: v.support,
    }))
    .filter((v) => v.proposal);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 600, color: "#f1f5f9", marginBottom: "24px" }}>
        My Votes
      </h2>

      {votedItems.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 24px",
            border: "1px dashed rgba(99, 102, 241, 0.3)",
            borderRadius: "16px",
          }}
        >
          <p style={{ color: "#475569" }}>You have not voted on any proposals yet.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "20px",
          }}
        >
          {votedItems.map((v) => (
            <ProposalCard key={v.proposal.id} proposal={v.proposal} voteLabel={v.support} />
          ))}
        </div>
      )}
    </div>
  );
}