const createError = require("http-errors");
const { sendEmail } = require("../../helpers");
const { User } = require("../../models/users");

const { URL_HOST } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw createError(404, "Not found");
  if (user.verify)
    throw createError(400, "Verification has already been passed");

  const mail = {
    to: email,
    subject: "Подтверждение регистрации",
    html: `<a href="${URL_HOST}/api/users/verify/${user.verificationToken}" target="_blank">Нажмите для подтверждения email</a>`,
  };

  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
