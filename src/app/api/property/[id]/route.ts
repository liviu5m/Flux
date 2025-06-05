import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(property);
  } catch (err) {
    console.log(err);

    return NextResponse.json({ err: "Something went wrong." }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const property = await prisma.property.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(property);
  } catch (err) {
    return NextResponse.json({ err: "Something went wrong." }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const { name, grade, property_groupId } = await request.json();

    if (!name)
      return NextResponse.json(
        { err: "Please fill all the fields." },
        { status: 500 }
      );

    const property = await prisma.property.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        grade: parseInt(grade),
        propertyGroupId: parseInt(property_groupId),
      },
    });

    return NextResponse.json(property);
  } catch (err) {
    return NextResponse.json({ err: "Something went wrong." }, { status: 500 });
  }
}
