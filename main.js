objects = [""];
status = "";
input = "";

function preload() {

}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380)
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modeLoaded);
    document.getElementById("status").innerHTML = "STATUS : DETECTNG OBJECTS";


    object_name = document.getElementById("object_found").value;

}

function modeLoaded() {
    console.log("model loadded");

    status = "true";

}

function gotResult(error, results) {
    if (error) {
        console.log(error);

    } else {
        objects = results;
        console.log(objects);
    }
}


function draw() {
    image(video, 0, 0, 480, 380);

    if (status != "") {


        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)

        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("black");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);

            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = object_name + "found";
                utterThis = new SpeechSynthesisUtterance(object_name + "found");
                synth.speak(utterThis);


            } else {
                document.getElementById("status").innerHTML = "Object not found";
            }
        }


    }
}