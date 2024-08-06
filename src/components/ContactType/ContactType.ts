export interface IContact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
}

// export const dummyContact: IContact[] = [
//   {
//     id: new Date().getTime().toString(),
//     name: "John Doe",
//     email: "michaeltesfaye@gmail.com",
//     phone: "+251919640891",
//   },
//   {
//     id: new Date().getTime().toString(),
//     name: "mikw Doe",
//     email: "michaeltesfaye@gmail.com",
//     phone: "+251919640891",
//   },
// ];

export enum PageEnum {
  list,
  add,
}
