class EnityManager {
  entites = new Map();

  add(entity) {
    this.entites.set(entity);
  }

  delete(entity) {
    this.entites.delete(entity);
  }
}

export default new EnityManager();