"use client";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Spinner } from "@/src/components/ui/spinner";
import { IoSearchOutline } from "react-icons/io5";

import { Button } from "@/src/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/src/components/ui/item";
import { cn, formatPrice } from "@/src/lib/utils";
import { searchProducts } from "@/src/services/productService";
import { Product } from "@/src/types";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [isResult, setIsResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Product[]>([]);
  const [isSearchParamFromUrl, setIsSearchParamFromUrl] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchMobileOpen, setIsSearchMobileOpen] = useState(false);
  const [isEnterSearch, setIsEnterSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSearchMobileOpen(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      setKeyword("");
      setIsSearchMobileOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    const keywordParam = searchParams.get("keyword");
    if (keywordParam) {
      setIsSearchParamFromUrl(true);
    }
  }, []);

  useEffect(() => {
    if (!keyword.trim()) {
      setData([]);
      setIsResult(false);
      return;
    }

    setIsResult(false);
    let resultTimer: ReturnType<typeof setTimeout> | undefined;

    const handleSearch = async () => {
      try {
        const searchResult = await searchProducts(keyword);
        if (isEnterSearch) {
          setData(searchResult);
          return;
        }
        if (isSearchParamFromUrl) {
          setData(searchResult);
        } else {
          setIsLoading(true);
          resultTimer = setTimeout(() => {
            setData(searchResult);
            setIsResult(true);
            setIsLoading(false);
          }, 300);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const debounceTimer = setTimeout(handleSearch, 500);

    return () => {
      clearTimeout(debounceTimer);
      clearTimeout(resultTimer);
    };
  }, [keyword, isSearchParamFromUrl, isEnterSearch]);

  const goToSearch = () => {
    if (isMobile) {
      setIsSearchMobileOpen(false);
    }
    setIsResult(false);
    router.push(`/search?keyword=${keyword}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setKeyword(e.target.value);
    setIsSearchParamFromUrl(false);
    setIsEnterSearch(false);
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      goToSearch();
      setIsEnterSearch(true);
    }
  };

  return (
    <Popover open={isResult} onOpenChange={setIsResult}>
      <PopoverTrigger
        render={
          <div>
            <div
              className={cn(
                "border-primary m-auto flex h-10 items-center rounded-[5px] md:w-84.5 md:border",
                isMobile && "hidden",
                isSearchMobileOpen &&
                  "fixed top-17.5 right-0 left-0 flex w-[90%] border bg-white",
              )}
            >
              <div
                className={cn(
                  "text-md hidden flex-1 px-2.5 md:block",
                  isMobile && "block",
                )}
              >
                <input
                  type="text"
                  value={keyword}
                  placeholder="Tìm kiếm..."
                  className="size-full outline-none"
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                />
              </div>
              {isLoading ? (
                <Spinner className="mr-2 size-5" />
              ) : (
                <button
                  className={cn(
                    "text-primary md:text-foreground hover:bg-primary flex h-full w-10.75 items-center justify-center text-[30px] transition duration-300 ease-in-out hover:cursor-pointer hover:text-white md:text-[23px]",
                    isMobile && "hidden",
                  )}
                  onClick={goToSearch}
                >
                  <IoSearchOutline />
                </button>
              )}
            </div>
            <button
              className={cn(
                "text-primary hidden w-10.75 items-center justify-center text-[30px]",
                isMobile && "flex",
              )}
              onClick={() => setIsSearchMobileOpen(!isSearchMobileOpen)}
            >
              <IoSearchOutline />
            </button>
          </div>
        }
      />
      {keyword && isResult && (isSearchMobileOpen || !isMobile) && (
        <PopoverContent
          align="start"
          className="m-auto w-[90%] md:w-84.5"
          initialFocus={false}
          sideOffset={isMobile ? 65 : undefined}
        >
          <PopoverHeader>
            <PopoverTitle>
              Kết quả tìm kiếm: {data.length} sản phẩm
            </PopoverTitle>
            <div className="flex w-full max-w-md flex-col gap-6">
              <ItemGroup className="max-h-87.5 gap-4 overflow-y-scroll">
                {data.map((item) => (
                  <Item
                    key={item.id}
                    variant="outline"
                    role="listitem"
                    render={
                      <a href="#">
                        <ItemMedia variant="image">
                          <Image
                            src={`${item.image}`}
                            alt={`${item.name}`}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle className="line-clamp-1">
                            {item.name}
                          </ItemTitle>
                          <ItemDescription className="text-primary">
                            {formatPrice(item.price)}
                            <u className="relative bottom-px text-[11px]">đ</u>
                          </ItemDescription>
                        </ItemContent>
                      </a>
                    }
                  />
                ))}
              </ItemGroup>
            </div>
            <PopoverDescription>
              {data.length > 0 && (
                <Button
                  variant="link"
                  className="flex justify-self-center hover:cursor-pointer"
                  onClick={goToSearch}
                >
                  Xem tất cả
                </Button>
              )}
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      )}
    </Popover>
  );
}
