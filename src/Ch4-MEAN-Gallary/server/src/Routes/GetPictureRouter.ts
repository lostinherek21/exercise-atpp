import { Picture } from "../Model/Picture";
import { IRoute } from "./RouteEngine";

export default class GetPictureRouter implements IRoute {
  AddRoute(route: any): void {
    route.get("/get/", (request: any, response: any) => {
      Picture.distinct("_id", (err: any, pictures: any) => {
        if (err) {
          response.send(err);
        } else {
          console.log(pictures)
          response.json(pictures);
        }
      });
    });
  }
}
