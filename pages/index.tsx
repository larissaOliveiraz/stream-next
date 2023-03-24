import { Banner } from "@/components/Banner";
import { Category } from "@/components/Category";
import { Header } from "@/components/Header";
import { useApi } from "@/hooks/useApi";
import { Movie } from "@/types/Movie";
import { Show } from "@/types/Show";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";

type HomeProps = {
   popular: { results: Movie[] };
   top: { results: Movie[] };
   movieTrend: {
      day: { results: Movie[] };
      week: { results: Movie[] };
   };
   tvPopular: { results: Show[] };
   tvTop: { results: Show[] };
   tvTrend: {
      day: { results: Show[] };
      week: { results: Show[] };
   };
};

const Home = ({
   popular,
   top,
   movieTrend,
   tvPopular,
   tvTop,
   tvTrend,
}: HomeProps) => {
   const router = useRouter();
   const baseImgUrl = "https://image.tmdb.org/t/p/original";

   return (
      <>
         <Head>
            <title>Home</title>
            <meta name="description" content="Movies info app" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
         </Head>

         <div className={styles.container}>
            <header>
               <Header />
               <div className={styles.searchContainer}>
                  <MagnifyingGlass
                     size={28}
                     color="#e2e2e2"
                     weight="bold"
                     onClick={() => router.push("/search")}
                     className={styles.searchIcon}
                  />
                  {/* <SearchInput
                     placeholder="Search for movies, tv-shows and actors"
                     onSearch={handleSearch}
                  /> */}
               </div>
            </header>

            <main
               className={styles.main}
               onClick={() => console.log("clickedmain")}
            >
               {/* Banner */}
               <div
                  className={styles.bannerContainer}
                  onClick={() =>
                     router.push(`/movies/${movieTrend.day.results[0].id}`)
                  }
               >
                  <Banner
                     imageUrl={`${baseImgUrl}${movieTrend.day.results[0].backdrop_path}`}
                     title={movieTrend.day.results[0].title}
                  />
               </div>

               {/* CATALOGUE */}
               <div className={styles.bookCatalogue}>
                  <div className={styles.bookCategories}>
                     <div className={styles.bookCategory}>
                        <Category
                           title="Trending Movies"
                           data={movieTrend.day.results}
                        />
                        <Category
                           title="Popular Movies"
                           data={popular.results.slice(0, 15)}
                        />
                        <Category
                           title="Top Rated Movies"
                           data={top.results.slice(0, 15)}
                        />
                        <Category
                           title="Trending Tv Shows"
                           data={tvTrend.day.results.slice(0, 15)}
                           tv
                        />
                        <Category
                           title="Popular Tv Shows"
                           data={tvPopular.results.slice(0, 15)}
                           tv
                        />
                        <Category
                           title="Top Rated Tv Shows"
                           data={tvTop.results.slice(0, 15)}
                           tv
                        />
                     </div>
                  </div>
               </div>
            </main>
         </div>
      </>
   );
};

export const getStaticProps: GetStaticProps = async () => {
   const api = useApi();

   const popular = await api.getPopularMovies();
   const top = await api.getTopRatedMovies();
   const movieTrend = await api.getTrendingMovies();

   const tvPopular = await api.getPopularShows();
   const tvTop = await api.getTopRatedShows();
   const tvTrend = await api.getTrendingShows();

   return {
      props: {
         popular,
         top,
         movieTrend,
         tvPopular,
         tvTop,
         tvTrend,
      },
      revalidate: 60 * 60 * 24,
   };
};

export default Home;
