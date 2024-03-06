import Client from "./core/Client";

const client = new Client(process.env.SERVER_URL as string);
export default client;