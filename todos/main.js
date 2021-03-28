$(function() {

    let arr = [],
    id = 0,
    btn = $("#mainMarker"),
    getter = document.getElementById('task');
 
    
    // LEFT COUNTER
    function itemsLeft() {
        let count = 0;
        if (arr.length) {
            arr.forEach(obj => {     
                if (!obj.isChecked) { count++ };
                $("#outputField").text(
                    `${count} items left`
                ) 
            }); 
        } else {
            $("#outputField").text(
                `0 items left`
            ) 
        };
    };

    // INPUT
    $("#taskInput").keyup(function(event) {    

        let obj = {
            name:$("#taskInput").val(),
            id: id,
            isChecked: false,
     
        };

        if((event.keyCode == 13) && (obj.name != "")) {
            arr.push(obj);

            $("#task").append($(`
            <li class="task__listik" id="list${obj.id}">
            <input type = "text" id="rewrite${obj.id}" class="rewrite hidden">
            <input type="checkbox" id="${obj.id}"/>
            <span id="span${obj.id}" class="inactive onDblClick">${obj.name}</span>
            <button class="hidden" id="button${obj.id}">delete</button></li>
            `));

            id++;
            $("#taskInput").val("");
            console.log(arr);
            itemsLeft();
            btnCheck();
        };
        
    });

    // TOGGLE SOLO CHECKBOXES, CLICK ON DEL BUTT
    getter.onclick = function(e) {
        // debugger
        document.getElementById.innerHTML = e.target.id;
        console.log(e.target.id);
 
        arr.forEach(obj => {
            // debugger
            if (obj.id === +e.target.id) { 

                if (!obj.isChecked) {
                    obj.isChecked = true;
                    $("#span"+e.target.id).toggleClass("active").removeClass("inactive"); 
                } else {
                    obj.isChecked = false;
                    $("#span"+e.target.id).toggleClass("inactive").removeClass("active"); 
                }

            };  

            if ("button"+obj.id === e.target.id) {
                // debugger
                obj.status = "deleted";

                let neededInd = arr.findIndex(obj => obj.status === "deleted");
                    $("#list"+obj.id).remove();
                    arr.splice(neededInd, 1)
    
            };  

        });
        itemsLeft();   
        btnCheck();
    };

    //ENABLE-DISABLE MARKER
    function btnCheck() {
        let count = 0
        arr.forEach(obj => {
           if(obj.isChecked) {count++}
       }); 
       if (arr.length == count) {btn.prop("disabled", true); $(".markimg").addClass("transparent35")}
        else {btn.prop("disabled", false); $(".markimg").removeClass("transparent35")};
       console.log(count)
       if (arr.length === 0) {$(".main__bottom").addClass("hidden"); $(".main__inputMark").addClass("hidden");
        } else {$(".main__bottom").removeClass("hidden"); $(".main__inputMark").removeClass("hidden")}
    };
    btnCheck();
    
    //MARKER
    btn.click(function() {

        arr.forEach(obj => {

            if (!($("#"+obj.id).prop("checked"))) {
                $("#span"+obj.id).toggleClass("active").removeClass("inactive");
                $("#"+obj.id).prop("checked", true);
                obj.isChecked = true;
            }

            
            // else if (($("#"+obj.id).prop("checked"))){
                
            // }
            
            // else {
            //     $("#span"+obj.id).toggleClass("inactive").removeClass("active");
            //     $("#"+obj.id).prop("checked", false);
            //     obj.isChecked = false;
            // } 
            
            // if($("input:checkbox").prop("checked")) {
            //     $("#span"+obj.id).toggleClass("inactive").removeClass("active");
            //     $("#"+obj.id).prop("checked", false);
            //     obj.isChecked = false;
            // } else {
            //     $("#span"+obj.id).toggleClass("active").removeClass("inactive");
            //     $("#"+obj.id).prop("checked", true);
            //     obj.isChecked = true;
            // }

        });
        btnCheck();
        itemsLeft();
    });
    
    //FILTERS
    $(".main__filter_active").click(function() {

        arr.forEach(obj => {
            if (obj.isChecked) { 
                $("#list"+obj.id).addClass("hidden");
            } else {
                $("#list"+obj.id).removeClass("hidden");
            }
        });

    });
    $(".main__filter_done").click(function() {

        arr.forEach(obj => {
            if (!obj.isChecked) { 
                // $("#list"+obj.id).css("display", "block");
                $("#list"+obj.id).addClass("hidden");
            } else {
                $("#list"+obj.id).removeClass("hidden")
            }
                           
        });
    });
    $(".main__filter_all").click(function() {

        arr.forEach(obj => {
            $("#list"+obj.id).removeClass("hidden");
        });
    });

    // CLEAN COMPLETED
    $(".main__cleaner").click(function() {
        //let needToDelete = arr.filter(obj => obj.isChecked === true)
        for (let i=0; i< 10; i++ ){
            arr.forEach(obj => {
                if(obj.isChecked){
                    obj.status = "deleted";
            

                    let neededInd = arr.findIndex(obj => obj.status === "deleted");
                    $("#list"+obj.id).remove();
                    arr.splice(neededInd, 1)

                    // $("#list"+obj.id).remove();
                    // arr.splice(0, 1)
                };
            
            });
        };
        btnCheck();
    });

    //RENAME
    getter.ondblclick = (function(e) {
        document.getElementById.innerHTML = e.target.id;
        
        arr.forEach(obj => {
            
            if ("span"+obj.id === e.target.id || "list"+obj.id === e.target.id) { 
                
                inputVal = obj.name
                $("#rewrite"+obj.id).removeClass("hidden").val(inputVal);
                $("#"+obj.id).addClass("hidden");
                $("#span"+obj.id).addClass("hidden");


                $("#rewrite"+obj.id).keyup(function(event){
                    if((event.keyCode == 13) && (obj.name != "") || (event.keyCode == 27)) {
                        obj.name = $("#rewrite"+obj.id).val()

                        $("#span"+obj.id).text(obj.name)

                        console.log(arr);

                        $("#rewrite"+obj.id).addClass("hidden");
                        $("#"+obj.id).removeClass("hidden");
                        $("#span"+obj.id).removeClass("hidden");

                        
                        // getter.onclick(function(e) {
                        //     document.getElementById.innerHTML = e.target.id;
                        //     if (e.target.id != "rewrite"+obj.id) {
                        //         $("#rewrite"+obj.id).addClass("hidden");
                        //         $("#"+obj.id).removeClass("hidden");
                        //         $("#span"+obj.id).removeClass("hidden");
                        //     }
                        // });

                    };

                });

                // $("#rewrite"+obj.id).keyup(function(event){
                //     if((event.keyCode == 27) && (obj.name != "")) {

                //         $("#rewrite"+obj.id).addClass("hidden");
                //         $("#"+obj.id).removeClass("hidden");
                //         $("#span"+obj.id).removeClass("hidden");
                //     };
                // });

            };

        });
    });

    //BUT DELETE
    getter.onmouseover = (function(e) {

        document.getElementById.innerHTML = e.target.id;

        arr.forEach(obj => {

            if ("list"+obj.id === e.target.id || "span"+obj.id === e.target.id || obj.id === +e.target.id || 
            "button"+obj.id === e.target.id || "rewrite"+obj.id === e.target.id) { 

                $("#button"+obj.id).removeClass("hidden");

            }; 
        });

    });
    getter.onmouseout = (function(e) {
        document.getElementById.innerHTML = e.target.id;

        arr.forEach(obj => {
            
            if ("list"+obj.id === e.target.id || "span"+obj.id === e.target.id || obj.id === +e.target.id || 
            "button"+obj.id === e.target.id || "rewrite"+obj.id === e.target.id) { 

                $("#button"+obj.id).addClass("hidden");
               
            }; 
        });

    });

}); 