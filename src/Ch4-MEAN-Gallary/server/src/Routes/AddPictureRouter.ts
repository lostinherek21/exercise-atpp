import { Picture } from "../Model/Picture";
import { IRoute } from "./RouteEngine";

export default class AddPictureRouter implements IRoute {
  AddRoute(route: any): void {
    route.post("/add", (request: any, response: any) => {
      const picture = new Picture(request.body);
      picture.save((err, picture) => {
        if (err) {
          response.send(err);
        } else {
          response.json(picture);
        }
      });
    });
  }
}
