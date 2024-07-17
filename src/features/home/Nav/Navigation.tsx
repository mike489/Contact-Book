import cx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";
// import { MantineLogo } from "@mantinex/mantine-logo";

import classes from "./navigation.module.css";

import Logo from "../../../assets/crown.svg";

const user = {
  name: "Jane Spoonfighter",
  email: "janspoon@fighter.dev",
  image:
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
};

// const tabs = [
//   "Home",
//   "Orders",
//   "Education",
//   "Community",
//   "Forums",
//   "Support",
//   "Account",
//   "Helpdesk",
// ];

const Navigation = () => {
  //   const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  //   const items = tabs.map((tab) => (
  //     <Tabs.Tab value={tab} key={tab}>
  //       {tab}
  //     </Tabs.Tab>
  //   ));

  return (
    <Container className={classes.mainSection} size="md">
      <Group justify="space-between">
        <Link to="/home" className="logo-container">
          <img src={Logo} />
        </Link>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: "pop-top-right" }}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton
              className={cx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              <Group gap={7}>
                <Avatar
                  src={user.image}
                  alt={user.name}
                  radius="xl"
                  size={20}
                />
                <Text fw={500} size="sm" lh={1} mr={3}>
                  {user.name}
                </Text>
                <IconChevronDown
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Settings</Menu.Label>

            <Menu.Item
              leftSection={
                <IconSwitchHorizontal
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            >
              Change account
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconLogout
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            >
              Logout
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>

            <Menu.Item
              color="red"
              leftSection={
                <IconTrash
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            >
              Delete account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Container>
    // {/* <Container size="md">
    //   <Tabs
    //     defaultValue="Home"
    //     variant="outline"
    //     visibleFrom="sm"
    //     classNames={{
    //       root: classes.tabs,
    //       list: classes.tabsList,
    //       tab: classes.tab,
    //     }}
    //   >
    //     <Tabs.List>{items}</Tabs.List>
    //   </Tabs>
    // </Container> */}
  );
};

export default Navigation;
