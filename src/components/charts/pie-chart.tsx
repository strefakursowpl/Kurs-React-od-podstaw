import useIsDesktop from "@/hooks/use-is-desktop"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import {Pie, PieChart as RechartsPieChart} from 'recharts'

type TProps = {
    config: ChartConfig,
    data: any[] | undefined,
    dataKey: string,
    nameKey: string
}

export default function PieChart({config, data, dataKey, nameKey}: TProps) {

    const isDesktop = useIsDesktop();

    return (
        <ChartContainer config={config} responsiveContainerProps={{minHeight: isDesktop ? 350 : 450}}>
            <RechartsPieChart>
                {
                    isDesktop && <ChartTooltip content={<ChartTooltipContent />} />
                }
                <ChartLegend
                    layout={isDesktop ? 'vertical' : 'horizontal'}
                    verticalAlign={isDesktop ? 'top' : 'bottom'}
                    align="right"
                    content={
                        <ChartLegendContent
                            className="flex-col items-start md:text-base"
                            shouldUsePercent
                        />
                    }
                />
                <Pie
                    data={data}
                    dataKey={dataKey}
                    nameKey={nameKey}
                    innerRadius={isDesktop ? 80 : 50}
                />
            </RechartsPieChart>
        </ChartContainer>
    )
}
