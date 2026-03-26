import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClinicApps - 治療院向け業務アプリ13選 | 月額1,980円から",
  description:
    "治療院・整体院・鍼灸院向けの業務アプリ。検査・顧客管理・予約・WEB問診・MEO対策など全13アプリから必要なものだけ選べます。初期費用0円・最短即日導入。現役の整体院経営者が開発。",
  openGraph: {
    title: "ClinicApps - 治療院向け業務アプリ13選",
    description: "現役の整体院経営者が開発した治療院向け業務アプリ。月額1,980円から、必要なものだけ選んで導入できます。",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
