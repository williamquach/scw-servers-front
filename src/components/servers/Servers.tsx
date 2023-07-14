import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Button, Breadcrumbs } from "@ultraviolet/ui";
import { ServerService } from "../../services/server.service";
import { SortableAndClickableTable } from "../shared/sortable-and-clickable-table";
import { Server } from "../../models/server.model";

export function ServersPage() {
	const navigate = useNavigate();

	const [servers, setServers] = useState<Server[]>([]);

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const serverService = useMemo(() => {
		return new ServerService();
	}, []);

	useEffect(() => {
		setLoading(true);
		serverService
			.findAll()
			.then((servers) => {
				setServers(servers);
			})
			.catch((error) => {
				setError(error.message);
				console.error(error);
				toast.error(
					"Could not load servers, please try again later or contact support"
				);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [serverService]);

	return (
		<>
			<Breadcrumbs className="p-4">
				<Breadcrumbs.Item to="/">Home</Breadcrumbs.Item>
				<Breadcrumbs.Item>Servers</Breadcrumbs.Item>
			</Breadcrumbs>
			<div>
				<div className="flex flex-row justify-between items-center">
					<h1 className="text-4xl font-bold p-4 text-start">
						Servers
					</h1>
					<Button
						variant="filled"
						icon="plus"
						onClick={() => {
							navigate("/servers/new");
						}}
					>
						Create server
					</Button>
				</div>
				<div className="flex flex-col items-center p-4">
					<SortableAndClickableTable
						linkToDetails="/servers"
						loadingReceived={loading}
						errorReceived={error}
						itemsReceived={servers}
						columns={[
							{
								label: "Name",
								itemPropertyToDisplay: "name",
								canBeOrdered: true,
							},
							{
								label: "Type",
								info: "Server can be small, medium, or large",
								itemPropertyToDisplay: "type",
								canBeOrdered: true,
							},
							{
								label: "Status",
								info: "Server can be starting, running, stopped, or stopping",
								itemPropertyToDisplay: "status",
								canBeOrdered: true,
							},
						]}
					/>
				</div>
			</div>
		</>
	);
}
