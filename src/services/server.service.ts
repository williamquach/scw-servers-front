import axios from "axios";
import { FindAllServerError } from "../errors/find-all-servers.error";
import { NotFoundError } from "../errors/not-found.error";
import { getServersApiUrl } from "../config/get-env-var";
import { FindServerByIdError } from "../errors/find-server-by-id.error";
import { ServerNotFoundError } from "../errors/server-not-found.error";
import { Server } from "../models/server.model";
import { CreateServerDto } from "../components/servers/new/create-server.dto";
import { CreateServerError } from "../errors/create-server.error";

export class ServerService {
	private API_URL: string;

	constructor() {
		this.API_URL = getServersApiUrl();
	}

	init() {
		return axios.create({
			baseURL: this.API_URL,
		});
	}

	async findAll(): Promise<Server[]> {
		try {
			const serversResponse = await this.init().get<Server[]>(`/servers`);
			return serversResponse.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 404) {
					throw new NotFoundError({
						message: `API route not found`,
						context: {
							error,
						},
					});
				}
			}
			throw new FindAllServerError({
				message: `Error while fetching servers`,
				context: {
					error,
				},
			});
		}
	}

	async findById(id: string): Promise<Server> {
		try {
			const serverResponse = await this.init().get<Server>(
				`/servers/${id}`
			);
			return serverResponse.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.status === 404) {
					throw new ServerNotFoundError({
						message: `Server not found with id ${id}`,
						context: {
							error,
						},
					});
				}
			}
			throw new FindServerByIdError({
				message: `Error while fetching server`,
				context: {
					error,
				},
			});
		}
	}

	async create(server: CreateServerDto): Promise<Server> {
		try {
			const serverResponse = await this.init().post<Server>(
				`/servers`,
				server
			);
			return serverResponse.data;
		} catch (error) {
			throw new CreateServerError({
				message: `Error while creating server`,
				context: {
					error,
				},
			});
		}
	}
}
