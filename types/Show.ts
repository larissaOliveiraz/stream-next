export type Show = {
   id: number;
   name: string;
   overview: string;
   genres: [{ id: number; name: string }];
   backdrop_path: string;
   poster_path: string;
   first_air_date: string;
   last_air_date: string;
   number_of_seasons: number;
   number_of_episodes: number;
   episode_run_time: number;
   tagline: string;
   vote_average: number;
};
