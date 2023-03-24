import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { useApi } from "@/hooks/useApi";
import { Movie } from "@/types/Movie";
import { MagnifyingGlass } from "@phosphor-icons/react";
import axios from "axios";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import bgImg from "../../assets/bg-movie.jpg";
import styles from "../../styles/Movies.module.scss";

type MovieProps = {
   movies: { results: Movie[] };
};

const Movies = ({ movies }: MovieProps) => {
   const [moviesData, setMoviesData] = useState<Movie[]>(movies.results);
   const [page, setPage] = useState(2);

   const router = useRouter();
   const baseImgUrl = "https://image.tmdb.org/t/p/original";

   const handleLoadMore = async () => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/movie/popular?api_key=fba1088600c664667a88c50ab1eddde2&language=en-US&page=${page}`
      );
      console.log(data);

      setPage(page + 1);
      setMoviesData([...moviesData, ...data.results]);
   };

   return (
      <div className={styles.container}>
         <Head>
            <title>Movies</title>
         </Head>
         <header>
            <Header />
            <div className={styles.search}>
               <MagnifyingGlass
                  size={28}
                  color="#e2e2e2"
                  weight="bold"
                  onClick={() => router.push("/search")}
                  className={styles.searchIcon}
               />
            </div>
         </header>

         <div className={styles.content}>
            <div className={styles.topBg}>
               <Image src={bgImg} alt="" />
               <h3>Movies</h3>
            </div>
            <div className={styles.movies}>
               {moviesData.map(
                  (movie) =>
                     movie.poster_path && (
                        <Link
                           href={`/movies/${movie.id}`}
                           key={movie.id}
                           className={styles.imgContainer}
                        >
                           <img
                              src={`${baseImgUrl}${movie.poster_path}`}
                              alt=""
                           />
                        </Link>
                     )
               )}
            </div>
            <div className={styles.btn}>
               <Button title="Load More" onClick={handleLoadMore} />
            </div>
         </div>
      </div>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   const api = useApi();

   const movies = await api.getPopularMovies();

   return {
      props: {
         movies,
      },
      revalidate: 60 * 60 * 24,
   };
};

export default Movies;
