import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  try {
    const defaultMinutes = 5;
    let minutes = defaultMinutes;

    try {
      const { searchParams } = new URL(request.url);
      const since = searchParams.get("since");
      if (since) {
        const parsed = parseInt(since.replace("m", ""));
        if (!isNaN(parsed)) {
          minutes = parsed;
        }
      }
    } catch (err) {
      console.error("Error parsing query params:", err);
    }

    const fromDate = new Date(Date.now() - minutes * 60 * 1000);

    const logs = await prisma.wordLog.findMany({
      where: { createdAt: { gte: fromDate } },
    });

    const wordCounts = logs.reduce((acc: Record<string, number>, log) => {
      acc[log.word] = (acc[log.word] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json(wordCounts);
  } catch (error) {
    console.error("Error fetching word stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch word stats" },
      { status: 500 }
    );
  }
}
