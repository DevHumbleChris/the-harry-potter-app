"use client";
import Image from "next/image";
import { IcRoundChevronLeft } from "../svgs/ChevronLeft";
import { IcRoundChevronRight } from "../svgs/ChevronRight";
import { useAppSelector } from "@/stores/hooks";
import { useEffect, useState } from "react";
import { Movie } from "@/stores/types";
export default function Banner() {
  const imgURL = process.env.NEXT_PUBLIC_IMG_URL;
  const movies = useAppSelector((state) => state.movies.potterMovies);
  const [bannerMovieDisplay, setBannerMovieDisplay] = useState<Movie>();
  const [currentMovieDisplayIndex, setCurrentMovieDisplayIndex] =
    useState<number>(0);

  useEffect(() => {
    setBannerMovieDisplay(movies[currentMovieDisplayIndex]);
  }, [currentMovieDisplayIndex, movies]);

  function previousBannerMovieDisplay() {
    if (currentMovieDisplayIndex > 0) {
      setCurrentMovieDisplayIndex(currentMovieDisplayIndex - 1);
    }
  }

  function nextBannerMovieDisplay() {
    if (currentMovieDisplayIndex < movies?.length - 1) {
      setCurrentMovieDisplayIndex(currentMovieDisplayIndex + 1);
    }
  }
  return (
    <div className="relative aspect-ratio-3/2 lg:aspect-ratio-25/9 bg-black">
      {currentMovieDisplayIndex > 0 && (
        <IcRoundChevronLeft
          className="text-white absolute top-1/2 w-12 h-auto cursor-pointer"
          onClick={previousBannerMovieDisplay}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center py-5 px-12 sm:p-12">
        <div className="text-white">
          <h1 className="mt-2 text-3xl lg:text-5xl line-clamp-3 z-30">
            {bannerMovieDisplay?.title}
          </h1>
          <div className="flex flex-wrap gap-3 items-center mt-4">
            <div className="opacity-50 hidden md:block">
              {" "}
              {bannerMovieDisplay?.vote_average}{" "}
            </div>
            <div className="opacity-50 hidden md:block">
              {" "}
              {bannerMovieDisplay?.vote_count}
            </div>
          </div>
          <p className="mt-2 opacity-80 leading-relaxed overflow-hidden line-clamp-3 md:line-clamp-5 text-xs md:text-base">
            {bannerMovieDisplay?.overview}
          </p>
        </div>
        <Image
          src={`${imgURL}${bannerMovieDisplay?.backdrop_path}`}
          width={400}
          height={225}
          alt="movie.title"
          className="w-full object-cover z-10 rounded-xl shadow"
        />
      </div>
      {currentMovieDisplayIndex < movies?.length - 1 && (
        <IcRoundChevronRight
          className="text-white absolute top-1/2 right-0 w-12 h-auto cursor-pointer"
          onClick={nextBannerMovieDisplay}
        />
      )}
    </div>
  );
}
