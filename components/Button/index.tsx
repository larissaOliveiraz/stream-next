import styles from "./styles.module.scss";

type Props = {
   title: string;
   onClick: () => void;
   fill?: boolean;
};

export const Button = ({ title, fill, onClick }: Props) => {
   return (
      <div className={styles.container} onClick={onClick}>
         {title}
      </div>
   );
};
