"use client";
export interface ConversionRate {
  _id: string;
  rate: number;
  timestamp: string;
}

import { useEffect, useState } from "react";
import { ConversionRateTimeline } from "./ConversionRateTimeline";
import { CurrentConversionRate } from "./CurrentConversionRate";
import { CurrentConversionRateTrend } from "./CurrentConversionRateTrend";

export const ConversionRateSection = () => {
  const [data, setData] = useState<ConversionRate[]>([]);
  const [isRateUp, setIsRateUp] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/fetch-rate");
      const conversionRates: ConversionRate[] = await response.json();

      if (
        conversionRates[conversionRates.length - 2].rate >
        conversionRates[conversionRates.length - 1].rate
      ) {
        setIsRateUp(false);
      } else {
        setIsRateUp(true);
      }

      setData(conversionRates);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex md:flex-row flex-col justify-center gap-4 w-full">
      <ConversionRateTimeline data={data} />
      <div className="flex md:flex-col flex-row gap-4 sm:w-fit w-full">
        <CurrentConversionRate rate={data?.[data.length - 1]?.rate} />
        <CurrentConversionRateTrend isRateUp={isRateUp} />
      </div>
    </div>
  );
};
