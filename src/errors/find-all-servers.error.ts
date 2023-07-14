import { CustomError } from "./custom.error";

export class FindAllServerError extends CustomError {
	constructor({
		message,
		context,
	}: {
		message: string;
		context?: Record<string, unknown>;
	}) {
		super({
			code: "find_all_servers_error",
			message,
			status: 500,
			context,
		});
	}
}
