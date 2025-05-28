import months from "@/data/months-data";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  	return twMerge(clsx(inputs))
}

export function float(float: number) {
  	return Number(float.toFixed(2));
}

export function createDateRange(
  	monthFrom: number,
  	yearFrom: number,
  	monthTo: number,
  	yearTo: number,
  	asc: boolean = true,
) {
  	const monthItems = [];

	while(yearFrom <= yearTo) {
		if(yearFrom === yearTo && monthFrom > monthTo) {
			break;
		}

		monthItems.push({
			date: `${monthFrom}_${yearFrom}`,
			month: monthFrom,
			monthLabel: months[monthFrom],
			year: yearFrom
		});

		monthFrom++;

		if(monthFrom >= 12) {
			monthFrom = 0
			yearFrom++;
		}
	}

	return asc ? monthItems : monthItems.reverse();
}

export function getRandomElement(arr: string[] | number[]) {
	return arr[Math.floor(
		Math.random() * arr.length
	)]
}
