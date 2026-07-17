/*
============================================================

ERTZAINTZA
AUTH.JS

Sistema de usuarios

============================================================
*/

"use strict";


const Auth={



    current:null,





    ADMIN:{


        professional:"29023",


        password:"admin29023",


        name:"Administrador"



    },









    /*
    ========================================================
    INICIO
    ========================================================
    */


    init:function(){



        let users=

        Storage.getUsers();



        if(

            !users

            ||

            users.length===0

        ){



            users=[

                {


                    professional:

                    this.ADMIN.professional,


                    password:

                    this.ADMIN.password,


                    name:

                    this.ADMIN.name,


                    role:

                    "admin",


                    approved:

                    true



                }


            ];



            Storage.saveUsers(

                users

            );


        }



        this.current=

        Storage.getUser();



        console.log(

            "Auth iniciado"

        );


    },









    /*
    ========================================================
    LOGIN
    ========================================================
    */


    login:function(

        professional,

        password

    ){



        const users=

        this.getUsers();



        const user=

        users.find(

            u=>



            u.professional===professional

            &&

            u.password===password



        );





        if(!user){



            return {


                ok:false,


                message:

                "Usuario o contraseña incorrectos"



            };


        }







        if(

            !user.approved

        ){



            return {


                ok:false,


                message:

                "Usuario pendiente de aprobación"



            };


        }







        this.current=

        user;



        Storage.saveUser(

            user

        );



        return {


            ok:true,


            user



        };


    },









    /*
    ========================================================
    REGISTRO
    ========================================================
    */


    register:function(

        name,

        professional,

        password

    ){



        const users=

        this.getUsers();





        const exists=

        users.some(

            u=>

            u.professional===professional

        );





        if(exists){



            return {


                ok:false,


                message:

                "El usuario ya existe"



            };


        }






        users.push({



            name,


            professional,


            password,



            role:

            "user",



            approved:

            false



        });





        Storage.saveUsers(

            users

        );





        return {


            ok:true,


            message:

            "Registro enviado. Espera aprobación del administrador"



        };



    },









    /*
    ========================================================
    USUARIOS
    ========================================================
    */


    getUsers:function(){



        return Storage.getUsers()

        ||

        [];


    },









    approve:function(

        professional

    ){



        const users=

        this.getUsers();



        const user=

        users.find(

            u=>

            u.professional===professional

        );



        if(user){



            user.approved=

            true;



            Storage.saveUsers(

                users

            );


        }



    },









    remove:function(

        professional

    ){



        let users=

        this.getUsers();



        users=

        users.filter(

            u=>

            u.professional!==professional

        );



        Storage.saveUsers(

            users

        );



    },









    /*
    ========================================================
    USUARIO ACTUAL
    ========================================================
    */


    getUser:function(){



        return Storage.getUser();


    },









    logout:function(){



        Storage.logout();



        this.current=null;


    },









    /*
    ========================================================
    PERMISOS
    ========================================================
    */


    isAdmin:function(){



        const user=

        this.getUser();



        return Boolean(

            user

            &&

            user.role==="admin"

        );



    },








    getName:function(){



        const user=

        this.getUser();



        return user

        ?

        user.name

        :

        "Invitado";



    }






};







Auth.init();



console.log(

"ERTZAINTZA Auth cargado"

);