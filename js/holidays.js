/*
============================================================

ERTZAINTZA
HOLIDAYS.JS

Gestión de festivos

============================================================
*/

"use strict";


const Holidays={



    list:[],





    /*
    ========================================================
    FESTIVOS NACIONALES POR DEFECTO
    ========================================================
    */


    defaults:[



        {
            date:"2026-01-01",
            name:"Año Nuevo"
        },


        {
            date:"2026-01-06",
            name:"Reyes"
        },


        {
            date:"2026-04-03",
            name:"Viernes Santo"
        },


        {
            date:"2026-05-01",
            name:"Día del Trabajo"
        },


        {
            date:"2026-08-15",
            name:"Asunción"
        },


        {
            date:"2026-10-12",
            name:"Fiesta Nacional"
        },


        {
            date:"2026-11-01",
            name:"Todos los Santos"
        },


        {
            date:"2026-12-06",
            name:"Día Constitución"
        },


        {
            date:"2026-12-08",
            name:"Inmaculada"
        },


        {
            date:"2026-12-25",
            name:"Navidad"
        }


    ],







    /*
    ========================================================
    INICIO
    ========================================================
    */


    init:function(){



        const saved=

        Storage.get(

            "holidays"

        );



        if(saved){


            this.list=saved;


        }

        else{


            this.list=

            structuredClone(

                this.defaults

            );


            this.save();


        }



        console.log(

            "Festivos cargados:",

            this.list.length

        );


    },








    /*
    ========================================================
    GUARDAR
    ========================================================
    */


    save:function(){



        Storage.set(

            "holidays",

            this.list

        );


    },








    /*
    ========================================================
    AÑADIR
    ========================================================
    */


    add:function(

        date,

        name

    ){



        const exists=

        this.list.some(

            h=>

            h.date===date

        );



        if(exists){

            return false;

        }



        this.list.push({


            date,


            name:



            name ||

            "Festivo"



        });



        this.save();



        return true;


    },








    /*
    ========================================================
    ELIMINAR
    ========================================================
    */


    remove:function(date){



        this.list=

        this.list.filter(

            h=>

            h.date!==date

        );



        this.save();


    },








    /*
    ========================================================
    CONSULTAR
    ========================================================
    */


    isHoliday:function(date){



        return this.list.some(

            h=>

            h.date===date

        );


    },








    /*
    ========================================================
    INFORMACIÓN
    ========================================================
    */


    get:function(date){



        return this.list.find(

            h=>

            h.date===date

        )

        ||

        null;


    },








    /*
    ========================================================
    HORAS FESTIVO
    ========================================================
    
    Lunes-Viernes = 8h
    Sábado/Domingo = 12h

    ========================================================
    */


    getHours:function(date){



        if(

            !this.isHoliday(date)

        ){

            return 0;

        }



        const d=

        new Date(date);



        const day=

        d.getDay();



        if(

            day===0

            ||

            day===6

        ){


            return 12;


        }



        return 8;


    },








    /*
    ========================================================
    LISTADO ORDENADO
    ========================================================
    */


    getAll:function(){



        return this.list.sort(

            (a,b)=>

            a.date.localeCompare(

                b.date

            )

        );


    }






};






Holidays.init();



console.log(

    "ERTZAINTZA Holidays cargado"

);