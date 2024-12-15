import { Candidate } from "../types/hiring";

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
  return (
    <div className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">{candidate.fullName}</h4>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < candidate.averageScore
                  ? "bg-green-500"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;