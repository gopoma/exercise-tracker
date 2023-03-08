interface ConfigSettings {
    env: string,
    development: boolean,
    production: boolean,
    port: string;
}

const config: ConfigSettings = {
    env: process.env.NODE_ENV as string,
    development: process.env.NODE_ENV === "development",
    production: process.env.NODE_ENV === "production",
    port: process.env.PORT || "4000"
};

export default config;
