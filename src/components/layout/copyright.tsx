export default function Copyright() {
	return (
		<div className="bg-primary py-4">
			<div className="container">
				<div className="grid-cols-2 items-center lg:grid">
					<div>
						<p className="text-white">
							<a href="/">Techbe</a> {new Date().getFullYear()} ©
							Wszelkie prawa zastrzeżone
						</p>
					</div>
					<div className="mt-5 lg:mt-0 lg:text-right">
						<a href="/" className="mr-7 text-white">
							Regulamin
						</a>
						<a href="/" className="text-white">
							Polityka prywatności
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
