/*
============================================================

ERTZAINTZA
STORAGE.JS

Sistema de almacenamiento local

============================================================
*/

"use strict";


const Storage={



    prefix:"ERTZAINTZA_",






    /*
    ========================================================
    BASE STORAGE
    ========================================================
    */


    set:function(

        key,

        value

    ){



        localStorage.setItem(

            this.prefix + key,

            JSON.stringify(

                value

            )

        );


    },






    get:function(key){



        const data=

        localStorage.getItem(

            this.prefix + key

        );



        if(

            !data

        ){

            return null;

        }



        try{


            return JSON.parse(

                data

            );


        }

        catch(e){


            return null;


        }


    },







    remove:function(key){



        localStorage.removeItem(

            this.prefix + key

        );


    },







    clear:function(){



        Object.keys(

            localStorage

        )

        .forEach(key=>{


            if(

                key.startsWith(

                    this.prefix

                )

            ){


                localStorage.removeItem(

                    key

                );


            }


        });


    },








    /*
    ========================================================
    USUARIO
    ========================================================
    */


    saveUser:function(user){



        this.set(

            "currentUser",

            user

        );


    },





    getUser:function(){


        return this.get(

            "currentUser"

        );


    },





    logout:function(){


        this.remove(

            "currentUser"

        );


    },








    /*
    ========================================================
    USUARIOS
    ========================================================
    */


    saveUsers:function(users){



        this.set(

            "users",

            users

        );


    },





    getUsers:function(){



        return (

            this.get(

                "users"

            )

            ||

            []

        );


    },








    /*
    ========================================================
    GRUPO DE TRABAJO
    ========================================================
    */


    saveGroup:function(group){



        this.set(

            "group",

            group

        );


    },





    getGroup:function(){



        return (

            this.get(

                "group"

            )

            ||

            "G1"

        );


    },








    /*
    ========================================================
    EXTRAS
    ========================================================
    */


    saveExtras:function(extras){



        this.set(

            "extras",

            extras

        );


    },





    getExtras:function(){



        return (

            this.get(

                "extras"

            )

            ||

            []

        );


    },








    /*
    ========================================================
    CONFIGURACIÓN
    ========================================================
    */


    saveSettings:function(settings){



        this.set(

            "settings",

            settings

        );


    },





    getSettings:function(){



        return this.get(

            "settings"

        );


    },








    /*
    ========================================================
    MODO OSCURO
    ========================================================
    */


    saveDarkMode:function(active){



        this.set(

            "darkMode",

            Boolean(active)

        );


    },





    getDarkMode:function(){



        return (

            this.get(

                "darkMode"

            )

            ||

            false

        );


    },








    /*
    ========================================================
    NOTAS MENSUALES
    ========================================================
    */


    saveNotes:function(

        key,

        data

    ){



        const notes=

        this.get(

            "notes"

        )

        ||

        {};



        notes[key]=data;



        this.set(

            "notes",

            notes

        );


    },





    getNotes:function(key){



        const notes=

        this.get(

            "notes"

        )

        ||

        {};



        return notes[key]

        ||

        {


            text:"",

            checklist:[]


        };


    }







};






console.log(

    "ERTZAINTZA Storage cargado"

);