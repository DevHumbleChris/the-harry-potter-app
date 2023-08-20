"use client";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setHarryPotterStudentsCharacters } from "@/stores/movies";
import { Characters, CharactersResponseState } from "@/stores/types";
import React, { useEffect, useState } from "react";
import SingleStudent from "../components/SingleStudent";
import Image from "next/image";
import Link from "next/link";

async function getAllHogwartsStudents() {
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

export default function StudentsPage() {
  const students = useAppSelector((state) => state.movies.students);
  const dispatch = useAppDispatch();
  async function retrieveAllHogwartsStudents(): Promise<CharactersResponseState> {
    let { data, error } = await getAllHogwartsStudents();
    return {
      data,
      error,
    };
  }
  useEffect(() => {
    retrieveAllHogwartsStudents()
      .then((resp) => {
        if (resp.data) {
          const data: Characters[] = resp.data;
          dispatch(setHarryPotterStudentsCharacters(data));
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [dispatch, students]);
  return (
    <section className="p-5 bg-[#111111] text-white space-y-4">
      <div className="flex gap-2 items-center justify-center">
        <Link href="/">
          <Image
            src="/images/hogwarts-logo.png"
            width={400}
            height={600}
            alt="try"
            className="w-20 h-auto"
          />
        </Link>
        <h1 className="text-xl font-bold">Hogwarts Academy: Students</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {students.map((student) => {
          return <SingleStudent key={student.id} student={student} />;
        })}
      </div>
    </section>
  );
}
