import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const propertyGroup = await prisma.propertyGroup.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(propertyGroup);
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
    const propertyGroup = await prisma.propertyGroup.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(propertyGroup);
  } catch (err) {
    return NextResponse.json({ err: "Something went wrong." }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const { name } = await request.json();

    if (!name)
      return NextResponse.json(
        { err: "Please fill all the fields." },
        { status: 500 }
      );

    const propertyGroup = await prisma.propertyGroup.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    return NextResponse.json(propertyGroup);
  } catch (err) {
    return NextResponse.json({ err: "Something went wrong." }, { status: 500 });
  }
}
