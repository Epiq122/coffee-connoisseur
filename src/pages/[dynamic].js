import { useRouter } from 'next/router';
import Head from 'next/head';
const DynamicRoute = () => {
  const router = useRouter();
  const { dynamic } = router.query;
  return (
    <div>
      <Head>
        <title>{dynamic}</title>
      </Head>
      <h1>{router.query.dynamic}</h1>
    </div>
  );
};
export default DynamicRoute;
