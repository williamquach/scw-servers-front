import { Link } from "@ultraviolet/ui";

export function Home() {
	return (
		<>
			<div className="flex flex-col items-center gap-4 justify-center m-20">
				<h1 className="text-4xl font-bold p-4 text-center">Home</h1>
				<Link href="/servers" sentiment="primary" size="large">
					Go to servers
				</Link>
			</div>
		</>
	);
}
