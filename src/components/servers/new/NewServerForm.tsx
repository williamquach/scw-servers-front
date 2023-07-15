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
import { CenteredAbovePageLoader } from "../../shared/centered-above-page-loader";

export function NewServerForm({
	loading,
	handleCreateServer,
	validateCreateServerForm,
	createServerDto,
	serverNameChanged,
	serverTypeChanged,
	serverStatusChanged,
}: {
	loading: boolean;
	handleCreateServer: () => Promise<void>;
	validateCreateServerForm: (createServerDto: CreateServerDto) => any;
	createServerDto: CreateServerDto;
	serverNameChanged: (name: string) => void;
	serverTypeChanged: (type: ServerType) => void;
	serverStatusChanged: (status: ServerStatus) => void;
}) {
	return (
		<div>
			{loading && <CenteredAbovePageLoader color="success" />}
			<h1 className="text-4xl font-bold p-4 text-start">New server</h1>

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
	);
}
