let one;
let two;
let three;
let camera;
let bodyPose;
let con;
let poses = [];
let noseX;
let singlePose;
let noseY;

// Flag to keep track of the selected button
let selectedImage = '2dog.png'; // Default image

// Ensure the DOM is fully loaded before accessing elements
document.addEventListener("DOMContentLoaded", function () {
    let b1 = document.querySelector(".one");
    let b2 = document.querySelector(".two");

    b1.addEventListener("click", () => {
        b1.style.backgroundColor = "red"; // Change background color to red
        b2.style.backgroundColor = "yellow";
        selectedImage = '1dog.png'; // Update the selected image to '1dog.png'
        one = loadImage(selectedImage); // Load the new image
    });

    b2.addEventListener("click", () => {
        b2.style.backgroundColor = "green"; // Change background color to green
        b1.style.backgroundColor = "yellow";
        selectedImage = '2dog.png'; // Update the selected image to '2dog.png'
        one = loadImage(selectedImage); // Load the new image
    });
});

// Preload the bodyPose model
function preload() {
    bodyPose = ml5.bodyPose(modelLoaded); // Callback when the model is loaded
}

function setup() {
    createCanvas(800, 500);
    camera = createCapture(VIDEO);
    camera.size(640, 480);
    camera.hide();
    
    one = loadImage('2dog.png'); // Set default image to '2dog.png'
}

// Callback function when the model is loaded
function modelLoaded() {
    console.log("Model Loaded!");
    // Start detecting poses in the webcam video
    bodyPose.detectStart(camera, gotPoses);
    // Get the skeleton connection information
    con = bodyPose.getSkeleton();
}

function gotPoses(results) {
    // Store the model's results in a global variable
    console.log(results);
    poses = results;

    if (results.length > 0) {
        singlePose = results[0];
        noseX = singlePose.nose.x;
        noseY = singlePose.nose.y;
        console.log(noseX + " " + noseY);
    }
}

function draw() {
    image(camera, 0, 0, 1000, 500);
    if (one) {
        // Draw the image at different positions based on the selected image
        if (selectedImage === '1dog.png') {
            image(one, noseX + 40, noseY - 160, 300, 300); // Position for '1dog.png'
        } else if (selectedImage === '2dog.png') {
            image(one, noseX + 100, noseY - 50, 200, 70); // Position for '2dog.png'
        }
    }
}






