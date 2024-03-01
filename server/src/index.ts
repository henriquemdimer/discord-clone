import Server from './core/Server';

(async () => {
    const server = new Server();
    const port = await server.init();
    console.log(`Server running on port: ${port}`);
})();