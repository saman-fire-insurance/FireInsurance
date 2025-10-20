"use client";

// import { OpenAPI } from "@/swagger/core/OpenAPI";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ProgressProvider } from "@bprogress/next/app";
import { SWRConfig } from "swr";
import { useDialog } from "@/hooks/useDialog";
// Ensure OpenAPI is configured early
import "@/lib/openapi-config";
import { OpenAPI } from "@/swagger/core/OpenAPI";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const { DialogComponent } = useDialog();
  // Only set the token, base URL is already configured
  OpenAPI.TOKEN = session?.accessToken;
  
  return (
    <ProgressProvider
      height="4px"
      color="#1A56DB"
      options={{ showSpinner: false }}
      shallowRouting
    >
      <SessionProvider 
        session={session} 
        refetchOnWindowFocus={true}
        refetchInterval={0}
      >
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            revalidateIfStale: false,
            refreshInterval: 0,
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
              position="top-center"
              className="font-IranSans"
              richColors
              duration={4000}
            />
            <DialogComponent />
          </ThemeProvider>
        </SWRConfig>
      </SessionProvider>
    </ProgressProvider>
  );
}
