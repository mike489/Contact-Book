import { useState, useEffect } from "react";
import {
  // Avatar,
  // Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
  // em,
  // Modal,
  // Button,
  // colorsTuple,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

import { IContact } from "../ContactType/ContactType";
import API from "../../app/api";
// import { useNavigate } from "react-router-dom";
import EditContact from "../editContact/editContact";

// type Props = {
//   list: IContact[];
// };

const ContactList = () => {
  const [contactList, setContactList] = useState<IContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    await API.get("/api/contacts").then((response) => {
      console.log(response);
      if (response.data) {
        console.log("Fetched contacts:", response.data);
        setContactList(response.data);
      }
    });
  };

  const handleDelete = async (_id: string) => {
    try {
      await API.delete(`/api/contacts/${_id}`);
      setContactList((prev) => prev.filter((contact) => contact._id !== _id));
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const handleEdit = async (_id: string) => {
    const contactToEdit = contactList.find((contact) => contact._id === _id);
    if (contactToEdit) {
      console.log("Selected contact for editing:", contactToEdit);
      setSelectedContact(contactToEdit);
    }
  };

  const handleBack = () => {
    setSelectedContact(null);
  };

  const handleUpdate = async (updatedContact: IContact) => {
    try {
      await API.put(`/api/contacts/${updatedContact._id}`, updatedContact);
      setContactList((prev) =>
        prev.map((contact) =>
          contact._id === updatedContact._id ? updatedContact : contact
        )
      );
      setSelectedContact(null);
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  if (selectedContact) {
    return (
      <EditContact
        contact={selectedContact}
        backBtnHandler={handleBack}
        onSubmithandler={handleUpdate}
      />
    );
  }

  const rows = contactList.map((contact) => {
    return (
      <Table.Tr key={contact._id}>
        <Table.Td>
          <Group gap="sm">
            <Text fz="sm" fw={500}>
              {contact.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" size="sm">
            {contact.email}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">{contact.phone}</Text>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">{contact.type}</Text>
        </Table.Td>
        <Table.Td>
          <Group gap={0} justify="flex-end">
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => {
                handleEdit(contact._id);
                console.log("clicked edit");
              }}
            >
              <IconPencil
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => {
                handleDelete(contact._id);
              }}
            >
              <IconTrash
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm" style={{ marginTop: "50px" }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>TYPE</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default ContactList;
