import {
  Avatar,
  // Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
  // colorsTuple,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Navigation from "./Nav/Navigation";
import { useState } from "react";

const data = [
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
    name: "Robert Wolfkisser",

    email: "rob_wolf@gmail.com",
    phone: "+44 (452) 886 09 12",
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
    name: "Jill Jailbreaker",

    email: "jj@breaker.com",
    phone: "+44 (934) 777 12 76",
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    name: "Henry Silkeater",

    email: "henry@silkeater.io",
    phone: "+44 (901) 384 88 34",
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
    name: "Bill Horsefighter",

    email: "bhorsefighter@gmail.com",
    phone: "+44 (667) 341 45 22",
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
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

interface HomeProps {
  contact: any;
  deleteContact: (contactName: string) => void;
  editContact: (contactName: string, employeeId: string) => void;
}

const Home = () => {
  const [contactName, setContactName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  // const [contact];

  const addContact = (contactName: string, employeeId: string) => {
    console.log("addContact");
  };

  const deleteContact = (contactName: string) => {
    console.log("deleteContact");
  };

  const editContact = (contactName: string, employeeId: string) => {
    console.log("editContact");
  };

  const rows = data.map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
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
              editContact(item.contactName, item.employeeId);
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
              deleteContact(item.contactName);
              // console.log("editContact");
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

export default Home;
