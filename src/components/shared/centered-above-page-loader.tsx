import { Loader } from "@ultraviolet/ui";

export function CenteredAbovePageLoader({
	color = "primary",
}: {
	color?: "primary" | "neutral" | "success" | "danger" | "warning" | "info";
}) {
	return (
		<div className="flex flex-col items-center align-middle justify-center p-4 absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 z-50">
			<Loader strokeWidth={8} active color={color} />
		</div>
	);
}
