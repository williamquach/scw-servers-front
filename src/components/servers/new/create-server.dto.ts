import { ServerStatus } from "../../../models/server-status";
import { ServerType } from "../../../models/server-type";

export interface CreateServerDto {
	name: string;
	type: ServerType;
	status: ServerStatus;
}
