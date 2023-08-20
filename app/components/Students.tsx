"use client";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setHarryPotterStudentsCharacters } from "@/stores/movies";
import { Characters, CharactersResponseState } from "@/stores/types";
import Image from "next/image";
import Link from "next/link";
import SingleStudent from "./SingleStudent";

async function getHarryPotterCharacters() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HP_API_BASEURL}/characters/students`,
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

export default function Students() {
  const students = useAppSelector((state) => state.movies.students);
  const dispatch = useAppDispatch();
  async function retrieveCharacters(): Promise<CharactersResponseState> {
    let { data, error } = await getHarryPotterCharacters();
    return {
      data,
      error,
    };
  }
  useEffect(() => {
    retrieveCharacters()
      .then((resp) => {
        if (resp.data) {
          const data: Characters[] = resp.data;
          dispatch(setHarryPotterStudentsCharacters(data));
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [dispatch]);
  return (
    <section className="p-8 bg-[#111111] text-white space-y-4">
      <h1 className="text-xl">Students</h1>
      <div className="flex gap-4">
        <SingleStudent />
      </div>
    </section>
  );
}
