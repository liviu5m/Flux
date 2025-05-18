import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be less than 50 characters"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be less than 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contain at least one letter and one number"
      ),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export async function POST(request: NextRequest) {
  try {
    const { name, username, email, password, passwordConfirmation } =
      await request.json();
    console.log("go");

    const parsedData = signUpSchema.safeParse({
      name,
      username,
      email,
      password,
      passwordConfirmation,
    });

    if (!parsedData.success) {
      const errorMessages = parsedData.error.issues.map(
        (issue) => issue.message
      );
      return NextResponse.json({ error: errorMessages });
    }

    if (password != passwordConfirmation)
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 500 }
      );

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") || "";
    console.log(email);
    
    if (email) {
      const user = await prisma.user.findFirst({ where: { email } });
      return NextResponse.json(user?.userType);
    }
    return NextResponse.json("Something went wrong");
  } catch (err) {
    return NextResponse.json("Something went wrong");
  }
}
