import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { BrowserRouter, Outlet, Route, Routes, useParams } from 'react-router';

import HomePage from './pages/home-page';
import AppLayout from "./layouts/app-layout";
import WalletsPage from "./pages/wallets-page";
import TransactionsPage from "./pages/transactions-page";
import SummaryPage from "./pages/summary-page";
import NotFoundPage from "./pages/not-found-page";
import { setErrorMap } from "zod";
import { customErrorMap } from "./lib/error-map";

setErrorMap(customErrorMap);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route path="*" element={<NotFoundPage />} />
					<Route index element={<HomePage />} />
					<Route path="blog" element={
						<section className="bg-red-500 py-48 px-4">
							<Outlet />
						</section>
					}>
						<Route index element={<h1 className="text-7xl text-center">Blog</h1>} />
						<Route path=":post" element={<BlogPost />} />
					</Route>
					<Route path="portfele" element={<WalletsPage />} />
					<Route path="transakcje" element={<TransactionsPage />} />
					<Route path="podsumowanie" element={<SummaryPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);

function BlogPost() {
	const {post} = useParams();

	return (
		<h1>Zawartość parametru: {post}</h1>
	)
}
