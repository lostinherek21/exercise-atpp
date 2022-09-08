import AddPictureRouter from "./AddPictureRouter";
import FindPicByIDRouter from "./FindPicByIDRouter";
import GetPictureRouter from "./GetPictureRouter";
import RouteEngine from "./RouteEngine";

export default class RouteFactory {
  private routeEngine: RouteEngine = new RouteEngine();

  Build(route: any) {
    this.routeEngine
      .Add(AddPictureRouter, route)
      .Add(GetPictureRouter, route)
      .Add(FindPicByIDRouter, route);
  }
}
