"use client";
import { store } from "@/store";
import { Provider } from "react-redux";
import { QueryProvider } from "./QueryProvider";
import { LenisProvider } from "./Lenis";
import { AuthProvider } from "./AuthContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <QueryProvider>
        <AuthProvider>
          <LenisProvider>{children}</LenisProvider>
        </AuthProvider>
      </QueryProvider>
    </Provider>
  );
}
