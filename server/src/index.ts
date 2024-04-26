import Server from './core/Server';
import 'dotenv/config';

(async () => {
    const server = new Server(process.env.PORT);
    const port = await server.init();
    console.log(`Server running on port: ${port}`);
})();
