import helmet from "helmet";
import hpp from "hpp";
import { Express } from "express";

const helmetSetup = (app: Express) => {
  app.use(helmet({
    contentSecurityPolicy: false, // Optional: disable or customize if needed
  }));

  app.use(hpp()); // Protects against HTTP parameter pollution
};

export default helmetSetup;
