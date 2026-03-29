import "./ChallengeCard.css";

interface ChallengeProps {
  id: string | number;
  title: string;
  category: "web" | "crypto" | "pwn" | "reverse" | "misc";
  points: number;
  solves: number;
  isSolved?: boolean;
  onClick?: () => void;
}

export default function ChallengeCard({
  title,
  category,
  points,
  solves,
  isSolved = false,
  onClick,
}: ChallengeProps) {
  
  const getCategoryStyle = (cat: string) => {
    switch (cat) {
      case "web": return "cat-web";
      case "crypto": return "cat-crypto";
      case "pwn": return "cat-pwn";
      case "reverse": return "cat-reverse";
      default: return "cat-misc";
    }
  };

  return (
    <div 
      className={`glass-card chall-card ${isSolved ? "solved" : ""}`} 
      onClick={onClick}
    >
      <div className="chall-points">
        {points} <span>pts</span>
      </div>

      <span className={`chall-category ${getCategoryStyle(category)}`}>
        {category?.toUpperCase() || "MISC"}
      </span>

      <h3 className="chall-title">{title}</h3>

      <div className="chall-footer">
        <div className="chall-solves">
          <span className="icon">👥</span> {solves} solves
        </div>
        
        {isSolved ? (
          <div className="chall-status solved-text">
            <span>✓</span> Solved
          </div>
        ) : (
          <div className="chall-status pending-text">
            Unsolved
          </div>
        )}
      </div>
    </div>
  );
}