// 1. useRef używamy aby oznaczyć wartość która ma się nie zmieniać między renderami,
//    jeżeli byśmy przypisali do zmiennej to zmieniła by się ona, jeżeli byśmy tą zmienną
//    przenieśli poza komponent, wtedy nie zmieniła by się ale dzieliła by zawartość między
//    cały plik, a nie tylko pojedyńczy komponent.
// 2. Ma następującą postać const ref = useRef(inicjalnaWartość)
// 3. Do wartości zapisanej w ref dostajemy się poprzez ref.current
// 4. Można także przypisywać elementom HTML refa, dodając atrybut ref={ref}
// 5. Refa można przeprowadzać przez komponent podrzędny (children) do komponentu nadrzędnego (parent)
//    w React 19, podajemy refa jako propsa, w poprzednich wersjach stosujemy forwardRef.
// 6. Ref jest mutowalny, po zmianie refa nie wywołuje się re-render.
// 7. Nie jest zalecane aby mutować refa jeżeli znajduje się w nim coś co może wpłynać na render,
//    np. część stanu, nie jest także zalecane aby operować na ref w trakcie renderingu,
//    czyli bezpośrednio w ciele komponentu.

import { useRef, useState } from 'react';

export function RefComponent() {
	const [change, setChange] = useState(false);

	let clickCounterNotRef = 0;
	const countRef = useRef(0);

	const inputRef = useRef(null);

	return (
		<div style={{ paddingLeft: '30px' }}>
			<div>
				<button
					onClick={() => {
						countRef.current++;
						clickCounterNotRef++;
					}}>
					Kliknij
				</button>
				<button
					onClick={() => {
						alert(`Ilość kliknięć z refa: ${countRef.current}`);
						alert(
							`Ilość kliknięć ze zmiennej: ${clickCounterNotRef}`,
						);
					}}>
					Sprawdź ilość kliknięć
				</button>
				<button onClick={() => setChange(!change)}>Zmień stan</button>
			</div>
            <button onClick={() => inputRef.current.focus()}>FOCUS</button>
			<Input ref={inputRef} />
		</div>
	);
}

function Input({ref}) {
    return <input type="text" ref={ref} />
}
