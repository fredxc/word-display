import { Loader2 } from "lucide-react";
import { CornerBorder } from "./CornerBorder";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  ResponsiveContainer,
} from "recharts";

interface WordFrequencyChartProps {
  data: Array<{ word: string; count: number }>;
  isLoading: boolean;
}

export function WordFrequencyChart({
  data,
  isLoading,
}: WordFrequencyChartProps) {
  return (
    <div className="relative w-full bg-white border border-border-light p-4 md:p-6">
      <CornerBorder />
      <h2 className="text-xl font-semibold mb-8">
        Word Frequency{" "}
        <span className="text-sm font-normal text-slate-medium">
          (Last 5 Minutes)
        </span>
      </h2>
      {isLoading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-slate-medium" />
        </div>
      ) : (
        <div className="h-[200px] md:h-[225px] lg:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <XAxis
                angle={-45}
                height={60}
                interval={0}
                dataKey="word"
                textAnchor="end"
                axisLine={{ stroke: "#fddcce" }}
                tickLine={{ stroke: "#fddcce" }}
                tick={{
                  fontSize: 12,
                  fill: "#667085",
                }}
              />
              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#667085",
                }}
                width={40}
                axisLine={{ stroke: "#fddcce" }}
                tickLine={{ stroke: "#fddcce" }}
              />
              <Tooltip
                contentStyle={{
                  fontSize: "12px",
                  borderRadius: "0",
                  backgroundColor: "white",
                  border: "1px solid #fddcce",
                }}
                cursor={{ fill: "rgba(253, 220, 206, 0.1)" }}
              />
              <Bar dataKey="count" fill="#0344dc" radius={[0, 0, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
