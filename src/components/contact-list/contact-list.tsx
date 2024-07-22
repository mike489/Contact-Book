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
import Navigation from "../../features/home/Nav/Navigation";

import { IContact } from "../ContactType/ContactType";

type Props = {
  list: IContact[];
};

const ContactList = (props: Props) => {
  const { list } = props;

  const rows = list.map((contact) => {
    return (
      <Table.Tr>
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
              //   editContact(item.employeeId);
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
              // onClick={() => {
              //   deleteContact(item.name);
              // }}
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
      <Navigation />

      <Table verticalSpacing="sm" style={{ marginTop: "50px" }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        {rows}
      </Table>
    </Table.ScrollContainer>
  );
};

export default ContactList;
