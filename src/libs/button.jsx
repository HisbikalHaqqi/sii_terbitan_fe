"use client";

import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";

export const RegisterButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button fullWidth variant="contained" type="submit" disabled={pending}>
      {pending ? "Registering..." : "Register"}
    </Button>
  );
};

export const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button fullWidth variant="contained" type="submit" disabled={pending}>
      {pending ? "Authenticating..." : "Sign In"}
    </Button>
  );
};
