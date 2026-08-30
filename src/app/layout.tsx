import type { Metadata } from "next";
import { Fredoka, Nunito_Sans } from "next/font/google";

import "./globals.css";
import { siteConfig } from "@/config/site";

const fredoka = Fredoka({
    subsets: ["latin"],
    variable: "--font-display",
    weight: ["500", "600", "700"]
});

const nunito = Nunito_Sans({
    subsets: ["latin"],
    variable: "--font-body"
});

export const metadata: Metadata = {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description
};

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${fredoka.variable} ${nunito.variable}`}
        >
        {children}
        </body>
        </html>
    );
}