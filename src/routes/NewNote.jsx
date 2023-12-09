import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Note } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../redux/user/selectors";
import { postNote } from "../redux/notes/actions";

export default function NewNote() {
  const id = useSelector(selectUserId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
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
      let note = {};
      note = Note.parse({
        userId: id,
        title,
        text,
        date: Date.now(),
      });
      dispatch(postNote(note)).then((createdNote) =>
        navigate(`/notes/${createdNote.id}`)
      );
    }
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
        <h1 className="m-0">Create new note</h1>
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
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
