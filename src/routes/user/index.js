const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// Datenbank simulieren
let profiles = [
  {
    id: 1,
    firstName: "Max",
    name: "Mustermann",
    birthDate: new Date("1990-10-10"),
  },
  {
    id: 2,
    firstName: "Nina",
    name: "Mustermann",
    birthDate: new Date("1980-10-10"),
  },
];

const UserRouter = Router();

//  ***GET REQUESTS***
// Return profile from a specific user
UserRouter.get("/profile", (req, res) => {
  const userId = parseInt(req.query.userId);
  if (!userId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const userProfile = profiles.find((item) => item.id === userId);
  res.status(StatusCodes.OK).json({ profile: userProfile });
});

//  ***PUT REQUESTS***
UserRouter.put("/profile/update", (req, res) => {
  const { username, userId } = req.body;

  const currentUser = profiles.find((item) => item.id === userId);
  currentUser.username = username;

  const deletedProfiles = profiles.filter((item) => item.id !== userId);
  deletedProfiles.push(currentUser);

  profiles = deletedProfiles;

  res.json({ updatedProfile: currentUser });
});

//  ***DELETE REQUESTS***
UserRouter.delete("/profile", (req, res) => {
  const { userId } = req.body;

  const deletedProfiles = profiles.filter((item) => item.id !== userId);
  profiles = deletedProfiles;

  res.json({ deletedUserId: userId });
});

module.exports = { UserRouter };
