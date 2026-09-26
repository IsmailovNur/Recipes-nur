import path from "path";

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  mongoDbUrl: "mongodb://localhost/recipes-nur",
  googleClientID: process.env.GOOGLE_CLIENT_ID,
};

export default config;