import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chyrp Modern",
  description: "A sleek, modern blog platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 antialiased">
        <div className="min-h-screen relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          </div>
          
          <AuthProvider>
            <div className="relative min-h-screen">
              <Navbar />
              <main className="container mx-auto px-6 py-12 max-w-7xl">
                <div className="animate-fade-in">
                  {children}
                </div>
              </main>
            </div>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
