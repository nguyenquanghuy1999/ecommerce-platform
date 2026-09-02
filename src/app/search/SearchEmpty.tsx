import Image from "next/image";

export default function SearchEmpty() {
  return (
    <div className="flex h-100 flex-col items-center justify-center">
      <Image
        alt="search empty"
        src="/images/search-empty.png"
        width={134}
        height={134}
      />
      <p>Không tìm thấy kết quả nào</p>
    </div>
  );
}
