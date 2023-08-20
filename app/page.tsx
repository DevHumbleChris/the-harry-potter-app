"use client";
import Image from "next/image";
import { useEffect } from "react";
import { getHarryPotterMovies } from "@/stores/movies";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { Movie, ResponseState } from "@/stores/types";
import Banner from "./components/Banner";
import Students from "./components/Students";
import Staffs from "./components/Staffs"

async function getData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_ACCESSTOKEN}`,
    },
  };

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASEURL}?query=harry%20potter&include_adult=false&language=en-US&page=1`,
    options
  );

  if (!resp.ok) {
    return {
      error: "Failed To Fetch Data",
      data: null,
    };
  }

  const { results } = await resp.json();
  return {
    error: null,
    data: results,
  };
}

export default function Home() {
  const movies = useAppSelector((state) => state.movies.potterMovies);
  const imgURL = process.env.NEXT_PUBLIC_IMG_URL;
  const dispatch = useAppDispatch();
  async function retrievePotterMovies(): Promise<ResponseState> {
    let { data, error } = await getData();
    return {
      data,
      error,
    };
  }
  useEffect(() => {
    retrievePotterMovies()
      .then((resp) => {
        if (resp.data) {
          const data: Movie[] = resp.data.filter(movieData => movieData.backdrop_path !== null);
          dispatch(getHarryPotterMovies(data));
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [dispatch]);

  return (
    <main>
      <Banner />
      <Students />
      <Staffs />
    </main>
  );
}
