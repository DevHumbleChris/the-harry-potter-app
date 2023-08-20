import Image from "next/image";
import { IcRoundChevronLeft } from "../svgs/ChevronLeft";
import { IcRoundChevronRight } from "../svgs/ChevronRight";
export default function Banner() {
  return (
    <div className="relative aspect-ratio-3/2 lg:aspect-ratio-25/9 bg-black">
      <IcRoundChevronLeft />
      <div className="absolute top-0 right-0 lt-lg:left-0 lg:bottom-0 lg:left-1/3">
        <Image
          src="https://image.tmdb.org/t/p/w500/hziiv14OpD73u9gAak4XDDfBKa2.jpg"
          width={400}
          height={225}
          alt="movie.title"
          className="w-full object-cover"
        />
      I</div>
      <div className="flex-col justify-center lg:bg-gradient-to-t right-0 p-[3.8rem] lg:px-24 w-2/3 bg-gradient-to-r from-black via-black to-transparent">
        <div className="text-white">
          <h1 className="mt-2 text-4xl lg:text-5xl line-clamp-2">
            Harry Potter und der Halbblutprinz
          </h1>
          <div className="flex flex-wrap gap-3 items-center mt-4">
            <div className="opacity-50 hidden md:block">7.698</div>
            <div className="opacity-50 hidden md:block">17991 Rezensionen</div>
            <div className="opacity-50">2009</div>
            <div className="opacity-50">2h 33min</div>
          </div>
          <p className="mt-2 opacity-80 leading-relaxed overflow-hidden line-clamp-3 md:line-clamp-5 text-xs md:text-base">
            Der Zauber der Liebe beherrscht das sechste Schuljahr von Harry und
            seinen besten Freunden Hermine und Ron. Hormone und ein Liebestrank
            des neuen Professors Horace Slughorn sorgen für Gefühlsverwirrung,
            während sich die Anhänger Voldemorts mit Unterstützung von Severus
            Snape zu Attacken auf die jungen Helden und ihren größten magischen
            Verbündeten formieren. Als Harry und Professor Dumbledore das
            Geheimnis für Voldemorts ewiges Leben entdecken, hat der dunkle Lord
            bereits den Tod nach Hogwarts entsandt.
          </p>
          <div className="py-5 hidden lg:block">
            <button
              className="flex gap-2 items-center px-6 py-3 bg-gray-500 hover:bg-gray-200 transition"
              title="Trailer ansehen"
            >
              <div className="i-ph-play"></div>
              Trailer ansehen
            </button>
          </div>
        </div>
      </div>
      <IcRoundChevronRight/>
    </div>
  );
}
