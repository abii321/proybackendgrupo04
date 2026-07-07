const Auditoria = require("../models/auditoria.model");
const Usuario = require("../models/usuario.model");

const auditoriaCtrl = {};

auditoriaCtrl.getAuditorias = async(req,res)=>{

    try{

        const auditorias = await Auditoria.findAll({

            include:[
                {
                    model:Usuario,
                    as:"usuario",
                    attributes:["id","nombre","apellido","email"]
                }
            ],

            order:[
                ["createdAt","DESC"]
            ]

        });

        res.json({

            status:1,

            data:auditorias

        });

    }catch(error){

        console.log(error);

        res.status(500).json({

            status:0,

            msg:"Error al obtener auditorías"

        });

    }

};

module.exports = auditoriaCtrl;