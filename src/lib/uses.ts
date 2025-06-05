export type Category = {
  id: number;
  name: string;
};

export type PropertyGroup = {
  id: number;
  name: string;
};

export type Property = {
  id: number;
  name: string;
  grade: number;
  propertyGroupId: number;
  propertyGroup: PropertyGroup;
};

export type Product = {
  id: number;
  name: string;
  images: string;
  price: number;
  categoryId: number;
  properties: Properties[];
};

export type Properties = {
  id: number;
  name: string;
  grade: number;
  propertyGroupId: number;
};
