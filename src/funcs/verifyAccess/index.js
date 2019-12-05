import { ACCESS } from "../../constants";

/*
    verify that the user has access to the given resource
*/
async function verifyAccessInList(allowedRoles, req) {
  const { _id } = req.userInfo.user;
  const user = await req.models.User.findById(_id);
  const accessLevel = user.access;
  return allowedRoles.includes(accessLevel);
}

function verifyAdminAccess(req, res, next) {
  next();
}

export default { verifyAdminAccess };
