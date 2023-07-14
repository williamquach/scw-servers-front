export class CustomError extends Error {
	public readonly date: string;

	public readonly code: string;

	public readonly message: string;

	public readonly status: number;

	public readonly context: Record<string, unknown>;

	constructor({
		code,
		message,
		status,
		context,
	}: {
		code: string;
		message: string;
		status?: number;
		context?: Record<string, any>;
	}) {
		super(message);

		this.date = new Date().toISOString();

		// we check if an error has been passed in the context => allow JSON.stringify to work correctly render the error's message
		if (context) {
			for (const key of Object.keys(context)) {
				if (context[key] instanceof Error) {
					context[key] = {
						...context[key],
						message: context[key].message,
						name: context[key].name,
						stack: context[key].stack,
					};
				}
			}
		}

		this.message = message;
		this.code = code;
		this.status = status || 500;
		this.context = context || {};

		Error.captureStackTrace(this, CustomError);
	}
}
