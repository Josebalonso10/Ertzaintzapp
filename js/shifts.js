/*
============================================================

ERTZAINTZA
SHIFTS.JS

Definición de turnos

============================================================
*/

"use strict";


const Shifts={



    /*
    ========================================================
    TURNOS DISPONIBLES
    ========================================================
    */


    data:{



        M:{


            code:"M",


            name:"Mañana",


            hours:8,


            type:"day",


            color:"#22c55e"



        },





        M12:{


            code:"M12",


            name:"Mañana 12h",


            hours:12,


            type:"day12",


            color:"#16a34a"



        },







        T:{


            code:"T",


            name:"Tarde",


            hours:8,


            type:"afternoon",


            color:"#2563eb"



        },







        N:{


            code:"N",


            name:"Noche",


            hours:8,


            type:"night",


            color:"#dc2626"



        },







        N12:{


            code:"N12",


            name:"Noche 12h",


            hours:12,


            type:"night12",


            color:"#991b1b"



        },







        L:{


            code:"L",


            name:"Libre",


            hours:0,


            type:"free",


            color:"#d1d5db"



        }





    },









    /*
    ========================================================
    OBTENER TURNO
    ========================================================
    */


    get:function(code){



        return (

            this.data[code]

            ||

            this.data.L

        );


    },









    /*
    ========================================================
    NOMBRE
    ========================================================
    */


    getName:function(code){



        return this.get(code).name;


    },









    /*
    ========================================================
    HORAS
    ========================================================
    */


    getHours:function(code){



        return this.get(code).hours;


    },









    /*
    ========================================================
    COLOR
    ========================================================
    */


    getColor:function(code){



        return this.get(code).color;


    },









    /*
    ========================================================
    ES NOCHE
    ========================================================
    */


    isNight:function(code){



        return (

            code==="N"

            ||

            code==="N12"

        );


    },









    /*
    ========================================================
    ES LIBRE
    ========================================================
    */


    isFree:function(code){



        return code==="L";


    },









    /*
    ========================================================
    LISTADO
    ========================================================
    */


    getAll:function(){



        return Object.values(

            this.data

        );


    }






};







console.log(

"ERTZAINTZA Shifts cargado"

);