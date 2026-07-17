/*
============================================================

ERTZAINTZA
CALENDAR.JS

Calendario principal

============================================================
*/

"use strict";


const Calendar={



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

            "Calendario iniciado"

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

            "calendar"

        );



        if(!container){

            return;

        }




        let html="";





        html+=`

        <div class="calendar-box">


        <div class="calendar-header">


        <button onclick="Calendar.previousMonth()">

        ◀

        </button>



        <select onchange="Calendar.changeMonth(this.value)">

        ${this.monthOptions()}

        </select>



        <select onchange="Calendar.changeYear(this.value)">

        ${this.yearOptions()}

        </select>



        <button onclick="Calendar.nextMonth()">

        ▶

        </button>



        </div>



        `;






        html+=`

        <div class="calendar-grid">

        `;





        const names=[

            "L",

            "M",

            "X",

            "J",

            "V",

            "S",

            "D"

        ];




        names.forEach(day=>{


            html+=`

            <div class="calendar-day-name">

            ${day}

            </div>


            `;


        });







        const firstDay=

        new Date(

            this.year,

            this.month,

            1

        )

        .getDay();





        let offset=

        firstDay===0

        ?

        6

        :

        firstDay-1;





        for(

            let i=0;

            i<offset;

            i++

        ){



            html+=`

            <div></div>

            `;


        }







        const days=

        Engine.getMonthDays(

            this.year,

            this.month

        );






        days.forEach(date=>{



            const info=

            Engine.getFullDayInfo(

                date,

                this.group

            );



            html+=

            this.createDay(

                info

            );



        });






        html+=`

        </div>

        </div>

        `;






        container.innerHTML=

        html;



    },









    /*
    ========================================================
    CREAR DIA
    ========================================================
    */


    createDay:function(info){



        let classes=

        "calendar-cell";



        let style=

        "";




        let border="";





        if(info.shift){



            style+=

            `background:${info.color};`;



        }





        if(info.holiday){



            border=

            "border:3px solid #facc15;";


        }






        let extra="";



        if(

            info.extras

            &&

            info.extras.length>0

        ){



            extra=

            `

            <span class="extra-dot"></span>

            `;



        }





        return `


        <div

        class="${classes}"

        style="${style}${border}"

        onclick="Calendar.openDay('${info.date}')"

        >



        <div class="number">

        ${new Date(info.date).getDate()}

        </div>



        <div class="shift">

        ${info.name}

        </div>



        ${extra}



        </div>


        `;



    },









    /*
    ========================================================
    ABRIR DIA
    ========================================================
    */


    openDay:function(date){



        const info=

        Engine.getFullDayInfo(

            new Date(date),

            this.group

        );



        UI.openDay(

            info

        );


    },









    /*
    ========================================================
    CAMBIOS FECHA
    ========================================================
    */


    previousMonth:function(){



        this.month--;



        if(this.month<0){


            this.month=11;


            this.year--;


        }



        this.render();


    },






    nextMonth:function(){



        this.month++;



        if(this.month>11){


            this.month=0;


            this.year++;


        }



        this.render();


    },






    changeMonth:function(value){



        this.month=

        Number(value);



        this.render();


    },






    changeYear:function(value){



        this.year=

        Number(value);



        this.render();


    },








    /*
    ========================================================
    SELECTORES
    ========================================================
    */


    monthOptions:function(){



        const months=[

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

        ];



        return months.map(

            (m,i)=>


            `

            <option value="${i}"

            ${i===this.month?"selected":""}

            >

            ${m}

            </option>


            `


        )

        .join("");



    },








    yearOptions:function(){



        let html="";



        for(

            let y=

            CONFIG.MIN_YEAR;

            y<=CONFIG.MAX_YEAR;

            y++

        ){



            html+=`


            <option value="${y}"

            ${y===this.year?"selected":""}

            >


            ${y}


            </option>


            `;


        }



        return html;


    },







    setGroup:function(group){



        this.group=

        group;



        Storage.saveGroup(

            group

        );



        this.render();



    }



};






console.log(

"ERTZAINTZA Calendar cargado"

);