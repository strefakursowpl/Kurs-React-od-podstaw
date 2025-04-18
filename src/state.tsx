// 1. Po wywołaniu setCounter, jeżeli stan uległ zmianie, React triggeruje re-render komponentu,
//    a także wszystkich komponentów podrzędnych, czyli tych które zawiera.
//    Zatem rerender może być niewydajny, sztuka polega na dobrym umieszczeniu useState,
//    oraz dzieleniu komponentów na optymalne części.
// 2. Nie można modyfikować stanu bezpośrednio, czyli inaczej niż przez funkcję setState.
// 3. Jeżeli stanem jest obiekt czy tablica, nie używajmy funkcji które ją mutują
//    np. pop() czy push(),
//    aktualizując tablice czy obiekt możemy wykorzystać np. ... (spread operator),
//    np. setState({...person, email = 'test123@gmail.com'}),
//    jeżeli chcemy zmodyfikować korzystamy z map(),
//    chcemy usunąć jakiś wpis - możemy go odfiltrować za pomocą funkcji filter() itp.
//    Na zagnieżdżone obiekty nie zadziała spread operator więc możemy użyć np. funkcji structuredClone(),
//    ale nie poleca się używania głeboko zagnieżdżonych obiektów.
//    Podsumowując zawsze przekazuj nowy obiekt czy tablicę jako kopię poprzedniego/poprzedniej.
// 4. Każdy stan komponentu jest izolowany, a to oznacza że dwa komponenty
//    Counter będą miały 2 różne niezależne stany.
// 5. Można wywołać kilka useState w tym samym komponencie,
//    nie ma to negatywnego wpływu na performance, wtedy React
//    łączy wszystkie setState (tzw. batching) i rerenderuje komponent tylko raz.
// 6. Stan komponentu ulega zmianie dopiero po rerenderze, czyli jeżeli
//    do stanu wynoszącego 1, dodamy 1, a następnie znowu dodamy 1, to wyjdzie nam
//    liczba 2. Chyba że użyjemy funkcji poniżej.
// 7. Używając funkcji w setState np. setCounter(prevState => prevState + 1),
//    możemy pracować na stanie który jeszcze nie został zaktualizowany.
// 8. Dobrą praktyką jest nieprzekazywanie setState jako propsa,
//    gdyż sprawia to że komponent staje się mniej niezależny,
//    zamiast tego warto przekazać po prostu funkcję.
// 9. Jeżeli komponent zostaje usunięty, state również jest niszczony.

import { useState } from 'react';
import { Button } from "./components/ui/button";

export function Counter() {
	const [counter, setCounter] = useState(0);
	const [person, setPerson] = useState({
		name: '',
		email: '',
	});
    const [text, setText] = useState('');

	const increment = () => setCounter(counter + 1);

	const decrement = () => setCounter(counter - 1);

	const reset = () => setCounter(0);

	const modifyPerson = () =>
		setPerson({
			...person,
			name: 'Sebastian',
		});

    console.log('Render Counter');

	return (
		<div className="text-center w-screen bg-amber-300 p-10">
            <h1>{text}</h1>
			<div className="text-5xl my-7 font-bold">
				{counter}
			</div>
			<div className="flex gap-5 justify-center">
			<Button
			className="hover:bg-blue-700 border-2 border-blue-700 bg-red-500 text-white"
			variant={'outline'} onClick={increment}>Dodaj 1</Button>
				<Button onClick={decrement}>Odejmij 1</Button>
				<Button onClick={reset}>Resetuj</Button>
				<Button onClick={modifyPerson}>Modyfikuj obiekt</Button>
			</div>
			<div className="mt-10">
				<Button
					onClick={() => {
						// doda tylko 1
						// setCounter(counter + 1);
						// setCounter(counter + 1);
						// setCounter(counter + 1);

						// doda 3 bazując na poprzednim stanie
						setCounter(prevCounter => prevCounter + 1);
						setCounter(prevCounter => prevCounter + 1);
						setCounter(prevCounter => prevCounter + 1);
					}}>
					Dodaj 3
				</Button>
			</div>
            <Input value={text} onChange={value => setText(value)} />
		</div>
	);
}

function Input({ value, onChange }) {

    console.log('Render Input');

	return (
		<input
			type="text"
			value={value}
			onChange={e => onChange(e.target.value)}
		/>
	);
}
