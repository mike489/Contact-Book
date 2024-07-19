import {
  // Avatar,
  // Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
  em,
  Modal,
  // colorsTuple,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Navigation from "../../features/home/Nav/Navigation";
import { useState } from "react";
import ContactForm from "../../features/form/addcontact-form/contact-form";

interface Contact {
  name: string;
  email: string;
  phone: string;
  employeeId: string; // Add the employeeId property
}

// ... other data objects

const data = [
  {
    employeeId: "1",
    name: "Robert Wolfkisser",
    email: "rob_wolf@gmail.com",
    phone: "+44 (452) 886 09 12",
  },
  {
    employeeId: "2",
    name: "Jill Jailbreaker",
    email: "jj@breaker.com",
    phone: "+44 (934) 777 12 76",
  },
  {
    employeeId: "3",
    name: "Henry Silkeater",
    email: "henry@silkeater.io",
    phone: "+44 (901) 384 88 34",
  },
  {
    employeeId: "4",
    name: "Bill Horsefighter",
    email: "bhorsefighter@gmail.com",
    phone: "+44 (667) 341 45 22",
  },
  {
    employeeId: "5",
    name: "Jeremy Footviewer",
    email: "jeremy@foot.dev",
    phone: "+44 (881) 245 65 65",
  },
];

// const jobColors: Record<string, string> = {
//   engineer: "blue",
//   manager: "cyan",
//   designer: "pink",
// };

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEditing, setIsEditing] = useState(false); // Track the editing state
  const [isModalOpen, setIsModalOpen] = useState(false); // Track the modal state

  const [employeeId, setEmployeeId] = useState("");

  const addContact = (newContact: Contact) => {
    const contactWithEmployeeId: Contact = {
      ...newContact,
      employeeId: newContact.employeeId || "",
    };
    setContacts([...contacts, contactWithEmployeeId]);
  };
  const deleteContact = (contactName: string) => {
    setContacts(contacts.filter((contact) => contact.name !== contactName));
  };

  const editContact = (employeeId: string) => {
    const contactToEdit = contacts.find(
      (contact) => contact.employeeId === employeeId
    );
    setSelectedContact(contactToEdit || null);
    setIsEditing(true); // Set the editing state to true
    setIsModalOpen(true); // Open the modal when editing a contact
  };

  const resetForm = () => {
    setSelectedContact(null);
    setIsEditing(false);
    setIsModalOpen(false); // Close the modal when resetting the form
  };

  const rows = contacts.map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Anchor component="button" size="sm">
          {item.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.phone}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => {
              editContact(item.employeeId);
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
              deleteContact(item.name);
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
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Navigation />
      {/* Render the ContactForm component */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Contact Form"
      >
        <ContactForm
          addContact={addContact}
          contact={selectedContact}
          resetForm={resetForm}
        />
      </Modal>
      <button
        style={{ marginTop: "20px" }}
        onClick={() => setIsModalOpen(true)}
      >
        Add Contact
      </button>
      <Table verticalSpacing="sm" style={{ marginTop: "50px" }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Contacts</Table.Th>

            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default ContactList;
