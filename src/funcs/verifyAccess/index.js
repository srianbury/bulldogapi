import { ACCESS } from "../../constants";

/*
    verify that the user has access to the given resource
*/
async function verifyAccessInList(allowedRoles, req, res, next) {
  try {
    const { _id } = req.userInfo.user;
    const user = await req.context.models.User.findById(_id);
    if (!user) {
      throw new Error("User not found.");
    }
    const accessLevel = user.access;
    if (allowedRoles.includes(accessLevel)) {
      next();
    } else {
      throw new Error();
    }
  } catch (e) {
    console.log(e);
    const error = "Insufficient permission.";
    return res.status(401).json({ error });
  }
}

async function verifyAdminAccess(req, res, next) {
  const allowedRoles = [ACCESS.ADMIN, ACCESS.MINDFLAYER];
  return await verifyAccessInList(allowedRoles, req, res, next);
}

export { verifyAdminAccess };
