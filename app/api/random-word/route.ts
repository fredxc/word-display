import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

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
  return Math.floor(Math.random() * 1001 + 500);
}

function shouldError() {
  return Math.random() < 0.15;
}

export async function GET() {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldError()) {
        resolve(
          NextResponse.json({ error: "Failed to fetch word" }, { status: 500 })
        );
        return;
      }

      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];

      prisma.wordLog
        .create({
          data: {
            word: randomWord,
          },
        })
        .then(() => {
          resolve(NextResponse.json({ word: randomWord }, { status: 200 }));
        });
    }, getRandomDelay());
  });
}
