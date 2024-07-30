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

type Props = {
  list: IContact[];
  // onDeleteHandler: (id: string) => void;
  onDeleteHandler: (data: IContact) => void;
};

const ContactList = (props: Props) => {
  const { onDeleteHandler } = props;
  const [contactList, setContactList] = useState<IContact[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    await API.get("/api/contacts").then((response) => {
      console.log(response);
      if (response.data) {
        setContactList(response.data);
      }
    });
  };

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
          <Group gap={0} justify="flex-end">
            <ActionIcon
              variant="subtle"
              color="gray"
              // onClick={() => {
              //   editContact(contact);
              //   console.log("clicked edit");
              // }}
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
                onDeleteHandler(contact);
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
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default ContactList;
