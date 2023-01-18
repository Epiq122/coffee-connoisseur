import { useRouter } from 'next/router';
import Link from 'next/link';

const Courses = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Welcome To Next JS With ROB</h1>
      <p>{router.query.id}</p>
      <Link href='/courses/exitus'>Back to home</Link>
    </div>
  );
};

export default Courses;
