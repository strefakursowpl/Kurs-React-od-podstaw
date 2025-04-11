import { useEffect, useRef, useState } from 'react';

// let didInit = false;

export function UseEffectComponent() {
	// Zastosowanie useEffect:
	// 1. Do obsługi funkcji nie związanych z React, np. ustawianie setInterval, setTimeout.
	// 2. Do synchronizacji stanu z rzeczami nie związanymi z React np. synchronizacja stanu
	//    isPlaying komponentu video z działaniem odtwarzacza video.
	// 3. Do synchronizacji Reacta z zewnętrznymi bibliotekami, np. do inicjalizacji biblioteki.
	// 4. Do podpinania listenerów globalnych np. 'resize', czy 'beforeunload'.
	// 5. Jeżeli chcemy aby miała miejsce jakaś akcja np. focus na inpucie po zmountowaniu komponentu,
	//    czy zmianie stanu.
	// 6. Do pobierania danych przez API, ale poleca się aby do tego celu użyć zewnętrzne biblioteki
	//    np. React Query (TanStack Query) czy SWR.
	//
	// Zasady:
	// 1. Do useEffect jako pierwszy parametr przekazujemy funkcję,
	//    jako drugi tablicę zależności (dependencies), funkcje czyszcząca tzw. cleanup,
	//    podajemy w return.
	// 2. Efekty mają związek z cyklem życia komponentów, jeżeli nie przekażemy drugiego parametru,
	//    useEffect będzie się odpalał za każdym razem, jeżeli drugi parametr to będzie pusta tablica
	//    to useEffect uruchomi się tylko podczas mountu tego komponentu raz. Jeżeli przekażemy jakieś
	//    zależności to useEffect będzie się odpalał za każdym razem gdy zmieniona zostanie zależność.
	// 3. Funkcja czyszcząca uruchamia się przed każdym (z wyjątkiem pierwszego)
	//    useEffect po zmianie jego zależności
	//    oraz po fazie unmount komponentu. Przykładowo jeżeli mamy pustą tablicę zależności cleanup function
	//    wykona się dopiero po usunięciu komponentu (unmount).
	// 4. Jeżeli już musimy zaktualizować jakiś stan z wnętrza useEffect, nigdy nie podajemy go
	//    do tablicy zależności, spowoduje to nieskończony re-render.
	// 5. Należy zawsze czyścić podpięte listenery w return, jeżeli tego nie zrobimy
	//    to efekt będzie taki że będą nam się podpinać dwukrotnie w StrictMode w developmencie,
	//    lub po odmontowaniu i zmontowaniu komponentu podepnie nam się drugi raz to samo.
	// 6. To samo tyczy się różnych efektów przykładowo w useEffect otworzyliśmy popup,
	//    to w funkcji czyszczącej czyli w return powinniśmy go zamknąć.
	// 7. Jeżeli jakaś logika powinna z danego komponentu odpalać się raz per aplikacja,
	//    a nie per komponent powinniśmy użyć zmiennej poza komponentem sprawdzającej czy
	//    dana akcja miała miejsce, szczególnie przydatne jeżeli komponent ma być używany
	//    w wielu miejscach w aplikacji. Można też przenieść całą taką logikę poza komponent.

	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => setCounter(c => c + 1), 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const resizeFunction = () => console.log('test123');
		window.addEventListener('resize', resizeFunction);

		return () => window.removeEventListener('resize', resizeFunction);
	}, []);

	const inputRef = useRef(null);

	const [text, setText] = useState('');

	useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // do tego celu nie używajmy useEffect! Ponieważ możemy użyć eventListenera
    // nie używajmy także żeby zsynchronizować dwa stany
    // np. chcielibyśmy połączyć state counter z text
    // zawsze starajmy się takie rzeczy robić w eventListenerach po akcji użytkownika
    // lub po prostu podczas renderowania
    //
    // useEffect(() => {
    //     document.title = text;
    // }, [text]);

	// jeżeli musimy skorzystać z akcji która może mieć miejsce tylko raz,
    // ale wiemy że komponent jest reużywalny, możemy skorzystać ze zmiennej poza komponentem
    // didInit definiujemy poza komponentem, to nam zapewni że tylko raz wydarzy się ta akcja
	// useEffect(() => {
	//     if(!didInit)
	//     {
    //         didInit = true;
	//         checkToken();
	//     }
	// }, []);

    
    // przykład z dependencies
    // const [serverUrl, setServerUrl] = useState('http://localhost/chat');
    // const [roomId, setRoomId] = useState(145);

    // useEffect(() => {
    //   const connection = createConnection(serverUrl, roomId);
    //   connection.connect();
    //   return () => {
    //     connection.disconnect();
    //   };
    // }, [serverUrl, roomId]);

	return (
		<div style={{ paddingLeft: '30px' }}>
			<h1>{counter}</h1>
			<input type="text" ref={inputRef} value={text} onChange={e => {
                setText(e.target.value);
                document.title = e.target.value;
            }} />
		</div>
	);
}
