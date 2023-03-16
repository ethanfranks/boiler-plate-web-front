import { register } from "@/utils/firebase";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await register(email, password);
      router.push("/dashboard");
    } catch (error) {
      setOpen(true);
      console.log(error);
    }
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
      <Collapse in={open} sx={{ marginTop: "20px", maxWidth: "600px" }}>
        <Alert severity="error">
          <AlertTitle>Error Registering Account</AlertTitle>
          Please make sure you entered your email correctly.
        </Alert>
      </Collapse>
      <Typography variant="h4" margin={2}>
        Register
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
          <Typography variant="h6">Register</Typography>
        </Button>
      </Stack>
      <Box margin={2}>
        <Link href="/login">Back to login.</Link>
      </Box>
    </Box>
  );
}
