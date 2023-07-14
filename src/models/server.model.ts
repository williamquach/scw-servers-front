import { ServerStatus } from "./server-status";
import { ServerType } from "./server-type";

export interface Server {
    id: string;
    name: string;
    type: ServerType;
    status: ServerStatus;
}