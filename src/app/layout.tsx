import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solaria — From zero to Solana",
  description:
    "Revivez la création de Solana et maîtrisez la blockchain la plus rapide du monde. Un jeu éducatif gamifié pour apprendre Solana en s'amusant.",
  keywords: ["Solana", "blockchain", "apprentissage", "gamifié", "crypto"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`h-full antialiased ${poppins.variable}`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-poppins"
        style={{
          background: "#111111",
          color: "#FFFFFF",
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
