import React, { useState } from "react";
import axios from "axios";
import { Button, Center, Paper, TextInput } from "@mantine/core";

interface Contact {
  name: string;
  email: string;
  phone: string;
  type: string;
}

interface ContactFormProps {
  addContact: (newContact: Contact) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ addContact }) => {
  const [formData, setFormData] = useState<Contact>({
    name: "",
    email: "",
    phone: "",
    type: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://contact-keeper-api-production.up.railway.app/api/contacts",
        formData,
        {
          headers: {
            Authorization: "Bearer YOUR_AUTH_TOKEN",
          },
        }
      );
      const newContact = response.data; // Assuming the response contains the newly added contact
      addContact(newContact);
      // Reset the form fields
      setFormData({
        name: "",
        email: "",
        phone: "",
        type: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center>
      <Paper radius={0} p={30}>
        <h2>Contact Form</h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            mt="md"
            size="md"
          />

          <TextInput
            label="Email"
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            mt="md"
            size="md"
          />

          <TextInput
            label="Phone"
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            mt="md"
            size="md"
          />

          <Button type="submit" value="Submit" fullWidth mt="xl" size="md">
            Submit
          </Button>
        </form>
      </Paper>
    </Center>
  );
};

export default ContactForm;
