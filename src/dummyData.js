// Fake proposal data used across multiple pages
// This gets replaced with real blockchain reads later

const dummyProposals = [
  {
    id: 1,
    title: "Should we switch meetings to Thursday?",
    description:
      "A lot of members said Tuesday conflicts with their lab sections. Thursday at 6pm might work better for the whole group.",
    creator: "0x1234567890abcdef1234567890abcdef12345678",
    votesFor: 12,
    votesAgainst: 3,
    createdAt: Date.now() - 86400000,
  },
  {
    id: 2,
    title: "Fund a pizza party from the treasury",
    description:
      "We have leftover funds from last semester. This proposal is to spend $150 on an end-of-year pizza hangout for all members.",
    creator: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    votesFor: 8,
    votesAgainst: 8,
    createdAt: Date.now() - 172800000,
  },
  {
    id: 3,
    title: "Adopt a new logo for the DAO",
    description:
      "The current logo is from 2021. Three new designs were submitted and we need to pick one or keep the original.",
    creator: "0x9876543210fedcba9876543210fedcba98765432",
    votesFor: 5,
    votesAgainst: 1,
    createdAt: Date.now() - 3600000,
  },
];

export default dummyProposals;