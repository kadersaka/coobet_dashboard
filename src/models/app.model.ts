import { AppJson } from "@/interfaces/app.interface";

class App {
  id?: string;
  name: string;
  image: string;

  constructor(name: string, image: string, id?: string) {
    this.name = name;
    this.image = image;
    this.id = id;
  }

  static fromJson(json: AppJson): App {
    return new App(json.name, json.image, json.id);
  }

  toJson(): AppJson {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
    };
  }
}

export default App;
