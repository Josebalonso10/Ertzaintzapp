/*
============================================================

ERTZAINTZA
ADMIN.JS

Panel administrador

============================================================
*/

"use strict";


const Admin={



    /*
    ========================================================
    INICIO
    ========================================================
    */


    init:function(){



        console.log(

            "Admin cargado"

        );


    },









    /*
    ========================================================
    MOSTRAR PANEL
    ========================================================
    */


    render:function(){



        const container=

        document.getElementById(

            "adminPanel"

        );



        if(!container){

            return;

        }





        if(

            !Auth.isAdmin()

        ){



            container.innerHTML=

            `

            <h2>

            Acceso denegado

            </h2>

            `;



            return;


        }







        container.innerHTML=

        `



        <div class="admin-box">



        <h2>

        Panel administrador

        </h2>





        <h3>

        Usuarios

        </h3>



        <div id="usersList">

        ${this.renderUsers()}

        </div>





        <hr>





        <h3>

        Índices generales

        </h3>




        <label>

        Hora festivo 8h

        </label>



        <input

        type="number"

        value="${Settings.getIndex('holiday8')}"

        onchange="Admin.setIndex('holiday8',this.value)"

        >






        <label>

        Hora festivo 12h

        </label>



        <input

        type="number"

        value="${Settings.getIndex('holiday12')}"

        onchange="Admin.setIndex('holiday12',this.value)"

        >







        <label>

        Nocturnidad

        </label>



        <input

        type="number"

        value="${Settings.getIndex('night')}"

        onchange="Admin.setIndex('night',this.value)"

        >







        <hr>






        <h3>

        Festivos

        </h3>



        <div>

        ${this.renderHolidays()}

        </div>



        </div>



        `;



    },









    /*
    ========================================================
    USUARIOS
    ========================================================
    */


    renderUsers:function(){



        const users=

        Auth.getUsers();




        if(

            users.length===0

        ){


            return "Sin usuarios";


        }






        return users.map(u=>{



            return `


            <div class="user-row">



            <b>

            ${u.name}

            </b>



            <br>



            ${u.professional}



            <br>



            Estado:

            ${u.approved?"Activo":"Pendiente"}







            ${

            u.approved

            ?

            ""

            :

            `

            <button onclick="Admin.approve('${u.professional}')">

            Aprobar

            </button>

            `

            }







            <button onclick="Admin.remove('${u.professional}')">

            Eliminar

            </button>



            </div>



            `;



        })

        .join("");



    },









    approve:function(professional){



        Auth.approve(

            professional

        );



        this.render();


    },









    remove:function(professional){



        Auth.remove(

            professional

        );



        this.render();


    },









    /*
    ========================================================
    INDICES
    ========================================================
    */


    setIndex:function(

        key,

        value

    ){



        Settings.setIndex(

            key,

            value

        );


    },









    /*
    ========================================================
    FESTIVOS
    ========================================================
    */


    renderHolidays:function(){



        return Holidays.getAll()

        .map(h=>{



            return `


            <div>


            ${h.date}

            -

            ${h.name}



            <button

            onclick="Admin.removeHoliday('${h.date}')"

            >

            X

            </button>



            </div>



            `;


        })

        .join("");



    },







    removeHoliday:function(date){



        Holidays.remove(

            date

        );



        this.render();


    }






};







Admin.init();



console.log(

"ERTZAINTZA Admin cargado"

);