import { useEffect, useMemo, useState } from "react";
import { toast, Breadcrumbs } from "@ultraviolet/ui";
import { ServerService } from "../../../services/server.service";
import { useParams } from "react-router-dom";
import { Server } from "../../../models/server.model";
import { ServerDetailsDisplaying } from "./ServerDetailsDisplaying";

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
				console.error(error);
				setError(
					"An error occurred while loading the server, please try again later or contact support"
				);
				toast.error(
					"Could not load server, please try again later or contact support 🧐"
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
			<ServerDetailsDisplaying
				loading={loading}
				error={error}
				server={server}
			/>
		</>
	);
}
