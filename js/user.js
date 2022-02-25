class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.count = user.count;
    this.multiplier = user.multiplier;
  }

  select() {
    this.count++;
    this.multiplier = 1;
  }

  updateSelectionOdds() {
    this.multiplier++;
  }
}
