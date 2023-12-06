import { useFetcher } from './interceptor';
import { type UseFetchReturn } from '@vueuse/core';
import { type ZAssignment } from './types';

export function getAssignmentList(subjectId: string, moduleId: string): UseFetchReturn<ZAssignment[]> {
    return useFetcher<ZAssignment[]>(`Subjects/${subjectId}/Modules/${moduleId}`).get().json();
}

export function getAssignment(subjectId: string, moduleId: string, assignmentId: string): UseFetchReturn<ZAssignment> {
    return useFetcher<ZAssignment>(`Subjects/${subjectId}/Modules/${moduleId}/Assignments/${assignmentId}`).get().json();
}

export function createAssignment(subjectId: string, moduleId: string, newAssinment = { name: 'assignment', question: '2+2', answer: '4', type: 'algebra' }): UseFetchReturn<ZAssignment> {
    return useFetcher<ZAssignment>(`Subjects/${subjectId}/Modules/${moduleId}`).json().post(newAssinment, 'json');
}

export function deleteAssignment(subjectId: string, moduleId: string, assignmentId: string): UseFetchReturn<ZAssignment> {
    return useFetcher<ZAssignment>(`Subjects/${subjectId}/Modules/${moduleId}/Assignments/${assignmentId}`).delete().json();
}