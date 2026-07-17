/*
============================================================

ERTZAINTZA
CONFIG.JS

Configuración global del sistema

============================================================
*/

"use strict";


const CONFIG={



    /*
    ========================================================
    DATOS GENERALES
    ========================================================
    */


    APP_NAME:"ERTZAINTZA",



    MIN_YEAR:2021,


    MAX_YEAR:2030,





    /*
    ========================================================
    GRUPOS DE TRABAJO
    ========================================================
    */


    GROUPS:[

        "G1",

        "G2",

        "G3",

        "G4",

        "G5"

    ],





    /*
    ========================================================
    CICLO DE TURNOS
    ========================================================

    Semana:

    1 Mañana
    2 Libre
    3 Tarde
    4 Noche
    5 Libre

    Referencia:
    Lunes 22/06/2026 G1 empieza mañana

    ========================================================
    */


    CYCLE:[


        {

            week:1,


            days:{


                1:"M",

                2:"M",

                3:"M",

                4:"M",

                5:"M",

                6:"M12",

                0:"M12"


            }


        },



        {


            week:2,


            days:{


                1:"L",

                2:"L",

                3:"L",

                4:"L",

                5:"L",

                6:"L",

                0:"L"


            }


        },



        {


            week:3,


            days:{


                1:"T",

                2:"T",

                3:"T",

                4:"T",

                5:"T",

                6:"L",

                0:"L"


            }


        },



        {


            week:4,


            days:{


                1:"N",

                2:"N",

                3:"N",

                4:"N",

                5:"N",

                6:"N12",

                0:"N12"


            }


        },



        {


            week:5,


            days:{


                1:"L",

                2:"L",

                3:"L",

                4:"L",

                5:"L",

                6:"L",

                0:"L"


            }


        }


    ],





    /*
    ========================================================
    TURNOS
    ========================================================
    */


    SHIFT_NAMES:{


        M:"Mañana",


        M12:"Mañana 12h",


        T:"Tarde",


        N:"Noche",


        N12:"Noche 12h",


        L:"Libre"


    },





    SHIFT_COLORS:{


        M:"#22c55e",


        M12:"#22c55e",


        T:"#2563eb",


        N:"#dc2626",


        N12:"#dc2626",


        L:"#d1d5db"


    },





    SHIFT_HOURS:{


        M:8,


        M12:12,


        T:8,


        N:8,


        N12:12,


        L:0


    },





    /*
    ========================================================
    EXTRAS
    ========================================================
    */


    EXTRA_TYPES:{


        MODIFICATION:

        "Modificación de jornada",



        REINFORCEMENT:

        "Refuerzo",



        TRIAL:

        "Juicio",



        VACATION:

        "Vacaciones",



        PERSONAL:

        "Asunto particular",



        PERMISSION:

        "Permiso",



        SICK:

        "Baja",



        COMPLEMENT:

        "Complemento"


    },





    /*
    ========================================================
    REFUERZOS
    ========================================================
    */


    PAYMENT_KEYS:{


        HO:"Hora ordinaria",


        HN:"Hora nocturna",


        HF:"Hora festiva",


        HX:"Hora nocturna festiva",



        WO:"Descanso ordinario",


        WN:"Descanso nocturno",


        WF:"Descanso festivo",


        WX:"Descanso nocturno festivo"


    },





    /*
    ========================================================
    AUSENCIAS
    ========================================================
    */


    SICK_TYPES:{


        COMMON:

        "Enfermedad común",



        WORK:

        "Accidente laboral"


    },





    /*
    ========================================================
    COLORES EVENTOS
    ========================================================
    */


    EVENT_COLORS:{


        EXTRA:"#f97316",


        HOLIDAY:"#facc15",


        ABSENCE:"#ef4444",


        LEAVE:"#c084fc"



    },





    /*
    ========================================================
    FECHA REFERENCIA CICLO
    ========================================================
    */


    REFERENCE_DATE:

    "2026-06-22"



};





console.log(

    "ERTZAINTZA Config cargado"

);