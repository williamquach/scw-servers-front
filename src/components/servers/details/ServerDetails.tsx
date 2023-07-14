import { useEffect, useMemo, useState } from "react";
import { toast, Loader, Breadcrumbs, Separator, Icon } from "@ultraviolet/ui";
import { ServerService } from "../../../services/server.service";
import { useParams } from "react-router-dom";
import { Server } from "../../../models/server.model";
import { CenteredAbovePageLoader } from "../../shared/centered-above-page-loader";

export function ServerDetailsPage() {
	console.log("useParams()", useParams());

	const serverId = useParams().serverId;
	if (!serverId) {
		throw new Error("Server id not provided");
	}

	console.log("serverId", serverId);

	const [server, setServer] = useState<Server | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const serverService = useMemo(() => {
		return new ServerService();
	}, []);

	useEffect(() => {
		setLoading(true);
		serverService
			.findById(serverId)
			.then((server) => {
				setServer(server);
			})
			.catch((error) => {
				setError(error.message);
				console.error(error);
				toast.error(
					"Could not load server, please try again later or contact support"
				);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [serverId, serverService]);

	return (
		<>
			<Breadcrumbs className="p-4">
				<Breadcrumbs.Item to="/">Home</Breadcrumbs.Item>
				<Breadcrumbs.Item to="/servers">Servers</Breadcrumbs.Item>
				<Breadcrumbs.Item>{server?.name}</Breadcrumbs.Item>
			</Breadcrumbs>

			<div>
				{loading && <CenteredAbovePageLoader />}
				<h1 className="text-4xl font-bold p-4 text-start">
					Server details
				</h1>
				{error && (
					<div className="flex flex-col items-center p-4">
						<span className="text-red-500">{error}</span>
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
		</>
	);
}
