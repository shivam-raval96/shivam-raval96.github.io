import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import InteractiveBackground from "./components/InteractiveBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VISxGenAI",
  description:
    "Workshop on Explainable Visualizations focusing on AI techniques",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        {/* Interactive Background with z-index to keep it behind all content */}
        <div className="absolute inset-0 z-0">
          <InteractiveBackground />
        </div>

        {/* Main content container with higher z-index */}
        <div className="relative z-10 flex min-h-screen">
          {/* Sidebar - fixed width */}
          <div className="relative z-10 w-64 flex-shrink-0">
            <Sidebar />
          </div>

          {/* Main content area with proper margins */}
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-grow  px-8 py-8 mt-8">
              <div className="max-w-5xl mx-auto w-full">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
