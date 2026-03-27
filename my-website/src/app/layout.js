import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import InteractiveBackground from "./components/InteractiveBackground";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Shivam Raval",
  description: "AI Research Scientist — interpretability, visualization, and interactive ML.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="absolute inset-0 z-0 pointer-events-none">
            <InteractiveBackground />
          </div>
          <div className="relative z-10 flex min-h-screen">
            <Sidebar />
            {/* Spacer matching sidebar width so content isn't hidden behind the fixed sidebar */}
            <div style={{ width: "var(--sidebar-w)", flexShrink: 0 }} aria-hidden="true" />
            <div className="flex-1 flex flex-col min-w-0">
              <Navbar />
              <main className="flex-grow px-8 py-10">
                <div className="max-w-4xl mx-auto w-full">{children}</div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
