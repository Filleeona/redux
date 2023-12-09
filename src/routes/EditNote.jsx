import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Note } from "../utils/validation";
import Error from "./Error";
import API from "../utils/API";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";

export default function EditNote() {
  const user = useSelector(selectUser);
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    API.getNote(id).then((noteData) => {
      if (noteData.userId === user.id) {
        setNote(noteData);
        setTitle(noteData.title);
        setText(noteData.text);
      }
    });
  }, [user.id, id]);

  const [errors, setErrors] = useState({});

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function validateForm() {
    const newErrors = {};
    if (title.trim() === "") {
      newErrors.title = "Please enter the title";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      let editedNote = {};
      editedNote = Note.parse({
        userId: note.userId,
        title,
        text,
        date: Date.now(),
      });
      API.putNote(editedNote, id).then((updatedNote) => {
        if (updatedNote) navigate(`/notes/${updatedNote.id}`);
      });
    }
  }

  if (!note || !note.id) {
    return <Error />;
  }

  return (
    <div className="h-[100%] w-[100%] flex items-center justify-center flex-col gap-5">
      <div className="w-[100%] prose flex flex-col items-center gap-5">
        <div className="w-[100%] flex items-start">
          <NavLink
            className="no-underline flex items-center justify-center w-[60px] h-6 rounded-xl border border-black hover:bg-black hover:text-white"
            to="/notes"
          >
            Back
          </NavLink>
        </div>
        <h1 className="m-0">Edit note</h1>
        <form
          className="w-[100%] flex items-center flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div className="w-[100%]">
            <input
              className="w-[100%] bg-gray-100 rounded-xl p-2 border border-gray-300"
              placeholder="Name"
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
            {errors.title && <div className="text-red-500">{errors.title}</div>}
          </div>
          <textarea
            className="w-[100%] h-[300px]  bg-gray-100 rounded-xl p-2 border border-gray-300"
            placeholder="Note text..."
            value={text}
            onChange={handleTextChange}
          />
          <button
            className="flex items-center justify-center w-[100px] h-8 rounded-xl border border-black hover:bg-black hover:text-white"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
