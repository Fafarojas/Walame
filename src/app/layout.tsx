import type { Metadata } from "next";
import { Montserrat_Alternates, Raleway, Comfortaa } from "next/font/google";
import "./globals.css";

const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Walame",
  description: "Automate & manage your business with ease",
};

import SmoothScrolling from "@/components/SmoothScrolling";
import { GradualBlurBottom } from "@/components/GradualBlurBottom";
import Preloader from "@/components/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${comfortaa.variable} antialiased font-sans`}
      >
        <SmoothScrolling>
          <Preloader />
          {children}
          <GradualBlurBottom />
        </SmoothScrolling>
      </body>
    </html>
  );
}
