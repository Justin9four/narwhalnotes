import Login from "../Login";
import Register from "../Register";
import GetUser from "../GetUser";
import UpdateUser from "../UpdateUser";
import DeleteUser from "../DeleteUser";

const UserPagesMap = {
  Login: Login,
  Register: Register,
  "Get User": GetUser,
  "Update User": UpdateUser,
  "Delete User": DeleteUser,
};

export default UserPagesMap;
