"use client";

import getPersonInfo from "@/app/utils/person";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setSelectedKnownForData, setSelectedStaff } from "@/stores/movies";
import {
  Characters,
  KnownForResponse,
  SingleCharacterResponse,
} from "@/stores/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IDInterface {
  id: string;
}

type ID = string;
interface PropsInterface {
  params: IDInterface;
}

export async function generateStaticParams() {
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
  const data: Characters[] = await resp.json();

  return data.map((staff) => ({
    id: staff?.id,
  }));
}

async function getStaffSpecificData(staffId: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HP_API_BASEURL}/character/${staffId}`,
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
    data: data[0],
  };
}

export default function SpecificStaffPage({ params: { id } }: PropsInterface) {
  const imgURL = process.env.NEXT_PUBLIC_IMG_URL;
  const staff = useAppSelector((state) => state.movies.selectedPerson);
  const knownFor = useAppSelector((state) => state.movies.selectedKnownForData);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  async function retrieveCharacters(): Promise<SingleCharacterResponse> {
    let { data, error }: SingleCharacterResponse = await getStaffSpecificData(
      id
    );
    return {
      data,
      error,
    };
  }

  async function retrievePersonInfo(actor: string): Promise<KnownForResponse> {
    let { data, error } = await getPersonInfo(actor);
    return {
      data,
      error,
    };
  }
  useEffect(() => {
    retrieveCharacters()
      .then((resp) => {
        if (resp?.data) {
          const data: Characters = resp.data;
          dispatch(setSelectedStaff(data));
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [dispatch]);

  useEffect(() => {
    if (staff) {
      const actor = staff?.actor;
      retrievePersonInfo(actor)
        .then((resp) => {
          if (resp?.data) {
            dispatch(setSelectedKnownForData(resp?.data));
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [staff, dispatch]);
  return (
    <section className="p-8">
      <div className="flex gap-2 items-center justify-center my-6">
        <Link href="/">
          <Image
            src="/images/hogwarts-logo.png"
            width={400}
            height={600}
            alt="try"
            className="w-20 h-auto"
          />
        </Link>
        <h1 className="text-xl font-bold">Hogwarts Academy: Staff Info</h1>
      </div>
      {isLoading ? (
        <div className="w-16 h-16 mt-40 mx-auto border-8 border-dashed rounded-full animate-spin border-white"></div>
      ) : (
        <div className="grid grid-cols-3 gap-10 w-full">
          <Image
            src={staff?.image || "/images/hogwarts-logo.png"}
            width={400}
            height={600}
            alt="try"
            className="w-full object-cover h-[35rem] border-4 rounded-xl col-span-1"
          />
          <div className="col-span-2 space-y-6">
            <h1 className="text-2xl">{staff?.actor}</h1>
            <div className="space-y-3">
              <h2 className="text-xl">Hogwarts Academy Info:</h2>
              <p className="capitalize">House: {staff?.house || 'Gryffindor'}</p>
              <p className="capitalize">
                Wand:{" "}
                {staff?.wand?.core || staff?.wand?.wood || staff?.wand?.length || "Unicorn Tail-Hair"}
              </p>
            </div>
            <div className="space-y-3">
              <h2>Known For</h2>
              <div className="flex overflow-x-scroll py-4 px-3 gap-4">
                {knownFor?.map((movie) => {
                  return (
                    <div
                      key={movie?.id}
                      className="shrink-0 transition duration-400 hover:scale-105 hover:z-10"
                    >
                      <Image
                        src={
                          `${imgURL}${movie?.poster_path}` ||
                          "/images/hogwarts-logo.png"
                        }
                        width={400}
                        height={600}
                        alt="try"
                        className="w-full object-cover h-80 border-4 rounded-xl"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
