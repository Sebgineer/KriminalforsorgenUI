import { useFetcher } from "./interceptor";
import type { UseFetchReturn } from '@vueuse/core';

export function authLogin(username: string, password: string): UseFetchReturn<string> {
  return useFetcher<string>("Auth").post({ username: username, password: password }, 'json').json();
}