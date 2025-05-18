"use client";

import CreateModal from "@/component/admin/CreateModal";
import {
  faEdit,
  faEllipsis,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState, useRef, ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "@/component/Loading";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { usePathname } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

type Category = {
  id: number;
  name: string;
};

export default function Category() {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(-1);
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [elements, setElements] = useState<Category[]>();
  const modalRef = useRef<HTMLDivElement>(null);
  const fields = [
    {
      field: "name",
      type: "string",
    },
  ];

  useEffect(() => {
    setLoading(true);
    setCreated(false);
    axios
      .get("/api/category")
      .then((res) => {
        setElements(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [created]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteEl = (e: React.MouseEvent<HTMLButtonElement>) => {
    let id = e.currentTarget.closest("tr")?.querySelectorAll("td")[0].textContent;

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete("/api/category/" + id)
              .then((res) => {
                console.log(res.data);
                toast("Item deleted successful");
                setCreated(true);
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const editEl = (e: React.MouseEvent<HTMLButtonElement>) => {
    let id = e.currentTarget.closest("tr")?.querySelectorAll("td")[0].textContent;
    
    setModal(true);
    setEdit(id ? parseInt(id) : -1);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="text-[#F9F7F7] flex h-full">
      <div className="flex-1 h-full overflow-scroll">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">Categories List</h1>
          <button
            className="px-5 py-3 rounded-lg bg-[#3282B8] flex items-center justify-center gap-3 cursor-pointer"
            onClick={() => setModal(true)}
          >
            <FontAwesomeIcon className="w-4" icon={faPlus} />
            <h2>Add Category</h2>
          </button>
        </div>
        <div className="mt-10">
          {elements ? (
            <table className="border-collapse border border-gray-400 w-full text-left p-2">
              <thead>
                <tr>
                  {Object.keys(elements[0]).map((el: string, i) => {
                    return (
                      <th key={i} className="border p-2 border-gray-300">
                        {el}
                      </th>
                    );
                  })}
                  <th className="border p-2 border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {elements.map((el, i) => {
                  return (
                    <tr key={i}>
                      {Object.values(el).map((t, i) => {
                        return (
                          <td key={i} className="border p-2 border-gray-300">
                            {t}
                          </td>
                        );
                      })}
                      <td className="border p-2 border-gray-300 flex gap-5">
                        <button
                          className="px-4 py-2 rounded-lg bg-[#3F72AF] flex items-center justify-center gap-3 cursor-pointer"
                          onClick={(e) => editEl(e)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                          Edit
                        </button>
                        <button
                          className="px-4 py-2 rounded-lg bg-[#BB3E00] flex items-center justify-center gap-3 cursor-pointer"
                          onClick={(e) => deleteEl(e)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No Categories</p>
          )}
        </div>
      </div>
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-end z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-[#1B262C] w-full max-w-md h-full overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <CreateModal
                fields={fields}
                setModal={setModal}
                path={"category"}
                setCreated={setCreated}
                edit={edit}
                setEdit={setEdit}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
}
