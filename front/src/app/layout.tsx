import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { UserContext, UserProvider } from "@/context/userContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from "@/config/config";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ComiCraft",
  description: "ComiCraft: All The Tropes...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
        <UserProvider>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
        <Navbar />
        <div className={inter.className}>{children}</div>
        <Footer />
        </GoogleOAuthProvider>
        </UserProvider> 

      </body>
    </html>
  );
}