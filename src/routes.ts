import http from "http";
import { Request, Response } from "express";

export default interface Route {
  path: string;
  execute: (request: Request, response: Response) => void;
}

type Routes = Route[];

const routes: Routes = [
  {
    path: "/user/description",
    execute(request: Request, response: Response) {
      response.send("<h2>User: Sergio</h2>");

      /*       response.writeHead(200, { "content-type": "text/plain" });
      response.write("<h2>User: Sergio</h2>");
      response.end();
 */
    },
  },
  {
    path: "/user/list",
    execute(request: Request, response: Response) {
      response.json([
        { username: "shidalgo", active: true },
        { username: "pneira", active: true },
      ]);

      /*  response.writeHead(200, { "content-type": "application/json" });
      response.write(
        JSON.stringify([
          { username: "shidalgo", active: true },
          { username: "pneira", active: true },
        ])
      );
      response.end() */
    },
  },
  {
    path: "/user/detail",
    execute(request: Request, response: Response) {
      response.json({ username: "shidalgo", active: false });
      /*       response.writeHead(200, { "content-type": "application/json" });
      response.write(JSON.stringify({ username: "shidalgo", active: false }));
      response.end(); */
    },
  },
  {
    path: "/user/delete",
    execute(request: Request, response: Response) {
      response.send("User deleted successfully");
      /*       response.writeHead(200, { "content-type": "text/plain" });
      response.write("User deleted successfully");
      response.end(); */
    },
  },
];

export const getRoute = (path: string): Route | undefined =>
  routes.find((route: Route) => route.path === path);

export const exceptionNotFound = (
  request: Request,
  response: Response
): void => {
  response.status(404).send("Path not found");
  /*   response.writeHead(404, { "content-type": "text/plain" });
  response.end("Path not found"); */
};
