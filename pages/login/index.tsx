import { useAuth } from '@/components/AuthProvider';
import LoadingOverlay from '@/components/LoadingOverlay';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const auth = useAuth();
  const router = useRouter();
  const { currentUser } = useAuth();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (open) {
      setOpen(false);
    }

    setLoading(true);

    const loginRes = await auth.login(email, password);

    if (loginRes.successful) {
      router.push('/dashboard');
    }

    if (!loginRes.successful) {
      setLoading(false);
      setOpen(true);
    }
  }

  return (
    <Box
      component='main'
      height='100%'
      width='100%'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Collapse
        in={open}
        sx={{
          mb: 2,
          width: { xs: '90%', sm: '55%', md: '45%', lg: '35%', xl: '25%' },
        }}
      >
        <Alert severity='error'>
          <AlertTitle>Invalid Credentials</AlertTitle>
          Please make sure you entered your email and password correctly.
        </Alert>
      </Collapse>
      <Paper
        sx={{
          width: { xs: '90%', sm: '55%', md: '45%', lg: '35%', xl: '25%' },
          padding: '20px',
        }}
      >
        <Typography variant='h4'>Welcome,</Typography>
        <Typography variant='h5' mt={1}>
          Please log in to continue.
        </Typography>
        <Stack component='form' mt={2} spacing={4} onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoFocus
            type='email'
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='password'
            label='Password'
            name='password'
            type='password'
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button type='submit' fullWidth variant='contained'>
            <Typography variant='h6'>Login</Typography>
          </Button>
        </Stack>
        <Box width='100%' display='flex' justifyContent='center'>
          <Box>
            <Stack width='100%' mt={2} direction='row' spacing={1}>
              <Typography>{"Don't have an account?"}</Typography>
              <Button
                onClick={() => {
                  router.push('/register');
                }}
                sx={{
                  height: 'wrap-content',
                  width: 'wrap-content',
                  padding: 0,
                  margin: 0,
                  display: 'inline-block',
                  textTransform: 'none',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                  lineHeight: 1.5,
                }}
              >
                Register here.
              </Button>
            </Stack>
            <Stack width='100%' mt={1} direction='row' spacing={1}>
              <Typography>Forgot your password?</Typography>
              <Button
                onClick={() => {
                  router.push('/reset-password');
                }}
                sx={{
                  height: 'wrap-content',
                  width: 'wrap-content',
                  padding: 0,
                  margin: 0,
                  display: 'inline-block',
                  textTransform: 'none',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                  lineHeight: 1.5,
                }}
              >
                Reset here.
              </Button>
            </Stack>
          </Box>
        </Box>
      </Paper>
      {loading && <LoadingOverlay />}
    </Box>
  );
}
