import React from "react";

type Field = {
  field: string;
  type: string;
};

type Category = {
  id: number;
  name: string;
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
  element: Category | undefined;
}) {
  if (field.type != "image")
    return (
      <input
        type={field.type}
        name={field.field}
        placeholder={capitalizeWords(field.field)}
        className="outline-none px-5 py-3 rounded-lg bg-[#3F72AF] w-full text-[#F9F7F7]"
        {...(element ? { defaultValue: element[field.field as keyof Category] } : {})}
      />
    );
}
