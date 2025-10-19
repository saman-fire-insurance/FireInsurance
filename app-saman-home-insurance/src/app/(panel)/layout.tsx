import { Header } from "@/components/header";
import * as React from "react";

// Force dynamic rendering for landing routes
export const dynamic = "force-dynamic";

const Main = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className="min-h-[65dvh] sm:px-4 sm:py-4 lg:px-0 lg:py-6 mx-auto bg-background">
        {children}
      </main>
    </>
  );
};
export default Main;
