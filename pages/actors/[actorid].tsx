import { Category } from "@/components/Category";
import { useApi } from "@/hooks/useApi";
import { Actor } from "@/types/Actor";
import { Movie } from "@/types/Movie";
import { ArrowLeft } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/ActorInfo.module.scss";

type ActorInfoProps = {
   actor: Actor;
   work: { cast: Movie[] };
};

const ActorInfo = ({ actor, work }: ActorInfoProps) => {
   const router = useRouter();
   const baseImgUrl = "https://image.tmdb.org/t/p/original";

   return (
      <div className={styles.container}>
         <header>
            <ArrowLeft
               size={28}
               color={"#fff"}
               weight="bold"
               onClick={() => router.back()}
               className={styles.arrow}
            />
         </header>
         <div className={styles.infoArea}>
            <div className={styles.poster}>
               <img src={`${baseImgUrl}${actor.profile_path}`} alt="" />
               <div className={styles.posterDec}></div>
            </div>
            <div className={styles.infoText}>
               <h2>{actor.name}</h2>
               <p className={styles.tagline}>{actor.known_for_department}</p>
            </div>
         </div>

         <div className={styles.works}>
            <Category title="Their projects" data={work.cast} />
         </div>

         <div className={styles.description}>{actor.biography}</div>
      </div>
   );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { actorid } = context.query;
   const api = useApi();

   const actor = await api.getActor(actorid as string);

   const work = await api.getActorWork(actorid as string);

   return {
      props: {
         actor,
         work,
      },
   };
};

export default ActorInfo;
