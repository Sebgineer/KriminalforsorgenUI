export interface ZSubject {
    id: string;
    name: string;
}

export interface ZModule {
    id: string;
    name: string;
}

export interface ZAssignment { 
    id: string;
    name: string;
    nextAssignmentId: string;
    type: string;
    video: string;
    answer: string;
    question: string;
}