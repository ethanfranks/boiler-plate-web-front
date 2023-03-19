import AppContainer from '@/components/AppContainer/AppContainer';
import { useAuth } from '@/components/AuthProvider';
import LoadingOverlay from '@/components/LoadingOverlay';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AccountInfo() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    } else {
      setLoggedIn(true);
    }
  }, [currentUser, router]);

  return (
    <AppContainer>
      {!loggedIn ? (
        <LoadingOverlay />
      ) : (
        <Box
          height='100%'
          width='100%'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Typography>Hello Account Info!</Typography>
        </Box>
      )}
    </AppContainer>
  );
}
