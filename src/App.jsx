// Root component that defines the page layout and all routes

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Proposals from "./pages/Proposals";
import ProposalDetail from "./pages/ProposalDetail";
import CreateProposal from "./pages/CreateProposal";
import MyVotes from "./pages/MyVotes";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proposals" element={<Proposals />} />
        <Route path="/proposal/:id" element={<ProposalDetail />} />
        <Route path="/create" element={<CreateProposal />} />
        <Route path="/my-votes" element={<MyVotes />} />
      </Routes>
    </div>
  );
}