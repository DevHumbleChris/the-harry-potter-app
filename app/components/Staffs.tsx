"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/stores/hooks";
import { setHarryPotterStaffsCharacters } from "@/stores/movies";
import { Characters, CharactersResponseState } from "@/stores/types";
import SingleStaff from "./SingleStaff";
import { IcRoundChevronRight } from "../svgs/ChevronRight";
import Link from "next/link";

async function getHarryPotterCharacters() {
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

export default function Staffs() {
  const staffs = useAppSelector((state) => state.movies.staffs);
  const [newLimitedStaffs, setNewLimitedStaffs] = useState<Characters[]>([]);
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
          dispatch(setHarryPotterStaffsCharacters(data));
          let limitedStaffs = limitStaffsTo10(staffs);
          setNewLimitedStaffs(limitedStaffs);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [dispatch, staffs]);

  function limitStaffsTo10(staffsData: Characters[]): Characters[] {
    if (staffsData.length <= 10) {
      return staffsData;
    } else {
      return staffsData.slice(0, 10);
    }
  }
  return (
    <section className="p-8 bg-[#111111] text-white space-y-4">
      <h1 className="text-xl">Staffs</h1>
      <div className="flex gap-4 overflow-x-scroll">
        {newLimitedStaffs.map((staff) => {
          return <SingleStaff key={staff.id} staff={staff} />;
        })}
        <Link href="/staffs" className="flex items-center shrink-0">
          <p>View More</p>
          <IcRoundChevronRight className="text-white w-6 h-auto" />
        </Link>
      </div>
    </section>
  );
}
