import React, { useEffect, useState } from "react";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../Loading";

export default function CreateModal({
  setModal,
  setCreated,
  setEdit,
  edit,
}: {
  setModal: (e: boolean) => void;
  setCreated: (e: boolean) => void;
  setEdit: (e: number) => void;
  edit: number;
}) {
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState(false);

  console.log(edit);
  

  useEffect(() => {
    if (edit != -1) {
      setLoading(true);
      axios
        .get(`/api/category/${edit}`)
        .then((res) => {
          setCategory(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);

    if (edit == -1) {
      axios
        .post("/api/category", formValues)
        .then((res) => {
          console.log(res.data);
          setCreated(true);
          setModal(false);
        })
        .catch((err) => {
          toast(err.response.data.err);
        });
    } else {
      axios
        .put(`/api/category/${edit}`, formValues)
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

  return loading ? <Loading /> : (
    <div className="px-10 py-3 bg-[#F9F7F7] text-[#1B262C] h-full w-full text-center">
      <div className="flex items-center justify-between mt-5 mb-10">
        <h1 className="text-xl">
          {edit != -1 ? "Edit the Category" : "Add a Category"}
        </h1>
        <div
          className="text-red-500 text-xl hover:scale-110 cursor-pointer"
          onClick={() => {
            setModal(false);
            setEdit(-1);
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </div>
      </div>
      <form className="flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)}>
        <input
          type={"text"}
          name={"name"}
          placeholder={"Name"}
          className="outline-none px-5 py-3 rounded-lg bg-[#3F72AF] w-full text-[#F9F7F7]"
          defaultValue={category?.name ?? ""}
        />
        <button className="w-full px-5 py-3 text-[#F9F7F7] text-center rounded-lg bg-[#0F4C75] mt-2 cursor-pointer hover:text-[#0F4C75] hover:bg-[#F9F7F7] border border-[#0F4C75]">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
