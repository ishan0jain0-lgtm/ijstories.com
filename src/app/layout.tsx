import type { Metadata } from "next";
import { Roboto, Roboto_Condensed, Roboto_Serif } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ImageKitProviderWrapper from "@/components/ImageKitProviderWrapper";

const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

const robotoSerif = Roboto_Serif({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

const robotoCondensed = Roboto_Condensed({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "I.J_Stories | Multidisciplinary Creative Studio",
  description: "Building modern brands that feel human through design, storytelling, strategy, and media. A multidisciplinary creative ecosystem.",
  keywords: [
    "I.J_Stories",
    "Creative Studio",
    "Brand Identity",
    "Creative Direction",
    "Founder Branding",
    "Campaign Strategy",
    "Photography & Videography",
    "Social Media Systems",
    "3D & Motion Visuals",
    "Marketing & Launch Campaigns",
  ],
  authors: [{ name: "I.J_Stories" }],
  openGraph: {
    title: "I.J_Stories | Multidisciplinary Creative Studio",
    description: "Building modern brands that feel human through design, storytelling, strategy, and media.",
    url: "https://ijstories.com",
    siteName: "I.J_Stories",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I.J_Stories | Multidisciplinary Creative Studio",
    description: "Building modern brands that feel human through design, storytelling, strategy, and media.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(robotoSerif.variable, robotoCondensed.variable, "font-sans", roboto.variable)} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ImageKitProviderWrapper>
          {children}
        </ImageKitProviderWrapper>
      </body>
    </html>
  );
}
