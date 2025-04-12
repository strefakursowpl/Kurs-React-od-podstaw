import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { ReducerComponent } from "./reducer";

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ReducerComponent />
	</StrictMode>,
);
