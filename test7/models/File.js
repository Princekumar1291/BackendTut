const mongoose = require("mongoose")
const nodemailer = require("nodemailer")

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
})

//post middleware
fileSchema.post("save", async function (doc) {
  try {
    console.log("DOC", doc)   //doc is the entry of db that we saved
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    })

    const info = transporter.sendMail({
      from: `"Prince Portal" <${process.env.MAIL_USER}>`, // sender address
      to: doc.email, // list of receivers
      subject: "New File Uploaded on Cloudinary ✔", // Subject line
      html: `<b>File Uploaded?</b>
        <br> Image is: 
        <a href="${doc.imageUrl}" target="_blank">Click here to view</a>`, // html body
    });

    console.log(info)

  } catch (error) {
    console.log(error)
  }
})

module.exports = mongoose.model("File", fileSchema);