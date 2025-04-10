import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { RefComponent } from "./ref";

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RefComponent />
	</StrictMode>,
);
