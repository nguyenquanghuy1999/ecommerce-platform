import { navList } from "@/src/config";
import Image from "next/image";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
import Hotline from "./Hotline";
import { IconCart } from "./icons/IconCart";
import { IconUser } from "./icons/IconUser";
import Menu from "./Menu";

function Header() {
  return (
    <>
      <div className="flex items-center justify-between px-2.5 py-2.5 md:px-12.5 lg:px-17.5 xl:px-25">
        <Menu />
        <div className="ml-2 flex-1 md:flex-none">
          <Link href={"/"}>
            <Image
              src="/images/logo-2.png"
              alt="logo"
              width={150}
              height={50}
              className="m-auto object-contain"
            />
          </Link>
        </div>

        <div className="border-primary flex h-10 w-fit rounded-[5px] md:w-84.5 md:border">
          <div className="text-md hidden flex-1 px-2.5 md:block">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="size-full outline-none"
            />
          </div>
          <button className="text-primary md:text-foreground hover:bg-primary flex w-10.75 items-center justify-center text-[30px] transition duration-300 ease-in-out hover:cursor-pointer hover:text-white md:text-[23px]">
            <IoSearchOutline />
          </button>
        </div>
        <Hotline />
        <div className="hidden items-center justify-center md:flex">
          <IconUser className="size-7.5 lg:size-8.75" />
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

      <nav className="bg-primary hidden h-10.5 items-center px-2.5 text-white hover:cursor-pointer md:flex md:px-12.5 lg:px-17.5 xl:px-25">
        <div className="text-md flex w-50 items-center lg:w-62.5">
          <RiMenu2Fill />
          <span className="ml-2 font-semibold">Danh mục sản phẩm</span>
          <span className="ml-auto">|</span>
        </div>
        <ul className="flex h-full flex-1 justify-center">
          {navList.map((item, index) => (
            <li
              key={index}
              className="text-md hover:text-muted my-auto w-full max-w-47.5 text-center"
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
export default Header;
