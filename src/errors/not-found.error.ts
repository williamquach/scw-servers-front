import { CustomError } from "./custom.error";

export class NotFoundError extends CustomError {
    constructor({
        message,
        code,
        context,
    }: {message: string, code?: string, context?: Record<string, unknown>}) {
        super({
            code: code || 'not_found_error',
            message,
            status: 404,
            context,
        });
    }
}