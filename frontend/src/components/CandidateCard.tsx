import React from 'react';
import { Candidate } from "../types/hiring";
import { Card } from 'react-bootstrap';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{candidate.fullName}</h5>
          <div className="d-flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-circle ${i < candidate.averageScore ? "bg-success" : "bg-secondary"}`}
                style={{ width: '10px', height: '10px' }}
              />
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CandidateCard;