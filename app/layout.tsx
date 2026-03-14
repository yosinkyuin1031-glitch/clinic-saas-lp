import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClinicDX - 治療院DXツール3点セット | 顧客管理・予約・WEB問診",
  description:
    "治療院・整体院・鍼灸院向けの業務効率化ツール。顧客管理・予約管理・WEB問診がセットで月額9,800円。初期費用0円・最短即日導入。",
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
