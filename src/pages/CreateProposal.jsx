// Form for submitting a new proposal to the blockchain
// Calls the createProposal function on the smart contract

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContract, useContractWrite, useAddress } from "@thirdweb-dev/react";

const CONTRACT_ADDRESS = "0x7b15C88a3DE5e5d3F5A756554fb284411Ce620F1";

export default function CreateProposal() {
  const navigate = useNavigate();
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: create, isLoading } = useContractWrite(contract, "createProposal");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Sends the proposal to the smart contract
  async function handleSubmit() {
    if (!address) {
      alert("Connect your wallet first");
      return;
    }
    if (!title.trim() || !description.trim()) {
      alert("Fill in both fields");
      return;
    }

    try {
      await create({ args: [title, description] });
      navigate("/proposals");
    } catch (err) {
      console.error("Create failed:", err);
      alert("Failed to create proposal");
    }
  }

  // Shared input styling
  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    background: "rgba(15, 23, 42, 0.6)",
    color: "#e2e8f0",
    fontSize: "15px",
    outline: "none",
    fontFamily: "inherit",
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "32px 24px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 600, color: "#f1f5f9", marginBottom: "20px" }}>
        Create a Proposal
      </h2>

      <div
        style={{
          background: "rgba(30, 41, 59, 0.6)",
          border: "1px solid rgba(99, 102, 241, 0.15)",
          borderRadius: "16px",
          padding: "28px",
        }}
      >
        <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>
          Title
        </label>
        <input
          style={inputStyle}
          placeholder="What are we voting on?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label
          style={{
            display: "block",
            fontSize: "13px",
            color: "#94a3b8",
            marginBottom: "6px",
            marginTop: "16px",
          }}
        >
          Description
        </label>
        <textarea
          style={{ ...inputStyle, resize: "vertical" }}
          placeholder="Give some context so voters understand what this is about"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />

        <button
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "24px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #6366f1, #a78bfa)",
            color: "white",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
          onClick={handleSubmit}
          disabled={isLoading || !address}
        >
          {isLoading ? "Submitting to chain..." : "Submit Proposal"}
        </button>

        {!address && (
          <p style={{ textAlign: "center", color: "#f59e0b", fontSize: "13px", marginTop: "12px" }}>
            Connect your wallet to create proposals
          </p>
        )}
      </div>
    </div>
  );
}