import { CategoryContext } from "@/context";
import { useContext, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { categories } from "@/data/categories-data";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function TransactionSidebar() {

    const categoryContext = useContext(CategoryContext);
    const [accordionValue, setAccordionValue] = useState('');

    return (
        <Accordion type="single" collapsible
        className="bg-white p-2 rounded-md order-2 lg:order-0"
        value={accordionValue}
        onValueChange={v => setAccordionValue(v)}
        >
            {categories.map(category => (
                <AccordionItem
                    className="hover:border-secondary data-[state=open]:border-secondary"
                    key={category.categoryName}
                    value={category.categoryName}
                >
                    <AccordionTrigger className="hover:text-secondary data-[state=open]:text-secondary w-full cursor-pointer
                    items-center justify-between gap-2 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        <category.icon />{' '}
                        <span className="w-full">{category.categoryLabel}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul>
                            {category.subCategories.map(subCategory => (
                                <li
                                    key={subCategory.name}
                                    className={
                                        cn(
                                            'hover:text-primary cursor-pointer rounded-md py-2 pr-2 pl-7',
                                            subCategory.name === categoryContext?.subCategory
                                            ? 'bg-primary text-white hover:text-white'
                                            : ''
                                        )
                                    }
                                    onClick={() => {
                                        categoryContext?.setSubCategory(
                                            subCategory.name
                                        );
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    {subCategory.label}
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))}
            <Button
                className="mt-10"
                onClick={() => {
                    categoryContext?.setSubCategory(undefined);
                    setAccordionValue('');
                    window.scrollTo(0, 0);
                }}
            >
                Pokaż wszystkie kategorie
            </Button>
        </Accordion>
    )
}
