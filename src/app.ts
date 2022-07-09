import { IncomingMessage, ServerResponse } from "http";
import Route, { exceptionNotFound, getRoute } from "./routes";

export default class {
  static requestListener(request: IncomingMessage, response: ServerResponse) {
    const route: Route | undefined = getRoute(request.url as string);

    if (route) {
      route.execute(request, response);
    } else {
      exceptionNotFound(request, response);
    }
  }
}
