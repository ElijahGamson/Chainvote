// Top navigation bar with links to each page and a placeholder wallet button

import { NavLink } from "react-router-dom";

export default function Navbar() {
  // Returns different styles depending on whether the link is active
  function getLinkStyle(isActive) {
    return {
      color: isActive ? "#a5b4fc" : "#94a3b8",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: isActive ? 600 : 400,
      padding: "6px 14px",
      borderRadius: "8px",
      background: isActive ? "rgba(99, 102, 241, 0.12)" : "transparent",
    };
  }

  return (
    <header
      style={{
        borderBottom: "1px solid rgba(99, 102, 241, 0.2)",
        background: "rgba(15, 23, 42, 0.9)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#818cf8",
              letterSpacing: "-0.5px",
            }}
          >
            ◆ ChainVote
          </span>
        </NavLink>

        <nav style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <NavLink to="/proposals" style={({ isActive }) => getLinkStyle(isActive)}>
            Proposals
          </NavLink>
          <NavLink to="/create" style={({ isActive }) => getLinkStyle(isActive)}>
            Create
          </NavLink>
          <NavLink to="/my-votes" style={({ isActive }) => getLinkStyle(isActive)}>
            My Votes
          </NavLink>

          {/* Placeholder button, Thirdweb ConnectWallet replaces this later */}
          <button
            style={{
              marginLeft: "12px",
              padding: "8px 16px",
              borderRadius: "10px",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              background: "rgba(99, 102, 241, 0.15)",
              color: "#a5b4fc",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
            onClick={() => alert("Thirdweb wallet connection goes here")}
          >
            Connect Wallet
          </button>
        </nav>
      </div>
    </header>
  );
}