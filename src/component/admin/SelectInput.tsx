import { Category, Product } from "@/lib/uses";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { log } from "util";

type Type = Category | Product;

export default function SelectInput({
  field,
  edit,
  id,
}: {
  field: string;
  edit: number;
  id: number;
}) {
  const [elements, setElements] = useState<Type[]>([]);

  useEffect(() => {
    axios
      .get("/api/" + field)
      .then((res) => {
        setElements(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    elements && (
      <div>
        <label htmlFor="el"></label>
        <select
          name={field + "Id"}
          id="el"
          className="outline-none px-5 py-3 rounded-lg bg-[#3F72AF] w-full text-[#F9F7F7]"
        >
          <option value="">Select A Option</option>
          {elements.map((el, i) => {
            return (
              <option
                key={i}
                defaultValue={el.id}
                {...(edit != -1 && el.id === id ? { selected: true } : {})}
              >
                {el.name}
              </option>
            );
          })}
        </select>
      </div>
    )
  );
}
