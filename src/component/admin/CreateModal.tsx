import React, { useEffect, useState } from "react";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

type Field = {
  field: string;
  type: string;
};

type Category = {
  id: number;
  name: string;
};

function capitalizeWords(str: string) {
  if (typeof str !== "string" || str.length === 0) return str;
  return str
    .split(" ")
    .map((word) => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export default function CreateModal({
  fields,
  setModal,
  setCreated,
  setEdit,
  path,
  edit,
}: {
  fields: Field[];
  setModal: (e: boolean) => void;
  setCreated: (e: boolean) => void;
  setEdit: (e: number) => void;
  path: string;
  edit: number;
}) {
  const [element, setElement] = useState<Category>();

  useEffect(() => {
    if (edit != -1)
      axios
        .get(`/api/${path}/${edit}`)
        .then((res) => {
          setElement(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);

    if (edit == -1) {
      axios
        .post("/api/" + path, formValues)
        .then((res) => {
          console.log(res.data);
          setCreated(true);
          setModal(false);
        })
        .catch((err) => {
          toast(err.response.data.err);
        });
    } else {
      console.log("udpate");

      axios
        .put(`/api/${path}/${edit}`, formValues)
        .then((res) => {
          console.log(res.data);
          setCreated(true);
          setEdit(-1);
          setModal(false);
        })
        .catch((err) => {
          toast(err.response.data.err);
        });
    }
  };

  return (
    <div className="px-10 py-3 bg-[#F9F7F7] text-[#1B262C] h-full w-full text-center">
      <div className="flex items-center justify-between mt-5 mb-10">
        <h1 className="text-xl">
          {edit ? "Edit" : "Add a"} {capitalizeWords(path)}
        </h1>
        <div
          className="text-red-500 text-xl hover:scale-110 cursor-pointer"
          onClick={() => {
            setModal(false)
            setEdit(-1)
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </div>
      </div>
      <form className="flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)}>
        {fields.map((field, i) => {
          return (
            <Input
              key={i}
              field={field}
              capitalizeWords={capitalizeWords}
              edit={edit}
              element={element}
            />
          );
        })}
        <button className="w-full px-5 py-3 text-[#F9F7F7] text-center rounded-lg bg-[#0F4C75] mt-2 cursor-pointer hover:text-[#0F4C75] hover:bg-[#F9F7F7] border border-[#0F4C75]">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
