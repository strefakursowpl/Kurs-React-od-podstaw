// @ts-nocheck

// 1. Reducer służy do zarządzania stanem, jest szczególnie przydatny
//    gdy na stanie przeprowadzamy wiele różnych akcji.
// 2. Aby z niego skorzystać musimy najpierw napisać funkcję reducera, najlepiej w oddzielnym pliku.
// 3. Funkcja ta przyjmuje jako pierwszy parametr state,
//    a jako drugi akcję, oraz powinna zwracać przyszły state.
//    Często w reducerach używamy switcha, ale logikę można też oprzeć na if/else.
// 4. W funkcji tej powinniśmy przypisać logikę dla każdego typu akcji, która dotyczy danego stanu.
//    Przykładowo: add, remove, edit. Dla każdego typu akcji powinniśmy zwrócić stan,
//    oczywiście stanu bezpośrednio nie modyfikujemy.
// 5. Aby skorzystać z reducera w komponentach używamy hooka useReducer().
//    np. const [state, dispatch] = useReducer(myReducer, initialState);
//    Jako pierwszy parametr przekazujemy funkcję reducera, a jako drugi początkowy stan.
//    Hook ten zwraca stan oraz funkcję która pozwala wysyłać akcje do reducera.
// 6. Funkcja dispatch() przyjmuje obiekt, który powinien zawierać przede wszystkim typ akcji,
//    oraz inne ważne dla tej akcji parametry np. dispatch({type: 'remove', id: 123}),
//    lub dispatch({type: 'add', title: 'Post Title', content: 'Any content'})
// 7. Reducer często jest łączony z contextem do zarządzania globalnym stanem,
//    podobne funkcje reducera używane są także w bibliotekach
//    do zarządzania stanem np. Redux czy Zustand.

import { useReducer } from 'react';

function shoppingReducer(state, action) {
	switch (action.type) {
		case 'write': {
			return {
                value: action.value,
                list: state.list
            };
		}
		case 'add': {

            if(!state.value) {
                return {
                    value: '',
                    list: state.list
                }
            }

			return {
                value: '',
                list: [
                    {
                        id: crypto.randomUUID(),
                        text: state.value,
                    },
                    ...state.list
                ],
            };
		}
		case 'remove': {
			return {
                value: state.value,
                list: state.list.filter(item => item.id !== action.id),
            };
		}
	}
}

export function ReducerComponent() {
	const [shoppingList, dispatch] = useReducer(shoppingReducer, {
		value: '',
		list: [],
	});

	function handleWrite(value) {
		dispatch({
			type: 'write',
			value,
		});
	}

	function handleAdd() {
		dispatch({
			type: 'add',
		});
	}

	function handleRemove(id) {
		dispatch({
			type: 'remove',
			id,
		});
	}

	return (
		<div style={{ paddingLeft: '30px' }}>
			<h1>Lista zakupów</h1>
			<input
				type="text"
				style={{ marginRight: '15px', padding: '10px' }}
				value={shoppingList.value}
				onChange={e => handleWrite(e.target.value)}
				onKeyUp={e => e.code === 'Enter' && handleAdd()}
			/>
			<button onClick={handleAdd}>Dodaj</button>
			<ul>
				{shoppingList.list.map(item => (
					<li key={item.id} style={{ marginBottom: '15px' }}>
						<span style={{ fontSize: '20px' }}>{item.text}</span>
						<button
							style={{ marginLeft: '15px' }}
							onClick={() => handleRemove(item.id)}>
							Usuń
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
