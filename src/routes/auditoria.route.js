const express=require("express");

const router=express.Router();

const auditoriaCtrl=require("../controllers/auditoria.controller");

router.get("/",auditoriaCtrl.getAuditorias);

module.exports=router;