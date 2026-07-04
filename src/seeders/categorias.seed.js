const Categoria = require('../models/categoria.model');

async function seedCategorias() {
    await Categoria.bulkCreate(
        [
            {
                nombre: "Matemática",
                descripcion: "Resolución de ejercicios y refuerzo de conceptos matemáticos generales."
            },
            {
                nombre: "Álgebra",
                descripcion: "Matrices, vectores, sistemas de ecuaciones y espacios vectoriales."
            },
            {
                nombre: "Análisis Matemático",
                descripcion: "Límites, derivadas, integrales y aplicaciones del cálculo."
            },
            {
                nombre: "Geometría",
                descripcion: "Geometría plana, analítica y del espacio."
            },
            {
                nombre: "Estadística",
                descripcion: "Análisis e interpretación de datos, estadística descriptiva e inferencial."
            },
            {
                nombre: "Probabilidad",
                descripcion: "Eventos aleatorios, distribuciones y cálculo de probabilidades."
            },

            {
                nombre: "Programación",
                descripcion: "Fundamentos de programación, lógica y resolución de problemas."
            },
            {
                nombre: "Algoritmos",
                descripcion: "Diseño, análisis y optimización de algoritmos."
            },
            {
                nombre: "Estructuras de Datos",
                descripcion: "Listas, pilas, colas, árboles, grafos y estructuras avanzadas."
            },
            {
                nombre: "Bases de Datos",
                descripcion: "Modelado de datos, SQL, normalización y consultas."
            },
            {
                nombre: "Ingeniería de Software",
                descripcion: "Análisis, diseño, patrones y metodologías de desarrollo."
            },
            {
                nombre: "Desarrollo Web",
                descripcion: "Creación de aplicaciones web con tecnologías frontend y backend."
            },
            {
                nombre: "Desarrollo Móvil",
                descripcion: "Desarrollo de aplicaciones para dispositivos móviles."
            },
            {
                nombre: "Redes de Computadoras",
                descripcion: "Protocolos, direccionamiento, configuración y seguridad de redes."
            },
            {
                nombre: "Sistemas Operativos",
                descripcion: "Procesos, memoria, archivos y administración del sistema."
            },
            {
                nombre: "Arquitectura de Computadoras",
                descripcion: "Componentes del computador, procesadores y organización interna."
            },
            {
                nombre: "Inteligencia Artificial",
                descripcion: "Machine Learning, redes neuronales e IA aplicada."
            },
            {
                nombre: "Ciberseguridad",
                descripcion: "Seguridad informática, criptografía y protección de sistemas."
            },

            {
                nombre: "Física",
                descripcion: "Mecánica, electricidad, magnetismo y física moderna."
            },
            {
                nombre: "Química",
                descripcion: "Química general, orgánica e inorgánica."
            },
            {
                nombre: "Biología",
                descripcion: "Biología celular, genética y ciencias de la vida."
            },

            {
                nombre: "Contabilidad",
                descripcion: "Registros contables, balances y estados financieros."
            },
            {
                nombre: "Economía",
                descripcion: "Microeconomía, macroeconomía y análisis económico."
            },
            {
                nombre: "Administración",
                descripcion: "Gestión empresarial, planificación y organización."
            },
            {
                nombre: "Marketing",
                descripcion: "Marketing digital, estrategias comerciales y posicionamiento."
            },

            {
                nombre: "Inglés",
                descripcion: "Apoyo en gramática, conversación y comprensión del idioma."
            },
            {
                nombre: "Portugués",
                descripcion: "Clases para niveles iniciales, intermedios y avanzados."
            },
            {
                nombre: "Francés",
                descripcion: "Aprendizaje del idioma y preparación para exámenes."
            },

            {
                nombre: "Historia",
                descripcion: "Historia universal, regional y contemporánea."
            },
            {
                nombre: "Geografía",
                descripcion: "Geografía física, humana y política."
            },
            {
                nombre: "Filosofía",
                descripcion: "Pensamiento filosófico, ética y lógica."
            },

            {
                nombre: "Derecho",
                descripcion: "Derecho civil, penal, laboral y constitucional."
            },
            {
                nombre: "Psicología",
                descripcion: "Psicología general, educativa y del desarrollo."
            },

            {
                nombre: "Electrónica",
                descripcion: "Circuitos eléctricos, componentes y electrónica digital."
            },
            {
                nombre: "Mecánica",
                descripcion: "Mecánica clásica, resistencia de materiales y dinámica."
            },
            {
                nombre: "Dibujo Técnico",
                descripcion: "Planos, normas de representación y diseño asistido."
            }
        ],
        {
            ignoreDuplicates: true
        }
    );

    console.log("Categorias cargadas.");
}

module.exports = seedCategorias;