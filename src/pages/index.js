import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Banner from '/components/banner';
import Image from 'next/image';

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log('Banner button clicked');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText='View stores nearby'
          handleOnClick={handleOnBannerBtnClick}
        />
        <Image
          className={styles.heroImage}
          src='/static/hero-image.png'
          alt='girl drinking coffee'
          width={700}
          height={400}
        />
      </main>
    </div>
  );
}
