const Auditoria = require("../models/auditoria.model");

const auditoriaService = {};

auditoriaService.registrar = async ({
    usuario_id,
    accion,
    entidad,
    entidad_id,
    descripcion,
    ip,
    user_agent
})=>{

    await Auditoria.create({

        usuario_id,

        accion,

        entidad,

        entidad_id,

        descripcion,

        ip,

        user_agent

    });

};

module.exports = auditoriaService;