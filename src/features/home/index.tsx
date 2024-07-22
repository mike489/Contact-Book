import { useState } from "react";
import ContactList from "../../components/contact-list/contact-list";
// import { Button } from "@mantine/core";
import {
  dummyContact,
  IContact,
} from "../../components/ContactType/ContactType";

const Home = () => {
  const [contactsList, setcontactsList] = useState(dummyContact as IContact[]);

  // const resetForm = () => {
  //   setIsModalOpen(false); // Close the modal when resetting the form
  // };

  return (
    <div>
      <ContactList list={contactsList} />
      {/* <Button ml="sm" mt="xl" size="sm">
        Add Contact
      </Button> */}
    </div>
  );
};

export default Home;
