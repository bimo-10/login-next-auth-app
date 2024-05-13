import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function GET(req, res) {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(
      {
        data: users,
        message: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    //   check if username already exists
    const checkUsername = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (checkUsername) {
      return NextResponse.json(
        {
          message: "username already exists",
        },
        { status: 400 }
      );
    }

    //   check if email already exists
    const checkEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return NextResponse.json(
        {
          message: "user already exists",
        },
        { status: 400 }
      );
    }

    //   hash password
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: newPassword, ...rest } = user;

    return NextResponse.json(
      {
        data: rest,
        message: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
