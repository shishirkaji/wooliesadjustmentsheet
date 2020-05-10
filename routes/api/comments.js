const express = require("express");
const router = express.Router();
const Comments = require("../../models/Comments");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
// Route : POST api/comments/addComment
// type : Secured with token
// desc: the routes adds comments and update the comment if 
// the date exists
router.post(
  "/addComment",
  [auth, check("comment", "Please Add comment").not().isEmpty()],
  async (req, res) => {
    console.log("reached the add comments api");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("error with post data");
      return res.status(400).json({ errors: errors.array() });
    }
    const { comment, addedDate } = req.body;
    addedBy = req.user.id;

    try {
      const Comment = new Comments({
        comment,
        addedBy,
        addedDate,
        // 2020-5-8
      });
      const fetchedComment = await Comments.findOne({ addedDate: addedDate });
      if(fetchedComment){
        const newComment = req.body.comment
        const id = fetchedComment._id;
        await Comments.findByIdAndUpdate({_id:id},{
          comment:newComment
        })
        return res.send("comments updated");
      }

      console.log(addedDate);
      await Comment.save();
      return res.send("Comment saved");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
);

// Route : get api/comments/:date
// type : Secured with token
// desc: the routes queries comment for the date
//        and returns
router.get("/:date", auth, async (req, res) => {
  console.log("reached the get comment api");
  date = req.params.date;
  try {
    const comment = await Comments.findOne({ addedDate: date });
    if(comment){
      return res.send(comment);
    }else{
      return res.status(400).send("no comment for the date")
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});
module.exports = router;
