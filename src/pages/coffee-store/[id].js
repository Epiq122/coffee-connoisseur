import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import coffeeStoresData from '../../../data/coffee-stores';
import styles from '../../styles/coffee-store.module.css';
import cls from 'classnames';
import Image from 'next/image';
import { fetchCoffeeStores } from '../../../lib/coffee-stores';

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      // find the coffee store we want to render
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  // get all the coffee stores
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      // create a path for each coffee store
      params: {
        // the id is the name of the file in the pages folder
        id: coffeeStore.id.toString(),
      },
    };
  });
  // return the paths
  return {
    paths,
    fallback: false,
  };
}

const CoffeeStore = (props) => {
  const { address, name, neighborhood, imgUrl } = props.coffeeStore;
  const router = useRouter();

  const handleUpVoteButton = () => {
    console.log('Up vote button clicked');
  };

  // fallback
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>☜ Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={300}
            height={260}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls('glass', styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src='/static/icons/places.svg'
                width='24'
                height='24'
                alt={name}
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src='/static/icons/nearMe.svg'
                width='24'
                height='24'
                alt={name}
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/star.svg'
              width='24'
              height='24'
              alt={name}
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpVoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
