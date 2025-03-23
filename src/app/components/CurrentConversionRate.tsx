import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CurrentConversionRateProps {
  rate: number;
}

export const CurrentConversionRate = ({ rate }: CurrentConversionRateProps) => {
  if (rate === undefined || rate === null) {
    return null;
  }

  return (
    <Card className="sm:w-xs w-full">
      <CardHeader>
        <CardTitle>Conversion Rate</CardTitle>
        <CardDescription>
          Current pufETH to ETH conversion rate.
        </CardDescription>
        <CardContent className="pt-8">
          <span className="text-2xl font-semibold">{rate}</span>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
