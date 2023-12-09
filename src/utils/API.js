const API = {
  baseUrl: "http://localhost:5001",
  getUserNotes(user) {
    return fetch(`${this.baseUrl}/notes?userId=${user.id}`).then((r) =>
      r.json()
    );
  },
  postUser(user) {
    return fetch(`${this.baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((r) => r.json());
  },
  getUser(query) {
    return fetch(`${this.baseUrl}/users?${query}`).then((r) => r.json());
  },
  deleteNote(noteId) {
    return fetch(`${this.baseUrl}/notes/${noteId}`, {
      method: "DELETE",
    }).then((response) => response.json());
  },
  postNote(note) {
    return fetch(`${this.baseUrl}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }).then((r) => r.json());
  },
  getNote(id) {
    return fetch(`${this.baseUrl}/notes/${id}`).then((r) => r.json());
  },
  putNote(editedNote, id) {
    return fetch(`${this.baseUrl}/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedNote),
    }).then((r) => r.json());
  },
};

export default API;
