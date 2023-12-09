import API from "../../utils/API";

export const getUser =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({ type: "USER/LOADING/SET" });
    const query = new URLSearchParams({ email, password }).toString();
    const users = await API.getUser(query);

    const user = users[0];
    if (user) {
      dispatch({
        type: "USER/SET",
        payload: user,
      });
    } else {
      throw new Error("Invalid user");
    }
  };
