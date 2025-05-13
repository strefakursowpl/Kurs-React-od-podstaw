import {
	CircleDollarSign,
	Laptop,
	ShoppingCart,
	Users,
	Wallet,
	Wrench,
} from 'lucide-react';

export const categories = [
    {
        categoryName: 'employees',
        categoryLabel: 'Pracownicy i usługi zewnętrzne',
        icon: Users,
        subCategories: [
            {
                name: 'salary',
                label: 'Wynagrodzenia',
            },
            {
                name: 'insurance',
                label: 'Składki i ubezpieczenia',
            },
            {
                name: 'recruitment',
                label: 'Rekrutacja i szkolenia',
            },
            {
                name: 'benefits',
                label: 'Benefity i premie',
            },
        ],
    },
    {
        categoryName: 'tools',
        categoryLabel: 'Narzędzia i infrastruktura IT',
        icon: Wrench,
        subCategories: [
            {
                name: 'servers',
                label: 'Serwery i hosting',
            },
            {
                name: 'software',
                label: 'Oprogramowanie i licencje',
            },
            {
                name: 'projectManagement',
                label: 'Narzędzia do zarządzania projektami',
            },
            {
                name: 'cyberSecurity',
                label: 'Cyberbezpieczeństwo i backupy',
            },
        ],
    },
    {
        categoryName: 'marketingAndSales',
        categoryLabel: 'Marketing i sprzedaż',
        icon: ShoppingCart,
        subCategories: [
            {
                name: 'advertising',
                label: 'Reklamy',
            },
            {
                name: 'marketing',
                label: 'Narzędzia marketingowe',
            },
            {
                name: 'content',
                label: 'Produkcja treści i media społecznościowe',
            },
            {
                name: 'events',
                label: 'Udział w eventach i targach',
            },
            {
                name: 'partnerships',
                label: 'Partnerstwa i afiliacje',
            },
        ],
    },
    {
        categoryName: 'costs',
        categoryLabel: 'Koszty operacyjne',
        icon: Laptop,
        subCategories: [
            {
                name: 'office',
                label: 'Czynsz biurowy lub coworking',
            },
            {
                name: 'equipment',
                label: 'Sprzęt',
            },
            {
                name: 'media',
                label: 'Media i usługi',
            },
            {
                name: 'support',
                label: 'Delegacje i podróże służbowe',
            },
            {
                name: 'legal',
                label: 'Obsługa księgowa i prawna',
            },
        ],
    },
    {
        categoryName: 'taxesAndInvestments',
        categoryLabel: 'Podatki i inwestycje',
        icon: CircleDollarSign,
        subCategories: [
            {
                name: 'investments',
                label: 'Podatki i regulacje',
            },
            {
                name: 'funding',
                label: 'Fundusz i inwestycje w nowe projekty',
            },
            {
                name: 'research',
                label: 'Badania i rozwój',
            },
        ],
    },
    {
        categoryName: 'other',
        categoryLabel: 'Pozostałe',
        icon: Wallet,
        subCategories: [
            {
                name: 'otherRelated',
                label: 'Inne związane z działalnością firmy',
            },
            {
                name: 'otherNotRelated',
                label: 'Inne nie związane z działalnością firmy',
            },
        ],
    },
] as const;

export const subCategories = categories.map(category => category.subCategories).flat();
