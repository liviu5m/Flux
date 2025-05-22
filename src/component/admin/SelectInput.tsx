import { Types } from "@/lib/uses";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function SelectInput({ field }: { field: string }) {
  const [elements, setElements] = useState<Types[typeof field][]>([]);

  console.log(field);

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
        <select name="categoryId" id="el">
          <option value="">Select A Opton</option>
          {elements.map((el, i) => {
            return (
              <option key={i} value={el.id}>
                {el.name}
              </option>
            );
          })}
        </select>
      </div>
    )
  );
}
