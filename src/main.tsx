import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { UseEffectComponent } from "./use-effect";

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<UseEffectComponent />
	</StrictMode>,
);
