import Image from "next/image";
import Link from "next/link";
import { Characters } from "@/stores/types";

type Props = {
  staff: Characters;
};

export default function SingleStaff({ staff }: Props) {
  return (
    <Link href={`/staffs/${staff?.id}`} className="w-40 md:w-60 shrink-0 p-2">
      <div className="transition duration-400 hover:scale-105 hover:z-10">
        <Image
          src={staff?.image || "/images/hogwarts-logo.png"}
          width={400}
          height={600}
          alt="try"
          className="w-full object-cover h-80 border-4 rounded-xl"
        />
      </div>
      <div className="p-2 text-xs">
        <p className="text-lg text-[#00ad99] font-bold">{staff?.name}</p>
        <p>D.O.B {staff.dateOfBirth}</p>
      </div>
    </Link>
  );
}
