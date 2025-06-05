import React from "react";
import ImageInput from "./ImageInput";
import SelectInput from "./SelectInput";

type Field = {
  field: string;
  type: string;
};

export default function Input({
  field,
  capitalizeWords,
  edit,
  element,
}: {
  field: Field;
  capitalizeWords: (e: string) => string;
  edit: number;
  element: any | undefined;
}) {
  if (field.type == "image") {
    return <ImageInput />;
  } else if (field.type == "id") {
    return <SelectInput field={field.field} />;
  } else {
    return (
      <input
        type={field.type}
        name={field.field}
        placeholder={capitalizeWords(field.field)}
        className="outline-none px-5 py-3 rounded-lg bg-[#3F72AF] w-full text-[#F9F7F7]"
        {...(element
          ? {
              defaultValue: element[field.field as keyof Types[typeof element]],
            }
          : {})}
      />
    );
  }
}
