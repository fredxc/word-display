import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const defaultMinutes = 5;
    let minutes = defaultMinutes;

    try {
      const { searchParams } = new URL(request.url);
      const since = searchParams.get("since");
      if (since) {
        minutes = parseInt(since.replace("m", ""));
      }
    } catch (error) {
      console.error("Error parsing URL parameters:", error);
    }

    const fromDate = new Date(Date.now() - minutes * 60 * 1000);

    const logs = await prisma.wordLog.findMany({
      where: {
        createdAt: {
          gte: fromDate,
        },
      },
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
