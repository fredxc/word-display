import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const words = [
  "serendipity",
  "synergy",
  "epiphany",
  "quixotic",
  "conundrum",
  "catalyst",
  "meticulous",
  "ubiquitous",
  "heuristic",
  "algorithmic",
  "aplomb",
  "pseudocode",
  "echelon",
  "resilient",
  "quantum",
];

function getRandomDelay() {
  return Math.floor(Math.random() * 1001 + 500); // 500–1500ms
}

function shouldError() {
  return Math.random() < 0.15; // 15% chance
}

export async function GET(): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, getRandomDelay()));

  if (shouldError()) {
    return NextResponse.json(
      { error: "Failed to fetch word" },
      { status: 500 }
    );
  }

  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];

  try {
    await prisma.wordLog.create({
      data: { word: randomWord },
    });

    return NextResponse.json({ word: randomWord });
  } catch (error) {
    console.error("Error saving word to database:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
