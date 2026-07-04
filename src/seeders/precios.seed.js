const Precio = require('../models/precio.model');

async function seedPrecios() {
    await Precio.bulkCreate(
        [
            { nivel: 'primario',      modalidad: 'presencial', precio: 5000  },
            { nivel: 'primario',      modalidad: 'virtual',    precio: 4000  },
            { nivel: 'secundario',    modalidad: 'presencial', precio: 8000 },
            { nivel: 'secundario',    modalidad: 'virtual',    precio: 7000  },
            { nivel: 'terciario',     modalidad: 'presencial', precio: 10000 },
            { nivel: 'terciario',     modalidad: 'virtual',    precio: 9000 },
            { nivel: 'universitario', modalidad: 'presencial', precio: 11000 },
            { nivel: 'universitario', modalidad: 'virtual',    precio: 10000 },
            { nivel: 'doctorado',     modalidad: 'presencial', precio: 13000 },
            { nivel: 'doctorado',     modalidad: 'virtual',    precio: 12000 },
        ],
        {
            ignoreDuplicates: true
        }
    );

    console.log("Precios cargados.");
}

module.exports = seedPrecios;