import { ChartConfig } from "@/components/ui/chart";
import colors from 'tailwindcss/colors'

export const yearChartsConfig = {
    incomeValue: {
        label: 'Przychód',
        color: colors.green[500]
    },
    expenseValue: {
        label: 'Wydatek',
        color: colors.red[500]
    }
} satisfies ChartConfig;

export const monthChartConfig = {
    employees: {
        label: 'Pracownicy i usługi zewnętrzne'
    },
    tools: {
        label: 'Narzędzia i infrastruktura IT'
    },
    marketingAndSales: {
        label: 'Marketing i sprzedaż'
    },
    costs: {
        label: 'Koszty operacyjne'
    },
    taxesAndInvestments: {
        label: 'Podatki i inwestycje'
    },
    other: {
        label: 'Pozostałe'
    },
} satisfies ChartConfig;


