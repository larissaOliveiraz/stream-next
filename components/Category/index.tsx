import { Movie } from "@/types/Movie";
import { Show } from "@/types/Show";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

type Props = {
   data: Movie[] | Show[] | { id: number; poster_path: string }[];
   title: string;
   tv?: boolean;
};

export const Category = ({ title, data, tv }: Props) => {
   const baseImgUrl = "https://image.tmdb.org/t/p/original";

   return (
      <div className={styles.container}>
         <div className={styles.topArea}>
            <div className={styles.left}>
               <h3>{title}</h3>
            </div>
         </div>
         <div className={styles.content}>
            {data.map(
               (item) =>
                  item.poster_path && (
                     <Link
                        key={item.id}
                        href={`/${tv ? "shows" : "movies"}/${item.id}`}
                        className={styles.contentItem}
                     >
                        <img src={`${baseImgUrl}${item.poster_path}`} alt="" />
                     </Link>
                  )
            )}
         </div>
      </div>
   );
};
