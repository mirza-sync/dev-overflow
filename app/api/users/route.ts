import handleError from "@/lib/handlers/errors";
import { ValidationError } from "@/lib/http-errors";
import connectDb from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import User from "@/schema/user.model";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  try {
    await connectDb();
    const users = User.find();
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function POST(request: Request) {
  try {
    await connectDb();
    const body = await request.json();

    const validatedData = UserSchema.safeParse(body);
    if (!validatedData.success) {
      throw ValidationError(z.treeifyError(validatedData.error));
    }

    const { email, username } = validatedData.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exist");
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw new Error("Username already exist");
    }

    const user = await User.create(validatedData.data);
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
