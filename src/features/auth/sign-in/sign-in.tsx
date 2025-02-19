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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import classes from "../auth.module.css";
import { notifications } from "@mantine/notifications";
import API from "../../../app/api";

interface FormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6
          ? null
          : "Password must be at least 6 characters long",
    },
  });

  const handleSubmit = (
    values: FormValues,
    event: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    event?.preventDefault();
    const { email, password } = values;
    console.log({ email, password });
    API.post("/api/users/login", { email, password }).then((response) => {
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        notifications.show({
          title: "Error",
          message: response.data.msg || "Invalid email or password",
          color: "red",
        });
      }
    });
  };

  return (
    <Paper className={classes.form} radius={0} p={30}>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Sign in to your account
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
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

        <Button fullWidth mt="xl" size="md" type="submit">
          Sign in
        </Button>

        <Text ta="center" mt="md">
          Don't have an account?{" "}
          <Anchor component={Link} to="/auth/sign-up" fw={700}>
            Sign Up
          </Anchor>
        </Text>
      </form>
    </Paper>
  );
};

export default SignIn;
