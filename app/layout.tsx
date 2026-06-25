import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClinicMark - 治療家のためのアプリラボ｜株式会社IDOMI",
  description:
    "現役治療家が開発した、治療院向け業務アプリブランド。カラダマップ（検査）・Clinic Core（顧客管理）・MEO勝ち上げくん（集客）の主力3アプリ＋オーダーメイド開発。すべて月額5,500円・初期費用0円。",
  openGraph: {
    title: "ClinicMark - 治療家のためのアプリラボ｜株式会社IDOMI",
    description: "現役治療家が作る、現場で本当に使える業務アプリ。価格帯と用途で選んで導入できます。",
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
