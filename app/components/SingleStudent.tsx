import Image from "next/image";
import Link from "next/link";

export default function SingleStudent() {
  return (
    <Link href="#" className="w-40 md:w-60 shrink-0">
      <div className="transition duration-400 hover:scale-105 hover:z-10">
        <Image
          src="https://ik.imagekit.io/hpapi/harry.jpg"
          width={400}
          height={600}
          alt="try"
          className="w-full object-cover h-full border-4 rounded-xl"
        />
      </div>
      <div className="p-2 text-xs">
        <p className="text-lg text-[#00ad99] font-bold">Harry Potter</p>
        <p>D.O.B 31-07-1980</p>
      </div>
    </Link>
  );
}
