/*
============================================================

ERTZAINTZA
SUMMARY.JS

Resumen mensual

============================================================
*/

"use strict";


const Summary={



    year:

    new Date().getFullYear(),



    month:

    new Date().getMonth(),



    group:"G1",





    /*
    ========================================================
    INICIO
    ========================================================
    */


    init:function(){



        this.group=

        Storage.getGroup();



        this.render();



        console.log(

            "Summary iniciado"

        );


    },









    /*
    ========================================================
    RENDER
    ========================================================
    */


    render:function(){



        const container=

        document.getElementById(

            "summary"

        );



        if(!container){

            return;

        }





        const data=

        Engine.getMonthlyResume(

            this.year,

            this.month,

            this.group

        );





        container.innerHTML=

        `


        <div class="summary-box">



        <h2>

        Resumen mensual

        </h2>



        <h3>

        ${this.monthName()}

        ${this.year}

        </h3>





        <div class="cards">



        <div class="card">

        <h4>

        Mañanas

        </h4>

        <strong>

        ${data.shifts.morning}

        </strong>

        </div>





        <div class="card">

        <h4>

        Tardes

        </h4>

        <strong>

        ${data.shifts.afternoon}

        </strong>

        </div>





        <div class="card">

        <h4>

        Noches

        </h4>

        <strong>

        ${data.shifts.night}

        </strong>

        </div>





        </div>









        <hr>







        <h3>

        Balance horario

        </h3>





        <p>

        Generadas:

        ${data.balance.generated}

        h

        </p>



        <p>

        Consumidas:

        ${data.balance.consumed}

        h

        </p>




        <p>

        Total:

        ${data.balance.total}

        h

        </p>









        <hr>







        <h3>

        Economía

        </h3>





        <p>

        Complementos:

        ${data.money}

        €

        </p>







        <hr>







        <h3>

        Extras del mes

        </h3>





        <div id="monthlyExtras">

        ${this.renderExtras()}

        </div>






        </div>



        `;



    },









    /*
    ========================================================
    EXTRAS
    ========================================================
    */


    renderExtras:function(){



        const extras=

        Extras.getByMonth(

            this.year,

            this.month

        );



        if(

            extras.length===0

        ){


            return "Sin extras";


        }






        return extras.map(e=>{



            return `



            <div class="extra-item">


            <b>

            ${e.type}

            </b>



            <br>


            ${e.date}



            <br>



            ${e.hours || 0}

            h



            ${e.money || 0}

            €



            </div>



            `;



        })

        .join("");



    },









    /*
    ========================================================
    CAMBIO MES
    ========================================================
    */


    next:function(){



        this.month++;



        if(this.month>11){


            this.month=0;


            this.year++;


        }



        this.render();


    },






    previous:function(){



        this.month--;



        if(this.month<0){


            this.month=11;


            this.year--;


        }



        this.render();


    },









    monthName:function(){



        return [

            "Enero",

            "Febrero",

            "Marzo",

            "Abril",

            "Mayo",

            "Junio",

            "Julio",

            "Agosto",

            "Septiembre",

            "Octubre",

            "Noviembre",

            "Diciembre"



        ][this.month];


    }






};







console.log(

"ERTZAINTZA Summary cargado"

);