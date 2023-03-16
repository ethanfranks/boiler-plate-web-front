import { login } from "@/utils/firebase";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await login(email, password);
    router.push("/dashboard");
  }

  return (
    <Box
      component="main"
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4" margin={2}>
        Login
      </Typography>
      <Stack
        component="form"
        spacing={4}
        onSubmit={handleSubmit}
        width={{ xs: "90%", sm: "55%", md: "45%", lg: "35%", xl: "25%" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          placeholder="youremail@email.com"
          autoFocus
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          autoFocus
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button type="submit" fullWidth variant="contained">
          <Typography variant="h6">Login</Typography>
        </Button>
      </Stack>
      <Stack margin={2} direction="row" spacing={1}>
        <Typography>{"Don't have an account?"}</Typography>
        <Link href="/register">Register here!</Link>
      </Stack>
    </Box>
  );
}
