import { useState } from "react";
import ContactList from "../../components/contact-list/contact-list";
import { Button } from "@mantine/core";
import {
  dummyContact,
  IContact,
  PageEnum,
} from "../../components/ContactType/ContactType";
import AddContact from "../../components/addContact/addContact";

const Home = () => {
  const [contactsList, setcontactsList] = useState(dummyContact as IContact[]);

  const [showPage, setShowPage] = useState(PageEnum.list);

  const addContactHandler = () => {
    setShowPage(PageEnum.add);
  };

  const showListPage = () => {
    setShowPage(PageEnum.list);
  };

  const addContact = (data: IContact) => {
    setcontactsList([...contactsList, data]);
    // setShowPage(PageEnum.list);
  };

  // const resetForm = () => {
  //   setIsModalOpen(false); // Close the modal when resetting the form
  // };

  return (
    <div>
      {showPage === PageEnum.list && (
        <>
          <ContactList list={contactsList} />
          <Button
            ml="sm"
            mt="xl"
            size="sm"
            value="Add Contact"
            onClick={addContactHandler}
          >
            Add Contact
          </Button>
        </>
      )}
      {showPage === PageEnum.add && (
        <AddContact backBtnHandler={showListPage} onSubmithandler={addContact} />
      )}
    </div>
  );
};

export default Home;
