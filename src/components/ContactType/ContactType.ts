export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const dummyContact: IContact[] = [
  {
    id: new Date().getTime().toString(),
    name: "John Doe",
    email: "michaeltesfaye@gmail.com",
    phone: "+251919640891",
  },
  {
    id: new Date().getTime().toString(),
    name: "mikw Doe",
    email: "michaeltesfaye@gmail.com",
    phone: "+251919640891",
  },
];
