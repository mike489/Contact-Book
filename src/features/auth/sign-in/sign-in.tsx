import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import classes from "../auth.module.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <Paper className={classes.form} radius={0} p={30}>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Welcome back to Contact Book!
      </Title>

      <TextInput
        label="Email address"
        placeholder="hello@gmail.com"
        size="md"
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        mt="md"
        size="md"
      />
      <Checkbox label="Keep me logged in" mt="xl" size="md" />
      <Button fullWidth mt="xl" size="md" component={Link} to="/home">
        Login
      </Button>

      <Text ta="center" mt="md">
        Don&apos;t have an account?{" "}
        <Anchor<"a">
          href="#"
          fw={700}
          onClick={(event) => event.preventDefault()}
        >
          Register
        </Anchor>
      </Text>
    </Paper>
  );
};

export default SignIn;
