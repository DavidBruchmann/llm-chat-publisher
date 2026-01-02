// .Build/tools/admin-server/resolvePort.mjs

export function resolvePort(argv = []) {
  const hasHttps = argv.includes('--https');

  const portArg = argv.find(a => a.startsWith('--port='));
  const portFromArg = portArg
    ? Number(portArg.split('=')[1])
    : null;

  const port = portFromArg
    ?? (hasHttps ? 4001 : 4000);

  const protocol = hasHttps ? 'https' : 'http';

  return { port, protocol };
}
