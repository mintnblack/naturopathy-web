import ReactLoading from 'react-loading';
import styles from './LoadingScreen.module.css';
import { useLocation } from 'react-router-dom';

export default function LoadingScreen() {
  const location = useLocation();
  const path = location.pathname;

  const loadingScreenClass = path.includes('user')
    ? styles.userLoadingScreen
    : styles.loadingScreen;

  return (
    <div className={loadingScreenClass}>
      <div className={styles.loadingContainer}>
        <ReactLoading type="bars" color="#B6D54D" height={50} width={50} />
        <h1>LOADING...</h1>
      </div>
    </div>
  );
}