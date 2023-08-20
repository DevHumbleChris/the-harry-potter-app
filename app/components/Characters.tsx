"use client";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setHarryPotterCharacters } from "@/stores/movies";
import { Characters, CharactersResponseState } from "@/stores/types";

async function getHarryPotterCharacters() {
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

export default function Characters() {
  const dispatch = useAppDispatch()
  async function retrieveCharacters(): Promise<CharactersResponseState> {
    let { data, error } = await getHarryPotterCharacters();
    return {
      data,
      error
    }
  }
  useEffect(() => {
    retrieveCharacters()
      .then((resp) => {
        if(resp.data) {
          const data : Characters[] = resp.data
          dispatch(setHarryPotterCharacters(data))
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [dispatch]);
  return (
    <section className="p-8 bg-[#111111] text-white">
      <h1 className="text-xl">Characters</h1>
    </section>
  );
}
