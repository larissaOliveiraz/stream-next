import { useApi } from "@/hooks/useApi";
import { useFormatter } from "@/hooks/useFormatter";
import { Credit } from "@/types/Credit";
import { Image as ImageType } from "@/types/Image";
import { Show } from "@/types/Show";
import { ArrowLeft } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/ShowInfo.module.scss";

type MovieInfoProps = {
   show: Show;
   images: ImageType;
   actors: Credit;
};

const ShowInfo = ({ show, images, actors }: MovieInfoProps) => {
   const router = useRouter();
   const formatter = useFormatter();

   const baseImgUrl = "https://image.tmdb.org/t/p/original";
   const selectedImages = images.backdrops.slice(1, 7);
   const shortCast = actors.cast.slice(0, 6);
   const voteAverage = show.vote_average.toFixed(1);

   return (
      <div className={styles.container}>
         <Head>
            <title>{show.name}</title>
         </Head>
         <div className={styles.contentContainer}>
            <div className={styles.topArea}>
               <div className={styles.imageArea}>
                  <img src={`${baseImgUrl}${show.backdrop_path}`} alt="" />
               </div>
               <ArrowLeft
                  size={28}
                  className={styles.arrow}
                  onClick={() => router.push("/")}
               />
            </div>

            <div className={styles.infoContainer}>
               <div className={styles.infoContent}>
                  {/* Movie Info */}
                  <div className={styles.infoArea}>
                     <div className={styles.poster}>
                        <img src={`${baseImgUrl}${show.poster_path}`} alt="" />
                        <div className={styles.posterDec}></div>
                     </div>
                     <div className={styles.infoText}>
                        <h2>{show.name}</h2>
                        <p className={styles.tagline}>{show.tagline}</p>
                        <div className={styles.genres}>
                           {show.genres.map((genre) => (
                              <p key={genre.id}>{genre.name}</p>
                           ))}
                        </div>
                        <div className={styles.duration}>
                           <div>{voteAverage}</div>
                           <span>
                              {formatter.formatDate(show.first_air_date)}
                           </span>
                           <p>{show.episode_run_time}min</p>
                        </div>
                        <div className={styles.description}>
                           {show.overview}
                        </div>
                     </div>
                  </div>

                  {/* Gallery */}
                  <div className={styles.imagesArea}>
                     <h3>Galery</h3>
                     <div className={styles.imagesContainer}>
                        {selectedImages.map((image) => (
                           <img
                              key={image.file_path}
                              src={`${baseImgUrl}${image.file_path}`}
                              alt=""
                           />
                        ))}
                     </div>
                  </div>

                  {/* Cast */}
                  <div className={styles.castArea}>
                     <h3>Cast</h3>
                     <div className={styles.castContainer}>
                        {shortCast.map((item) => (
                           <div key={item.id} className={styles.castMember}>
                              <img
                                 src={`${baseImgUrl}${item.profile_path}`}
                                 alt=""
                              />
                              <p>{item.name}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { showid } = context.query;
   const api = useApi();

   const show = await api.getShow(showid as string);

   const images = await api.getShowImages(showid as string);

   const actors = await api.getShowCast(showid as string);

   return {
      props: { show, images, actors },
   };
};

export default ShowInfo;
