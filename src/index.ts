import { BootstrapModule } from "../common/app";

BootstrapModule({
    port: 8000
})
    .then((Running) => Running)
    .catch((error: string) => console.log('Application is crashed: ' + error));