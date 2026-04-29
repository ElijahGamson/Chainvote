// Shows which proposals the connected wallet has voted on
// Loops through all proposals and checks getVoterStatus for each

import { useState, useEffect } from "react";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import ProposalCard from "../components/ProposalCard";

const CONTRACT_ADDRESS = "0x7b15C88a3DE5e5d3F5A756554fb284411Ce620F1";

export default function MyVotes() {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: count } = useContractRead(contract, "getProposalCount");

  const [votedProposals, setVotedProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check every proposal to see if this wallet voted on it
  useEffect(() => {
    async function fetchMyVotes() {
      if (!contract || !count || !address) {
        setLoading(false);
        return;
      }

      const total = count.toNumber();
      const results = [];

      for (let i = 1; i <= total; i++) {
        try {
          const status = await contract.call("getVoterStatus", [i, address]);

          if (status.voted) {
            const p = await contract.call("getProposal", [i]);
            results.push({
              proposal: {
                id: i,
                title: p.title,
                description: p.description,
                creator: p.creator,
                votesFor: p.votesFor.toNumber(),
                votesAgainst: p.votesAgainst.toNumber(),
                createdAt: p.createdAt.toNumber() * 1000,
              },
              support: status.support ? "For" : "Against",
            });
          }
        } catch (err) {
          console.error("Error checking vote for proposal", i, err);
        }
      }

      setVotedProposals(results);
      setLoading(false);
    }

    fetchMyVotes();
  }, [contract, count, address]);

  if (!address) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <p style={{ color: "#475569", fontSize: "16px" }}>Connect your wallet to see your voting history.</p>
      </div>
    );
  }

  if (loading) {
    return <p style={{ textAlign: "center", color: "#475569", padding: "64px 0" }}>Loading your votes...</p>;
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 600, color: "#f1f5f9", marginBottom: "24px" }}>
        My Votes
      </h2>

      {votedProposals.length === 0 ? (
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
          {votedProposals.map((v) => (
            <ProposalCard key={v.proposal.id} proposal={v.proposal} voteLabel={v.support} />
          ))}
        </div>
      )}
    </div>
  );
}