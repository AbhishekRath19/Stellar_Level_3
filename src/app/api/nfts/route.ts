import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import NFT from "@/lib/models/NFT";

export async function GET() {
  try {
    await dbConnect();
    const nfts = await NFT.find({}).sort({ createdAt: -1 });
    return NextResponse.json(nfts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const nft = await NFT.create(body);
    return NextResponse.json(nft, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
