import API from "../../utils/API";

export const getNotes = (user) => (dispatch) => {
  dispatch({ type: "NOTES/LOADING" });
  API.getUserNotes(user)
    .then((notes) => {
      dispatch({
        type: "NOTES/SET",
        payload: notes,
      });
    })
    .catch((err) => dispatch({ type: "NOTES/ERROR", payload: err.toString() }));
};

export const deleteNote = (noteId) => (dispatch) => {
  API.deleteNote(noteId).then(() => {
    dispatch({
      type: "NOTES/DELETE",
      payload: noteId,
    });
  });
};

export const postNote = (note) => async (dispatch) => {
  const createdNote = await API.postNote(note);
  if (createdNote)
    dispatch({
      type: "NOTES/POST/NOTE",
      payload: createdNote,
    });
  return createdNote;
};
