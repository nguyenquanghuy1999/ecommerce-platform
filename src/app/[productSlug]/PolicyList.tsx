const policies = [
  {
    id: 1,
    title: "YÊN TÂM MUA HÀNG",
    items: [
      "Uy tín 20 năm xây dựng và phát triển",
      "Sản phẩm chính hãng 100%",
      "Trả góp lãi suất 0% toàn bộ giỏ hàng",
      "Trả bảo hành tận nơi sử dụng",
      "Bảo hành tận nơi cho doanh nghiệp",
      "Ưu đãi riêng cho học sinh sinh viên",
      "Vệ sinh miễn phí trọn đời PC, Laptop",
    ],
  },
  {
    id: 2,
    title: "MIỄN PHÍ GIAO HÀNG",
    items: [
      "Giao hàng siêu tốc trong 2h",
      "Giao hàng miễn phí toàn quốc",
      "Nhận hàng và thanh toán tại nhà (ship COD)",
    ],
  },
];

export default function PolicyList() {
  return (
    <div className="hidden w-[30%] flex-col items-center lg:flex">
      <div className="max-w-71.25 border">
        <span className="inline-block h-10 w-full bg-gray-100 text-center text-sm leading-10 font-semibold">
          {policies[0].title}
        </span>
        <ul className="p-3">
          {policies[0].items.map((item) => (
            <li key={item} className="pb-1">
              <span className="inline-block size-2 rounded-[50%] bg-green-600"></span>
              <span className="ml-1.5 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 max-w-71.25 border">
        <span className="inline-block h-10 w-full bg-gray-100 text-center text-sm leading-10 font-semibold">
          {policies[1].title}
        </span>
        <ul className="p-3">
          {policies[1].items.map((item) => (
            <li key={item} className="pb-1">
              <span className="inline-block size-2 rounded-[50%] bg-green-600"></span>
              <span className="ml-1.5 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
