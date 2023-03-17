import Loading from '@/components/Loading/Loading';
import { login } from '@/utils/firebase';
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
import { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (open) {
      setOpen(false);
    }

    setLoading(true);

    const user: User = await login(email, password);
    console.log(`user: ${JSON.stringify(user)}`);

    if (user) {
      // SET AUTH CONTEXT USER
      router.push('/dashboard');
    }

    if (!user) {
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
      <Collapse in={open} sx={{ marginTop: '20px', maxWidth: '600px' }}>
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
              <Link href='/accounts/register'>Register here!</Link>
            </Stack>
            <Stack width='100%' mt={1} direction='row' spacing={1}>
              <Typography>Forgot your password?</Typography>
              <Link href='/accounts/reset-password'>Reset here.</Link>
            </Stack>
          </Box>
        </Box>
      </Paper>
      {loading && <Loading />}
    </Box>
  );
}
