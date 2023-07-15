import { Breadcrumbs, toast } from "@ultraviolet/ui";
import { ServerService } from "../../../services/server.service";
import { useMemo, useState } from "react";
import { CreateServerDto } from "./create-server.dto";
import { ServerStatus } from "../../../models/server-status";
import { ServerType } from "../../../models/server-type";
import { useNavigate } from "react-router-dom";
import { NewServerForm } from "./NewServerForm";

export function NewServerPage() {
	const navigate = useNavigate();
	const serverService = useMemo(() => {
		return new ServerService();
	}, []);

	const [createServerDto, setCreateServerDto] = useState<CreateServerDto>({
		name: "",
		status: ServerStatus.STARTING,
		type: ServerType.MEDIUM,
	});
	const [loading, setLoading] = useState<boolean>(false);

	const handleCreateServer = async (): Promise<void> => {
		const errors = validateCreateServerForm(createServerDto);
		if (Object.keys(errors).length > 0) {
			toast.error(
				`You should fix the following errors before submitting: ${Object.values(
					errors
				).join(", ")}
				`
			);
			return;
		}
		setLoading(true);

		serverService
			.create(createServerDto)
			.then((server) => {
				toast.success("Server created");
				navigate(`/servers/${server.id}`);
			})
			.catch((error) => {
				console.log(error);
				toast.error(
					"Could not create server, please try again later or contact support 🧐"
				);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const serverNameChanged = (name: string) => {
		createServerDto.name = name;
		setCreateServerDto(createServerDto);
	};

	const serverStatusChanged = (status: ServerStatus) => {
		createServerDto.status = status;
		setCreateServerDto(createServerDto);
	};

	const serverTypeChanged = (type: ServerType) => {
		createServerDto.type = type;
		setCreateServerDto(createServerDto);
	};

	const validateCreateServerForm = (
		fields: CreateServerDto
	): Record<string, string> => {
		const errors: Record<string, string> = {};
		if (!fields.name) {
			errors.name = "Name is required";
		}
		if (!fields.type) {
			errors.type = "Type is required";
		}
		if (!fields.status) {
			errors.status = "Status is required";
		}
		return errors;
	};

	return (
		<>
			<Breadcrumbs className="p-4">
				<Breadcrumbs.Item to="/">Home</Breadcrumbs.Item>
				<Breadcrumbs.Item to="/servers">Servers</Breadcrumbs.Item>
				<Breadcrumbs.Item>New</Breadcrumbs.Item>
			</Breadcrumbs>
			<NewServerForm
				loading={loading}
				handleCreateServer={handleCreateServer}
				validateCreateServerForm={validateCreateServerForm}
				createServerDto={createServerDto}
				serverNameChanged={serverNameChanged}
				serverTypeChanged={serverTypeChanged}
				serverStatusChanged={serverStatusChanged}
			/>
		</>
	);
}
