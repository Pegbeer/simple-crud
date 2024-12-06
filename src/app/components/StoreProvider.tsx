"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';

const queryClient = new QueryClient();
const NoSSRThemeProvider = dynamic(() => import("next-themes").then(mod => mod.ThemeProvider), { ssr: false });

interface Props {
    children: React.ReactNode
}

export default function StoreProvider({ children }: Props) {
    return (
        <NoSSRThemeProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </NoSSRThemeProvider>
    )
}