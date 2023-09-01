import { Server } from "http";
import { BootstrapModule } from "../common/app";

BootstrapModule({
    port: 8000,
    LogConnectionToDB: false
    // routePrefix : '/api'
})
    .then((Running: Server) => Running)
    .catch((error: string) => console.log('Application is crashed: ' + error));