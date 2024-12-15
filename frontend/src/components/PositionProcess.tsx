import React, { useEffect, useState } from 'react';
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Spinner, Alert, Button } from 'react-bootstrap';
import KanbanBoard from './KanbanBoard';

const PositionProcess: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [positionData, setPositionData] = useState<any>(null);
    const [candidates, setCandidates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPositionData = async () => {
            try {
                const response = await fetch(`http://localhost:3010/position/${id}/interviewFlow`);
                if (!response.ok) {
                    throw new Error('Failed to fetch position data');
                }
                const data = await response.json();
                setPositionData(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        const fetchCandidates = async () => {
            try {
                const response = await fetch(`http://localhost:3010/position/${id}/candidates`);
                if (!response.ok) {
                    throw new Error('Failed to fetch candidates');
                }
                const data = await response.json();
                setCandidates(data);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchPositionData();
        fetchCandidates();
    }, [id]);

    const handleBackClick = () => {
        navigate('/positions');
    };

    if (loading) {
        return (
            <Container className="mt-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <div className="d-flex align-items-center mb-4">
                <Button variant="link" onClick={handleBackClick}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="ms-3">{positionData?.interviewFlow?.positionName}</h1>
            </div>
            <KanbanBoard steps={positionData?.interviewFlow?.interviewFlow?.interviewSteps} candidates={candidates} />
        </Container>
    );
};

export default PositionProcess;