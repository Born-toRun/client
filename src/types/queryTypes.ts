import { HttpErrorResponse } from '@/client/httpError';
import { QueryKey, UseMutationOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';

type UseMutationCustomOptions<TData = unknown, TVariants = unknown, TError = HttpErrorResponse> = Omit<
  UseMutationOptions<TData, TError, TVariants, unknown>,
  'mutationFn'
>;

type UseQueryCustomOption<TQueryFnData = unknown, TData = TQueryFnData, TError = HttpErrorResponse> = Omit<
  UseSuspenseQueryOptions<TQueryFnData, TError, TData, QueryKey>,
  'queryKey'
>;

export type { UseMutationCustomOptions, UseQueryCustomOption };
