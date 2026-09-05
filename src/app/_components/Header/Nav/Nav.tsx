import { navList } from "@/src/config";
import CategoryMenu from "./CategoryMenu";

export default async function Nav() {
  return (
    <nav className="bg-primary hidden h-10.5 items-center px-2.5 text-white hover:cursor-pointer md:flex md:px-12.5 lg:px-17.5 xl:px-25">
      <CategoryMenu />
      <ul className="flex h-full flex-1 justify-center">
        {navList.map((item, index) => (
          <li
            key={index}
            className="text-md hover:text-muted border-primary-light my-auto w-full max-w-47.5 border-r text-center last:border-r-0 min-[1537px]:max-w-75"
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}
