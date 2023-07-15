import { Link } from "@ultraviolet/ui";

export function NoMatch() {
	return (
		<>
			<div className="flex flex-col items-center gap-4 justify-center m-20">
				<h1 className="text-8xl font-bold p-4 text-center">Oups!</h1>
				<h1 className="text-4xl font-bold p-4 text-center">404</h1>
				<Link href="/" sentiment="primary" size="large">
					Get back to home
				</Link>
			</div>
		</>
	);
}
