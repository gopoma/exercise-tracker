import app from "./app";
import config from "./config";

/**
 * Start Express server.
 */
const server = app.listen(config.port, () => {
    // eslint-disable-next-line
    console.log(`App is running on port ${config.port}`);
});

export default server;
