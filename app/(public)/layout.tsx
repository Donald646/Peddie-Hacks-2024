import PublicNavbar from "@/components/publicNavbar";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import Home from "@/components/home"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
  return (
    <>
      <PublicNavbar/>
      <Home />
      {children}
    </>
  
  );
}
