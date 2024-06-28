import Client from "./core/Client";

const client = new Client(import.meta.env.VITE_SERVER_URL as string);
export default client;