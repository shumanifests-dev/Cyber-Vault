import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Cyber Ethics Portal",
  description: "An interactive platform for cybersecurity ethics training and awareness",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Cyber Ethics Portal",
    description: "An interactive platform for cybersecurity ethics training and awareness",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}