import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ListsProvider } from "./context/ListsContext";
import { initialLists, users } from "./data/mockData";
import { CreateListPage } from "./pages/CreateListPage";
import { ArchivedListsPage } from "./pages/ArchivedListsPage";
import { ListDetailPage } from "./pages/ListDetailPage";
import { ListsPage } from "./pages/ListsPage";
import { LoginPage } from "./pages/LoginPage";
import { MembersPage } from "./pages/MembersPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ShoppingList } from "./types";
import "./App.css";

function App() {
  const [lists, setLists] = useState<ShoppingList[]>(initialLists);
  const [currentUserId, setCurrentUserId] = useState(users[0].id);

  return (
    <ListsProvider value={{ lists, setLists }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={setCurrentUserId} />} />
          <Route element={<Layout currentUserId={currentUserId} />}>
            <Route path="/" element={<Navigate to="/lists" />} />
            <Route path="/lists" element={<ListsPage currentUserId={currentUserId} />} />
            <Route
              path="/lists/archived"
              element={<ArchivedListsPage currentUserId={currentUserId} />}
            />
            <Route
              path="/list/create"
              element={<CreateListPage currentUserId={currentUserId} />}
            />
            <Route
              path="/list/:id"
              element={<ListDetailPage currentUserId={currentUserId} />}
            />
            <Route
              path="/list/:id/members"
              element={<MembersPage currentUserId={currentUserId} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ListsProvider>
  );
}

export default App;
