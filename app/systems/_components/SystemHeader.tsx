import Link from "next/link";
import { LINE_URL } from "../../lib/site-config";

export function SystemHeader() {
  return (
    <header className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← ClinicMark トップ</Link>
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
      >
        LINEで相談する
      </a>
    </header>
  );
}
