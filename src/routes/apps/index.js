const { Router } = require("express");
const multer  = require('multer')
const upload = multer({ dest: '../../public/upload/' })
const { authenticate } = require("../../middleware/protect");

const {
  RenderMain,
  UploadData,
  UploadPage,
  RenderElevy,
  ProcessElevy,
  Project
} = require("../../controllers/apps/ghcard");

const {
  RenderLogin,
  UserLogin,
  UserLogout,
} = require("../../controllers/apps/login/");

const router = Router();

router.use(function (req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

router.get("/", RenderLogin);
router.get("/project", Project);
// router.get("/elevy", RenderElevy);
router.post("/login", UserLogin);
router.get("/logout", UserLogout);
router.get("/apps/upload",authenticate,UploadPage);
router.post("/apps/upload/",authenticate, UploadData);
// router.post("/elevy",RenderElevy);

module.exports = router;
