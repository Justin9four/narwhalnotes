import GetUsers from "../GetUsers";
import PromoteDemoteAccount from "../PromoteDemoteAccount";
import EnableDisableAccount from "../EnableDisableAccount";

const AdminPagesMap = {
  "Get Users": GetUsers,
  "Promote/Demote": PromoteDemoteAccount,
  "Enable/Disable": EnableDisableAccount
};

export default AdminPagesMap;
