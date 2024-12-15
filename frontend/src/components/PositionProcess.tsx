import React, { useEffect, useState } from 'react';
import { ArrowLeft } from "lucide-react";
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
import KanbanBoard from './KanbanBoard';

const PositionProcess: React.FC = () => {
    const { id } = useParams<{ id: string }>();
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
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-4 mb-8">
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">{positionData?.interviewFlow?.positionName}</h1>
                </div>
                <KanbanBoard steps={positionData?.interviewFlow?.interviewFlow?.interviewSteps} candidates={candidates} />
            </div>
        </div>
    );
};

export default PositionProcess;