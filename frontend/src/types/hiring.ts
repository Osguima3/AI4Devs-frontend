export interface Candidate {
    applicationId: number;
    fullName: string;
    averageScore: number;
    currentInterviewStep: string;
}

export interface InterviewStep {
    id: number;
    name: string;
    candidates: Candidate[];
}