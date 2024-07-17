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
import { useState } from "react";

const defaultFormValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormValues);
  const { email, password } = formFields;

  console.log(formFields);

  const restForm = () => {
    setFormFields(defaultFormValues);
  };

  const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formFields);
    restForm();
  };
  return (
    <Paper className={classes.form} radius={0} p={30}>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Welcome back to Contact Book!
      </Title>

      <form onSubmit={handlesubmit}>
        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          type="email"
          size="md"
        />
        <PasswordInput
          label="Password"
          type="password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md" component={Link} to={""} >
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
      </form>
    </Paper>
  );
};

export default SignIn;
