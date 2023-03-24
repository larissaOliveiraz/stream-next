import { Image } from "@/types/Image";
import axios from "axios";

export const useApi = () => ({
   searchAll: async (search: string) => {
      const searchURI = encodeURI(search);
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchURI}&language=en-US&page=1&include_adult=false`
      );
      return data;
   },

   searchMovies: async (search: string) => {
      const searchURI = encodeURI(search);
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchURI}&language=en-US&page=1&include_adult=false`
      );
      return data;
   },

   searchShows: async (search: string) => {
      const searchURI = encodeURI(search);
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchURI}&language=en-US&page=1&include_adult=false`
      );
      return data;
   },

   getPopularMovies: async (page?: number) => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/movie/popular?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
         }&language=en-US&page=${page ? page : "1"}`
      );

      return data;
   },

   getTopRatedMovies: async () => {
      const { data } = await axios.get(`
      https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`);

      return data;
   },

   getTrendingMovies: async () => {
      const day = await axios.get(`
      https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);

      const week = await axios.get(`
      https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);

      return { day: day.data, week: week.data };
   },

   getMovie: async (id: string) => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      );

      return data;
   },

   getMovieImages: async (id: string) => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&include_image_language=en,null`
      );

      return data;
   },

   getMovieCast: async (id: string) => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      );

      return data;
   },

   getPopularShows: async () => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
      );

      return data;
   },

   getTopRatedShows: async () => {
      const { data } = await axios.get(`
      https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`);

      return data;
   },

   getTrendingShows: async () => {
      const day = await axios.get(`
      https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);

      const week = await axios.get(`
      https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);

      return { day: day.data, week: week.data };
   },

   getShow: async (id: string) => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      );

      return data;
   },

   getShowImages: async (id: string) => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/tv/${id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&include_image_language=en,null`
      );
      return data;
   },

   getShowCast: async (id: string) => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      );
      return data;
   },

   getActor: async (id: string) => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      );

      return data;
   },

   getActorWork: async (id: string) => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      );
      return data;
   },
});
