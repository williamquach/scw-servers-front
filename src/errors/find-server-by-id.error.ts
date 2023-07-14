import { CustomError } from "./custom.error";

export class FindServerByIdError extends CustomError {
	constructor({
		message,
		context,
	}: {
		message: string;
		context?: Record<string, unknown>;
	}) {
		super({
			code: "find_server_by_id_error",
			message,
			status: 500,
			context,
		});
	}
}
