const Categoria = require('../models/categoria.model');

async function seedCategorias() {
    await Categoria.bulkCreate(
        [
            {
                nombre: "Matemática",
                nivel: "primario",
                descripcion: "Refuerzo de conceptos matemáticos para nivel primario."
            },
            {
                nombre: "Matemática",
                nivel: "secundario",
                descripcion: "Resolución de ejercicios y refuerzo de conceptos matemáticos para nivel secundario."
            },
            {
                nombre: "Álgebra",
                nivel: "secundario",
                descripcion: "Introducción al álgebra, ecuaciones y polinomios para nivel secundario."
            },
            {
                nombre: "Álgebra",
                nivel: "universitario",
                descripcion: "Matrices, vectores, sistemas de ecuaciones y espacios vectoriales para nivel universitario."
            },
            {
                nombre: "Análisis Matemático",
                nivel: "universitario",
                descripcion: "Límites, derivadas, integrales y aplicaciones del cálculo a nivel universitario."
            },
            {
                nombre: "Geometría",
                nivel: "secundario",
                descripcion: "Geometría plana y del espacio para nivel secundario."
            },
            {
                nombre: "Geometría",
                nivel: "universitario",
                descripcion: "Geometría analítica, diferencial y topología para nivel universitario."
            },
            {
                nombre: "Estadística",
                nivel: "secundario",
                descripcion: "Estadística descriptiva y conceptos básicos de probabilidad para nivel secundario."
            },
            {
                nombre: "Estadística",
                nivel: "universitario",
                descripcion: "Análisis e interpretación de datos, estadística descriptiva e inferencial para nivel universitario."
            },
            {
                nombre: "Probabilidad",
                nivel: "universitario",
                descripcion: "Eventos aleatorios, distribuciones y cálculo de probabilidades para nivel universitario."
            },

            {
                nombre: "Programación",
                nivel: "secundario",
                descripcion: "Introducción a la lógica de programación y primeros algoritmos para nivel secundario."
            },
            {
                nombre: "Programación",
                nivel: "universitario",
                descripcion: "Fundamentos de programación, lógica y resolución de problemas para nivel universitario."
            },
            {
                nombre: "Algoritmos",
                nivel: "universitario",
                descripcion: "Diseño, análisis y optimización de algoritmos para nivel universitario."
            },
            {
                nombre: "Estructuras de Datos",
                nivel: "universitario",
                descripcion: "Listas, pilas, colas, árboles, grafos y estructuras avanzadas para nivel universitario."
            },
            {
                nombre: "Bases de Datos",
                nivel: "universitario",
                descripcion: "Modelado de datos, SQL, normalización y consultas para nivel universitario."
            },
            {
                nombre: "Ingeniería de Software",
                nivel: "universitario",
                descripcion: "Análisis, diseño, patrones y metodologías de desarrollo para nivel universitario."
            },
            {
                nombre: "Desarrollo Web",
                nivel: "universitario",
                descripcion: "Creación de aplicaciones web con tecnologías frontend y backend para nivel universitario."
            },
            {
                nombre: "Desarrollo Móvil",
                nivel: "universitario",
                descripcion: "Desarrollo de aplicaciones para dispositivos móviles para nivel universitario."
            },
            {
                nombre: "Redes de Computadoras",
                nivel: "universitario",
                descripcion: "Protocolos, direccionamiento, configuración y seguridad de redes para nivel universitario."
            },
            {
                nombre: "Sistemas Operativos",
                nivel: "universitario",
                descripcion: "Procesos, memoria, archivos y administración del sistema para nivel universitario."
            },
            {
                nombre: "Arquitectura de Computadoras",
                nivel: "universitario",
                descripcion: "Componentes del computador, procesadores y organización interna para nivel universitario."
            },
            {
                nombre: "Inteligencia Artificial",
                nivel: "universitario",
                descripcion: "Machine Learning, redes neuronales e IA aplicada para nivel universitario."
            },
            {
                nombre: "Ciberseguridad",
                nivel: "universitario",
                descripcion: "Seguridad informática, criptografía y protección de sistemas para nivel universitario."
            },

            {
                nombre: "Física",
                nivel: "secundario",
                descripcion: "Conceptos fundamentales de mecánica, óptica y electricidad para nivel secundario."
            },
            {
                nombre: "Física",
                nivel: "universitario",
                descripcion: "Mecánica, electromagnetismo, termodinámica y física moderna para nivel universitario."
            },
            {
                nombre: "Química",
                nivel: "secundario",
                descripcion: "Química general, nomenclatura y reacciones básicas para nivel secundario."
            },
            {
                nombre: "Química",
                nivel: "universitario",
                descripcion: "Química general, orgánica, inorgánica y analítica para nivel universitario."
            },
            {
                nombre: "Biología",
                nivel: "secundario",
                descripcion: "Biología celular, reinos y ecología para nivel secundario."
            },
            {
                nombre: "Biología",
                nivel: "universitario",
                descripcion: "Biología celular, molecular, genética y fisiología para nivel universitario."
            },

            {
                nombre: "Contabilidad",
                nivel: "secundario",
                descripcion: "Introducción a la contabilidad, libros diarios y mayores para nivel secundario."
            },
            {
                nombre: "Contabilidad",
                nivel: "universitario",
                descripcion: "Registros contables, balances y estados financieros para nivel universitario."
            },
            {
                nombre: "Economía",
                nivel: "universitario",
                descripcion: "Microeconomía, macroeconomía y análisis económico para nivel universitario."
            },
            {
                nombre: "Administración",
                nivel: "universitario",
                descripcion: "Gestión empresarial, planificación y organización para nivel universitario."
            },
            {
                nombre: "Marketing",
                nivel: "universitario",
                descripcion: "Marketing digital, estrategias comerciales y posicionamiento para nivel universitario."
            },

            {
                nombre: "Inglés",
                nivel: "primario",
                descripcion: "Apoyo en gramática, conversación y comprensión del idioma para nivel primario."
            },
            {
                nombre: "Inglés",
                nivel: "secundario",
                descripcion: "Apoyo en gramática, conversación y comprensión del idioma para nivel secundario."
            },
            {
                nombre: "Portugués",
                nivel: "secundario",
                descripcion: "Clases para niveles iniciales, intermedios y avanzados de portugués."
            },
            {
                nombre: "Francés",
                nivel: "secundario",
                descripcion: "Aprendizaje del idioma y preparación para exámenes de francés."
            },

            {
                nombre: "Historia",
                nivel: "secundario",
                descripcion: "Historia universal, regional y contemporánea para nivel secundario."
            },
            {
                nombre: "Geografía",
                nivel: "secundario",
                descripcion: "Geografía física, humana y política para nivel secundario."
            },
            {
                nombre: "Filosofía",
                nivel: "secundario",
                descripcion: "Pensamiento filosófico, ética y lógica para nivel secundario."
            },

            {
                nombre: "Derecho",
                nivel: "universitario",
                descripcion: "Derecho civil, penal, laboral y constitucional para nivel universitario."
            },
            {
                nombre: "Psicología",
                nivel: "universitario",
                descripcion: "Psicología general, educativa y del desarrollo para nivel universitario."
            },

            {
                nombre: "Electrónica",
                nivel: "universitario",
                descripcion: "Circuitos eléctricos, componentes y electrónica digital para nivel universitario."
            },
            {
                nombre: "Mecánica",
                nivel: "universitario",
                descripcion: "Mecánica clásica, resistencia de materiales y dinámica para nivel universitario."
            },
            {
                nombre: "Dibujo Técnico",
                nivel: "secundario",
                descripcion: "Planos, normas de representación y diseño asistido para nivel secundario."
            },

            {
                nombre: "Investigación Avanzada",
                nivel: "doctorado",
                descripcion: "Metodologías de investigación, análisis de literatura y escritura académica para doctorado."
            },
            {
                nombre: "Seminario de Tesis",
                nivel: "doctorado",
                descripcion: "Asesoramiento y seguimiento en la elaboración de tesis doctorales en diversas áreas."
            },
            {
                nombre: "Tópicos Avanzados en Física",
                nivel: "doctorado",
                descripcion: "Estudio de temas de frontera en física teórica y experimental para nivel doctorado."
            },
            {
                nombre: "Inteligencia Artificial Avanzada",
                nivel: "doctorado",
                descripcion: "Investigación en redes neuronales profundas, reinforcement learning y temas de vanguardia para doctorado."
            },
            {
                nombre: "Derecho Comparado",
                nivel: "doctorado",
                descripcion: "Análisis comparativo de sistemas legales y jurisprudencia a nivel doctoral."
            }
        ],
        {
            ignoreDuplicates: true
        }
    );

    console.log("Categorias cargadas.");
}

module.exports = seedCategorias;