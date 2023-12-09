import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";
import {
  selectNotes,
  selectNotesError,
  selectNotesLoading,
} from "../redux/notes/selectors";
import { deleteNote, getNotes } from "../redux/notes/actions";

export default function Notes() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes(user));
  }, [dispatch, user]);

  const notes = useSelector(selectNotes);
  const loading = useSelector(selectNotesLoading);
  const error = useSelector(selectNotesError);

  function handleViewNote(noteId) {
    navigate(`/notes/${noteId}`);
  }

  function handleEditNote(noteId) {
    navigate(`/notes/${noteId}/edit`);
  }

  function handleDeleteNote(noteId) {
    dispatch(deleteNote(noteId));
    dispatch(getNotes(user));
  }

  function formatMilliseconds(noteDate) {
    const date = new Date(noteDate);
    return date.toLocaleDateString().replace(/[,]/g, "");
  }

  if (loading) {
    return (
      <div className="h-[100%] w-[100%] flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[100%] w-[100%] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-[100%] w-[100%] flex items-center justify-center flex-col gap-5">
      <div className="w-[100%] prose flex flex-col items-center gap-5">
        <h1 className="m-0">Notes</h1>
        <NavLink
          className="no-underline flex items-center justify-center w-[150px] h-8 rounded-xl p-2 border border-black hover:bg-black hover:text-white"
          to="/create"
        >
          Add new note
        </NavLink>
        <div className="w-[100%] h-[400px] flex flex-col gap-5">
          {notes.map((note) => (
            <div
              key={note.id}
              className="cursor-pointer w-[100%] bg-gray-100 flex justify-between text-xl rounded-xl p-2 border border-gray-300"
              onClick={() => handleViewNote(note.id)}
            >
              <div className="flex gap-5">
                <span className="text-black font-medium">{note.title}</span>
                <span className="mt-[4px] text-base text-gray-400">
                  {formatMilliseconds(note.date)}
                </span>
              </div>
              <div className="flex gap-5">
                <span
                  className="cursor-pointer"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEditNote(note.id);
                  }}
                >
                  ✍️
                </span>
                <span
                  className="cursor-pointer"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteNote(note.id);
                  }}
                >
                  🗑️
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
