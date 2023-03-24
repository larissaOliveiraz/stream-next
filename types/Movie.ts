export type Movie = {
   id: number;
   title: string;
   overview: string;
   genres: [{ id: number; name: string }];
   backdrop_path: string;
   poster_path: string;
   release_date: string;
   runtime: number;
   tagline: string;
   vote_average: number;
};
