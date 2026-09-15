import Link from "next/link";
import { Suspense } from "react";
import Hotline from "./Hotline";
import { IconCart } from "./icons/IconCart";
import { IconUser } from "./icons/IconUser";
import Menu from "./Menu";
import Nav from "./Nav";
import { Search } from "./Search";

function Header() {
  return (
    <div className="fixed top-0 right-0 left-0 z-1 bg-white">
      <div className="flex items-center justify-between px-2.5 py-2.5 md:px-12.5 lg:px-17.5 xl:px-25">
        <Menu />
        <div className="flex-1 md:ml-0 md:flex-none">
          <Link href="/">
            <div className="text-center">
              <span className="text-primary text-[40px] font-bold">H</span>
              <span className="text-[30px] font-medium">Shop</span>
            </div>
          </Link>
        </div>
        <Suspense>
          <Search />
        </Suspense>
        <Hotline />
        <div className="hidden items-center justify-center md:flex">
          <IconUser className="fill-primary size-7.5 lg:size-8.75" />
          <div className="ml-1.5 hidden flex-col lg:flex">
            <span className="text-sm">Tài khoản</span>
            <span className="text-primary text-sm font-bold hover:cursor-pointer">
              Đăng nhập
            </span>
          </div>
        </div>

        <div className="px-1.5 hover:cursor-pointer md:px-0">
          <IconCart className="fill-primary stroke-primary lg:fill-foreground lg:stroke-foreground" />
        </div>
      </div>
      <Nav />
    </div>
  );
}
export default Header;
