import { FilmSlate, X } from "@phosphor-icons/react";
import Link from "next/link";
import styles from "./styles.module.scss";

type Props = {
   open: boolean;
   onClose: () => void;
};

export const SideBar = ({ open, onClose }: Props) => {
   return (
      <div
         className={styles.container}
         style={{ width: open ? "70vw" : 0, right: open ? 0 : -50 }}
      >
         <div className={styles.content}>
            <div className={styles.top}>
               <h3>StreamNext</h3>
               <X size={24} onClick={onClose} color="#e2e2e2" />
            </div>

            <div className={styles.nav}>
               <Link href={"/"}>Home</Link>
               <Link href={"/movies"}>Movies</Link>
               <Link href={"/shows"}>Tv-Shows</Link>
            </div>
         </div>
      </div>
   );
};
