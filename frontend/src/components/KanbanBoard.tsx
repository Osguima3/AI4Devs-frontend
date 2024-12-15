import CandidateCard from "./CandidateCard";
import { InterviewStep, Candidate } from "../types/hiring";

interface KanbanBoardProps {
  steps: InterviewStep[];
  candidates: Candidate[];
}

const KanbanBoard = ({ steps, candidates }: KanbanBoardProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 p-4 min-w-max">
        {steps.map((step) => {
          const stepCandidates = candidates.filter(
            (candidate) => candidate.currentInterviewStep === step.name
          );

          return (
            <div
              key={step.id}
              className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow-sm"
            >
              <div className="p-3 border-b">
                <h3 className="font-medium text-gray-900">{step.name}</h3>
                <p className="text-sm text-gray-500">
                  {stepCandidates.length} candidates
                </p>
              </div>
              <div className="p-3 space-y-3">
                {stepCandidates.map((candidate, index) => (
                  <CandidateCard key={index} candidate={candidate} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;