"use client";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setHarryPotterStaffsCharacters } from "@/stores/movies";
import { Characters, CharactersResponseState } from "@/stores/types";
import React, { useEffect } from "react";
import Image from "next/image";
import SingleStaff from "../components/SingleStaff";
import Link from "next/link";

async function getAllHogwartsStaffs() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HP_API_BASEURL}/characters/staff`,
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
  const staffs = useAppSelector((state) => state.movies.staffs);
  const dispatch = useAppDispatch();
  async function retrieveAllHogwartsStaffs(): Promise<CharactersResponseState> {
    let { data, error } = await getAllHogwartsStaffs();
    return {
      data,
      error,
    };
  }
  useEffect(() => {
    retrieveAllHogwartsStaffs()
      .then((resp) => {
        if (resp.data) {
          const data: Characters[] = resp.data;
          dispatch(setHarryPotterStaffsCharacters(data));
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [dispatch, staffs]);
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
        <h1 className="text-xl font-bold">Hogwarts Academy: Staffs</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {staffs.map((staff) => {
          return <SingleStaff key={staff.id} staff={staff} />;
        })}
      </div>
    </section>
  );
}
