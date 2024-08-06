import { useState } from "react";
import ContactList from "../../components/contact-list/contact-list";
import { Button } from "@mantine/core";
import { IContact, PageEnum } from "../../components/ContactType/ContactType";
import ContactForm from "../../features/form/contact-form/contact-form";
import Navigation from "./Nav/Navigation";

const Home = () => {
  const [contactsList, setcontactsList] = useState([] as IContact[]);

  const [showPage, setShowPage] = useState(PageEnum.list);

  const addContactHandler = () => {
    setShowPage(PageEnum.add);
  };

  const showListPage = () => {
    setShowPage(PageEnum.list);
  };

  const addContact = (data: IContact) => {
    setcontactsList([...contactsList, data]);
    showListPage();
  };

  return (
    <div>
      {showPage === PageEnum.list && (
        <>
          <Navigation />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ marginLeft: "auto" }}>Contact List</h1>
            <Button
              size="sm"
              onClick={addContactHandler}
              style={{ marginLeft: "auto", marginRight: "10px" }}
            >
              Add Contact
            </Button>
          </div>
          <ContactList />
        </>
      )}
      {showPage === PageEnum.add && (
        <ContactForm
          backBtnHandler={showListPage}
          onSubmithandler={addContact}
        />
      )}
    </div>
  );
};

export default Home;
