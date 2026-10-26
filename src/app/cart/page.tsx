import { Metadata } from "next";
import CartPageWrapper from "./CartPageWrapper";

export const metadata: Metadata = {
  title: "Giỏ hàng",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Cart() {
  return <CartPageWrapper />;
}
