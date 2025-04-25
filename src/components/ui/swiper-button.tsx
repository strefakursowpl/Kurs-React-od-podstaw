import { cn } from '@/lib/utils';
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";

type TProps = {
	direction: 'left' | 'right';
	className?: string;
};

export default function SwiperButton({ direction, className }: TProps) {
	return (
		<button
			id={direction === 'left' ? 'slider-prev' : 'slider-next'}
			className={cn(
				'border-primary absolute z-10 flex size-14 cursor-pointer items-center justify-center rounded-full border bg-transparent hover:bg-linear-(--gradient)',
				className,
			)}>
			{
                direction === 'left' ? <MoveLeftIcon className="stroke-border" /> : <MoveRightIcon className="stroke-border" />
            }
		</button>
	);
}
