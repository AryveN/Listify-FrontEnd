export type UserId = string;
export type ListId = string;
export type ItemId = string;

export type User = {
  id: UserId;
  name: string;
  email: string;
};

export type Item = {
  id: ItemId;
  label: string;
  resolved: boolean;
};

export type ShoppingList = {
  id: ListId;
  title: string;
  ownerId: UserId;
  memberIds: UserId[];
  isArchived: boolean;
  items: Item[];
  createdAt: string;
};
