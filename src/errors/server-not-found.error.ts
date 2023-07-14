import { NotFoundError } from "./not-found.error";

export class ServerNotFoundError extends NotFoundError {
	constructor({
		message,
		context,
	}: {
		message: string;
		context?: Record<string, unknown>;
	}) {
		super({
			message,
			context,
		});
	}
}
