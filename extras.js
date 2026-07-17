/*
============================================================

ERTZAINTZA
EXTRAS.JS

Gestión de complementos, refuerzos y ausencias

============================================================
*/

"use strict";


const Extras={



    list:[],




    types:{


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
    INICIO
    ========================================================
    */


    init:function(){



        this.list=

        Storage.getExtras();



        console.log(

            "Extras cargados:",

            this.list.length

        );



    },









    /*
    ========================================================
    GUARDAR
    ========================================================
    */


    save:function(){



        Storage.saveExtras(

            this.list

        );


    },









    /*
    ========================================================
    AÑADIR GENERAL
    ========================================================
    */


    add:function(extra){



        extra.id=

        Engine.generateID();



        this.list.push(

            extra

        );



        this.save();



        return extra;


    },









    /*
    ========================================================
    OBTENER POR FECHA
    ========================================================
    */


    getByDate:function(date){



        return this.list.filter(

            e=>

            e.date===date

        );


    },









    /*
    ========================================================
    OBTENER MES
    ========================================================
    */


    getByMonth:function(

        year,

        month

    ){



        return this.list.filter(e=>{



            const d=

            new Date(

                e.date

            );



            return (

                d.getFullYear()

                ===

                year

                &&

                d.getMonth()

                ===

                month

            );



        });


    },









    /*
    ========================================================
    ELIMINAR
    ========================================================
    */


    remove:function(id){



        this.list=

        this.list.filter(

            e=>

            e.id!==id

        );



        this.save();


    },









    /*
    ========================================================
    MODIFICACIÓN JORNADA
    ========================================================
    */


    addModification:function(

        date,

        hours

    ){



        return this.add({



            date,


            type:

            this.types.MODIFICATION,



            hours:

            Number(hours),



            money:0



        });



    },









    /*
    ========================================================
    REFUERZO
    ========================================================
    */


    addReinforcement:function(

        date,

        data

    ){



        return this.add({



            date,


            type:

            this.types.REINFORCEMENT,



            hours:

            Number(

                data.hours

            )

            ||

            0,



            keys:

            data.keys

            ||

            [],



            money:

            data.money

            ||

            0



        });



    },









    /*
    ========================================================
    JUICIO
    ========================================================
    */


    addTrial:function(

        date,

        data

    ){



        return this.add({



            date,


            type:

            this.types.TRIAL,



            modality:

            data.modality,



            compensation:

            data.compensation,



            hours:

            data.hours

            ||

            0,



            money:

            data.money

            ||

            0,



            coincides:

            data.coincides

            ||

            false



        });



    },









    /*
    ========================================================
    VACACIONES
    ========================================================
    */


    addVacation:function(

        date,

        hours

    ){



        return this.add({



            date,


            type:

            this.types.VACATION,



            hours:

            Number(hours),



            money:0



        });



    },









    /*
    ========================================================
    ASUNTOS PARTICULARES
    ========================================================
    */


    addPersonal:function(

        date,

        hours

    ){



        return this.add({



            date,


            type:

            this.types.PERSONAL,



            hours:

            Number(hours),



            money:0



        });



    },









    /*
    ========================================================
    PERMISOS
    ========================================================
    */


    addPermission:function(

        date,

        hours

    ){



        return this.add({



            date,


            type:

            this.types.PERMISSION,



            hours:

            Number(hours),



            money:0



        });



    },









    /*
    ========================================================
    BAJAS
    ========================================================
    */


    addSick:function(

        date,

        subtype,

        hours

    ){



        return this.add({



            date,


            type:

            this.types.SICK,



            subtype,



            hours:

            Number(hours),



            money:0



        });



    },









    /*
    ========================================================
    COMPLEMENTO MANUAL
    ========================================================
    */


    addComplement:function(

        date,

        name,

        money

    ){



        return this.add({



            date,


            type:

            this.types.COMPLEMENT,



            name,



            money:

            Number(money)



        });



    },









    /*
    ========================================================
    HORAS POSITIVAS
    ========================================================
    */


    getPositiveHours:function(){



        let total=0;



        this.list.forEach(e=>{



            if(

                e.type===

                this.types.REINFORCEMENT

                ||

                e.type===

                this.types.MODIFICATION

            ){



                total+=

                Number(

                    e.hours

                );



            }



        });



        return total;


    },









    /*
    ========================================================
    HORAS CONSUMIDAS
    ========================================================
    */


    getConsumedHours:function(){



        let total=0;



        this.list.forEach(e=>{



            if(


                e.type===

                this.types.VACATION

                ||

                e.type===

                this.types.PERSONAL

                ||

                e.type===

                this.types.PERMISSION

            ){



                total+=

                Number(

                    e.hours

                );


            }



        });



        return total;


    }







};







Extras.init();



console.log(

"ERTZAINTZA Extras cargado"

);