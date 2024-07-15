import { Page } from '../../components';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <Page title="Home">
      <div className={styles.logo}>
        <img src="/assets/images/logo.svg" alt="React Logo" />
      </div>
      <p className={styles.lead}>
        <strong>react-ssr</strong> is universal React web app boilerplate.
      </p>
      <br />
      <a
        href="https://github.com/xuanhoa88/react-ssr"
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub repository
      </a>
    </Page>
  );
}
