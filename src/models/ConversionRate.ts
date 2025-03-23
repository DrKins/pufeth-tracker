import mongoose, { Document, Schema } from "mongoose";

interface IConversionRate extends Document {
  conversionRates: {
    rate: number;
    timestamp: Date;
  }[];
}

const conversionRateSchema: Schema = new Schema(
  {
    conversionRates: [
      {
        rate: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const ConversionRate = mongoose.model<IConversionRate>(
  "ConversionRate",
  conversionRateSchema,
);

export { ConversionRate };
