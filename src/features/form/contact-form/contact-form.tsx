import React from "react";

import { Button, Center, Paper, TextInput } from "@mantine/core";
import { IContact } from "../../../components/ContactType/ContactType";
// import ContactList from "../../../components/contact-list/contact-list";

import { jwtDecode } from "jwt-decode";
import API from "../../../app/api";
import { useForm } from "@mantine/form";

type Props = {
  backBtnHandler: () => void;
  onSubmithandler: (data: IContact) => void;
};

const ContactForm = (props: Props) => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      type: "",
    },
    validate: {
      name: (value) => (value.length > 0 ? null : "Name is required"),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Phone number must be 10 digits",
      type: (value) => (value.length > 0 ? null : "Type is required"),
    },
  });

  const { backBtnHandler, onSubmithandler } = props;

  const token = localStorage.getItem("token");
  console.log(token);

  const user = token ? jwtDecode(token) : null;
  console.log(user);

  const onSubmitBtnhandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await API.post("/api/contacts", form.values);
      console.log(response.data);
      if (response.data.token) {
        const data = response.data;
        localStorage.setItem("token", response.data.token);
        // Handle successful response

        onSubmithandler(data);
        backBtnHandler();
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <>
      <Center>
        <Paper radius={0} p={30}>
          <h2>Contact Form</h2>
          <form onSubmit={onSubmitBtnhandler}>
            <TextInput
              label="Name"
              type="text"
              name="name"
              {...form.getInputProps("name")}
              required
              mt="md"
              size="md"
            />

            <TextInput
              label="Email"
              type="text"
              name="email"
              {...form.getInputProps("email")}
              required
              mt="md"
              size="md"
            />

            <TextInput
              label="Phone"
              type="text"
              name="phone"
              {...form.getInputProps("phone")}
              required
              mt="md"
              size="md"
            />
            <TextInput
              label="Type"
              type="text"
              name="type"
              {...form.getInputProps("type")}
              required
              mt="md"
              size="md"
            />
            <Button
              type="button"
              value="add contact"
              ml="sm"
              mt="xl"
              size="sm"
              onClick={backBtnHandler}
            >
              Back
            </Button>
            <Button type="submit" value="add contact" ml="sm" mt="xl" size="sm">
              Add
            </Button>
          </form>
        </Paper>
      </Center>
    </>
  );
};

export default ContactForm;
