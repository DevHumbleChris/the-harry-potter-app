import { Characters } from "@/stores/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  student: Characters;
};

export default function SingleStudent({ student }: Props) {
  return (
    <Link href={`/students/${student?.id}`} className="w-40 md:w-60 shrink-0 p-2">
      <div className="transition duration-400 hover:scale-105 hover:z-10 shrink-0">
        <Image
          src={student?.image || "/images/hogwarts-logo.png"}
          width={400}
          height={600}
          alt="try"
          className="w-full object-cover h-80 border-4 rounded-xl"
        />
      </div>
      <div className="p-2 text-xs shrink-0">
        <p className="text-lg text-[#00ad99] font-bold"> {student?.name} </p>
        {student?.dateOfBirth?.length > 0 && <p>D.O.B {student?.dateOfBirth} </p>}
      </div>
    </Link>
  );
}
