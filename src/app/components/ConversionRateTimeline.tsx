import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { chartConfig } from "../constants/chartConfig";
import { ConversionRate } from "./ConversionRateSection";
import { ConversionRateSkeleton } from "./ConversionRateSkeleton";

interface ConversionRateTimelineProps {
  data: ConversionRate[];
}

export const ConversionRateTimeline = ({
  data,
}: ConversionRateTimelineProps) => {
  if (data.length === 0 || !data) {
    return <ConversionRateSkeleton />;
  }

  return (
    <Card className="md:w-2xl w-full">
      <CardHeader>
        <CardTitle>pufETH Conversion Rate Timeline</CardTitle>
        <CardDescription>
          pufETH to ETH conversion rate over the last few hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 64,
              right: 12,
            }}>
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(value))
              }
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              dataKey="rate"
              type="natural"
              stroke="silver"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 text-sm"></CardFooter>
    </Card>
  );
};
