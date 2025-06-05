import {
  faEdit,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PropertyAddModal from "./PropertyAddModal";

type PropertyGroup = {
  id: number;
  name: string;
  status: boolean;
  properties: Property[];
};

type Property = {
  id: number;
  value: string;
};

type Group = {
  id: number;
  name: string;
};

export default function PropertiesAdd() {
  const [propertyGroups, setPropertyGroups] = useState<PropertyGroup[]>([]);
  const [input, setInput] = useState("");
  const [propertyModal, setPropertyModal] = useState<PropertyGroup>();
  const [editPropertyId, setEditPropertyId] = useState(-1);

  useEffect(() => {
    axios
      .get("/api/property_group")
      .then((res) => {
        setPropertyGroups(
          res.data.map((el: Group) => {
            return { id: el.id, name: el.name, status: 0 };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteProp = (propertyGroup: PropertyGroup, propertyId: number) => {
    const newProps = propertyGroup.properties.filter(
      (prop) => prop.id != propertyId
    );
    const els = propertyGroups.map((group) => {
      if (group.id !== propertyGroup.id) return group;
      else return { ...group, properties: newProps };
    });
    setPropertyGroups(els);
  };

  let searchProperties = input
    ? propertyGroups
        .filter((item) => item.name.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 5)
    : [];

  return (
    <div>
      <div
        className={`flex w-full items-center justify-between gap-10 relative`}
      >
        <input
          type="text"
          placeholder="Property Group"
          className="outline-none px-5 py-3 rounded-lg bg-[#3F72AF] text-[#F9F7F7] w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center w-full flex-col gap-3 mt-3">
        {searchProperties.map((el: PropertyGroup, i) => {
          return (
            <div key={i} className="w-full flex items-center justify-between">
              <h2 className="text-lg font-semibold">{el.name}</h2>
              <FontAwesomeIcon
                className={`p-3 rounded-full flex items-center justify-center text-white cursor-pointer ${
                  el.status ? "bg-red-500" : "bg-green-500"
                }`}
                icon={el.status ? faMinus : faPlus}
                onClick={() =>
                  setPropertyGroups(
                    propertyGroups.map((e: PropertyGroup) => {
                      if (el.id == e.id) return { ...e, status: !e.status };
                      else return e;
                    })
                  )
                }
              />
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-3 gap-5 mt-3">
        {propertyGroups
          .filter((el) => el.status == true)
          .map((el, i) => {
            return (
              <div
                key={i}
                className="bg-[#3282B8] text-white px-5 py-3 rounded-lg"
              >
                <h1 className="text-lg font-bold">{el.name}</h1>
                <div>
                  {el.properties &&
                    el.properties.map((prop, i) => {
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between mt-2"
                        >
                          <h1>{prop.value}</h1>
                          <div className="flex items-center justify-center text-lg gap-2">
                            <FontAwesomeIcon
                              icon={faEdit}
                              onClick={() => {
                                setPropertyModal(el);
                                setEditPropertyId(prop.id);
                              }}
                              className="text-green-400  cursor-pointer p-1"
                            />
                            <FontAwesomeIcon
                              onClick={() => deleteProp(el, prop.id)}
                              icon={faTrash}
                              className="text-red-400 cursor-pointer p-1"
                            />
                          </div>
                        </div>
                      );
                    })}
                  <button
                    className="px-3 py-2 w-full text-[#F9F7F7] text-center rounded-lg bg-[#0F4C75] mt-2 cursor-pointer hover:text-[#0F4C75] hover:bg-[#F9F7F7] border border-[#0F4C75]"
                    onClick={() => setPropertyModal(el)}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      {propertyModal && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => {
            setPropertyModal(undefined);
            setEditPropertyId(-1);
          }}
        />
      )}
      {propertyModal && (
        <PropertyAddModal
          setPropertyModal={setPropertyModal}
          propertyModal={propertyModal}
          setPropertyGroups={setPropertyGroups}
          propertyGroups={propertyGroups}
          editPropertyId={editPropertyId}
          setEditPropertyId={setEditPropertyId}
        />
      )}
    </div>
  );
}
