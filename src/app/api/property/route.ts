import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyGroupId = searchParams.get("propertyGroupId") || "";

  const properties = await prisma.property.findMany({
    where: propertyGroupId ? { propertyGroupId: Number(propertyGroupId) } : undefined,
    include: {
      propertyGroup: true,
    },
  });
  return NextResponse.json(properties);
}

export async function POST(request: NextRequest) {
  try {
    const { name, grade, property_groupId } = await request.json();

    if (!name)
      return NextResponse.json(
        { err: "Please fill all the fields." },
        { status: 500 }
      );

    const property = await prisma.property.create({
      data: {
        name,
        grade: parseInt(grade),
        propertyGroupId: parseInt(property_groupId),
      },
    });

    return NextResponse.json(property);
  } catch (err) {
    console.log(err);

    return NextResponse.json({ err: "Something went wrong." }, { status: 500 });
  }
}
