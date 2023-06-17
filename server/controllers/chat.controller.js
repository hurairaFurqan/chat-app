const chatModel = require("../models/chat.model");
const catchAsync = require("../utilities/catchAsync");

exports.setUpChat = catchAsync(async (req, res) => {
  const { content, author } = req.body;
  if ((content, author)) {
    let msg = new chatModel({
      message: content,
      users: [author],      
    });

    const dataToSave = await msg.save();
    res.status(200).json({ status: "Success", dataToSave });
  }
});
