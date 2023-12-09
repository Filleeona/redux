import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Error from "./Error";
import API from "../utils/API";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";

export default function ViewNote() {
  const user = useSelector(selectUser);
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);

  useEffect(() => {
    API.getNote(id).then((noteData) => {
      if (noteData.userId === user.id) setNote(noteData);
    });
  }, [id, user.id]);

  function handleEditNote(noteId) {
    navigate(`/notes/${noteId}/edit`);
  }

  function handleDeleteNote(noteId) {
    API.deleteNote(noteId);
    navigate("/notes");
  }

  if (!note || !note.id) {
    return <Error />;
  }

  return (
    <div className="h-[100%] w-[100%] flex items-center justify-center flex-col gap-5">
      <div className="w-[100%] prose flex flex-col items-center gap-5">
        <div className="w-[100%] flex justify-between">
          <NavLink
            className="no-underline flex items-center justify-center w-[60px] h-6 rounded-xl border border-black hover:bg-black hover:text-white"
            to="/notes"
          >
            Back
          </NavLink>
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
        <h1 className="m-0">{note.title}</h1>
        <form className="w-[100%] flex items-center flex-col gap-5">
          <textarea
            className="w-[100%] h-[300px]  bg-gray-100 rounded-xl p-2 border border-gray-300"
            placeholder="Note text..."
            value={note.text}
            readOnly={true}
          />
        </form>
      </div>
    </div>
  );
}
