import { Breadcrumbs, toast } from "@ultraviolet/ui";
import { ServerService } from "../../../services/server.service";
import { useMemo, useState } from "react";
import { CreateServerDto } from "./create-server.dto";
import { ServerStatus } from "../../../models/server-status";
import { ServerType } from "../../../models/server-type";
import {
	Submit,
	Form,
	TextInputField,
	SelectInputField,
	SelectableCardField,
} from "@ultraviolet/form";
import { useNavigate } from "react-router-dom";
import { CenteredAbovePageLoader } from "../../shared/centered-above-page-loader";

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
			{loading && <CenteredAbovePageLoader color="success" />}
			<div>
				<h1 className="text-4xl font-bold p-4 text-start">
					New server
				</h1>

				<div className="flex flex-col items-start p-4 text-start">
					<Form
						onRawSubmit={handleCreateServer}
						errors={{
							MAX_DATE: "Date is too far in the future",
							MIN_DATE: "Date is too far in the past",
							MAX_LENGTH: "Value is too long",
							MIN_LENGTH: "Value is too short",
							REGEX: "Value does not match the pattern",
							REQUIRED: "Value is required",
							TOO_HIGH: "Value is too high",
							TOO_LOW: "Value is too low",
						}}
						validate={validateCreateServerForm}
						initialValues={createServerDto}
						className="flex flex-col items-start gap-2 text-start w-full"
					>
						<div className="flex flex-col items-start w-4/5">
							<div className="flex flex-col items-start gap-1 w-full">
								<label
									htmlFor="name"
									className="text-gray-700 w-1/3"
								>
									Name
								</label>
								<TextInputField
									name="name"
									value={createServerDto.name}
									onChange={(name) => serverNameChanged(name)}
									className="w-full"
								/>
							</div>
							<div className="flex flex-col items-start gap-1 w-full pt-4">
								<label
									htmlFor="type"
									className="text-gray-700 w-1/3"
								>
									Server type
								</label>
								<SelectInputField
									label="Type"
									name="type"
									onChange={(event: any) => {
										serverTypeChanged(event?.value);
									}}
									className="w-auto"
								>
									{Object.keys(ServerType).map((type) => {
										return (
											<SelectInputField.Option
												key={type}
												value={type}
												label={type}
											>
												{type}
											</SelectInputField.Option>
										);
									})}
								</SelectInputField>
							</div>
							<div className="flex flex-col items-start gap-1 w-full pt-4">
								<label
									htmlFor="status"
									className="text-gray-700 w-1/3"
								>
									Status
								</label>
								<div className="flex flex-row items-center gap-3 w-4/5">
									{Object.keys(ServerStatus).map((status) => {
										return (
											<SelectableCardField
												key={status}
												name="status"
												required
												value={status}
												onChange={() => {
													serverStatusChanged(
														status as ServerStatus
													);
												}}
												type="radio"
												className="w-full"
											>
												{status}
											</SelectableCardField>
										);
									})}
								</div>
							</div>
						</div>

						<div className="flex flex-col items-center gap-2 pt-10">
							<Submit
								className="flex flex-row items-center gap-2"
								icon="plus"
								variant="filled"
								disabled={loading}
							>
								Create server
							</Submit>
						</div>
					</Form>
				</div>
			</div>
		</>
	);
}
