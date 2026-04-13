import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SolQuest - Apprends Solana en Jouant",
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
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (!window.ethereum) {
                  Object.defineProperty(window, 'ethereum', {
                    configurable: true,
                    writable: true,
                    value: undefined,
                  });
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{
          background: "#07070F",
          color: "#E4E4ED",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
