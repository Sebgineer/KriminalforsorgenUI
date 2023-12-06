import { useFetcher } from './interceptor';
import { type UseFetchReturn } from '@vueuse/core';
import { type ZModule } from './types';

export function getModuleList(subjectId: string): UseFetchReturn<ZModule[]> {
    return useFetcher<ZModule[]>(`Subjects/${subjectId}/Modules`).get().json();
}

export function createModule(subjectId: string, name: string): UseFetchReturn<ZModule> {
    return useFetcher<ZModule>(`Subjects/${subjectId}/Modules`).json().post(JSON.parse(JSON.stringify({ name })), 'json');
}

export function deleteModule(subjectId: string, id: string): UseFetchReturn<ZModule> {
    return useFetcher<ZModule>(`Subjects/${subjectId}/Modules/${id}`).delete().json();
}