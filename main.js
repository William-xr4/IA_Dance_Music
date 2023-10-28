var img="";
var detect_object="";
var status="";
var objects=[];


function preload(){
    img=loadImage("car.jpg");
}

function setup(){
    canvas=createCanvas(1000, 600);
    canvas.center();
    detect_object=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Btn_status").innerHTML="Status: Detectando objeto(s)";
}

function modelLoaded(){
    console.log("Modelo carregado");
    status=true;
    detect_object.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
        console.log(results);
        objects=results;
}

function draw(){
    image(img, 0, 0, 1000, 600);

    if(status != ""){

        for(var inc=0; inc<objects.length; inc++){

            document.getElementById("Btn_status").innerHTML="status:Objeto(s) detectado(s).";
            fill("#00FFFF");
            percent=floor(objects[inc].confidence*100);
            text(objects[inc].label+" "+percent+"%", objects[inc].x, objects[inc].y);
            noFill();
            rect(objects[inc].x, objects[inc].y, objects[inc].width, objects[inc].height);
        }
    }
}