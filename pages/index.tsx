import { useAuth } from '@/components/AuthProvider';
import LoadingOverlay from '@/components/LoadingOverlay';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }, [currentUser, router]);

  return (
    <>
      <Head>
        <title>Boiler Plate Web Front</title>
        <meta
          name='description'
          content='Template project for creating serverless web apps using Google Firebase and MUI.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <LoadingOverlay />
    </>
  );
}
