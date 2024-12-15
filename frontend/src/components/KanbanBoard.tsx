import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CandidateCard from "./CandidateCard";
import { InterviewStep, Candidate } from "../types/hiring";
import { Card, Row, Col } from 'react-bootstrap';

interface KanbanBoardProps {
  steps: InterviewStep[];
  candidates: Candidate[];
}

const KanbanBoard = ({ steps, candidates }: KanbanBoardProps) => {
  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const candidateId = draggableId;
      const newStepId = destination.droppableId;

      try {
        await fetch(`http://localhost:3010/candidates/${candidateId}/stage`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            applicationId: candidateId,
            currentInterviewStep: newStepId,
          }),
        });
      } catch (error) {
        console.error('Failed to update candidate stage:', error);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row className="d-flex">
        {steps.map((step) => {
          const stepCandidates = candidates.filter(
            (candidate) => candidate.currentInterviewStep === step.name
          );

          return (
            <Col md={4} key={step.id} className="mb-4 d-flex flex-column">
              <Droppable droppableId={step.id.toString()}>
                {(provided) => (
                  <Card className="shadow-sm flex-grow-1" ref={provided.innerRef} {...provided.droppableProps}>
                    <Card.Body>
                      <Card.Title>{step.name}</Card.Title>
                      <Card.Text>{stepCandidates.length} candidates</Card.Text>
                      {stepCandidates.map((candidate, index) => (
                        <Draggable key={candidate.applicationId} draggableId={candidate.applicationId.toString()} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <CandidateCard candidate={candidate} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Card.Body>
                  </Card>
                )}
              </Droppable>
            </Col>
          );
        })}
      </Row>
    </DragDropContext>
  );
};

export default KanbanBoard;