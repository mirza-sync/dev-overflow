import handleError from "@/lib/handlers/errors";
import { NotFoundError } from "@/lib/http-errors";
import connectDb from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import User from "@/schema/user.model";
import { ErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw NotFoundError("User");
  }

  try {
    await connectDb();
    const user = await User.findById(id);

    if (!user) {
      throw NotFoundError("User");
    }
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ErrorResponse;
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw NotFoundError("User");
  }

  try {
    await connectDb();
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw NotFoundError("User");
    }
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ErrorResponse;
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw NotFoundError("User");
  }

  try {
    await connectDb();
    const body = await request.json();
    const validatedData = UserSchema.partial().parse(body);

    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });
    if (!updatedUser) {
      throw NotFoundError("User");
    }

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as ErrorResponse;
  }
}
