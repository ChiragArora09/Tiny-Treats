import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { AppProvider } from "@/components/AppContext";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Tiny Treats",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[#FEF4F1]">
      <body className={roboto.className}>
        <main className="max-w-6xl mx-auto p-4">
          <AppProvider>
            <Toaster />
            <Header />
            {children}
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
