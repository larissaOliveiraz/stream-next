import Image from "next/image";
import styles from "./styles.module.scss";

type Props = {
   imageUrl: string;
   title: string;
};

export const Banner = ({ imageUrl, title }: Props) => {
   return (
      <div className={styles.container}>
         <div className={styles.imgContainer}>
            <img src={imageUrl} alt="" />
         </div>
         <div className={styles.titleArea}>
            <h2>{title}</h2>
         </div>
      </div>
   );
};
