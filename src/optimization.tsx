// @ts-nocheck

// funkcja memo():
// 1. memo() zapobiega re-renderowi komponentu oraz podrzędnych (children),
//    jeżeli jego propsy się nie zmieniły,
//    a polecenie re-renderu przyszło z wyższego komponentu, natomiast nie zapobiega
//    jeżeli zmienił się context (czyli komponent korzyta z useContext).
// 2. memo robi tzw. porównanie shallow czyli ===, porównuje wartości typu prymitives
//    np. number, string oraz boolean, oraz za pomocą referencji obiekt oraz tablicę
//    czyli [] === [] daje false, a jeżeli przypiszemy do np. const
//    to wtedy const t1 = t2 = [] / t1 === t2 zwróci nam true, modyfikując t1, zmiany
//    będą zapisywać się także w t2, są one połączone.
// 3. memo() powinniśmy używać tylko wtedy gdy faktycznie jest potrzebne, a nie na wszelki wypadek,
//    czyli wtedy kiedy po testach wychodzi nam że powinniśmy pewne miejsca w aplikacji zoptymalizować.
//    Bardzo możliwe że korzystając z React Compiler nie będziemy musieli tego używać w niektórych projektach.
// 4. Konstrukcja - const Component = memo(Component, arePropsEqual?) - przyjmuje komponent oraz
//    opcjonalną funkcję porównującą propsy, jeżeli ta funkcja zwraca false to
//    wtedy re-renderuje ten komponent, przykład z dokumentacji poniżej:

//    function arePropsEqual(oldProps, newProps) {
//      return (
//        oldProps.dataPoints.length === newProps.dataPoints.length &&
//        oldProps.dataPoints.every((oldPoint, index) => {
//          const newPoint = newProps.dataPoints[index];
//          return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;
//        })
//      );
//    }

// hook useMemo():
// 1. Przede wszystkim służy do cachowania wyników zasobożernych funkcji,
//    ale możliwe że przyda nam się on także aby zapobiegać nie potrzebnemu
//    uruchamianiu się useEffect jeżeli podaliśmy cachowaną wartość do jego zależności.
// 2. Konstrukcja - const cachedValue = useMemo(function, dependencies);
// 3. Funkcja wywołuje się za każdym razem jak zmieniły się zależności,
//    jeżeli nie podaliśmy drugiego parametru to uruchamia się za każdym razem (co nie ma sensu),
//    jeżeli pustą tablicę to tylko za pierwszym razem.
// 4. Taka sama sytuacja jak w memo pkt. 3.

// hook useCallback():
// 1. Służy do cachowania definicji funkcji.
// 2. Konstrukcja - const cachedFunction = useCallback(function, dependencies);
// 3. Identycznie jak w pkt. 3 useMemo()
// 4. useCallback nie optymalizuje działania funkcji, jedynie zapobiega jej odtworzeniu w pamięci.
//    Jeżeli nastąpił re-render funkcja tworzy się od nowa co samo w sobie nie jest złe
//    ani zasobożerne, problem pojawia się gdy przekazujemy tą funkcję jako propsa do komponentu
//    niżej, wtedy bez użycia useCallback nastąpi re-render podrzędnego komponentu, mimo że
//    użyliśmy na nim memo().
// 5. Aby useCallback działał, powinniśmy zawsze używać memo() na komponencie podrzędnym,
//    który dostaje tą zcachowaną funkcję.
// 6. Istnieją też przypadki gdy będziemy używać useCallback w tym samym komponencie,
//    np. gdy przekazaliśmy do useEffect jako zależność funkcję i chcemy zapobiec aby
//    nam się on nie potrzebnie nie uruchamiał.
// 7. Dobrą praktyką jest używanie useCallback we własnych hookach, otaczamy funkcje
//    które są zwracane przez tego hooka, ponieważ nigdy nie wiemy gdzie mogą zostać użyte.
// 8. Taka sama sytuacja jak w memo() pkt. 3.

import { memo, useCallback, useMemo, useState } from "react";

export function Main() {

    const componentStartRendering = performance.now();

    const [open, setOpen] = useState(false);
    const [obj, setObj] = useState({});

    const uselessFunction = useCallback(() => {
        console.log('test 123');
    }, []);

    const expensiveMessage = useMemo(() => {
        let startTime = performance.now();

        while(performance.now() - startTime < 1000) {
            // emulujemy jakąś wolną funkcję, trwa 1 sek.
            // na Strict Mode będzie to trwało 2 sek.
            // bo dwukrotnie się odpala
        }

        return 'Wiadomość na której wygenerowanie potrzeba dużo czasu';
    }, [obj]);

    alert(`Czas renderu komponentu: ${performance.now() - componentStartRendering}`);

    return (
        <div style={{paddingLeft: '30px'}}>
            <h1>{expensiveMessage}</h1>
            <button onClick={() => setOpen(!open)}>Zmień stan</button>
            <button onClick={() => setObj({})}>Zmień obiekt</button>
            <List uselessFunction={uselessFunction} />
        </div>
    )
}

const List = memo(function() {
    console.log('List!!!');
    return (
        <ul>
            <Item />
            <Item />
            <Item />
        </ul>
    )
});

function Item() {
    console.log('Item!!!');
    return (
        <li>Item</li>
    )
}
