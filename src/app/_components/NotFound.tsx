import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="-mt-28 flex h-screen flex-col items-center justify-center">
      <h1 className="text-[clamp(70px,25vw,170px)] leading-none">404</h1>
      <h2 className="mb-12.5 text-[clamp(20px,5vw,40px)]">Not Found</h2>
      <Link href="/">
        <Button className="h-11 w-50 cursor-pointer">Quay lại trang chủ</Button>
      </Link>
    </div>
  );
}
