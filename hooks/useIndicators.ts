'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useIndicators() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/indicators/all',
    fetcher,
    {
      refreshInterval: 300000, // 自动刷新：5分钟
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    data: data?.data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
