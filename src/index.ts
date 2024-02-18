import { Client } from "paragonjs"; 

const client = new Client();

(async () => {
  await client.start();
  await client.uploadCommands();  
})();