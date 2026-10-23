import { FaMapMarkerAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdMail } from "react-icons/md";

const sections = [
  {
    id: 1,
    title: "HShop",
    items: [
      {
        content: "Địa chỉ",
        icon: FaMapMarkerAlt,
      },
      {
        content: "contact@yourdomain.com",
        icon: MdMail,
      },
      {
        content: "Xem bản đồ đường đi",
        icon: FaMapLocationDot,
      },
    ],
  },
  {
    id: 2,
    title: "Chính sách",
    items: [
      "Chính sách giao hàng",
      "Chính sách đổi trả",
      "Chính sách thanh toán",
      "Chính sách bảo hành",
    ],
  },
  {
    id: 3,
    title: "Hỗ trợ khách hàng",
    items: [
      "Hotline: 0123 456 789",
      "Mua hàng & kỹ thuật: 7h30 - 22h00",
      "Khiếu nại: 8h00 - 21h30",
      "Bảo hành: 8h00 - 21h30",
    ],
  },
];

export default function Footer() {
  return (
    <div className="bg-[#24272e] px-2.5 text-[#8b8e96] md:px-12.5 lg:px-17.5 xl:px-25">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {sections.map((section) => (
          <div
            key={section.id}
            className="mt-10 flex flex-col items-center text-center md:text-left"
          >
            <div className="w-fit">
              <span className="font-semibold text-white">{section.title}</span>
              <ul className="text-md mt-2.5">
                {section.items.map((item) => {
                  if (typeof item === "string") {
                    return (
                      <li key={item} className="py-0.5">
                        {item}
                      </li>
                    );
                  }
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.content}
                      className="flex items-center justify-center gap-1.5 py-0.5 md:justify-start"
                    >
                      <Icon />
                      {item.content}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-7.5 border-t border-[#373a43] py-5 text-center">
        © Copyright HShop
      </p>
    </div>
  );
}
