import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // metadataBase: new URL("https://hshop.com"),
  title: {
    default: "HShop | Mua Sắm Online",
    template: "%s | HShop",
  },
  description:
    "Mua sắm trực tuyến hàng triệu sản phẩm ở tất cả ngành hàng. Giá tốt & Miễn phí vận chuyển. Voucher Xtra | Freeship 0Đ | HShop Đảm Bảo",
  openGraph: {
    type: "website",
    siteName: "HShop",
    locale: "vi_VN",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <div className="mt-20 px-2.5 md:mt-30.5 md:px-12.5 lg:px-17.5 xl:px-25">
          {children}
        </div>
      </body>
    </html>
  );
}
