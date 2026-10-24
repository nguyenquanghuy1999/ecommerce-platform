import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import "./globals.css";
import { Toaster } from "../components/ui/toast";
import Footer from "./_components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase: new URL("http://localhost:3000"),
  title: "HShop - Điện thoại, laptop, tablet, phụ kiện chính hãng",
  description:
    "Mua sắm trực tuyến các sản phẩm công nghệ. Giá tốt & Miễn phí vận chuyển. Voucher Xtra | Freeship 0Đ | HShop Đảm Bảo",
  openGraph: {
    type: "website",
    siteName: "HShop",
    locale: "vi_VN",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: { google: "Bq1Km_TdPQywzZGcl3uq16Znhoeu-3ULxyqMWN5UmUQ" },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <div className="mt-20 min-h-screen px-2.5 md:mt-30.5 md:px-12.5 lg:px-17.5 xl:px-25">
          {children}
        </div>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
