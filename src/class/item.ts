module.exports = class Item {
  readonly id: string = Math.random().toString();

  constructor(
    readonly name: string,
    readonly input: string
  ) {}
};
