import React, { useState } from "react";
// import axios from "axios";
import { Button, Center, Paper, TextInput } from "@mantine/core";

interface Contact {
  user: string;
  name: string;
  email: string;
  phone: string;
  type: string;
}
type Props = {
  handleSubmit: (data: Contact) => void;
  contact: Contact;
};

// interface ContactFormProps {
//   addContact: (newContact: Contact) => void;
// }

const ContactForm = (props: Props) => {
  // Remove the declaration of handleSubmit inside the function body

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [contacts, setContacts] = React.useState<Contact[]>([]);

  const [showPage, setShowpage] = useState("list");

  const onAddContact = () => {
    setShowpage("add");
  };

  const addContact = (data: Contact) => {
    setContacts([...contacts, data]);
  };

  // const [formData, setFormData] = useState<Contact>({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   type: "",
  // });

  const { handleSubmit } = props;

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleBtnSubmit = () => {
    const data: Contact = {
      user: new Date().toJSON().toString(),
      name: name,
      email: email,
      phone: phone,
      type: "personal",
    };

    handleSubmit(data);
    // e.preventDefault();
    // try {
    //   const response = await axios.post(
    //     "https://contact-keeper-api-production.up.railway.app/api/contacts",
    //     formData,
    //     {
    //       headers: {
    //         Authorization: "Bearer YOUR_AUTH_TOKEN",
    //       },
    //     }
    //   );
    //   const newContact = response.data; // Assuming the response contains the newly added contact
    //   addContact(newContact);
    //   // Reset the form fields
    //   setFormData({
    //     name: "",
    //     email: "",
    //     phone: "",
    //     type: "",
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <>
      {showPage === "list" && (
        <Center>
          <Paper radius={0} p={30}>
            <h2>Contact Form</h2>
            <form onSubmit={handleBtnSubmit}>
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
              >
                Back
              </Button>
              <Button
                type="button"
                value="add contact"
                ml="sm"
                mt="xl"
                size="sm"
                onClick={onAddContact}
              >
                Add
              </Button>
            </form>
          </Paper>
        </Center>
      )}
      {/* {showPage === "add" && <ContactList handleSubmit={addContact} />} */}
    </>
  );
};

export default ContactForm;
