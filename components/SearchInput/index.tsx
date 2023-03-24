import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import styles from "./styles.module.scss";

type Props = {
   placeholder: string;
   onSearch: (search: string) => void;
};

export const SearchInput = ({ placeholder, onSearch }: Props) => {
   const [focus, setFocus] = useState(false);
   const [search, setSearch] = useState("");

   return (
      <div
         className={styles.container}
         style={{ borderColor: focus ? "#e2e2e2" : "transparent" }}
      >
         <MagnifyingGlass size={28} color={"#e2e2e2   "} />
         <input
            type="text"
            placeholder={placeholder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyUp={() => onSearch(search)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
         />
      </div>
   );
};
