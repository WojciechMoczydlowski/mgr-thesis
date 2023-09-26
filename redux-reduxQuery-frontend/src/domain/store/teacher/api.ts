// // Need to use the React-specific entry point to import createApi
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Course } from "./courses/model";

// // Define a service using a base URL and expected endpoints
// export const teacherApi = createApi({
//   reducerPath: "teacherApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
//   endpoints: (builder) => ({
//     getPokemonByName: builder.query<Course, string>({
//       query: (name) => `pokemon/${name}`,
//     }),
//   }),
// });

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useGetPokemonByNameQuery } = pokemonApi;
