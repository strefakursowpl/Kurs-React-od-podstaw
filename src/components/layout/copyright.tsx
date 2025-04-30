import { Link } from "react-router";

export default function Copyright() {
	return (
		<div className="bg-primary py-4">
			<div className="container">
				<div className="grid-cols-2 items-center lg:grid">
					<div>
						<p className="text-white">
							<Link to="/">Techbe</Link> {new Date().getFullYear()} ©
							Wszelkie prawa zastrzeżone
						</p>
					</div>
					<div className="mt-5 lg:mt-0 lg:text-right">
						<Link to="/" className="mr-7 text-white">
							Regulamin
						</Link>
						<Link to="/" className="text-white">
							Polityka prywatności
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
