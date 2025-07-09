export default class Todo {
  constructor({ id, text, completed = false, createdAt = null, deadline = null }) {
    this.id = id ?? Date.now();
    this.text = text;
    this.completed = completed;
    this.createdAt = createdAt ?? new Date().toISOString();
    this.deadline = deadline;
  }
}
