import { cn } from '@/lib/utils';

type TProps = {
	title: string;
	subTitle?: string;
	titleClass?: string;
	subTitleClass?: string;
};

export default function Header({
	title,
	subTitle,
	titleClass,
	subTitleClass,
}: TProps) {
	return (
		<div className="mx-auto max-w-[645px]">
			{
                subTitle &&
                <div
                    data-wow-delay=".3s"
                    className={cn(
                        'wow fadeInUp mb-2.5 bg-linear-(--gradient2) bg-clip-text text-center text-sm font-bold text-transparent uppercase lg:text-base',
                        subTitleClass,
                    )}>
                    {subTitle}
                </div>
            }
			<h2
				data-wow-delay=".6s"
				className={cn(
					'text-foreground wow fadeInUp mb-12 text-center text-xl font-extrabold lg:text-4xl',
					titleClass,
				)}>
				{title}
			</h2>
		</div>
	);
}
