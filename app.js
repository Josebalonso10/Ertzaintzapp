/*
============================================================

ERTZAINTZA
APP.JS

Control principal de aplicación

============================================================
*/

"use strict";


const App={



    currentPage:"calendar",





    /*
    ========================================================
    ARRANQUE
    ========================================================
    */


    init:function(){



        Extras.init();

        Calendar.init();

        Summary.init();

        Admin.init();



        this.loadTheme();


        this.updateUser();



        this.checkLogin();



        console.log(

            "ERTZAINTZA App iniciada"

        );


    },









    /*
    ========================================================
    LOGIN
    ========================================================
    */


    login:function(){



        const professional=

        document.getElementById(

            "loginProfessional"

        )

        .value;



        const password=

        document.getElementById(

            "loginPassword"

        )

        .value;





        const result=

        Auth.login(

            professional,

            password

        );





        if(result.ok){



            this.closeLogin();



            this.updateUser();



            Calendar.render();



        }

        else{


            alert(

                result.message

            );


        }


    },









    /*
    ========================================================
    REGISTRO
    ========================================================
    */


    register:function(){



        const name=

        document.getElementById(

            "registerName"

        )

        .value;



        const professional=

        document.getElementById(

            "registerProfessional"

        )

        .value;



        const password=

        document.getElementById(

            "registerPassword"

        )

        .value;







        const result=

        Auth.register(

            name,

            professional,

            password

        );





        alert(

            result.message

        );


    },









    /*
    ========================================================
    LOGOUT
    ========================================================
    */


    logout:function(){



        Auth.logout();



        this.updateUser();



        this.checkLogin();


    },









    /*
    ========================================================
    LOGIN MODAL
    ========================================================
    */


    checkLogin:function(){



        const modal=

        document.getElementById(

            "loginModal"

        );



        if(

            !Auth.getUser()

        ){


            modal.style.display=

            "flex";


        }

        else{


            modal.style.display=

            "none";


        }



    },








    closeLogin:function(){



        document.getElementById(

            "loginModal"

        )

        .style.display=

        "none";


    },









    /*
    ========================================================
    USUARIO
    ========================================================
    */


    updateUser:function(){



        const name=

        document.getElementById(

            "userName"

        );



        if(name){


            name.innerHTML=

            Auth.getName();


        }





        const admin=

        document.getElementById(

            "adminButton"

        );



        if(admin){



            admin.style.display=

            Auth.isAdmin()

            ?

            "block"

            :

            "none";


        }



    },









    /*
    ========================================================
    CAMBIO PAGINA
    ========================================================
    */


    showPage:function(page){



        document

        .querySelectorAll(

            ".page"

        )

        .forEach(p=>{


            p.style.display=

            "none";


        });





        const selected=

        document.getElementById(

            page

        );



        if(selected){


            selected.style.display=

            "block";


        }





        this.currentPage=

        page;






        if(page==="calendar"){


            Calendar.render();


        }





        if(page==="summary"){


            Summary.render();


        }





        if(page==="admin"){


            Admin.render();


        }




    },









    /*
    ========================================================
    GRUPO
    ========================================================
    */


    changeGroup:function(group){



        Calendar.setGroup(

            group

        );



        Summary.group=

        group;



        Storage.saveGroup(

            group

        );



    },









    /*
    ========================================================
    PERFIL
    ========================================================
    */


    openProfile:function(){



        const user=

        Auth.getUser();



        if(!user){

            return;

        }



        UI.openModal(`



        <h2>

        Perfil

        </h2>



        <p>

        ${user.name}

        </p>



        <p>

        ${user.professional}

        </p>



        `);



    },









    /*
    ========================================================
    TEMA OSCURO
    ========================================================
    */


    toggleDarkMode:function(){



        const active=

        !Storage.getDarkMode();



        Storage.saveDarkMode(

            active

        );



        this.applyTheme();


    },






    loadTheme:function(){



        this.applyTheme();


    },






    applyTheme:function(){



        if(

            Storage.getDarkMode()

        ){



            document.body

            .classList

            .add(

                "dark"

            );



        }

        else{


            document.body

            .classList

            .remove(

                "dark"

            );


        }



    }





};







window.onload=function(){


    App.init();


};