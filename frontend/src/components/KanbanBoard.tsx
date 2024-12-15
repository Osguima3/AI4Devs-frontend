import React from 'react';
import CandidateCard from "./CandidateCard";
import { InterviewStep, Candidate } from "../types/hiring";
import { Card, Row, Col } from 'react-bootstrap';

interface KanbanBoardProps {
  steps: InterviewStep[];
  candidates: Candidate[];
}

const KanbanBoard = ({ steps, candidates }: KanbanBoardProps) => {
  return (
    <Row>
      {steps.map((step) => {
        const stepCandidates = candidates.filter(
          (candidate) => candidate.currentInterviewStep === step.name
        );

        return (
          <Col md={4} key={step.id} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{step.name}</Card.Title>
                <Card.Text>{stepCandidates.length} candidates</Card.Text>
                {stepCandidates.map((candidate, index) => (
                  <CandidateCard key={index} candidate={candidate} />
                ))}
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default KanbanBoard;