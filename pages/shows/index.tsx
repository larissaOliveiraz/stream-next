import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { useApi } from "@/hooks/useApi";
import { Show } from "@/types/Show";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Shows.module.scss";
import bgImg from "../../assets/bg-tv.jpg";
import Head from "next/head";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";

type ShowProps = {
   shows: { results: Show[] };
};

const Shows = ({ shows }: ShowProps) => {
   const [showsData, setShowsData] = useState<Show[]>(shows.results);
   const [page, setPage] = useState(2);

   const router = useRouter();
   const baseImgUrl = "https://image.tmdb.org/t/p/original";

   const handleLoadMore = async () => {
      const { data } = await axios.get(
         `https://api.themoviedb.org/3/tv/popular?api_key=fba1088600c664667a88c50ab1eddde2&language=en-US&page=${page}`
      );
      console.log(data);

      setPage(page + 1);
      setShowsData([...showsData, ...data.results]);
   };

   return (
      <div className={styles.container}>
         <Head>
            <title>Tv-Shows</title>
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
               <Image src={bgImg} alt="" fill />
               <h3>Tv-Shows</h3>
            </div>
            <div className={styles.movies}>
               {showsData.map(
                  (show) =>
                     show.poster_path && (
                        <Link
                           href={`/shows/${show.id}`}
                           key={show.id}
                           className={styles.imgContainer}
                        >
                           <img
                              src={`${baseImgUrl}${show.poster_path}`}
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

   const shows = await api.getPopularShows();

   return {
      props: {
         shows,
      },
      revalidate: 60 * 60 * 24,
   };
};

export default Shows;
