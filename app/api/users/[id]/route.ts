import handleError from "@/lib/handlers/errors";
import { NotFoundError } from "@/lib/http-errors";
import connectDb from "@/lib/mongoose";
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
    const user = await User.findById();

    if (!user) {
      throw NotFoundError("User");
    }
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as ErrorResponse;
  }
}
