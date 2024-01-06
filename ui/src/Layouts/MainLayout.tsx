import Header from "@/components/Header";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="flex flex-col top-20 items-center justify-center p-3 min-h-screen w-screen">
        <Header />
        {children}
      </main>
    </>
  );
};
