import { Property as Type } from "@/lib/uses";
import { faMinus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

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

const PropertyAddModal = ({
  setPropertyModal,
  propertyModal,
  setPropertyGroups,
  propertyGroups,
  editPropertyId,
  setEditPropertyId,
}: {
  setPropertyModal: (e: PropertyGroup | undefined) => void;
  propertyModal: PropertyGroup;
  setPropertyGroups: (e: PropertyGroup[]) => void;
  propertyGroups: PropertyGroup[];
  editPropertyId: number;
  setEditPropertyId: (e: number) => void;
}) => {
  const [properties, setProperties] = useState<Type[]>();
  const [value, setValue] = useState("");
  const [propertyId, setPropertyId] = useState(editPropertyId || "");

  useEffect(() => {
    axios
      .get("/api/property", {
        params: {
          propertyGroupId: propertyModal.id,
        },
      })
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (propertyModal.properties) {
      let el = propertyModal.properties.find(
        (prop) => prop.id == Number(propertyId)
      );

      if (el) {
        setValue(el.value);
        setEditPropertyId(el.id);
      } else setValue("");
    }
  }, [propertyId]);

  const addProperty = () => {
    if (editPropertyId == -1) {
      const thisProperty: PropertyGroup = {
        ...propertyModal,
        properties: [
          ...(propertyModal.properties ?? []),
          { id: Number(propertyId), value },
        ],
      };
      const els = propertyGroups.map((group) => {
        if (group.id !== propertyModal.id) return group;
        else return thisProperty;
      });

      setPropertyGroups(els);
    } else {
      const newProps = propertyModal.properties.map((prop) => {
        if (prop.id != propertyId) return prop;
        else return { ...prop, value };
      });
      const els = propertyGroups.map((group) => {
        if (group.id !== propertyModal.id) return group;
        else return { ...group, properties: newProps };
      });
      setPropertyGroups(els);
    }
    setEditPropertyId(-1);
    setPropertyModal(undefined);
  };

  return (
    <div className="top-1/2 left-1/2 -translate-1/2 z-50 bg-white w-[500px] p-10 rounded-lg fixed inset-0 backdrop-blur-sm">
      <FontAwesomeIcon
        icon={faX}
        className="text-red-500 cursor-pointer absolute right-5 top-5 text-xl"
        onClick={() => {
          setPropertyModal(undefined);
          setEditPropertyId(-1);
        }}
      />
      <h1 className="text-lg mb-5">Add A Property</h1>
      <h2 className="text-left">
        Property Group:{" "}
        <span className="text-[#3F72AF]">{propertyModal.name}</span>
      </h2>
      <select
        className="outline-none px-5 py-3 mt-5 rounded-lg bg-[#3F72AF] w-full text-[#F9F7F7]"
        value={propertyId}
        onChange={(e) => {
          setPropertyId(e.target.value);
        }}
      >
        <option value="">Select A Option</option>
        {properties?.map((property, i) => {
          return (
            <option key={i} value={property.id}>
              {property.name}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Value"
        className="outline-none px-5 py-3 rounded-lg bg-[#3F72AF] w-full text-[#F9F7F7] mt-5"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="w-full px-5 py-3 text-[#F9F7F7] text-center rounded-lg bg-[#0F4C75] mt-5 cursor-pointer hover:text-[#0F4C75] hover:bg-[#F9F7F7] border border-[#0F4C75]"
        onClick={() => addProperty()}
      >
        Add
      </button>
    </div>
  );
};

export default PropertyAddModal;
