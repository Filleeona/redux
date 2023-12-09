import { connect } from "react-redux";
import { selectLoading, selectUser } from "./selectors";
import { getUser } from "./actions";
import { selectNotesError } from "../notes/selectors";

export default connect(mapStateToProps, mapDispatchToProps)(User);

function mapStateToProps(state) {
  return {
    user: selectUser(state),
    loading: selectLoading(state),
    error: selectNotesError(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(getUser),
  };
}

function User({ user, loading, error, getUser }) {}
