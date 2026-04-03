export interface Quote {
  text: string;
  author: string;
}

export const QUOTES: Quote[] = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "It is not the mountain we conquer but ourselves.", author: "Sir Edmund Hillary" },
  { text: "Your mind is for having ideas, not holding them.", author: "David Allen" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "One day or day one. You decide.", author: "Anonymous" },
  { text: "Deep work is not some nostalgic affectation. It is a super power.", author: "Cal Newport" },
  { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
  { text: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" }
];

export const getRandomQuote = (): Quote => {
  const index = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[index];
};
