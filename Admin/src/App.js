import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/login";
import { usersColumns, ordersColumns, productsColumns } from "./dataTable";
import DataTable from "./Components/DataTable/DataTable";
import NewProduct from "./pages/NewProduct/NewProduct";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";
import UpdateOrder from "./pages/UpdateProduct/UpdateOrder";
import Sidebar from "./Components/sidebar/Sidebar";
import Navbar from "./Components/navbar/Navbar";
import Footer from "./Components/Footer";

function App() {
  const ProtectedRoute = ({ children }) => {
    const role = localStorage.getItem("role");
    if (!role) {
      return <Navigate to="/login" />;
    }

    if (role === "counselors") {
      return <Navigate to="/chat" />;
    }

    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div
          id="main-wrapper"
          data-theme="light"
          data-layout="vertical"
          data-navbarbg="skin6"
          data-sidebartype="full"
          data-sidebar-position="fixed"
          data-header-position="fixed"
          data-boxed-layout="full"
        >
          <div className="home">
            <Sidebar />
            <div className="homeContainer">
              <Navbar />
              <Routes>
                <Route exact path="/">
                  <Route
                    index
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="login" element={<Login />} />
                  <Route path="chat" element={<Chat />} />
                  <Route path="users">
                    <Route
                      index
                      element={
                        <ProtectedRoute>
                          <DataTable columns={usersColumns} />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                  <Route path="products">
                    <Route
                      index
                      element={
                        <ProtectedRoute>
                          <DataTable columns={productsColumns} />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="update/:prodId"
                      element={
                        <ProtectedRoute>
                          <UpdateProduct />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="new"
                      element={
                        <ProtectedRoute>
                          <NewProduct />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                  <Route path="orders">
                    <Route
                      index
                      element={
                        <ProtectedRoute>
                          <DataTable columns={ordersColumns} />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="update/:orderId"
                      element={
                        <ProtectedRoute>
                          <UpdateOrder />
                        </ProtectedRoute>
                      }
                    />
                  </Route>
                </Route>
                <Route path="*" element={<Chat />} />
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
