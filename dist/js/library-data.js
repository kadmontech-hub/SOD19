import { VISUALS } from './visual-assets.js';

// SØD Library curation switchboard.
// To make a book fully operational later, only fill pdfUrl / summaryUrl / audioUrl.
// pdfUrl may be a direct PDF URL. summaryUrl and audioUrl may be YouTube URLs.
export const libraryBooks = [
  {
    id:'book-01',
    priority:1,
    title:'Cómo ganar amigos e influir sobre las personas',
    author:'Dale Carnegie',
    category:'Liderazgo',
    shortDescription:'Un clásico sobre comunicación, empatía, influencia y relaciones humanas.',
    longDescription:'Publicado originalmente en 1936, Dale Carnegie reúne principios prácticos para relacionarse mejor con otras personas, escuchar con atención, evitar confrontaciones inútiles y ejercer influencia sin recurrir a la imposición. Sigue siendo una referencia central en comunicación interpersonal y liderazgo.',
    year:'1936',language:'Español',
    tags:['Relaciones','Comunicación','Influencia'],
    cover:VISUALS.libraryBook01,
    pdfFileName:'Como Ganar Amigos e Influir Sobre Las Personas.PDF',
    pdfUrl:'',summaryUrl:'',audioUrl:'',
    recommended:true,featured:true
  },
  {
    id:'book-02',priority:7,title:'Burlar al diablo',author:'Napoleon Hill',category:'Mentalidad',
    shortDescription:'Una conversación alegórica sobre miedo, indecisión, hábitos y control de la propia mente.',
    longDescription:'Escrito por Napoleon Hill en 1938 y publicado de manera póstuma décadas después, el libro presenta una entrevista ficticia con “el Diablo” para explorar por qué las personas quedan atrapadas en el miedo, la procrastinación y la falta de propósito definido. Su idea central es recuperar dominio sobre el pensamiento y la dirección personal.',
    year:'2011 · publicación póstuma',language:'Español',tags:['Miedo','Propósito','Disciplina mental'],cover:VISUALS.libraryBook03,
    pdfFileName:'feismo.com-burlar-al-diablo-secretos-desde-la-cripta-napoleon-hill-pr_318d8a3c4cdf2159610cf42eb72f64e4.pdf',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:true,featured:false
  },
  {
    id:'book-03',priority:5,title:'El monje que vendió su Ferrari',author:'Robin Sharma',category:'Propósito',
    shortDescription:'Una fábula sobre propósito, disciplina interior, equilibrio y transformación personal.',
    longDescription:'Robin Sharma narra la historia de Julian Mantle, un abogado exitoso cuya crisis de salud lo lleva a replantear por completo su manera de vivir. A través de una fábula accesible, el libro desarrolla ideas sobre propósito, autodisciplina, dominio de la mente, tiempo y servicio.',
    year:'1997',language:'Español',tags:['Propósito','Disciplina','Transformación'],cover:VISUALS.libraryBook04,
    pdfFileName:'EL-MONJE-QUE-VENDIO-SU-FERRARI-AUTOR-ROBIN-SHARMA.pdf',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:true,featured:true
  },
  {
    id:'book-04',priority:2,title:'Piense y hágase rico',author:'Napoleon Hill',category:'Riqueza',
    shortDescription:'Un clásico sobre propósito definido, deseo, decisión, persistencia y logro.',
    longDescription:'Publicado en 1937, Piense y hágase rico sintetiza principios que Napoleon Hill asoció con personas de gran éxito. Aunque suele leerse como un libro financiero, su núcleo es más amplio: claridad de propósito, autosugestión, planificación, decisión y persistencia como herramientas para transformar intención en resultado.',
    year:'1937',language:'Español',tags:['Riqueza','Propósito','Persistencia'],cover:VISUALS.libraryBook05,
    pdfFileName:'Adelanto-Piense-y-hagase-rico.pdf',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:true,featured:true
  },
  {
    id:'book-05',priority:3,title:'Los secretos de la mente millonaria',author:'T. Harv Eker',category:'Riqueza',
    shortDescription:'Creencias, hábitos financieros y patrones mentales asociados a la relación con el dinero.',
    longDescription:'T. Harv Eker propone que cada persona desarrolla un “patrón financiero” a partir de experiencias, mensajes familiares y creencias aprendidas. El libro busca hacer visibles esas asociaciones para poder reemplazar hábitos y marcos mentales que dificultan una relación más deliberada con el dinero.',
    year:'2005',language:'Español',tags:['Dinero','Creencias','Mentalidad'],cover:VISUALS.libraryBook06,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:true,featured:true
  },
  {
    id:'book-06',priority:10,title:'Poder sin límites',author:'Tony Robbins',category:'Desarrollo personal',
    shortDescription:'Un libro sobre estados internos, creencias, comunicación y rendimiento personal.',
    longDescription:'Publicado en 1986, Tony Robbins combina ideas de programación neurolingüística, fisiología, lenguaje y modelado de conductas para explicar cómo las personas pueden modificar estados internos y estrategias de acción. Es uno de los títulos tempranos más influyentes de su trabajo.',
    year:'1986',language:'Español',tags:['PNL','Estados internos','Rendimiento'],cover:VISUALS.libraryBook08,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false
  },
  {
    id:'book-07',priority:11,title:'El secreto',author:'Rhonda Byrne',category:'Espiritualidad',
    shortDescription:'Una introducción popular a la ley de atracción, enfoque mental y visualización.',
    longDescription:'Publicado en 2006, El secreto popularizó la idea de la ley de atracción mediante testimonios y enseñanzas sobre pensamiento, gratitud y visualización. Dentro de SØD conviene leerlo como una obra cultural influyente sobre mentalidad, no como una explicación científica de causalidad.',
    year:'2006',language:'Español',tags:['Visualización','Gratitud','Ley de atracción'],cover:VISUALS.libraryBook07,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false
  },
  {
    id:'book-08',priority:8,title:'El club de las 5 de la mañana',author:'Robin Sharma',category:'Hábitos',
    shortDescription:'Una fábula práctica sobre rutina matinal, foco, aprendizaje y disciplina.',
    longDescription:'Robin Sharma presenta una narrativa alrededor de una rutina de mañana destinada a proteger atención, energía y tiempo de crecimiento personal. El libro combina ficción con métodos de productividad y propone comenzar el día con bloques deliberados de movimiento, reflexión y aprendizaje.',
    year:'2018',language:'Español',tags:['Hábitos','Mañanas','Foco'],cover:VISUALS.libraryBook09,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:true,featured:false
  },
  {
    id:'book-09',priority:14,title:'Si lo crees, lo creas',author:'Brian Tracy',category:'Mentalidad',
    shortDescription:'Una guía para revisar pensamientos limitantes y construir una mentalidad orientada a la acción.',
    longDescription:'Brian Tracy desarrolla ideas sobre autoconcepto, objetivos, responsabilidad y creencias que condicionan el comportamiento. El libro propone identificar patrones mentales limitantes y sustituirlos por decisiones y hábitos compatibles con los resultados que se quieren construir.',
    year:'2017',language:'Español',tags:['Creencias','Objetivos','Acción'],cover:VISUALS.libraryBook10,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false
  },
  {
    id:'book-10',priority:6,title:'Deja de ser tú',author:'Joe Dispenza',category:'Conciencia',
    shortDescription:'Una propuesta sobre hábitos mentales, emoción, meditación y cambio personal.',
    longDescription:'Joe Dispenza explora cómo pensamientos, emociones y conductas repetidas contribuyen a mantener una identidad conocida. El libro combina divulgación, ejercicios de meditación y una narrativa de cambio personal orientada a interrumpir patrones automáticos.',
    year:'2012',language:'Español',tags:['Meditación','Identidad','Cambio'],cover:VISUALS.libraryBook11,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:true,featured:true
  },
  {
    id:'book-11',priority:12,title:'El Kybalión',author:'Tres Iniciados',category:'Filosofía',
    shortDescription:'Una exposición de siete principios atribuidos a la tradición hermética.',
    longDescription:'Publicado a comienzos del siglo XX, El Kybalión presenta siete principios herméticos: mentalismo, correspondencia, vibración, polaridad, ritmo, causa y efecto, y género. Es una obra esotérico-filosófica influyente y debe leerse dentro de ese marco histórico y simbólico.',
    year:'1908',language:'Español',tags:['Hermetismo','Principios','Simbolismo'],cover:VISUALS.libraryBook12,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false
  },
  {
    id:'book-12',priority:13,title:'La magia de pensar en grande',author:'David J. Schwartz',category:'Desarrollo personal',
    shortDescription:'Una obra clásica sobre confianza, ambición, acción y expansión de expectativas.',
    longDescription:'David J. Schwartz argumenta que la manera de pensar condiciona el tipo de objetivos que una persona se permite perseguir. El libro trabaja confianza, iniciativa, liderazgo y hábitos de pensamiento orientados a ampliar posibilidades de acción.',
    year:'1959',language:'Español',tags:['Confianza','Ambición','Acción'],cover:VISUALS.libraryBook15,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false
  },
  {
    id:'book-13',priority:15,title:'Las siete leyes espirituales del éxito',author:'Deepak Chopra',category:'Espiritualidad',
    shortDescription:'Siete principios breves sobre propósito, intención, desapego y abundancia.',
    longDescription:'Deepak Chopra articula siete ideas espirituales para pensar el éxito más allá del rendimiento: potencialidad pura, dar, karma, mínimo esfuerzo, intención y deseo, desapego y propósito de vida. Es un texto breve y accesible dentro de su marco filosófico-espiritual.',
    year:'1994',language:'Español',tags:['Propósito','Desapego','Intención'],cover:VISUALS.libraryBook16,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false
  },
  {
    id:'book-14',priority:16,title:'Metafísica 4 en 1',author:'Conny Méndez',category:'Metafísica',
    shortDescription:'Una recopilación popular de enseñanzas metafísicas, decretos y trabajo con creencias.',
    longDescription:'Metafísica 4 en 1 reúne textos de Conny Méndez que difundieron en América Latina una visión práctica de metafísica, pensamiento positivo, decretos y transformación de creencias. Es una obra relevante para comprender esa tradición espiritual popular.',
    year:'Varias ediciones',language:'Español',tags:['Metafísica','Creencias','Decretos'],cover:VISUALS.libraryBook17,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false
  },
  {
    id:'book-15',priority:9,title:'Los cuatro acuerdos',author:'Don Miguel Ruiz',category:'Sabiduría',
    shortDescription:'Cuatro compromisos personales inspirados en una interpretación moderna de sabiduría tolteca.',
    longDescription:'Don Miguel Ruiz propone cuatro acuerdos: ser impecable con la palabra, no tomarse nada personalmente, no hacer suposiciones y hacer siempre lo máximo posible. El libro utiliza una narrativa espiritual para revisar lenguaje, interpretación y relaciones.',
    year:'1997',language:'Español',tags:['Lenguaje','Relaciones','Acuerdos'],cover:VISUALS.libraryBook18,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:true,featured:false
  },
  {
    id:'book-16',priority:4,title:'El poder del ahora',author:'Eckhart Tolle',category:'Conciencia',
    shortDescription:'Una obra central sobre presencia, identificación con el pensamiento y experiencia del presente.',
    longDescription:'Eckhart Tolle explora la tendencia de la mente a vivir atrapada en pasado y futuro, y propone volver deliberadamente al momento presente. El libro desarrolla nociones de ego, observación del pensamiento, aceptación y presencia consciente.',
    year:'1997',language:'Español',tags:['Presencia','Ego','Silencio'],cover:VISUALS.libraryBook02,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:true,featured:true
  },
  {
    id:'book-17',priority:17,title:'Padre rico, padre pobre',author:'Robert T. Kiyosaki',category:'Riqueza',
    shortDescription:'Una introducción popular a activos, pasivos, educación financiera y flujo de dinero.',
    longDescription:'Robert Kiyosaki contrasta dos maneras de entender trabajo y dinero para introducir conceptos como activos, pasivos, flujo de caja y educación financiera. El libro busca cambiar la pregunta de “cómo ganar más” a “cómo construir activos que trabajen por vos”.',
    year:'1997',language:'Español',tags:['Finanzas','Activos','Educación'],cover:VISUALS.libraryBook13,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false
  },
  {
    id:'book-18',priority:18,title:'Las 48 leyes del poder',author:'Robert Greene',category:'Estrategia',
    shortDescription:'Una lectura histórica y estratégica sobre poder, reputación, influencia y conflicto.',
    longDescription:'Robert Greene organiza episodios históricos y observaciones sobre conducta en 48 leyes relacionadas con poder e influencia. El libro es deliberadamente amoral en su enfoque y funciona mejor como mapa para reconocer dinámicas de poder que como manual normativo de conducta.',
    year:'1998',language:'Español',tags:['Poder','Estrategia','Influencia'],cover:VISUALS.libraryBook14,
    pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false
  }
  ,{id:'book-19',priority:19,title:'La ley del éxito',author:'Napoleon Hill',category:'Mentalidad',shortDescription:'Un recorrido extenso por principios de propósito, cooperación, disciplina y logro.',longDescription:'Placeholder editorial de Biblioteca SØD para ampliar la obra disponible de Napoleon Hill. La ficha queda lista para portada, PDF, resumen y audio curados.',year:'1928',language:'Español',tags:['Mentalidad','Propósito','Éxito'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-20',priority:20,title:'Actitud mental positiva: un camino hacia el éxito',author:'Napoleon Hill',category:'Mentalidad',shortDescription:'Actitud, acción y dirección personal aplicadas a objetivos concretos.',longDescription:'Placeholder editorial para una obra asociada a Napoleon Hill y W. Clement Stone. Se integrará con su edición, portada y medios definitivos cuando estén curados.',year:'1960',language:'Español',tags:['Mentalidad','Actitud','Acción'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-21',priority:21,title:'La llave maestra de la riqueza',author:'Napoleon Hill',category:'Riqueza',shortDescription:'Ideas sobre propósito, disciplina y construcción de riqueza.',longDescription:'Placeholder editorial para ampliar la colección de Napoleon Hill. La Biblioteca ya puede mostrarlo y filtrarlo mientras esperamos portada y enlaces finales.',year:'1945',language:'Español',tags:['Riqueza','Disciplina','Propósito'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-22',priority:22,title:'Crezca y hágase rico con paz mental',author:'Napoleon Hill',category:'Riqueza',shortDescription:'Riqueza entendida junto con equilibrio, propósito y serenidad.',longDescription:'Placeholder editorial listo para recibir la edición seleccionada por la curaduría SØD.',year:'1967',language:'Español',tags:['Riqueza','Paz mental','Propósito'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-23',priority:23,title:'El líder que no tenía cargo',author:'Robin Sharma',category:'Liderazgo',shortDescription:'Liderazgo personal sin depender de una posición formal.',longDescription:'Placeholder editorial para la obra de Robin Sharma sobre liderazgo desde la responsabilidad individual y la influencia cotidiana.',year:'2010',language:'Español',tags:['Liderazgo','Responsabilidad','Influencia'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-24',priority:24,title:'¿Quién llorará cuando mueras?',author:'Robin Sharma',category:'Propósito',shortDescription:'Reflexiones breves sobre sentido, prioridades y forma de vivir.',longDescription:'Placeholder editorial de Robin Sharma preparado para su futura portada y medios curados.',year:'1999',language:'Español',tags:['Propósito','Vida','Prioridades'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-25',priority:25,title:'Las 8 claves del liderazgo del monje que vendió su Ferrari',author:'Robin Sharma',category:'Liderazgo',shortDescription:'Principios de liderazgo, cultura y crecimiento humano.',longDescription:'Placeholder editorial para ampliar el recorrido de liderazgo dentro de SØD Library.',year:'1998',language:'Español',tags:['Liderazgo','Cultura','Desarrollo personal'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-26',priority:26,title:'La riqueza que el dinero no puede comprar',author:'Robin Sharma',category:'Propósito',shortDescription:'Una mirada sobre riqueza vital más allá del dinero.',longDescription:'Placeholder editorial listo para curar una obra contemporánea de Robin Sharma alrededor de propósito, familia, salud y legado.',year:'2024',language:'Español',tags:['Propósito','Riqueza vital','Legado'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-27',priority:27,title:'Una nueva tierra',author:'Eckhart Tolle',category:'Conciencia',shortDescription:'Ego, conciencia y transformación de la manera de habitar la experiencia.',longDescription:'Placeholder editorial para una de las obras centrales de Eckhart Tolle, preparada para recibir portada y medios definitivos.',year:'2005',language:'Español',tags:['Conciencia','Ego','Presencia'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-28',priority:28,title:'El silencio habla',author:'Eckhart Tolle',category:'Conciencia',shortDescription:'Textos breves sobre quietud, presencia y espacio interior.',longDescription:'Placeholder editorial de Eckhart Tolle dentro del eje conciencia y espiritualidad.',year:'2003',language:'Español',tags:['Silencio','Presencia','Conciencia'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-29',priority:29,title:'Practicando el poder del ahora',author:'Eckhart Tolle',category:'Conciencia',shortDescription:'Ejercicios y pasajes orientados a llevar la presencia a la práctica.',longDescription:'Placeholder editorial complementario de El poder del ahora.',year:'2001',language:'Español',tags:['Presencia','Práctica','Conciencia'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-30',priority:30,title:'Tú eres el placebo',author:'Joe Dispenza',category:'Conciencia',shortDescription:'Creencias, expectativa y cambio personal desde la propuesta de Joe Dispenza.',longDescription:'Placeholder editorial listo para recibir la edición, portada y media curados.',year:'2014',language:'Español',tags:['Creencias','Cambio','Conciencia'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-31',priority:31,title:'Sobrenatural',author:'Joe Dispenza',category:'Conciencia',shortDescription:'Meditación, transformación personal y exploración de estados extraordinarios.',longDescription:'Placeholder editorial para ampliar el catálogo de Joe Dispenza sin presentar todavía una edición específica.',year:'2017',language:'Español',tags:['Meditación','Conciencia','Transformación'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-32',priority:32,title:'Desarrolla tu cerebro',author:'Joe Dispenza',category:'Mentalidad',shortDescription:'Una introducción a aprendizaje, cerebro y cambio de patrones.',longDescription:'Placeholder editorial para la obra temprana de Joe Dispenza.',year:'2007',language:'Español',tags:['Cerebro','Aprendizaje','Mentalidad'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-33',priority:33,title:'Cómo suprimir las preocupaciones y disfrutar de la vida',author:'Dale Carnegie',category:'Mentalidad',shortDescription:'Herramientas clásicas para reducir preocupación y recuperar perspectiva.',longDescription:'Placeholder editorial de Dale Carnegie preparado para contenido y edición definitiva.',year:'1948',language:'Español',tags:['Preocupación','Perspectiva','Vida'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-34',priority:34,title:'El camino fácil y rápido para hablar eficazmente',author:'Dale Carnegie',category:'Liderazgo',shortDescription:'Comunicación oral, confianza y presencia frente a otros.',longDescription:'Placeholder editorial de Dale Carnegie para el eje comunicación y liderazgo.',year:'1962',language:'Español',tags:['Comunicación','Oratoria','Liderazgo'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-35',priority:35,title:'El arte de hablar en público',author:'Dale Carnegie',category:'Liderazgo',shortDescription:'Principios de expresión, persuasión y comunicación pública.',longDescription:'Placeholder editorial listo para recibir una edición curada dentro de SØD Library.',year:'1915',language:'Español',tags:['Oratoria','Comunicación','Influencia'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-36',priority:36,title:'Inteligencia emocional',author:'Daniel Goleman',category:'Mentalidad',shortDescription:'Una obra fundamental sobre emoción, autocontrol, empatía y desempeño humano.',longDescription:'Placeholder editorial para incorporar a Daniel Goleman al catálogo visible y permitir búsquedas por autor desde ahora.',year:'1995',language:'Español',tags:['Emoción','Empatía','Autoconocimiento'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-37',priority:37,title:'Inteligencia social',author:'Daniel Goleman',category:'Liderazgo',shortDescription:'Relaciones, empatía y mecanismos sociales de la conducta.',longDescription:'Placeholder editorial de Daniel Goleman para el eje vínculos y liderazgo.',year:'2006',language:'Español',tags:['Relaciones','Empatía','Liderazgo'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-38',priority:38,title:'Focus',author:'Daniel Goleman',category:'Hábitos',shortDescription:'Atención, concentración y dirección deliberada de la energía mental.',longDescription:'Placeholder editorial sobre atención y desempeño, listo para media futura.',year:'2013',language:'Español',tags:['Atención','Foco','Hábitos'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-39',priority:39,title:'La práctica de la inteligencia emocional',author:'Daniel Goleman',category:'Liderazgo',shortDescription:'Competencias emocionales aplicadas al trabajo, relaciones y liderazgo.',longDescription:'Placeholder editorial para ampliar la colección Daniel Goleman.',year:'1998',language:'Español',tags:['Trabajo','Emoción','Liderazgo'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-40',priority:40,title:'Liderazgo: el poder de la inteligencia emocional',author:'Daniel Goleman',category:'Liderazgo',shortDescription:'Selección de ideas sobre liderazgo y capacidades emocionales.',longDescription:'Placeholder editorial listo para futura curaduría de edición, portada y enlaces.',year:'2011',language:'Español',tags:['Liderazgo','Inteligencia emocional','Influencia'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-41',priority:41,title:'Despertando al gigante interior',author:'Tony Robbins',category:'Desarrollo personal',shortDescription:'Decisiones, estándares, creencias y cambio sostenido.',longDescription:'Placeholder editorial para una de las obras más conocidas de Tony Robbins.',year:'1991',language:'Español',tags:['Decisiones','Cambio','Desarrollo personal'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-42',priority:42,title:'Dinero: domina el juego',author:'Tony Robbins',category:'Riqueza',shortDescription:'Principios de planificación financiera y construcción patrimonial.',longDescription:'Placeholder editorial del eje abundancia y finanzas dentro de la Biblioteca.',year:'2014',language:'Español',tags:['Dinero','Finanzas','Riqueza'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-43',priority:43,title:'Inquebrantable',author:'Tony Robbins',category:'Riqueza',shortDescription:'Disciplina financiera, riesgo y construcción de estabilidad.',longDescription:'Placeholder editorial preparado para curaduría posterior.',year:'2017',language:'Español',tags:['Finanzas','Resiliencia','Riqueza'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-44',priority:44,title:'Pasos de gigante',author:'Tony Robbins',category:'Hábitos',shortDescription:'Pequeñas prácticas y decisiones para sostener cambio diario.',longDescription:'Placeholder editorial del eje hábitos y desarrollo personal.',year:'1994',language:'Español',tags:['Hábitos','Acción','Cambio'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-45',priority:45,title:'Cuerpos sin edad, mentes sin tiempo',author:'Deepak Chopra',category:'Espiritualidad',shortDescription:'Una exploración sobre mente, cuerpo, percepción del tiempo y bienestar.',longDescription:'Placeholder editorial de Deepak Chopra dentro del eje espiritualidad y conciencia.',year:'1993',language:'Español',tags:['Cuerpo','Mente','Espiritualidad'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-46',priority:46,title:'Curación cuántica',author:'Deepak Chopra',category:'Espiritualidad',shortDescription:'Una obra popular sobre mente, cuerpo y modelos integrativos de salud.',longDescription:'Placeholder editorial. SØD la presentará como obra de divulgación espiritual, no como sustituto de evidencia o atención médica profesional.',year:'1989',language:'Español',tags:['Mente-cuerpo','Espiritualidad','Bienestar'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-47',priority:47,title:'El libro de los secretos',author:'Deepak Chopra',category:'Espiritualidad',shortDescription:'Reflexiones sobre identidad, conciencia y sentido de la experiencia.',longDescription:'Placeholder editorial preparado para su futura curaduría multimedia.',year:'2004',language:'Español',tags:['Conciencia','Identidad','Espiritualidad'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-48',priority:48,title:'La maestría del amor',author:'Don Miguel Ruiz',category:'Sabiduría',shortDescription:'Relaciones, amor propio y creencias aprendidas alrededor del vínculo.',longDescription:'Placeholder editorial para ampliar el recorrido de Don Miguel Ruiz.',year:'1999',language:'Español',tags:['Relaciones','Amor','Sabiduría'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-49',priority:49,title:'La voz del conocimiento',author:'Don Miguel Ruiz',category:'Sabiduría',shortDescription:'Una reflexión sobre narrativas internas, creencias y verdad personal.',longDescription:'Placeholder editorial dentro del eje sabiduría y autoconocimiento.',year:'2004',language:'Español',tags:['Creencias','Narrativa','Sabiduría'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false},
  {id:'book-50',priority:50,title:'El quinto acuerdo',author:'Don Miguel Ruiz',category:'Sabiduría',shortDescription:'Una ampliación del sistema de acuerdos personales y escucha crítica.',longDescription:'Placeholder editorial listo para recibir su edición y enlaces finales.',year:'2010',language:'Español',tags:['Acuerdos','Escucha','Sabiduría'],cover:'',placeholder:true,pdfFileName:'',pdfUrl:'',summaryUrl:'',audioUrl:'',recommended:false,featured:false}
];

// Videoteca SØD — curated from the channels selected by the project.
// Video URLs are real. Channel cards link to the original creator/channel.
export const libraryVideos = [
  {id:'video-01',section:'Selección SØD',category:'Conciencia',title:'How Can the Mind Be Quiet?',creator:'Sadhguru',description:'Identificación, mente y quietud desde una perspectiva contemplativa práctica.',duration:'5:52',youtubeUrl:'https://www.youtube.com/watch?v=e2EPuGabgpc',channelUrl:'https://www.youtube.com/@sadhguru',recommended:true},
  {id:'video-02',section:'Selección SØD',category:'Estoicismo',title:'Marcus Aurelius on Stoicism',creator:'Daily Stoic · Ryan Holiday',description:'Una entrada breve al estoicismo de Marco Aurelio y su aplicación cotidiana.',duration:'Video',youtubeUrl:'https://www.youtube.com/watch?v=VWSZMISESpE',channelUrl:'https://www.youtube.com/@DailyStoic',recommended:true},
  {id:'video-03',section:'Selección SØD',category:'Desarrollo personal',title:'This One Study Will Change How You Think About Your Entire Life',creator:'Mel Robbins',description:'Una conversación sobre decisiones, relaciones y cómo usamos el tiempo de nuestra vida.',duration:'47:56',youtubeUrl:'https://www.youtube.com/watch?v=ih3nIPvCjVI',channelUrl:'https://www.youtube.com/@melrobbins',recommended:true},
  {id:'video-04',section:'Selección SØD',category:'Neurociencia',title:'How to Focus to Change Your Brain',creator:'Huberman Lab',description:'Foco, neuroplasticidad, atención, aprendizaje y recuperación.',duration:'32:52',youtubeUrl:'https://www.youtube.com/watch?v=4AwyVTHEU3s',channelUrl:'https://www.youtube.com/@hubermanlab',recommended:true},
  {id:'video-05',section:'Selección SØD',category:'Filosofía',title:'The Meaning of Life',creator:'The School of Life',description:'Una síntesis accesible sobre sentido, comunicación, comprensión y servicio.',duration:'Video',youtubeUrl:'https://www.youtube.com/watch?v=Ebt0X5ybm9Y',channelUrl:'https://www.youtube.com/@theschooloflifetv',recommended:true},
  {id:'video-06',section:'Selección SØD',category:'Negocios',title:'Get RICH in the A.I. Revolution',creator:'Alex Hormozi',description:'Una mirada de negocio sobre oportunidades económicas alrededor de la revolución de IA.',duration:'17:38',youtubeUrl:'https://www.youtube.com/watch?v=KYqEK_T_5M4',channelUrl:'https://www.youtube.com/@AlexHormozi',recommended:true},

  {id:'video-07',section:'Conciencia y despertar',category:'Conciencia',title:'Your Consciousness is Not in Your Head',creator:'Bernardo Kastrup',description:'Una introducción clara al idealismo analítico y a la naturaleza de la conciencia.',duration:'11:05',youtubeUrl:'https://www.youtube.com/watch?v=XoJWqCH4Xrw',channelUrl:'https://www.youtube.com/@bernardokastrup',recommended:false},
  {id:'video-08',section:'Conciencia y despertar',category:'No dualidad',title:'How Do I Practice Self Enquiry?',creator:'Rupert Spira',description:'Autoinvestigación y conciencia desde la tradición no-dual contemporánea.',duration:'13:52',youtubeUrl:'https://www.youtube.com/results?search_query=Rupert+Spira+How+Do+I+Practice+Self+Enquiry',channelUrl:'https://www.youtube.com/@rupertspira',recommended:false},
  {id:'video-09',section:'Conciencia y despertar',category:'Espiritualidad',title:'El poder de la presencia',creator:'Eckhart Tolle',description:'Presencia, ego y conciencia como ejes de observación interior.',duration:'Canal',youtubeUrl:'https://www.youtube.com/@EckhartTolle',channelUrl:'https://www.youtube.com/@EckhartTolle',recommended:false},
  {id:'video-10',section:'Conciencia y despertar',category:'Metafísica',title:'Corpus Hermeticum · introducción',creator:'ESOTERICA',description:'Hermes Trismegisto y filosofía hermética desde una mirada académica.',duration:'Canal',youtubeUrl:'https://www.youtube.com/@TheEsotericaChannel',channelUrl:'https://www.youtube.com/@TheEsotericaChannel',recommended:false},

  {id:'video-11',section:'Estoicismo y filosofía',category:'Estoicismo',title:'The Daily Routine That Built Marcus Aurelius',creator:'Daily Stoic · Ryan Holiday',description:'Rutina, disciplina, reflexión y práctica estoica alrededor de Marco Aurelio.',duration:'Video',youtubeUrl:'https://www.youtube.com/watch?v=6K3wiD6ACWg',channelUrl:'https://www.youtube.com/@DailyStoic',recommended:false},
  {id:'video-12',section:'Estoicismo y filosofía',category:'Estoicismo',title:'The philosophy of Stoicism',creator:'TED-Ed · Massimo Pigliucci',description:'Introducción breve y rigurosa a las ideas centrales del estoicismo.',duration:'5:30',youtubeUrl:'https://www.youtube.com/watch?v=R9OCA6UFE-0',channelUrl:'https://www.youtube.com/@TEDEd',recommended:false},
  {id:'video-13',section:'Estoicismo y filosofía',category:'Psicología profunda',title:'The Psychology of Fairy Tales',creator:'Eternalised',description:'Arquetipos, símbolo e inconsciente colectivo a través de los cuentos de hadas.',duration:'48:00',youtubeUrl:'https://www.youtube.com/watch?v=qkbgXtG33J4',channelUrl:'https://www.youtube.com/@Eternalised',recommended:false},
  {id:'video-14',section:'Estoicismo y filosofía',category:'Filosofía',title:'Academy of Ideas · Jung, libertad y sombra',creator:'Academy of Ideas',description:'Psicología, libertad individual, Nietzsche y Jung en formato audiovisual.',duration:'Canal',youtubeUrl:'https://www.youtube.com/@academyofideas',channelUrl:'https://www.youtube.com/@academyofideas',recommended:false},

  {id:'video-15',section:'Psicología y desarrollo',category:'Psicología',title:'Why Motivation is the Worst',creator:'HealthyGamerGG · Dr. K',description:'Una crítica breve a depender de la motivación para iniciar o sostener conducta.',duration:'Short',youtubeUrl:'https://www.youtube.com/watch?v=wGxure2qGt4',channelUrl:'https://www.youtube.com/@HealthyGamerGG',recommended:false},
  {id:'video-16',section:'Psicología y desarrollo',category:'Liderazgo',title:'Change Your Life – Become A Leader',creator:'Tony Robbins',description:'Estándares personales, liderazgo y transformación de intención en compromiso.',duration:'Video',youtubeUrl:'https://www.youtube.com/watch?v=dfSIxVucfSQ',channelUrl:'https://www.youtube.com/@TonyRobbinsLive',recommended:false},
  {id:'video-17',section:'Psicología y desarrollo',category:'Decisiones',title:'Watch This Before You Make Another Decision',creator:'GaryVee',description:'Una pieza directa sobre miedo, elección y movimiento frente a decisiones difíciles.',duration:'5:50',youtubeUrl:'https://www.youtube.com/watch?v=v8cBTK45Uqw',channelUrl:'https://www.youtube.com/@garyvee',recommended:false},
  {id:'video-18',section:'Psicología y desarrollo',category:'Atención',title:'How to Focus to Change Your Brain · Essentials',creator:'Huberman Lab',description:'Protocolos de atención y neuroplasticidad para aprender mejor.',duration:'32:52',youtubeUrl:'https://www.youtube.com/watch?v=4AwyVTHEU3s',channelUrl:'https://www.youtube.com/@hubermanlab',recommended:false},

  {id:'video-19',section:'Negocios y ventas',category:'Negociación',title:'Chris Voss Teaches the Art of Negotiation',creator:'Chris Voss',description:'Empatía táctica, espejado, etiquetado y negociación basada en comportamiento humano.',duration:'Trailer',youtubeUrl:'https://www.youtube.com/watch?v=q8rX4GUZSsU',channelUrl:'https://www.youtube.com/results?search_query=Chris+Voss+negotiation',recommended:false},
  {id:'video-20',section:'Negocios y ventas',category:'Marketing',title:'98% of Aspiring Entrepreneurs Don’t Understand This Opportunity',creator:'GaryVee',description:'Atención, distribución y oportunidad emprendedora en el ecosistema digital.',duration:'6:13',youtubeUrl:'https://www.youtube.com/watch?v=3scQFuu9nu4',channelUrl:'https://www.youtube.com/@garyvee',recommended:false},
  {id:'video-21',section:'Negocios y ventas',category:'Negocios',title:'Get RICH in the A.I. Revolution',creator:'Alex Hormozi',description:'Modelos de oportunidad y captura de valor durante cambios tecnológicos.',duration:'17:38',youtubeUrl:'https://www.youtube.com/watch?v=KYqEK_T_5M4',channelUrl:'https://www.youtube.com/@AlexHormozi',recommended:false},
  {id:'video-22',section:'Negocios y ventas',category:'Ventas',title:'Grant Cardone · ventas, repetición y 10X',creator:'Grant Cardone',description:'Prospección, volumen, repetición y mentalidad comercial.',duration:'Canal',youtubeUrl:'https://www.youtube.com/@GrantCardone',channelUrl:'https://www.youtube.com/@GrantCardone',recommended:false}
];

export const libraryVideoChannels = [
  {id:'channel-01',name:'Eckhart Tolle',area:'Despertar / conciencia',url:'https://www.youtube.com/@EckhartTolle',description:'Presencia, ego, conciencia y espiritualidad práctica.'},
  {id:'channel-02',name:'Rupert Spira',area:'Despertar / no dualidad',url:'https://www.youtube.com/@rupertspira',description:'Conciencia, autoinvestigación y no-dualidad.'},
  {id:'channel-03',name:'Bernardo Kastrup',area:'Conciencia / metafísica',url:'https://www.youtube.com/@bernardokastrup',description:'Idealismo metafísico y filosofía de la mente.'},
  {id:'channel-04',name:'Sadhguru',area:'Espiritualidad',url:'https://www.youtube.com/@sadhguru',description:'Meditación, conciencia y filosofía oriental.'},
  {id:'channel-05',name:'Alan Watts',area:'Filosofía oriental',url:'https://www.youtube.com/results?search_query=Alan+Watts+official',description:'Archivos y charlas sobre taoísmo, zen y experiencia humana.'},
  {id:'channel-06',name:'ESOTERICA',area:'Esoterismo académico',url:'https://www.youtube.com/@TheEsotericaChannel',description:'Hermetismo, gnosticismo, alquimia y ocultismo desde la historia académica.'},
  {id:'channel-07',name:'Next Level Soul',area:'Conciencia / entrevistas',url:'https://www.youtube.com/@NextLevelSoul',description:'Entrevistas sobre conciencia, espiritualidad y experiencias humanas.'},
  {id:'channel-08',name:'Daily Stoic',area:'Estoicismo',url:'https://www.youtube.com/@DailyStoic',description:'Ryan Holiday y estoicismo aplicado a la vida cotidiana.'},
  {id:'channel-09',name:'Einzelgänger',area:'Estoicismo / filosofía',url:'https://www.youtube.com/@Einzelganger',description:'Estoicismo, taoísmo, budismo, Jung y Nietzsche.'},
  {id:'channel-10',name:'Donald Robertson',area:'Estoicismo académico',url:'https://www.youtube.com/@DonaldRobertsonStoicism',description:'Psicoterapia y estoicismo con mayor rigor histórico.'},
  {id:'channel-11',name:'Gregory B. Sadler',area:'Filosofía académica',url:'https://www.youtube.com/@GregoryBSadler',description:'Clases extensas sobre filosofía clásica y estoicismo.'},
  {id:'channel-12',name:'Modern Stoicism',area:'Estoicismo académico',url:'https://www.youtube.com/@ModernStoicism',description:'Conferencias y especialistas del movimiento estoico contemporáneo.'},
  {id:'channel-13',name:'The School of Life',area:'Filosofía / psicología',url:'https://www.youtube.com/@theschooloflifetv',description:'Filosofía, identidad, relaciones y propósito para público general.'},
  {id:'channel-14',name:'Academy of Ideas',area:'Filosofía / psicología',url:'https://www.youtube.com/@academyofideas',description:'Nietzsche, Jung, masas, libertad y desarrollo individual.'},
  {id:'channel-15',name:'Pursuit of Wonder',area:'Filosofía',url:'https://www.youtube.com/@PursuitofWonder',description:'Existencialismo, sentido, conciencia y paradojas filosóficas.'},
  {id:'channel-16',name:'Wireless Philosophy',area:'Filosofía académica',url:'https://www.youtube.com/@WirelessPhilosophy',description:'Filosofía académica explicada de forma accesible.'},
  {id:'channel-17',name:'TED-Ed',area:'Filosofía / educación',url:'https://www.youtube.com/@TEDEd',description:'Dilemas, pensamiento crítico, psicología y filosofía.'},
  {id:'channel-18',name:'HealthyGamerGG',area:'Psicología / filosofía',url:'https://www.youtube.com/@HealthyGamerGG',description:'Identidad, motivación, tecnología y comportamiento moderno.'},
  {id:'channel-19',name:'Mel Robbins',area:'Desarrollo personal',url:'https://www.youtube.com/@melrobbins',description:'Hábitos, procrastinación, relaciones y cambio personal.'},
  {id:'channel-20',name:'Tony Robbins',area:'Desarrollo personal',url:'https://www.youtube.com/@TonyRobbinsLive',description:'Cambio, liderazgo, rendimiento y mentalidad.'},
  {id:'channel-21',name:'Jim Rohn',area:'Desarrollo personal',url:'https://www.youtube.com/results?search_query=Jim+Rohn+official',description:'Disciplina, objetivos, carácter y filosofía del éxito.'},
  {id:'channel-22',name:'The Diary of a CEO',area:'Entrevistas',url:'https://www.youtube.com/@TheDiaryOfACEO',description:'Psicología, salud, relaciones, negocios y rendimiento.'},
  {id:'channel-23',name:'Lewis Howes',area:'Entrevistas / desarrollo',url:'https://www.youtube.com/@lewishowes',description:'Liderazgo, mentalidad, deporte, relaciones y negocios.'},
  {id:'channel-24',name:'Huberman Lab',area:'Neurociencia',url:'https://www.youtube.com/@hubermanlab',description:'Foco, sueño, aprendizaje, hábitos, rendimiento y salud.'},
  {id:'channel-25',name:'Alex Hormozi',area:'Negocios',url:'https://www.youtube.com/@AlexHormozi',description:'Oferta, adquisición, pricing, marketing y crecimiento.'},
  {id:'channel-26',name:'Jeremy Miner',area:'Ventas',url:'https://www.youtube.com/@JeremyMiner',description:'Venta consultiva, preguntas, psicología comercial y cierre.'},
  {id:'channel-27',name:'Grant Cardone',area:'Ventas',url:'https://www.youtube.com/@GrantCardone',description:'Prospección, cierre, negociación y mentalidad comercial.'},
  {id:'channel-28',name:'Chris Voss',area:'Negociación',url:'https://www.youtube.com/results?search_query=Chris+Voss+negotiation',description:'Empatía táctica, comunicación y negociación.'},
  {id:'channel-29',name:'GaryVee',area:'Marketing / ventas',url:'https://www.youtube.com/@garyvee',description:'Atención, contenido, branding, ventas y emprendimiento.'},
  {id:'channel-30',name:'Codie Sanchez',area:'Emprendimiento',url:'https://www.youtube.com/@CodieSanchezCT',description:'Compra y creación de negocios, operaciones y libertad financiera.'},
  {id:'channel-31',name:'My First Million',area:'Negocios',url:'https://www.youtube.com/@MyFirstMillionPod',description:'Ideas de negocios, tendencias, oportunidades y modelos.'},
  {id:'channel-32',name:'Eternalised',area:'Psicología profunda',url:'https://www.youtube.com/@Eternalised',description:'Jung, Nietzsche, sombra, alquimia psicológica e inconsciente.'},
  {id:'channel-33',name:'This Jungian Life',area:'Jung / psicología',url:'https://www.youtube.com/@ThisJungianLife',description:'Arquetipos, sueños, inconsciente y psicología analítica.'}
];

export const libraryVideoSections = [
  'Selección SØD','Conciencia y despertar','Estoicismo y filosofía','Psicología y desarrollo','Negocios y ventas'
];

export function youtubeVideoId(url=''){
  try{
    if(!url)return '';
    const parsed=new URL(url);
    if(parsed.hostname.includes('youtu.be'))return parsed.pathname.replace('/','').split('/')[0];
    if(parsed.hostname.includes('youtube.com')){
      if(parsed.pathname.startsWith('/embed/'))return parsed.pathname.split('/embed/')[1]?.split('/')[0]||'';
      return parsed.searchParams.get('v')||'';
    }
  }catch{}
  return '';
}

export function youtubeThumbnail(url='',quality='hqdefault'){
  const id=youtubeVideoId(url);
  return id?`https://img.youtube.com/vi/${id}/${quality}.jpg`:'';
}

export const libraryCategories = [
  'Todos','Riqueza','Mentalidad','Liderazgo','Propósito','Desarrollo personal','Hábitos','Conciencia','Espiritualidad','Filosofía','Metafísica','Sabiduría','Estrategia'
];

export const libraryRecommended = [...libraryBooks].sort((a,b)=>a.priority-b.priority);

export function getLibraryBook(id){return libraryBooks.find(book=>book.id===id)||null}

export function youtubeEmbedUrl(url=''){
  try{
    if(!url)return '';
    const parsed=new URL(url);
    if(parsed.hostname.includes('youtu.be'))return `https://www.youtube.com/embed/${parsed.pathname.replace('/','')}`;
    if(parsed.hostname.includes('youtube.com')){
      if(parsed.pathname.startsWith('/embed/'))return url;
      const id=parsed.searchParams.get('v');
      if(id)return `https://www.youtube.com/embed/${id}`;
    }
  }catch{}
  return '';
}
