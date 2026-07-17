/*
============================================================

ERTZAINTZA
ENGINE.JS

Motor de cálculo de turnos y horas

============================================================
*/

"use strict";


const Engine={



    /*
    ========================================================
    FECHA REFERENCIA
    ========================================================
    */


    referenceDate:

    new Date(

        CONFIG.REFERENCE_DATE

    ),





    /*
    ========================================================
    OBTENER SEMANA DEL CICLO
    ========================================================
    */


    getCycleWeek:function(date){



        const diff=

        Math.floor(

            (

                date

                -

                this.referenceDate

            )

            /

            (

                1000 *

                60 *

                60 *

                24

            )

        );



        const weeks=

        Math.floor(

            diff / 7

        );



        let week=

        (

            weeks % 5

        )

        +1;



        if(week<=0){

            week+=5;

        }



        return week;


    },






    /*
    ========================================================
    OBTENER TURNO
    ========================================================
    */


    getShift:function(

        date,

        group="G1"

    ){



        const cycleWeek=

        this.getCycleWeek(

            date

        );



        let offset=

        CONFIG.GROUPS.indexOf(

            group

        );



        if(offset<0){

            offset=0;

        }



        let finalWeek=

        cycleWeek-offset;



        while(finalWeek<=0){

            finalWeek+=5;

        }



        const cycle=

        CONFIG.CYCLE[

            finalWeek-1

        ];



        const day=

        date.getDay();



        return cycle.days[day];



    },







    /*
    ========================================================
    HORAS DEL TURNO
    ========================================================
    */


    getShiftHours:function(shift){


        return (

            CONFIG.SHIFT_HOURS[shift]

            ||

            0

        );


    },







    /*
    ========================================================
    ES NOCTURNO
    ========================================================
    */


    isNight:function(shift){



        return (

            shift==="N"

            ||

            shift==="N12"

        );


    },







    /*
    ========================================================
    FORMATO FECHA
    ========================================================
    */


    format:function(date){



        const y=

        date.getFullYear();



        const m=

        String(

            date.getMonth()+1

        )

        .padStart(

            2,

            "0"

        );



        const d=

        String(

            date.getDate()

        )

        .padStart(

            2,

            "0"

        );



        return `${y}-${m}-${d}`;


    },







    /*
    ========================================================
    DIAS DEL MES
    ========================================================
    */


    getMonthDays:function(

        year,

        month

    ){



        const days=[];



        const total=

        new Date(

            year,

            month+1,

            0

        )

        .getDate();



        for(

            let i=1;

            i<=total;

            i++

        ){


            const date=

            new Date(

                year,

                month,

                i

            );



            days.push(date);


        }



        return days;


    },








    /*
    ========================================================
    DATOS CALENDARIO
    ========================================================
    */


    getCalendarData:function(

        year,

        month,

        group

    ){



        return this

        .getMonthDays(

            year,

            month

        )

        .map(date=>{


            return {


                date:

                this.format(date),



                shift:

                this.getShift(

                    date,

                    group

                )


            };



        });


    },








    /*
    ========================================================
    INFORMACION COMPLETA DEL DIA
    ========================================================
    */


    getFullDayInfo:function(

        date,

        group

    ){



        const shift=

        this.getShift(

            date,

            group

        );



        const dateKey=

        this.format(

            date

        );



        const extras=

        Extras.getByDate(

            dateKey

        );



        const holiday=

        Holidays.isHoliday(

            dateKey

        );



        let hours=

        this.getShiftHours(

            shift

        );



        return {


            date:dateKey,



            shift,



            name:

            CONFIG.SHIFT_NAMES[shift],



            color:

            CONFIG.SHIFT_COLORS[shift],



            hours,



            holiday,



            extras



        };


    },








    /*
    ========================================================
    RESUMEN MENSUAL
    ========================================================
    */


    getMonthlyResume:function(

        year,

        month,

        group

    ){



        const days=

        this.getCalendarData(

            year,

            month,

            group

        );



        const result={



            shifts:{


                morning:0,


                morning12:0,


                afternoon:0,


                night:0,


                night12:0


            },



            balance:{


                generated:0,


                consumed:0,


                total:

                Settings.getBalance()


            },



            money:0,



            payment:{


                year:


                year,


                month:


                month,


                money:0


            }



        };





        days.forEach(day=>{



            switch(day.shift){


                case "M":

                    result.shifts.morning++;

                break;


                case "M12":

                    result.shifts.morning12++;

                break;


                case "T":

                    result.shifts.afternoon++;

                break;


                case "N":

                    result.shifts.night++;

                break;


                case "N12":

                    result.shifts.night12++;

                break;



            }



        });




        const extras=

        Extras.getByMonth(

            year,

            month

        );



        extras.forEach(extra=>{



            if(extra.hours){



                if(

                    extra.type===

                    Extras.types.MODIFICATION

                ){


                    result.balance.generated+=

                    extra.hours;


                }



                if(

                    extra.type===

                    Extras.types.VACATION

                    ||

                    extra.type===

                    Extras.types.PERSONAL

                ){



                    result.balance.consumed+=

                    extra.hours;


                }



            }



            if(extra.money){


                result.money+=

                extra.money;


            }



        });



        result.balance.total=

        Settings.getBalance()

        +

        result.balance.generated

        -

        result.balance.consumed;



        return result;


    },









    /*
    ========================================================
    VALIDAR EXTRA
    ========================================================
    */


    validateExtra:function(extra){



        if(!extra.date){

            return false;

        }



        if(!extra.type){

            return false;

        }



        return true;


    },








    /*
    ========================================================
    ID ÚNICO
    ========================================================
    */


    generateID:function(){



        return (

            Date.now()

            +

            Math.random()

            .toString(16)

            .slice(2)

        );


    },







    /*
    ========================================================
    FORMATO HORAS
    ========================================================
    */


    formatHours:function(hours){



        return (

            Number(hours)

            .toFixed(2)

            +

            " h"

        );


    }



};





console.log(

    "ERTZAINTZA Engine cargado"

);