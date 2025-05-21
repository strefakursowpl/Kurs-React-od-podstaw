import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

type TProps = {
    transactionsIncome: number,
    transactionsExpense: number
}

export default function TransactionTrends({transactionsIncome, transactionsExpense}: TProps) {
    return (
        <div className="flex items-center xl:justify-center gap-4">
            <TrendingUpIcon className="size-10 text-green-500" />
            <div className="font-medium">
                <span className="text-green-500">{transactionsIncome}</span>{' '}
                <span className="text-gray-500">zł</span>
            </div>
            <TrendingDownIcon className="size-10 text-red-500" />
            <div className="font-medium">
                <span className="text-red-500">{transactionsExpense}</span>{' '}
                <span className="text-gray-500">zł</span>
            </div>
        </div>
    )
}
