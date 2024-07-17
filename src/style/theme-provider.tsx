import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MantineProvider
      theme={{
        colors: {
          brand: [
            "#e6f6ff",
            "#d3e8fd",
            "#a7cff4",
            "#78b4ec",
            "#529de5",
            "#398fe2",
            "#2988e2",
            "#1a75c9",
            "#0968b4",
            "#0059a1",
          ],
        },
        primaryShade: 9,
        primaryColor: "brand",
      }}
    >
      <ModalsProvider>
        <Notifications position="top-right" />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
};

export default ThemeProvider;
