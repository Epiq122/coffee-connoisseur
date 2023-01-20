import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Banner from '/components/banner';
import Image from 'next/image';
import Card from '/components/card';
import { fetchCoffeeStores } from '../../lib/coffee-stores';

// This function gets called at build time
// server-side code
export async function getStaticProps() {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

// client-side code
export default function Home(props) {
  const { coffeeStores } = props;

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
        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Vancouver Stores</h2>
            <div className={styles.cardLayout}>
              {/* Map through the cofee stores */}
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                    }
                    href={`/coffee-store/${coffeeStore.id}`}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
