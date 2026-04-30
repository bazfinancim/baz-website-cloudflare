import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "בז פיננסים - ייעוץ פיננסי מקצועי",
  description: "תאגיד פנסיוני-פיננסי מוביל עם עשרות שנות ניסיון בליווי אישי ומקצועי",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
