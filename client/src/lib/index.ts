import Client from "./core/Client";

const client = new Client(process.env.REACT_APP_SERVER_URL as string);
export default client;