import ServerBootstrap, { Bootstrap } from "./bootstrap/server.bootstrap";
import Application from "./app";

//const application = new Application();
const serverBootstrap: Bootstrap = new ServerBootstrap(
  Application.requestListener
);

/* const start = async () => {
  try {
    const resultServer = await serverBootstrap.initialize();
    console.log(resultServer);
  } catch (error) {
    console.log(error);
  }
}; */

(async () => {
  try {
    const resultServer = await serverBootstrap.initialize();
    console.log(resultServer);
  } catch (error) {
    console.log(error);
  }
})();

/* serverBootstrap
  .initialize()
  .then((message: string) => console.log(message))
  .catch((error: any) => console.error(error)); */

/* import http from "http";
import Route, { getRoute, exceptionNotFound } from "./routes";

const server = http.createServer(
  (request: http.IncomingMessage, response: http.ServerResponse) => {
    const route: Route | undefined = getRoute(request.url as string);

    if (route) {
      route.execute(request, response);
    } else {
      exceptionNotFound(request, response);
    } */

/*  if (request.url === "/user/description") {
      response.writeHead(200, { "content-type": "text/plain" });
      response.write("<h2>User: Sergio</h2>");
      response.end();
    } else if (request.url === "/user/list") {
      response.writeHead(200, { "content-type": "application/json" });
      response.write(
        JSON.stringify([
          { username: "shidalgo", active: true },
          { username: "pneira", active: true },
        ])
      );
      response.end();
    } else if (request.url === "/user/detail") {
      response.writeHead(200, { "content-type": "application/json" });
      response.write(JSON.stringify({ username: "shidalgo", active: false }));
      response.end();
    } else {
      response.writeHead(404, { "content-type": "text/plain" });
      response.end("Path not found");
    } */

/*     response.writeHead(200, { "content-type": "text/plain" });
    response.end("End of request"); */
/*   }
);

server.listen(3000, () => console.log("listening on port: 3000")); */
