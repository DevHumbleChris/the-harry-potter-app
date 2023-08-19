"use client"

import Image from "next/image";
import { useAppSelector, useAppDispatch } from '../stores/hooks'
import { getHarryPotterMovies } from "@/stores/movies";

async function getData() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_KEY_ACCESSTOKEN}`
    }
  };

  const resp = await fetch(`${process.env.API_BASEURL}?query=harry%20potter&include_adult=false&language=en-US&page=1`, options)
  
  if (!resp.ok) {
    console.log(resp)
    return {
      error: 'Failed To Fetch Data',
      data: null
    }
  }

  const { results } = await resp.json()

  return {
    error: null,
    data: results
  }
}

export default async function Home() {
  const movies = useAppSelector(state => state.movies.potterMovies)
  const dispatch = useAppDispatch()
  const { data } = await getData()
  if (data) {
    dispatch(getHarryPotterMovies(data))
  }
  return <main></main>;
}
