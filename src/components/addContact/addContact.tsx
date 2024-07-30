import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";

import { Button, Center, Loader, Paper, TextInput } from "@mantine/core";
import { IContact } from "../ContactType/ContactType";

type Props = {
  backBtnHandler: () => void;
  onSubmithandler: (data: IContact) => void;
  isUserSignedIn: boolean;
  signInHandler: () => void;
};

const AddContact = (props: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUnauthorizedAlert, setShowUnauthorizedAlert] = useState(false);

  const { backBtnHandler, onSubmithandler, isUserSignedIn, signInHandler } =
    props;

  const token = localStorage.getItem("token");
  console.log(token);

  const user = token ? jwtDecode(token) : null;
  console.log(user);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const onSubmitBtnhandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUserSignedIn) {
      setShowUnauthorizedAlert(true);
      return;
    }
    setIsSubmitting(true);

    const data: IContact = {
      id: new Date().getTime().toString(),
      name: name,
      email: email,
      phone: phone,
    };

    try {
      const authToken = "bearerAuth"; // Replace "your-auth-token" with the actual token value
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        setShowUnauthorizedAlert(true);
        // Optionally, you can trigger the sign-in process here
      } else if (response.ok) {
        onSubmithandler(data);
        backBtnHandler();
      } else {
        console.error("Error adding contact:", response.status);
      }
    } catch (error) {
      console.error("Error adding contact:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeUnauthorizedAlert = () => {
    setShowUnauthorizedAlert(false);
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
            <Button
              type="submit"
              value="add contact"
              ml="sm"
              mt="xl"
              size="sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader size="xs" /> : "Add"}
            </Button>
          </form>
          {showUnauthorizedAlert && (
            <div className="alert alert-warning" role="alert">
              You need to be signed in to add a contact. Please sign in to
              continue.
              <button
                type="button"
                className="close"
                onClick={closeUnauthorizedAlert}
              >
                &times;
              </button>
            </div>
          )}
        </Paper>
      </Center>

      {/* )} */}
    </>
  );
};

export default AddContact;
