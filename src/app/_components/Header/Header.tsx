import Image from "next/image";
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
    <>
      <div className="flex items-center justify-between px-2.5 py-2.5 md:px-12.5 lg:px-17.5 xl:px-25">
        <Menu />
        <div className="ml-2 flex-1 md:flex-none">
          <Link href="/">
            <Image
              src="/images/logo-2.png"
              alt="logo"
              width={150}
              height={50}
              className="m-auto object-contain"
            />
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
    </>
  );
}
export default Header;
