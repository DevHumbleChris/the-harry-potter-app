"use cleint"

export default async function getPersonInfo(personName: string ) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_ACCESSTOKEN}`
    },
  };

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_PERSON_SEARCH}?query=${personName}&include_adult=false&language=en-US&page=1`,
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
    data: results[0]?.known_for,
  };
}
