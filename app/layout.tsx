import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClinicApps - 治療院の業務を、まるごとデジタル化。",
  description:
    "現役整体院経営者が開発した治療院向け業務アプリ。検査・顧客管理・予約・WEB問診・MEO対策など必要なものだけ選んで、すぐに使えます。",
  openGraph: {
    title: "ClinicApps - 治療院の業務を、まるごとデジタル化。",
    description: "現役整体院経営者が開発した業務アプリ。必要なものだけ選んで、すぐに使えます。",
    type: "website",
    url: "https://clinic-saas-lp.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
