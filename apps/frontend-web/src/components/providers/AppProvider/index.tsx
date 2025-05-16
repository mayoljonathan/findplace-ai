"use client";

import React, { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface AppProviderProps extends PropsWithChildren {}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

AppProvider.displayName = "AppProvider";
