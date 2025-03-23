import { ConversionRate as ConversionRateType } from "@/app/components/ConversionRateSection";
import { ConversionRate } from "@/models/ConversionRate";
import { ethers } from "ethers";
import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";

const RPC_URL = process.env.RPC_URL!;
const provider = new ethers.JsonRpcProvider(RPC_URL);
const contractAddress = "0xD9A442856C234a39a81a089C06451EBAa4306a72";
const abi = [
  "function totalAssets() view returns (uint256)",
  "function totalSupply() view returns (uint256)",
];

export async function GET() {
  try {
    await connectDB();
    const existingRecord = await ConversionRate.findOne();
    return NextResponse.json(
      existingRecord?.conversionRates as unknown as ConversionRateType[],
    );
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    console.log("Cron job triggered!");
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const totalAssets = await contract.totalAssets();
    const totalSupply = await contract.totalSupply();
    const conversionRate = Number(totalAssets) / Number(totalSupply);

    await connectDB();

    const existingRecord = await ConversionRate.findOne();

    if (existingRecord) {
      await ConversionRate.updateOne(
        { _id: existingRecord._id },
        {
          $push: {
            conversionRates: { rate: conversionRate, timestamp: new Date() },
          },
        },
      );
    } else {
      await ConversionRate.create({
        conversionRates: [{ rate: conversionRate, timestamp: new Date() }],
      });
    }

    return NextResponse.json({ message: "succesfully posted conversion rate" });
  } catch (error) {
    console.error("Error posting conversion rate:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
