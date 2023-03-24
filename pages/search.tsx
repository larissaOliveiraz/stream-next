import { SearchInput } from "@/components/SearchInput";
import { useApi } from "@/hooks/useApi";
import { Search } from "@/types/Search";
import { ArrowLeft } from "@phosphor-icons/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Search.module.scss";

const Search = () => {
   const [searchValue, setSearchValue] = useState("");
   const [searchRes, setSearchRes] = useState<Search[]>([]);

   const api = useApi();
   const router = useRouter();
   const baseImgUrl = "https://image.tmdb.org/t/p/original";

   const handleSearch = (search: string) => setSearchValue(search);
   useEffect(() => {
      const loadSearch = async (search: string) => {
         const result = await api.searchAll(search);
         setSearchRes(result.results);
      };
      loadSearch(searchValue);
   }, [searchValue]);

   return (
      <div className={styles.container}>
         <Head>
            <title>Search</title>
         </Head>
         <header>
            {/* <Header /> */}
            <div className={styles.arrow} onClick={() => router.back()}>
               <ArrowLeft size={24} color="#e2e2e2" weight="bold" />
            </div>
            <div className={styles.searchContainer}>
               <SearchInput
                  placeholder="Search for movies, tv-shows and actors"
                  onSearch={handleSearch}
               />
            </div>
         </header>

         {searchValue && (
            <div className={styles.movies}>
               {searchRes.map(
                  (item) =>
                     (item.poster_path || item.profile_path) && (
                        <Link
                           href={`/${
                              (item.media_type === "movie" && "movies") ||
                              (item.media_type === "tv" && "shows") ||
                              (item.media_type === "person" && "actors")
                           }/${item.id}`}
                           key={item.id}
                           className={styles.imgContainer}
                        >
                           <img
                              src={`${baseImgUrl}${
                                 ((item.media_type === "movie" ||
                                    item.media_type === "tv") &&
                                    item.poster_path) ||
                                 (item.media_type === "person" &&
                                    item.profile_path)
                              }`}
                              alt=""
                           />
                        </Link>
                     )
               )}
            </div>
         )}
      </div>
   );
};

export default Search;
