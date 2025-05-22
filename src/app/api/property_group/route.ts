import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const propertyGroups = await prisma.propertyGroup.findMany({});
  return NextResponse.json(propertyGroups);
}

export async function POST(request: NextRequest) {
  try {
    const {name} = await request.json();

    if(!name) return NextResponse.json({ err: "Please fill all the fields." }, { status: 500 });

    const propertyGroups = await prisma.propertyGroup.create({
      data: {
        name
      }
    })

    return NextResponse.json(propertyGroups);
  } catch (err) {
    return NextResponse.json({ err: "Something went wrong." }, { status: 500 });
  }
}

