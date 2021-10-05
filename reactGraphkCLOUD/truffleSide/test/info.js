const ganache = require("ganache");

const options = {};
const server = ganache.server(options);
const PORT = 8545;
server.listen(PORT, err = async () => {
  console.log(`ganache listening on port ${PORT}...`);
  const provider = server.provider;
  const accounts = await provider.request({ method: "eth_accounts", params:[] });
});