const express=require("express");

const router=express.Router();

const auditoriaCtrl=require("../controllers/auditoria.controller");

const authCtrl = require("../controllers/auth.controller");

router.get("/", authCtrl.verifyToken, authCtrl.verifyAdmin, auditoriaCtrl.getAuditorias);

module.exports=router;