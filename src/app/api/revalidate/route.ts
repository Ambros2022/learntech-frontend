import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { tag, secret } = await req.json();

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Next.js 16 requires profile argument
    revalidateTag(tag, "default");

    return NextResponse.json({
      success: true,
      tag,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Revalidation failed" },
      { status: 500 }
    );
  }
}
