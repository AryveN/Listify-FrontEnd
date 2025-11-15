import React, { createContext, useContext } from "react";
import { ShoppingList } from "../types";

export type ListsContextValue = {
  lists: ShoppingList[];
  setLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>;
};

const ListsContext = createContext<ListsContextValue | undefined>(undefined);

export const ListsProvider: React.FC<{
  value: ListsContextValue;
  children: React.ReactNode;
}> = ({ value, children }) => (
  <ListsContext.Provider value={value}>{children}</ListsContext.Provider>
);

export const useLists = () => {
  const ctx = useContext(ListsContext);
  if (!ctx) {
    throw new Error("useLists must be used within ListsProvider");
  }
  return ctx;
};
