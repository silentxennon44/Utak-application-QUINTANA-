import styles from "./page.module.scss";
import Navbar from '../components/navbar/index';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      this is home
    </main>
  );
}
