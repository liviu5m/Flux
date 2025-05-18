import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const categories = await prisma.category.findMany({});
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  try {
    const {name} = await request.json();

    if(!name) return NextResponse.json({ err: "Please fill all the fields." }, { status: 500 });

    const category = await prisma.category.create({
      data: {
        name
      }
    })

    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json({ err: "Something went wrong." }, { status: 500 });
  }
}

