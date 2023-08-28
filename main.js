Status = ""
img = ""
objects = []

function preload() {
    img = loadImage("dog_cat.jpg")
}



function setup() {
    canvas = createCanvas(640, 420)
    canvas.center()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Object Detecting"
}

function modelLoaded() {
    console.log("The model is loaded")
    Status = true;
    objectDetector.detect(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        objects = results
    }
}

function draw() {
    image(img, 0, 0, 640, 420)

    if (Status != "") {

        for (i = 0; i < objects.length; i++) {

            document.getElementById("status").innerHTML = "Object Detected"

            fill("#ff0000")
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+ " "+percent +"%", objects[i].x+7, objects[i].y+13)
            noFill()
            stroke("#ff0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }



    /* fill("#ff0000")
    text("cat", 325, 90)
    noFill()
    stroke("#ff0000")
    rect(320,78, 250, 330)*/


}