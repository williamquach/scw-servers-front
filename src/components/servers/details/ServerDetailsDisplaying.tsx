import { Separator, Icon } from "@ultraviolet/ui";
import { Server } from "../../../models/server.model";
import { CenteredAbovePageLoader } from "../../shared/centered-above-page-loader";

export function ServerDetailsDisplaying({
	loading,
	error,
	server,
}: {
	loading: boolean;
	error: string | null;
	server: Server | null;
}) {
	return (
		<div>
			{loading && <CenteredAbovePageLoader />}
			<h1 className="text-4xl font-bold p-4 text-start">
				Server details
			</h1>
			{error && (
				<div className="flex flex-col items-start p-4">
					<span className="text-red-500 text-start font-bold">
						{error}
					</span>
				</div>
			)}
			<div className="flex flex-col items-start p-4">
				{!loading && server && (
					<>
						<div className="flex">
							<div className="flex flex-row align-middle items-center gap-2 pb-10">
								<Icon name="id" size={30} />
								<span className="text-2xl font-bold">
									{server?.name}
								</span>
							</div>
						</div>
						<div className="flex flex-col items-start w-full border border-gray-200 rounded-lg p-4">
							<div className="flex flex-row items-center justify-between gap-20">
								<div className="flex flex-col items-start">
									<span className="text-lg font-bold">
										Type:
									</span>
									<span className="text-gray-700">
										{server?.type}
									</span>
								</div>
							</div>
							<div className="w-full pt-3 pb-3">
								<Separator color="neutral" />
							</div>
							<div className="flex flex-row items-center justify-between gap-2">
								<div className="flex flex-col items-start">
									<span className="text-lg font-bold">
										Status:
									</span>
									<span className="text-gray-700">
										{server?.status}
									</span>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
