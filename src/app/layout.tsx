import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Adam Rotmil — Product Designer",
  description:
    "20 years of design leadership across AI, health tech, and finance. Currently building agentic systems and shipping code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${dmSans.variable} antialiased`}
        style={{ ["--font-instrument-serif" as string]: "'Instrument Serif'" }}
      >
        {children}
      </body>
    </html>
  );
}
