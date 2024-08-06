import { Button, Center, Paper, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IContact } from "../ContactType/ContactType";
import API from "../../app/api";

type Props = {
  contact: IContact;
  backBtnHandler: () => void;
  onSubmithandler: (data: IContact) => void;
};

const EditContact = (props: Props) => {
  const { backBtnHandler, contact, onSubmithandler } = props;
  const form = useForm({
    initialValues: {
      _id: contact._id,
      name: contact.name || "",
      email: contact.email || "",
      phone: contact.phone || "",
      type: contact.type || "",
    },
    validate: {
      name: (value) => (value.length > 0 ? null : "Name is required"),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
      phone: (value) =>
        /^\d{10}$/.test(value) ? null : "Phone number must be 10 digits",
    },
  });
  const onSubmitBtnHandler = async (
    values: IContact,
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e?.preventDefault();
    try {
      await API.put(`/api/contacts/${contact._id}`, values);
      console.log("Contact updated successfully:", values);
      onSubmithandler(values); // Optional: call a handler to update state in parent component
      backBtnHandler(); // Redirect to contact list
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  return (
    <>
      <Center>
        <Paper radius={0} p={30}>
          <form onSubmit={form.onSubmit(onSubmitBtnHandler)}>
            <TextInput
              label="Name"
              type="text"
              name="name"
              {...form.getInputProps("name")}
              required
              mt="md"
              size="md"
            />

            <TextInput
              label="Email"
              type="text"
              name="email"
              {...form.getInputProps("email")}
              required
              mt="md"
              size="md"
            />

            <TextInput
              label="Phone"
              type="text"
              name="phone"
              {...form.getInputProps("phone")}
              required
              mt="md"
              size="md"
            />

            <TextInput
              label="type"
              type="text"
              name="type"
              {...form.getInputProps("type")}
              required
              mt="md"
              size="md"
            />
            <Button
              type="button"
              value="add contact"
              ml="sm"
              mt="xl"
              size="sm"
              onClick={backBtnHandler}
            >
              Back
            </Button>
            <Button type="submit" value="add contact" ml="sm" mt="xl" size="sm">
              Edit
            </Button>
          </form>
        </Paper>
      </Center>
    </>
  );
};

export default EditContact;
