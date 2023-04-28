import express from 'express';
import axios from 'axios';
const router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  axios
    .get("https://api.github.com/users/alexgabor/repos")
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

export default router;
