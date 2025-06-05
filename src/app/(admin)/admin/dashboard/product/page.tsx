"use client";

import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState, useRef, ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "@/component/Loading";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast, ToastContainer } from "react-toastify";
import ProductModal from "@/component/admin/ProductModal";
import { Product } from "@/lib/uses";

export default function ProductPage() {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(-1);
  const [created, setCreated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    setCreated(false);
    axios
      .get("/api/product")
      .then((res) => {
        setProducts(res.data);
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
    let id = e.currentTarget
      .closest("tr")
      ?.querySelectorAll("td")[0].textContent;

    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete(`/api/product/` + id)
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
    let id = e.currentTarget
      .closest("tr")
      ?.querySelectorAll("td")[0].textContent;

    setModal(true);
    setEdit(id ? parseInt(id) : -1);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="text-[#F9F7F7] flex h-full">
      <div className="flex-1 h-full overflow-scroll">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">Products List</h1>
          <button
            className="px-5 py-3 rounded-lg bg-[#3282B8] flex items-center justify-center gap-3 cursor-pointer"
            onClick={() => setModal(true)}
          >
            <FontAwesomeIcon className="w-4" icon={faPlus} />
            <h2>Add Product</h2>
          </button>
        </div>
        <div className="mt-10">
          {products.length > 0 ? (
            <table className="border-collapse border border-gray-400 w-full text-left p-2">
              <thead>
                <tr>
                  {Object.keys(products[0]).map((el: string, i) => {
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
                {products.map((el, i) => {
                  return (
                    <tr key={i}>
                      {Object.values(el).map((t, i) => {
                        return (
                          <td key={i} className="border p-2 border-gray-300">
                            {Array.isArray(t) ? t.map((t) => t.name) : t}
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
            <p>No Products</p>
          )}
        </div>
      </div>
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-end z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-[#1B262C] h-full overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ProductModal
                setModal={setModal}
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
