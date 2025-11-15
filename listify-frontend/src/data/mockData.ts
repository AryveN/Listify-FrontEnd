import { ShoppingList, User } from "../types";

export const users: User[] = [
  { id: "u1", name: "Jana Nováková", email: "jana@example.com" },
  { id: "u2", name: "Petr Dvořák", email: "petr@example.com" },
  { id: "u3", name: "Lucie Malá", email: "lucie@example.com" },
];

export const initialLists: ShoppingList[] = [
  {
    id: "l1",
    title: "Víkendový nákup",
    ownerId: "u1",
    memberIds: ["u1", "u2"],
    isArchived: false,
    createdAt: "2024-01-12",
    items: [
      { id: "i1", label: "Mléko", resolved: false },
      { id: "i2", label: "Chléb", resolved: true },
      { id: "i3", label: "Sýr", resolved: false },
    ],
  },
  {
    id: "l2",
    title: "Grilovací párty",
    ownerId: "u2",
    memberIds: ["u2", "u1", "u3"],
    isArchived: false,
    createdAt: "2024-02-05",
    items: [
      { id: "i4", label: "Kuřecí maso", resolved: false },
      { id: "i5", label: "Zelenina", resolved: false },
      { id: "i6", label: "Uhlí", resolved: true },
    ],
  },
  {
    id: "l3",
    title: "Vánoční dárky",
    ownerId: "u1",
    memberIds: ["u1", "u3"],
    isArchived: true,
    createdAt: "2023-12-01",
    items: [
      { id: "i7", label: "Kniha", resolved: true },
      { id: "i8", label: "Stavebnice", resolved: true },
    ],
  },
];
