/*
============================================================

ERTZAINTZA
UI.JS

Interfaz dinámica y ventanas

============================================================
*/

"use strict";


const UI={



    modal:null,






    /*
    ========================================================
    INICIO
    ========================================================
    */


    init:function(){


        this.modal=

        document.getElementById(

            "appModal"

        );



        console.log(

            "UI cargada"

        );


    },








    /*
    ========================================================
    CREAR MODAL
    ========================================================
    */


    openModal:function(content){



        let modal=

        document.getElementById(

            "appModal"

        );



        if(!modal){



            modal=

            document.createElement(

                "div"

            );



            modal.id=

            "appModal";



            modal.className=

            "modal";



            document.body.appendChild(

                modal

            );


        }





        modal.innerHTML=`

        <div class="modal-content">


        ${content}



        <button onclick="UI.closeModal()">

        Cerrar

        </button>


        </div>

        `;



        modal.style.display="flex";


    },








    closeModal:function(){



        const modal=

        document.getElementById(

            "appModal"

        );



        if(modal){


            modal.style.display=

            "none";


        }


    },









    /*
    ========================================================
    DIA DEL CALENDARIO
    ========================================================
    */


    openDay:function(info){



        let html=`


        <h2>

        ${info.date}

        </h2>



        <h3>

        ${info.name}

        </h3>



        <p>

        Horas:

        ${info.hours}

        </p>


        `;





        if(info.holiday){



            html+=`

            <p>

            🟡 Festivo

            </p>


            `;


        }






        html+=`


        <hr>


        <h3>

        Añadir

        </h3>



        <button

        onclick="UI.modification('${info.date}')">


        Modificación jornada

        </button>



        <button

        onclick="UI.reinforcement('${info.date}')">


        Refuerzo

        </button>



        <button

        onclick="UI.vacation('${info.date}')">


        Vacaciones

        </button>



        <button

        onclick="UI.sick('${info.date}')">


        Baja

        </button>



        `;





        this.openModal(

            html

        );


    },









    /*
    ========================================================
    MODIFICACIÓN
    ========================================================
    */


    modification:function(date){



        this.openModal(`



        <h3>

        Modificación jornada

        </h3>



        <input

        id="modHours"

        type="number"

        placeholder="Horas"



        >



        <button onclick="



        Extras.addModification(



        '${date}',



        document.getElementById('modHours').value



        );



        UI.closeModal();



        Calendar.render();



        ">


        Guardar


        </button>



        `);



    },









    /*
    ========================================================
    REFUERZO
    ========================================================
    */


    reinforcement:function(date){



        this.openModal(`


        <h3>

        Refuerzo

        </h3>



        <p>

        Introducir horas y claves desde configuración

        </p>



        <input

        id="reinforceHours"

        type="number"

        placeholder="Horas"



        >



        <button onclick="



        Extras.addReinforcement(



        '${date}',



        {



        hours:

        Number(

        document.getElementById('reinforceHours').value

        )



        }



        );



        UI.closeModal();



        Calendar.render();



        ">



        Guardar


        </button>



        `);


    },









    /*
    ========================================================
    VACACIONES
    ========================================================
    */


    vacation:function(date){



        this.openModal(`


        <h3>

        Vacaciones

        </h3>



        <input

        id="vacHours"

        type="number"

        value="8"



        >



        <button onclick="



        Extras.addVacation(



        '${date}',



        document.getElementById('vacHours').value



        );



        UI.closeModal();



        Calendar.render();



        ">


        Guardar


        </button>


        `);



    },









    /*
    ========================================================
    BAJA
    ========================================================
    */


    sick:function(date){



        this.openModal(`


        <h3>

        Tipo baja

        </h3>



        <select id="sickType">


        <option value="COMMON">

        Enfermedad común

        </option>



        <option value="WORK">

        Accidente laboral

        </option>


        </select>



        <input

        id="sickHours"

        type="number"

        value="8"

        >




        <button onclick="



        Extras.addSick(



        '${date}',



        document.getElementById('sickType').value,



        document.getElementById('sickHours').value



        );



        UI.closeModal();



        Calendar.render();



        ">


        Guardar


        </button>


        `);



    }







};







UI.init();



console.log(

"ERTZAINTZA UI cargada"

);