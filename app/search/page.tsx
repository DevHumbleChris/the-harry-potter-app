"use client";
import React, { useEffect, useState } from "react";
import { PhMagnifyingGlassFill } from "../svgs/Search";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { Characters, CharactersResponseState } from "@/stores/types";
import { setAllCharacters } from "@/stores/movies";
import Link from "next/link";
import Image from "next/image";

async function getAllCharacters() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HP_API_BASEURL}/characters`,
    options
  );

  if (!resp.ok) {
    return {
      error: "Failed To Fetch Data",
      data: null,
    };
  }

  const data = await resp.json();
  return {
    error: null,
    data,
  };
}

export default function Search() {
  const characters = useAppSelector((state) => state.movies.allCharacters);
  const [searchResults, setSearchResults] = useState<Characters[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState("");

  async function retrieveAllCharacters(): Promise<CharactersResponseState> {
    let { data, error }: CharactersResponseState = await getAllCharacters();
    return {
      data,
      error,
    };
  }

  useEffect(() => {
    retrieveAllCharacters()
      .then((resp) => {
        if (resp?.data) {
          dispatch(setAllCharacters(resp?.data));
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [dispatch]);

  function handleOnChange(e: React.FormEvent) {
    setIsLoading(true);
    e.preventDefault();
    const { value }: any = e.target;
    setSearchString(value);
    if (value) {
      let results = searchNameOrHouse(searchString);
      setTimeout(() => {
        setSearchResults(results);
        setIsLoading(false);
      }, 300);
    } else {
      setTimeout(() => {
        setSearchResults([]);
        setIsLoading(false);
      }, 300);
    }
  }

  function searchNameOrHouse(search: string): Characters[] {
    let results: Characters[] = [];

    results = characters.filter((character) => {
      if (
        character?.name.includes(searchString) ||
        character?.house?.includes(searchString)
      ) {
        return character;
      }
    });
    return results;
  }

  return (
    <section className="space-y-4">
      <form className="sticky w-full top-0 right-0 left-0 bg-[#1f2022] py-3 px-4 flex items-center gap-3">
        <PhMagnifyingGlassFill className="text-[#808182] w-8 h-auto" />
        <input
          type="text"
          className="bg-transparent outline-none border-0 w-full text-xl"
          onChange={(e) => handleOnChange(e)}
          value={searchString}
          placeholder="Search"
        />
      </form>
      <div className="p-2 space-y-3">
        {searchResults?.length <= 0 ? (
          <div className="">
            <h1 className="text-center text-3xl text-gray-400">Seek...</h1>
            {isLoading && (
              <div className="w-16 h-16 mt-10 mx-auto border-8 border-dashed rounded-full animate-spin border-white"></div>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h1 className="text-2xl">Search Results</h1>
              <p className="text-gray-400 text-sm">
                {searchResults?.length} Results
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {searchResults?.map((person) => {
                return (
                  <Link
                    key={person?.id}
                    href={`/${
                      person?.hogwartsStudent ? "students" : "staffs"
                    }/${person?.id}`}
                    className="w-40 md:w-60 shrink-0 p-2"
                  >
                    <div className="transition duration-400 hover:scale-105 hover:z-10 shrink-0">
                      <Image
                        src={person?.image || "/images/hogwarts-logo.png"}
                        width={400}
                        height={600}
                        alt="try"
                        className="w-full object-cover h-80 border-4 rounded-xl"
                      />
                    </div>
                    <div className="p-2 text-xs shrink-0">
                      <p className="text-lg text-[#00ad99] font-bold">
                        {" "}
                        {person?.name}{" "}
                      </p>
                      {person?.dateOfBirth?.length > 0 && (
                        <p>D.O.B {person?.dateOfBirth} </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
