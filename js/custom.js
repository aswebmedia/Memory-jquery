var cartaAixecada = "";
var contenidorCartaAixecada = "";
var contador = 0;
var trobats = 0;
var numCards = 0;
var arrayPaths = [];
// Timer speed in milliseconds
var incrementTime = 70;
// Current timer position in milliseconds
var currentTime = 0;
    



var main = function() {
        
        cartaAixecada = "";
        contenidorCartaAixecada = "";
        contador = 0;
        trobats = 0;
        numCards = 0;
        arrayPaths = [];
        incrementTime = 70;
        currentTime = 0;
        $("img").remove();
        $("#container div").remove();
        $("#trobats span").html("0");



        $("#loading").show();
          $.get("memory.xml",{}, function (xml) {
           
            $('card',xml).each(function() {
              //Per cada path que trobem el posem dos cops a l'array (imatges repetides)
              arrayPaths.push($(this).find('path').text());
              arrayPaths.push($(this).find('path').text());
            });
            numCards = arrayPaths.length/2;
            //Desordenem l'array
            arrayPaths.sort(function() { return 0.5 - Math.random(); });
            //Recorrem l'array desordenat i creem les cartes amb els seus contenidors
            for (i=0; i<arrayPaths.length; i++){
                index = i+1;
                $('<div/>',{'class': 'box'}).attr('id', "imgContainer" + index).appendTo($('#container'));
                $('<img/>',{'src': arrayPaths[i]}).appendTo($("#imgContainer" + index));
            }
            $("img").hide();
            $("#container div").click(obreCarta);
            $("#loading").hide();

          });

      };


      function obreCarta() {
          
          id = $(this).attr("id");
          //si la imatge del contenidor tocat esta amagada...
          if ($("#"+id+" img").is(":hidden")) {
            //Desvinculem la funció als contenidors per poguer fer la comprobació primer abans de que piquin altre cop...
            $("#container div").unbind("click", obreCarta);
            //mostrem la image
            $("#"+id+" img").slideDown('fast');
            //Si es la primera aixecada de la parella
            if (cartaAixecada === "") {
              //associem el id a la variable
              contenidorCartaAixecada = id;
              //associem el path a la variable
              cartaAixecada = $("#"+id+" img").attr("src");
              //un cop associada la imatge aixecada tornem a vincular a la funció (li donem 300ms)
              setTimeout(function() {
                    $("#container div").bind("click", obreCarta);
                }, 300);
            }
            //si ja hi ha una carta aixecada
            else {
              //definim la actual que es la que acaben d'apretar
              cartaAixecadaActual = $("#"+id+" img").attr("src");
              if (cartaAixecada != cartaAixecadaActual) {
                  setTimeout(function() {
                      //amaguem les dos cartes ja que son diferents
                      $("#"+id+" img").fadeOut('fast');
                      $("#"+contenidorCartaAixecada+" img").fadeOut('fast');
                      contenidorCartaAixecada = "";
                      cartaAixecada = "";
                  }, 400); //les cartes estaran obertes 4ms
              } else {
                  // l'hem trobat posem opacitat a les trobades
                  setTimeout(function() {
                    $("#"+contenidorCartaAixecada+" img").css("opacity", "0.3");
                    $("#"+id+" img").css("opacity", "0.3");
                    trobats++;
                    $("#trobats span").html(trobats);
                    var copia = $("#"+id+" img").clone().css("opacity", "0.9");
                    copia.appendTo("#trobatsContainer");
                    contenidorCartaAixecada = "";
                    cartaAixecada = "";

                    if (trobats == numCards){
                      msg = '<span id="msg">Felicitats! Has guanyat </span>';
                      $("#msg").prepend(msg);
                    }

                  }, 300); //les cartes estaran obertes 4ms
                  
              }
              
              setTimeout(function() {
                  $("#container div").bind("click", obreCarta);
              }, 400);
            }
            

           
            
          }

        }

      $(document).ready(main);
