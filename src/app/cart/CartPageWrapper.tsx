"use client";
import { Button } from "@/src/components/ui/button";
import { useCartStore } from "@/src/stores/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { TiArrowBackOutline } from "react-icons/ti";
import Price from "../_components/Price";
import QuantitySelector from "../_components/QuantitySelector";

export default function CartPageWrapper() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const route = useRouter();

  const hasHydrated = useCartStore.persist.hasHydrated();

  if (!hasHydrated) {
    return null;
  }

  const totalPrice = items.reduce(
    (prev, { item, quantity }) => prev + Number(item.price) * quantity,
    0,
  );

  return (
    <div className="mt-3 md:mt-7.5">
      <div className="text-center">
        <h1 className="text-[30px]">Giỏ hàng của bạn</h1>
        {items.length >= 1 ? (
          <p>Có {items.length} sản phẩm</p>
        ) : (
          <>
            <p>Không có sản phẩm nào</p>
            <Button
              className="mt-5 h-10 w-41.75 cursor-pointer rounded-none"
              onClick={() => route.push("/")}
            >
              MUA NGAY
            </Button>
          </>
        )}
      </div>
      {items.length >= 1 && (
        <div className="mt-5 flex flex-col justify-center md:mt-10 md:flex-row">
          <ul className="crollbar-thin h-fit max-h-100 overflow-y-auto border-y md:w-[60%]">
            {items.map(({ item, quantity }) => (
              <li
                key={item.id}
                className="flex border-b px-3 py-7 last:border-0"
              >
                <Image
                  src={`${item.image}`}
                  alt={`${item.name}`}
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <div className="ml-3 w-full">
                  <p className="font-medium">{item.name}</p>
                  <Price value={item.price} className="text-primary" />
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <QuantitySelector
                      quantity={quantity}
                      variant="compact"
                      countSize="sm"
                      onQuantityChange={(quantity) =>
                        updateQuantity(item.id, quantity)
                      }
                    />
                    <Price
                      value={Number(item.price) * quantity}
                      className="text-primary font-bold"
                    />
                  </div>
                </div>
                <div
                  className="relative bottom-2 h-fit p-2"
                  onClick={() => removeItem(item.id)}
                >
                  <IoMdClose className="cursor-pointer text-[23px] text-[#333]" />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-5 h-fit border p-3 md:mt-0 md:ml-9 md:max-w-70 lg:max-w-100">
            <span className="text-[25px]">Thanh Toán Đơn Hàng</span>
            <div className="mt-5 flex items-center justify-between">
              <span>Tổng tiền:</span>
              <Price
                value={totalPrice}
                size="lg"
                className="text-primary font-bold"
              />
            </div>
            <p className="text-md mt-3 text-[#333]">
              Phí vận chuyển sẽ được tính ở trang thanh toán. Bạn cũng có thể
              nhập mã giảm giá ở trang thanh toán.
            </p>
            <Button className="mt-5 h-10.25 w-full cursor-pointer">
              THANH TOÁN
            </Button>
            <Link href="/">
              <div className="mt-5 flex cursor-pointer items-center justify-center">
                <TiArrowBackOutline size={20} />
                <span>Tiếp tục mua hàng</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
