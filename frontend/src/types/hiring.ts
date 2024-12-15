export interface Candidate {
    id: number;
    fullName: string;
    averageScore: number;
    currentInterviewStep: string;
}

export interface InterviewStep {
    id: number;
    name: string;
    candidates: Candidate[];
}