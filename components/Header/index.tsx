import Image from "next/image";
import Link from "next/link";
import { Button } from "../Button";
import logoImg from "@/assets/logo.png";
import { useRouter } from "next/router";
import { List, FilmSlate } from "@phosphor-icons/react";
import styles from "./styles.module.scss";
import { useState } from "react";
import { SideBar } from "../SideBar";

export const Header = () => {
   const [active, setActive] = useState(false);
   const [open, setOpen] = useState(false);

   const router = useRouter();

   return (
      <div className={styles.container}>
         <div className={styles.leftArea}>
            <div
               className={styles.logoContainer}
               onClick={() => router.push("/")}
            >
               <FilmSlate size={48} color={"#e2e2e2"} />
            </div>

            <div className={styles.navContainer}>
               <div
                  className={`${styles.navLinks} ${
                     router.pathname === "/" && styles.active
                  }`}
               >
                  <Link href={"/"}>Home</Link>
               </div>
               <div
                  className={`${styles.navLinks} ${
                     router.pathname === "/movies" && styles.active
                  }`}
               >
                  <Link href={"/movies"}>Movies</Link>
               </div>
               <div
                  className={`${styles.navLinks} ${
                     router.pathname === "/shows" && styles.active
                  }`}
               >
                  <Link href={"/shows"}>Shows</Link>
               </div>
               {/* <div className={styles.navLinks}>
                  <Link href={"/shows"}>My list</Link>
               </div> */}
            </div>
         </div>

         <div className={styles.rightArea}>
            <div className={styles.menuContainer}>
               {/* <div className={styles.signIn}>
                  <Button title="SignIn" onClick={() => {}} />
               </div> */}
               <div className={styles.menu}>
                  <List
                     size={28}
                     color={"#e2e2e2"}
                     onClick={() => setOpen(true)}
                  />
                  <div className={styles.sidebar}>
                     <SideBar open={open} onClose={() => setOpen(false)} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
