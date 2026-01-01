export function resolvePort({
  cliPort,
  envPort,
  defaultPort,
}) {
  if (cliPort) return Number(cliPort);
  if (envPort) return Number(envPort);
  return defaultPort;
}
