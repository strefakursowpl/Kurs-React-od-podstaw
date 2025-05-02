// 3 typy podstawowe (primitives) w Javascript
const var1 = 0; // wszystkie zmiennoprzecinkowe liczby (floaty) również są numerami
const var2 = 'Hello'; // tzw. template literals np. `Hello ${var1}` też są stringami
const var3 = true;

console.log({var1, var2, var3});
// oprócz tego do primitives zalicza się również: undefined, null, symbol, bigint


const nullVariable = null;
console.log(nullVariable);

let undefinedVariable;
console.log(undefinedVariable);


// Typescript zapobiega nieprawidłowym działaniom na różnych typach wartości
const var4 = var1 + var3;

if(var1 > var2) {
    console.log('test');
}


const user = {
    name: 'Sebastian',
    location: 'Poland'
}
// W Javascript address nie wyrzuci błędu, a będzie posiadał wartość undefined
// W Typescript mamy błąd
const address = user.address;


// Typescript pomaga zapobiegać literówkom lub używaniem nieistniejących metod
const message = 'Hello Typescript';
// message.toLocaleLowercase();
// message.toLocaleCase();
message.toLocaleLowerCase();


// typy można przypisać ręcznie w ten sposób do dowolnej wartości
let randomNumber: number;

// typ przypisany czy pobrany z wartości już pozostaje niezmienny,
// nie można potem przypisać wartości innego typu czy typu do tej zmiennej
randomNumber = 2;
randomNumber += 3;


// Typy można łączyć ze sobą za pomocą tzw. unii, robimy to za pomocą znaku |
let postCode: number|string;
let rating: 'bad'|'average'|'good';
// Typescript automatycznie wyświetla możliwe opcje w momencie przypisywania wartości
// Po naciśnięciu ctrl + spacja, powinny pojawić się sugestie, chyba że ustawienia VS Code są inne.
rating = 'good';


// any = dowolna wartość
// unknown = nieznana wartość, aby użyć należy zdefiniować wartość
let anyValue: any;
let unknownValue: unknown;


// Przykład tzw. Narrowing, Typescript posiada funkcjonalność,
// która automatycznie zawęża typy danych wartości,
// szczególnie jeżeli typ nie jest jasno zadeklarowany.
// W pierwszym bloku x jest stringiem, w drugim numerem, a w trzecim never ponieważ nie może dojść
// do sytuacji w której jest on obsługiwany (o ile poprawnie się wszystko potypowało).
// Oprócz typeof, do sprawdzenia którego typu jest dana wartość możemy używać np.
// instanceof, in czy isArray.
function randomFunction(x: number|string) {
    if(typeof x === 'string') {
        return 'test';
    } else if(typeof x === 'number') {
        return 123;
    } else {
        return x;
    }
}


// tablicę posiadającą dane typy wartości definiuje się w poniższy sposób
let arrOfNumbers: number[];
// ale Typescript robi to także automatycznie
const arrOfStrings = ['Wartość 1', 'Wartość 2'];


// przykład potypowanej prostej funkcji:
function add(a: number, b: number) {
    return a + b;
}
// błąd - określony został zły typ zwracanej wartości,
// poniższa funkcja nie może zwracać stringa
// function add(a: number, b: number): string {
//     return a + b;
// }

// poniższa funkcja zwraca void - czyli nic nie zwraca
function showMessage() {
    console.log('Message');
}

// poniżej alias typu, używany do pisania i organizowania bardziej złożonych typów,
// oprócz tego dostępne są również interfejsy, kwestia używania typów czy interfejsów
// jest kwestią osobistych preferencji, w tym kursie będziemy używać tylko aliasów typu
type TCar = {
    type: string,
    model: string,
    year: number,
    mileage?: number,
    calculateValue?: (a: number, b: number) => number
}

// obiekt stworzony na podstawie TCar
const car: TCar = {
    type: 'Audi',
    model: 'A3',
    year: 2017
}

// nowy typ stworzony na podstawie typu TCar oraz dołączony nowy typ z jedną wartością
type TNewCar = TCar & {
    speed: number
}
// lub typ stworzony na podstawie obiektu car + nowy typ
type TNewCar2 = typeof car & {
    speed: number
}

// pobieramy typ z klucza model z TCar
type TCarType1 = TCar['model'];
// lub pobieramy typ z klucza z obiektu
type TCarType2 = typeof car.model;
