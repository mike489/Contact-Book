import React, { useState } from "react";

import { Button, Center, Paper, TextInput } from "@mantine/core";
import { IContact } from "../ContactType/ContactType";

type Props = {
  backBtnHandler: () => void;
  onSubmithandler: (data: IContact) => void;
};

const AddContact = (props: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { backBtnHandler, onSubmithandler } = props;

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const onSubmitBtnhandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: IContact = {
      id: new Date().getTime().toString(),
      name: name,
      email: email,
      phone: phone,
    };
    onSubmithandler(data);
    backBtnHandler();
  };

  return (
    <>
      {/* {showPage === "list" && ( */}
      <Center>
        <Paper radius={0} p={30}>
          <h2>Contact Form</h2>
          <form onSubmit={onSubmitBtnhandler}>
            <TextInput
              label="Name"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onNameChange}
              required
              mt="md"
              size="md"
            />

            <TextInput
              label="Email"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={onEmailChange}
              required
              mt="md"
              size="md"
            />

            <TextInput
              label="Phone"
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={onPhoneChange}
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
      {/* )} */}
    </>
  );
};

export default AddContact;
