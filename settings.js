/*
============================================================

ERTZAINTZA
SETTINGS.JS

Configuración e índices

============================================================
*/

"use strict";


const Settings={



    data:{},





    /*
    ========================================================
    CONFIGURACIÓN INICIAL
    ========================================================
    */


    defaults:{



        /*
        HORAS

        */


        balance:0,



        vacationHours:176,



        personalHours:60,



        reducedPersonal:false,





        /*
        FESTIVOS

        */


        holiday8:0,

        holiday12:0,





        /*
        NOCTURNIDAD

        */


        night:0,





        /*
        REFUERZOS

        */


        payments:{



            HO:0,

            HN:0,

            HF:0,

            HX:0,


            WO:0,

            WN:0,

            WF:0,

            WX:0


        },






        /*
        JUICIOS

        */


        trialMoney:0,


        trialProcedureMoney:0,



        trialHours:6,


        procedureHours:4,





        /*
        ADMIN

        */


        useDefaultIndexes:true





    },









    /*
    ========================================================
    INICIO
    ========================================================
    */


    init:function(){



        const saved=

        Storage.getSettings();



        if(saved){


            this.data=

            Object.assign(

                {},

                this.defaults,

                saved

            );


        }

        else{


            this.data=

            structuredClone(

                this.defaults

            );


            this.save();


        }



        console.log(

            "Settings cargado"

        );


    },









    /*
    ========================================================
    GUARDAR
    ========================================================
    */


    save:function(){



        Storage.saveSettings(

            this.data

        );


    },









    /*
    ========================================================
    INDICES
    ========================================================
    */


    getIndexes:function(){



        return this.data;


    },






    getIndex:function(key){



        return (

            this.data[key]

            ||

            0

        );


    },






    setIndex:function(

        key,

        value

    ){



        this.data[key]=

        Number(value);



        this.save();


    },









    /*
    ========================================================
    BALANCE HORARIO
    ========================================================
    */


    getBalance:function(){



        return Number(

            this.data.balance

        );


    },






    setBalance:function(value){



        this.data.balance=

        Number(value);



        this.save();


    },









    addBalance:function(hours){



        this.data.balance+=

        Number(hours);



        this.save();


    },









    /*
    ========================================================
    VACACIONES
    ========================================================
    */


    getVacationHours:function(){



        return this.data.vacationHours;


    },






    setVacationHours:function(value){



        this.data.vacationHours=

        Number(value);



        this.save();


    },









    /*
    ========================================================
    ASUNTOS PARTICULARES
    ========================================================
    */


    getPersonalHours:function(){



        return this.data.personalHours;


    },






    setPersonalHours:function(value){



        this.data.personalHours=

        Number(value);



        this.save();


    },









    toggleReducedPersonal:function(){



        this.data.reducedPersonal=

        !this.data.reducedPersonal;



        if(

            this.data.reducedPersonal

        ){


            this.data.personalHours=

            32;


        }

        else{


            this.data.personalHours=

            60;


        }



        this.save();


    },









    /*
    ========================================================
    PAGOS REFUERZOS
    ========================================================
    */


    setPayment:function(

        key,

        value

    ){



        this.data.payments[key]=

        Number(value);



        this.save();


    },






    getPayment:function(key){



        return (

            this.data.payments[key]

            ||

            0

        );


    },









    /*
    ========================================================
    COPIAR INDICES ADMIN
    ========================================================
    */


    enableDefaultIndexes:function(){



        this.data.useDefaultIndexes=

        true;



        this.save();


    },





    disableDefaultIndexes:function(){



        this.data.useDefaultIndexes=

        false;



        this.save();


    },








    /*
    ========================================================
    RESET
    ========================================================
    */


    reset:function(){



        this.data=

        structuredClone(

            this.defaults

        );



        this.save();


    }






};








Settings.init();



console.log(

"ERTZAINTZA Settings cargado"

);