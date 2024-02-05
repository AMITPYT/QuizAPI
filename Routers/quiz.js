const express = require("express");
const router = express.Router();
const Quiz = require("../Schema/quiz");
const { validationResult } = require("express-validator");
const date = require("date-and-time");

router.post("/quizzes", async (req, res) => {
  try {
    const {
      question,
      A,
      B,
      C,
      D,
      rightans,
      status,
      startDate,
      endDate,
      startTime,
      endTime,
    } = req.body;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const quiz = new Quiz({
      question,
      A,
      B,
      C,
      D,
      rightans,
      status,
      startDate,
      endDate,
      startTime,
      endTime,
    });
    const savedquiz = await quiz.save();

    res.json({ Success: "Question Added Successfully", savedquiz });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id/result", async (req, res) => {
  try {
    let result = await Quiz.findById(req.params.id, "rightans");
    if (!result) {
      return res.status(404).send("Not found");
    }
    res.json({ Success: "Right Answer is ", result });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/quizzes/all", async (req, res) => {
  try {
    const getall = await Quiz.find({},['question','A','B','C','D']);
    res.json(getall);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/checkans/:id", async (req, res) => {
  const { rightans } = req.body;
  try {
    let user = await Quiz.findById(req.params.id, "rightans");
    console.log(user);
    if (rightans === user.rightans) {
      success = true;
      return res.status(400).json({ success: "Correct Answer" });
    } else {
      return res.status(400).json({ wrong: "Wrong Answer" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/quizstartedornot/:id", async (req, res) => {
  try {
    let user = await Quiz.findById(req.params.id);
    let now = new Date();
    const value = date.format(now, "YYYY/MM/DD HH:mm:ss");
    console.log(value);
    console.log(user);
    if (value >= user.startDate && value <= user.endDate) {
      return res.status(400).json({ Started: "Active" });
    } else if (value <= user.startDate) {
      return res.status(400).json({ Pending: "Quiz Not Started" });
    } else if (value >= user.endDate) {
      return res.status(400).json({ Ending: "Quiz Ended " });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updatestatus/:id", async (req, res) => {
  try {
    let user = await Quiz.findById(req.params.id);
    console.log(user);
    if (!user) {
      return res.status(404).send("Not found");
    }
    let now = new Date();
    const value = date.format(now, "YYYY/MM/DD HH:mm:ss");
    console.log(value);
    if (value >= user.endDate) {
      user = await Quiz.findByIdAndUpdate(
        req.params.id,
        { $set: { status: "Inactive" } },
        { new: true }
      );
      console.log(user);
      return res.json({ user });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
