"use client"

import React, { createContext,useContext } from "react";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  
  return (
    <AppContext.Provider value={{}}>
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
