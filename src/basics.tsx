// Zasady JSX:
// 1. Nazwy plików w których trzymamy komponenty, muszą być rozszerzenia .tsx lub .jsx.
//    Konwencja nazewnictwa dowolna.
// 2. Nazwy komponentów muszą być pisane PascalCase, czyli np. function CardItem()
// 3. W zasadzie JSX piszemy bardzo podobnie do HTMLa, z kilkoma wyjątkami.
// 4. Nazwy atrybutów piszemy camelCase,
//    czyli np. nie onclick tylko onClick, są od tego pewne wyjątki.
// 5. Nie można używać atrybutu class, zamiast tego mamy className.
// 6. Komponent zwracający kod JSX, powinien mieć jeden nadrzędny element,
//    który otacza wszystkie wewnątrz, można do tego celu używac elementu HTML,
//    lub React Fragment np. <><h1>Test123</h1><h2>Jakiś nagłówek</h2></>
// 7. Wszystkie tagi powinny być zamknięte, oczywiście tyczy się to też zwykłego HTMLa,
//    natomiast nie może być wyjątków w postaci np. <br>, to nie przejdzie.
// 8. Wszystkie elementy można zamykać tworząc do pary tag zamykający np. <div></div>
//    lub tak: <div />
// 9. Jeżeli renderujemy listę elementów czy komponentów z tablicy,
//    powinniśmy używać unikalnych kluczy, więcej info niżej.
// 10. W JSX możemy korzystać z {} aby korzystać z wyrażeń Javascript,
//     są pewne ograniczenia wewnątrz nie możemy korzystać z tzw. keywords
//     np. if/else, switch itp.
//     natomiast możemy renderować warunkowo za pomocą ternary operator
//     czyli np. isTrue ? 'tak' : 'nie', lub operatorów && czy ||
// 11. Komponent może zwracać null, lub false aby zapobiec jego renderowaniu się

const names = [
    {
        id: crypto.randomUUID(),
        label: 'Mateusz',
    },
    {
        id: crypto.randomUUID(),
        label: 'Dawid',
    },
    {
        id: crypto.randomUUID(),
        label: 'Marcin',
    },
    {
        id: crypto.randomUUID(),
        label: 'Anonimowy uzytkownik',
    },
];

export default function Test() {

    // Zasady kluczy:
    // 1. Kluczy używamy podczas renderowania komponentów czy elementów z tablicy
    //    (jest też kilka bardziej zaawansowanych use case'ów).
    // 2. Klucz może być typu string lub number,
    //    musi być unikalny względem innych elementów tablicy,
    //    elementy w dwóch różnych tablicach mogą mieć takie same klucze.
    // 3. Nie jest dobrym pomysłem używanie kluczy generowanych z indeksu,
    //    ponieważ gdy element ulega np. sortowaniu,
    //    klucz zostaje ten sam, a element jest inny.
    // 4. Nie używamy kluczy generowanych dynamicznie np. z pomocą Math.random().

    return (
        <>
            <h1 style={{color: 'red'}}>Testowy komponent</h1>
            <h2>Testowy komponent</h2>
            {/* Tak wygląda komentarz w JSX */}
            <NextComponent />
            {
                names.map(({id, label}) => <Item key={id} name={label} />)
            }
        </>
    )
}

function Item({name}) {

    const handleClick = () => {
        alert(name);
    }

    return (
        <li onClick={handleClick}>{name}</li>
    );
}

function NextComponent() {
    
    const currentDate = new Date().toLocaleDateString();
    const imgSrc = '/vite.svg';

    return (
        <div>
            Kolejny komponent {currentDate}
            <img src={imgSrc} />
            <div style={{height: '5px', background: 'darkblue'}} />
            <PropsComponent name="Sebastian">
                <h2>Cechy komponentów</h2>
                <ul>
                    <li>Reużywalne</li>
                    <li>Modułowe</li>
                    <li>Czytelne</li>
                </ul>
            </PropsComponent>
        </div>
    )
}

function PropsComponent({name, children}) {

    // Zasady propsów:
    // 1. Propsem może być praktycznie wszystko,
    //    może mieć on dowolny typ danych np. string czy number,
    //    ale także może to być tablica, obiekt czy inny komponent.
    // 2. Propsy przekazujemy jak zwykły atrybut HTML.
    // 3. Przekazując element, między tagami tworzy się tzw. children.
    //    Tym elementem może być tekst, dowolny element HTML czy inny komponent.
    // 4. Propsy są nie mutowalne, czyli nie możemy modyfikować przekazywanej zawartości,
    //    ale na podstawie propsa możemy utworzyć nową wartość.
    // 5. Możemy określić także wartość domyślną dla propsa
    //    np. PropsComponent({name = 'Anonimowy', children})

    return (
        <>
            <h2>Witaj {name}</h2>
            {children ? children : <div>Brak elementu podrzędnego</div>}
        </>
    )
}
