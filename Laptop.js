img2 = "";
status1 = "";
objects = [];   

function preload() {
    img2 = loadImage("isolated-laptop-empty-space-on-260nw-613755491.webp");
}

function setup() {
    canvas = createCanvas(700, 500);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("ModelLoaded!");
    status1 = true;
    objectDetector.detect(img2, gotResult);
}

function draw() {
    image(img2, 0, 0, 700, 500);
    if (status1 != "") {
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            percent = floor(objects[i].confidence * 100);
            fill("red");
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            stroke("red");
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
}
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}