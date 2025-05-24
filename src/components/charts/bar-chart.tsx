import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Bar, CartesianGrid, BarChart as RechartsBarChart, XAxis, YAxis } from "recharts"

type TProps = {
    config: ChartConfig,
    data: any[] | undefined,
    dataKey: string,
}

export default function BarChart({config, data, dataKey}: TProps) {
    return (
        <ChartContainer
            config={config}
            className="my-10 min-h-[200px] w-full min-w-[700px]"
        >
            <RechartsBarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <YAxis tickCount={10} />
                <XAxis
                    dataKey={dataKey}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={value => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                {
                    Object.entries(config).map(([key, val]) => (
                        <Bar key={key} dataKey={key} fill={val.color} radius={4} />
                    ))
                }
            </RechartsBarChart>
        </ChartContainer>
    )
}
