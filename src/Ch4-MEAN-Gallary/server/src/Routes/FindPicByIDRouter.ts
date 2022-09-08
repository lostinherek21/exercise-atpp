import { Picture } from "../Model/Picture";
import { IRoute } from "./RouteEngine";

export default class FindPicByIDRouter implements IRoute {
  AddRoute(route: any): void {
    route.get("/id/:id/", (request: any, response: any) => {
      Picture.findOne(
        { _id: request.params.id },
        "-_id",
        (err: any, picture: any) => {
          if (err) {
            response.send(err);
          } else {
            response.json(picture);
          }
        }
      );
    });
  }
}
