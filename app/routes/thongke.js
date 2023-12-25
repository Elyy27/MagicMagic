var express = require("express");
const router = express.Router();

const tkeCtrl = require("../controllers/thongkeCtrl");


router.post("/all", tkeCtrl.getAll);

router.post("/byMonth", tkeCtrl.byMonth);

router.post("/GD", tkeCtrl.GDOffice);
router.post("/TK", tkeCtrl.TKOffice);

module.exports = router;