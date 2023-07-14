import { CustomError } from "./custom.error";

export class CreateServerError extends CustomError {
	constructor({
		message,
		context,
	}: {
		message: string;
		context?: Record<string, unknown>;
	}) {
		super({
			code: "create_server_error",
			message,
			status: 500,
			context,
		});
	}
}
