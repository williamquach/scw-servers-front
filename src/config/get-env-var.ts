import { getClientSideEnvVar } from "./servers-api";

export const getServersApiUrl = (): string => {
    const url = getClientSideEnvVar("VITE_SERVERS_API_URL");
	if (url === undefined || url === "") {
		throw new Error(`VITE_SERVERS_API_URL env variable is not defined`);
	}

    return url;
}
