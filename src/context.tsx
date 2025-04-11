// Jak zainicjować context?
// 1. Utwórz context najlepiej w zewnętrznym pliku za pomocą funkcji createContext(domyślnaWartość)
// 2. Oznacz miejsce gdzie chcesz używać contextu za pomocą utworzonego wcześniej contextu.
//    Przekaż w atrybucie value, mogą to być różne typy wartości.
// 3. W miejscu w którym chcesz skorzystać z contextu, użyj hooka useContext.
//
// Zasady:
// 1. Context pozwala nam przekazać propsy x poziomów w drzewie komponentów w dół,
//    zapobiegamy w ten sposób tzw. props drilling, czyli przekazywania propsów w dół
//    komponent po komponencie, dodając je nawet do tych które tych propsów nie używają.
// 2. Warto tego używać, ale nie wolno nadużywać, ponieważ może zaburzyć to czytelność kodu.
// 3. Ma wiele zastosowań, np. używanie jako przełącznika trybu jasny/ciemny, przekazywanie np.
//    danych użytkownika: imię, email, avatar itp.
//    Można używać tego do zarządzania globalnym stanem aplikacji, czyli stanem który dotyczy
//    jakiejś głównej części aplikacji np. zawartości koszyka w sklepie.
// 4. Wybierając context do zarządzania stanem, musimy pamiętać o jednej kluczowej sprawie.
//    Jeżeli wywołujemy akcję obojętnie skąd, która zmienia stan komponentu położonego
//    na szczycie drzewa, to React triggeruje re-render wszystkich komponentów położonych
//    w jego wnętrzu, więc komponenty których nie dotycza ta akcja można
//    np. owrapować w memo() lub zdać się na React Compiler.
// 5. Ten sam context można zagnieżdzać, używając tego samego contextu nadpisuje się ten wyżej.

import { createContext, useContext, useEffect, useState } from 'react';

export const LanguageContext = createContext('PL');

const langData = {
	language: {
		PL: 'Aktualny język',
		EN: 'Current language',
	},
};

export function ContextComponent() {
	const [language, setLanguage] = useState('PL');

	const changeLanguage = () => setLanguage(language === 'PL' ? 'EN' : 'PL');

	return (
		<LanguageContext value={language}>
			<section style={{ paddingLeft: '30px' }}>
				<header style={{ position: 'absolute', top: '20px' }}>
					<button onClick={changeLanguage}>Zmień język</button>
				</header>
				<SecondComponent />
			</section>
		</LanguageContext>
	);
}

function SecondComponent() {
	return (
		<div style={{ background: 'lightblue', padding: '20px' }}>
			<ThirdComponent />
		</div>
	);
}

function ThirdComponent() {
	const lang = useContext(LanguageContext);

	return (
		<h1>
			{langData.language[lang]}: {lang}
		</h1>
	);
}
