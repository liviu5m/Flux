import React, { useEffect, useState } from "react";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../Loading";
import { Property } from "@/lib/uses";
import SelectInput from "./SelectInput";

export default function PropertyModal({
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
  const [property, setProperty] = useState<Property>();
  const [loading, setLoading] = useState(false);
  const [grade, setGrade] = useState("1");

  console.log(edit);

  useEffect(() => {
    if (edit != -1) {
      setLoading(true);
      axios
        .get(`/api/property/${edit}`)
        .then((res) => {
          setProperty(res.data);
          setGrade(String(res.data.grade));
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
    let formValues = Object.fromEntries(formData);
    formValues = { ...formValues, grade };

    if (edit == -1) {
      axios
        .post("/api/property", formValues)
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
        .put(`/api/property/${edit}`, formValues)
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

  return loading ? (
    <Loading />
  ) : (
    <div className="px-10 py-3 bg-[#F9F7F7] text-[#1B262C] h-full w-full text-center">
      <div className="flex items-center justify-between mt-5 mb-10">
        <h1 className="text-xl">
          {edit != -1 ? "Edit the Property" : "Add a Property"}
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
          defaultValue={property?.name ?? ""}
        />
        <SelectInput
          field={"property_group"}
          edit={edit}
          id={property?.propertyGroupId || -1}
        />
        <div className="flex items-center justify-between">
          <label htmlFor="" className="w-3/5 text-left">
            Grade
          </label>
          <label key={1}>
            <input
              type="radio"
              name="number"
              value={"1"}
              checked={grade === "1"}
              onChange={() => setGrade("1")}
              className="sr-only"
            />
            <div
              className={`w-12 h-12 flex items-center justify-center rounded border text-xl font-bold cursor-pointer transition 
              ${
                grade === "1"
                  ? "bg-[#3F72AF] text-white shadow-lg"
                  : "bg-white text-gray-700 border-gray-300"
              }
            `}
            >
              {"1"}
            </div>
          </label>
          <label key={2}>
            <input
              type="radio"
              name="number"
              value={"2"}
              checked={grade === "2"}
              onChange={() => setGrade("2")}
              className="sr-only"
            />
            <div
              className={`w-12 h-12 flex items-center justify-center rounded border text-xl font-bold cursor-pointer transition 
              ${
                grade === "2"
                  ? "bg-[#3F72AF] text-white shadow-lg"
                  : "bg-white text-gray-700 border-gray-300"
              }
            `}
            >
              {"2"}
            </div>
          </label>
        </div>
        <button className="w-full px-5 py-3 text-[#F9F7F7] text-center rounded-lg bg-[#0F4C75] mt-2 cursor-pointer hover:text-[#0F4C75] hover:bg-[#F9F7F7] border border-[#0F4C75]">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
