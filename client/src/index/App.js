import "./index.scss";
import "react-toastify/dist/ReactToastify.min.css";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "react-error-boundary";
import React, { useEffect } from "react";
import Navbar from "components-layout/Navbar";

import { AppContextProvider } from "contexts/AppContext";
import Footer from "components-layout/Footer/Footer";

import { useDispatch } from "react-redux";
import { fetchUserDetails } from "../redux/userActions";
import AppRouter from "./AppRouter";

function AppWrapper() {
  return (
    <>
      <AppContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Navbar />

        <div className={"mainWrapper"}>
          <AppRouter />
        </div>

        <Footer />
      </AppContextProvider>
    </>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);
  return (
    <ErrorBoundary
      fallback={
        <>
          <div>Fatal Error</div>
        </>
      }
    >
      <AppContextProvider>
        <BrowserRouter>
          <AppWrapper />
        </BrowserRouter>
      </AppContextProvider>
    </ErrorBoundary>
  );
}

export default App;
