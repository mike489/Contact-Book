import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import classes from "../auth.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6
          ? null
          : "Password must be at least 6 characters long",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleSubmit = (
    values: FormValues,
    event: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    event?.preventDefault();
    const { name, email, password } = values;
    console.log({ name, email, password });
    fetch(
      "https://contact-keeper-api-production.up.railway.app/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    )
      // .then((response) => response.json())
      .then((response) => {
        navigate("/auth/sign-in");
        console.log("Success:", response);
      })
      // (e.g., redirect to home page the contact list that we will create)
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <Paper className={classes.form} radius={0} p={30}>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Welcome to Contact Book!
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Name"
          placeholder="Your name"
          size="md"
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          type="email"
          size="md"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          type="password"
          placeholder="Your password"
          mt="md"
          size="md"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          mt="md"
          {...form.getInputProps("confirmPassword")}
        />

        <Button fullWidth mt="xl" size="md" type="submit">
          Sign up
        </Button>

        <Text ta="center" mt="md">
          I have an account{" "}
          <Anchor component={Link} to="/auth/sign-in" fw={700}>
            Sign In
          </Anchor>
        </Text>
      </form>
    </Paper>
  );
};

export default SignUp;
