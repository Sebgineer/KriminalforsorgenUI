import { useFetcher } from './interceptor';
import { type UseFetchReturn } from '@vueuse/core';
import { type ZSubject } from './types';

export function getSubjectList(): UseFetchReturn<ZSubject[]> {
    return useFetcher<ZSubject[]>('Subjects').get().json();
}

export function createSubject(name: string): UseFetchReturn<ZSubject> {
    return useFetcher<ZSubject>('Subjects').json().post(JSON.parse(JSON.stringify({ name })), 'json');
}

export function deleteSubject(id: number): UseFetchReturn<ZSubject> {
    return useFetcher<ZSubject>(`Subjects/${id}`).delete().json();
}