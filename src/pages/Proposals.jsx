// Shows all proposals by reading them from the smart contract
// Uses Thirdweb hooks to call getProposalCount and getProposal

import { useState, useEffect } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import ProposalCard from "../components/ProposalCard";

// Your deployed contract address on BNB Testnet
const CONTRACT_ADDRESS = "0x7b15C88a3DE5e5d3F5A756554fb284411Ce620F1";

export default function Proposals() {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { data: count } = useContractRead(contract, "getProposalCount");
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch every proposal from the contract when count updates
  useEffect(() => {
    async function fetchAll() {
      if (!contract || !count) return;

      const total = count.toNumber();
      const results = [];

      for (let i = 1; i <= total; i++) {
        try {
          const p = await contract.call("getProposal", [i]);
          results.push({
            id: i,
            title: p.title,
            description: p.description,
            creator: p.creator,
            votesFor: p.votesFor.toNumber(),
            votesAgainst: p.votesAgainst.toNumber(),
            createdAt: p.createdAt.toNumber() * 1000,
          });
        } catch (err) {
          console.error("Could not fetch proposal", i, err);
        }
      }

      setProposals(results);
      setLoading(false);
    }

    fetchAll();
  }, [contract, count]);

  if (loading) {
    return <p style={{ textAlign: "center", color: "#475569", padding: "64px 0" }}>Loading proposals...</p>;
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 600, color: "#f1f5f9", marginBottom: "24px" }}>
        All Proposals
      </h2>

      {proposals.length === 0 ? (
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
          {proposals.map((p) => (
            <ProposalCard key={p.id} proposal={p} />
          ))}
        </div>
      )}
    </div>
  );
}