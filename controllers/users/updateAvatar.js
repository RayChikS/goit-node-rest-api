const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");

const { User } = require("../../models/users");

const avatarSize = 250;

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { path: tempUpload, filename } = req.file;

    const { _id } = req.user;
    const [extension] = filename.split(".").reverse();
    const avatarName = `${_id}.${extension}`;

    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);

    const avatar = await jimp.read(resultUpload);
    avatar.resize(avatarSize, avatarSize).write(resultUpload);

    const avatarURL = path.join("avatars", avatarName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    next(error);
  }
};

module.exports = updateAvatar;
