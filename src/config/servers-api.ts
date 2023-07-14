export const getClientSideEnvVar = (name: string): string => {
    const envVar = import.meta.env[name];
    if (envVar === undefined || envVar === '') {
        throw new Error(`${name} env variable is not defined`);
    }
    return envVar;
}
