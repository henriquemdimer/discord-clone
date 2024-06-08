export default class IdGenerator {
  static idLength = 18;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async generateId(model: any): Promise<string> {
    let id = `${Date.now()}`;
    for (let i = 0; i < (this.idLength - 13); i++) {
      id += Math.floor(Math.random() * 9);
    }

    if (await model.findOne({ id: id })) {
      return await this.generateId(model);
    } else {
      return id;
    }
  }
}