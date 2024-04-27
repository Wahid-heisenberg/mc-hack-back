const transporter = require("../config/email");
const dotenv = require("dotenv");
dotenv.config();

let send_email = async (email, subject, template, context) => {
  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject,
    template,
    context,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("------------Email sent:------------- " + info.response);
    return true;
  } catch (error) {
    console.error("----------Error in sending email--------- " + error);
    return false;
  }
};

module.exports = send_email;
