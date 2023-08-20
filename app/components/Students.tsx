"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setHarryPotterStudentsCharacters } from "@/stores/movies";
import { Characters, CharactersResponseState } from "@/stores/types";
import Image from "next/image";
import Link from "next/link";
import SingleStudent from "./SingleStudent";
import { IcRoundChevronRight } from "../svgs/ChevronRight";

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
  const [newLimitedStudents, setNewLimitedStudents] = useState<Characters[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
          let limitedStaffs = limitStudentsTo10(students);
          setNewLimitedStudents(limitedStaffs);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [dispatch, students]);

  function limitStudentsTo10(studentsData: Characters[]): Characters[] {
    if (studentsData.length <= 10) {
      return studentsData;
    } else {
      return studentsData.slice(0, 10);
    }
  }
  return (
    <section className="p-8 space-y-4">
      <h1 className="text-xl">Students</h1>
      {isLoading ? (
        <div className="w-16 h-16 mt-40 mx-auto border-8 border-dashed rounded-full animate-spin border-white"></div>
      ) : (
        <div className="relative flex gap-4 overflow-x-scroll">
          {newLimitedStudents.map((student) => {
            return <SingleStudent key={student.id} student={student} />;
          })}
          <Link href="/students" className="flex items-center shrink-0">
            <p>View More</p>
            <IcRoundChevronRight className="text-white w-6 h-auto" />
          </Link>
        </div>
      )}
    </section>
  );
}
