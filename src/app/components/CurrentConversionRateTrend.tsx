import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TrendingDown, TrendingUp } from "lucide-react";

interface CurrentConversionRateProps {
  isRateUp: boolean | null;
}

export const CurrentConversionRateTrend = ({
  isRateUp,
}: CurrentConversionRateProps) => {
  if (isRateUp === null) {
    return null;
  }

  return (
    <Card className="sm:w-xs w-full h-full">
      <CardHeader>
        <CardTitle>Conversion Rate Trend</CardTitle>
        <CardDescription>
          According to last two points in timeline this is current trend.
        </CardDescription>
        <CardContent className="pt-8">
          {isRateUp ? (
            <TrendingUp className="h-12 w-12" />
          ) : (
            <TrendingDown className="h-12 w-12" />
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};
