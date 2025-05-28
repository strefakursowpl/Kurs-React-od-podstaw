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
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query'
import { Button } from "./components/ui/button";

setErrorMap(customErrorMap);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
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
							<Route path=":postId" element={<BlogPost />} />
						</Route>
						<Route path="portfele" element={<WalletsPage />} />
						<Route path="transakcje" element={<TransactionsPage />} />
						<Route path="podsumowanie" element={<SummaryPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);

type TPost = {
	id: number,
	userId: number,
	title: string,
	body: string
}

function BlogPost() {
	const {postId} = useParams();

	const {data, error, isFetching} = useQuery<TPost>({
		queryFn: async () => {
			const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

			if(response.status === 404) {
				throw new Error('Nie znaleziono postu z podanym ID');
			}

			return await response.json();
		},
		queryKey: ['posts', postId]
	});
	
	const {data: mutationData, mutate} = useMutation<TPost, Error, Omit<TPost, 'id'|'userId'>>({
		mutationFn: async (input) => {
			const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
				method: 'POST',
				body: JSON.stringify({
					title: input.title,
					body: input.body,
					userId: 1,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				}
			});

			if(!response.ok) {
				throw new Error('Coś poszło nie tak.');
			}

			return await response.json();
		},
		mutationKey: ['posts']
	});

	if(isFetching) {
		return (
			<div>Loading...</div>
		)
	}

	if(error) {
		return (
			<h1>{error.message}</h1>
		)
	}

	console.log(mutationData);

	return (
		<div>
			<h1>ID: {postId}</h1>
			<h2>{data?.title}</h2>
			<p>{data?.body}</p>
			<Button onClick={() => mutate({
				title: 'Nowy post',
				body: 'Zawartość nowego postu'
			})}>Dodaj nowy post</Button>
		</div>
	)
}
