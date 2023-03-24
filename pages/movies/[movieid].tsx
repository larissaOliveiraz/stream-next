import { Header } from "@/components/Header";
import { useApi } from "@/hooks/useApi";
import { useFormatter } from "@/hooks/useFormatter";
import { Credit } from "@/types/Credit";
import { Image as ImageType } from "@/types/Image";
import { Movie } from "@/types/Movie";
import { ArrowLeft } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/MovieInfo.module.scss";

type MovieInfoProps = {
   movie: Movie;
   images: ImageType;
   actors: Credit;
};

const MovieInfo = ({ movie, images, actors }: MovieInfoProps) => {
   const router = useRouter();
   const formatter = useFormatter();

   const baseImgUrl = "https://image.tmdb.org/t/p/original";
   const selectedImages = images.backdrops.slice(1, 7);
   const shortCast = actors.cast.slice(0, 6);
   const voteAverage = movie.vote_average.toFixed(1);

   return (
      <div className={styles.container}>
         <Head>
            <title>{movie.title}</title>
         </Head>
         <div className={styles.contentContainer}>
            <div className={styles.topArea}>
               <div className={styles.imageArea}>
                  <img src={`${baseImgUrl}${movie.backdrop_path}`} alt="" />
               </div>
               <ArrowLeft
                  size={28}
                  weight="bold"
                  className={styles.arrow}
                  onClick={() => router.back()}
               />
            </div>

            <div className={styles.infoContainer}>
               <div className={styles.infoContent}>
                  {/* Movie Info */}
                  <div className={styles.infoArea}>
                     <div className={styles.poster}>
                        <img src={`${baseImgUrl}${movie.poster_path}`} alt="" />
                        <div className={styles.posterDec}></div>
                     </div>
                     <div className={styles.infoText}>
                        <h2>{movie.title}</h2>
                        <p className={styles.tagline}>{movie.tagline}</p>
                        <div className={styles.genres}>
                           {movie.genres.map((genre) => (
                              <p key={genre.id}>{genre.name}</p>
                           ))}
                        </div>
                        <div className={styles.duration}>
                           <div>{voteAverage}</div>
                           <span>
                              {movie.release_date &&
                                 formatter.formatDate(movie.release_date)}
                           </span>
                           <p>{movie.runtime}min</p>
                        </div>
                        <div className={styles.description}>
                           {movie.overview}
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
                           <div
                              key={item.id}
                              className={styles.castMember}
                              onClick={() => router.push(`/actors/${item.id}`)}
                           >
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
   const { movieid } = context.query;
   const api = useApi();

   const movie = await api.getMovie(movieid as string);

   const images = await api.getMovieImages(movieid as string);

   const actors = await api.getMovieCast(movieid as string);

   return {
      props: { movie, images, actors },
   };
};

export default MovieInfo;
