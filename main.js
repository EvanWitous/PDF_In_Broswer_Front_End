var viewerOpen = false;
var arrayOfPages = new Array();
var pageOffset = 0;

document.getElementById("viewerToggler").addEventListener("click", ToggleViewer);
document.getElementById("viewerToggler").style.overflow = "hidden";

function ToggleViewer() {

    var button = document.getElementById("viewerToggler");

    if(viewerOpen == true) {

        DestroyViewer();
        arrayOfPages = new Array();
        button.innerHTML = "Open PDF";
        viewerOpen = false;

    } else {

        CreateViewer();
        ViewerSizeAdjust();
        LoadPages();
        DisplayPages();
        button.innerHTML = "Close PDF";
        viewerOpen = true;
    }

}

function CreateViewer() {
    
    //Creates Container
    var container = document.createElement("div");
    container.setAttribute("id", "viewer");
    document.body.appendChild(container);

    //Create toolbar
    var toolbar = document.createElement("div");
    toolbar.setAttribute("id", "toolbar");
    document.getElementById("viewer").appendChild(toolbar);

    //Create nav buttons
    var backPage = document.createElement("button");
    backPage.setAttribute("id", "backPage");
    document.getElementById("toolbar").appendChild(backPage);
    document.getElementById("backPage").innerHTML = "&#10096;";
    document.getElementById("backPage").addEventListener("click", PageBack);

    var nextPage = document.createElement("button");
    nextPage.setAttribute("id", "nextPage");
    document.getElementById("toolbar").appendChild(nextPage);
    document.getElementById("nextPage").innerHTML = "&#10097;";
    document.getElementById("nextPage").addEventListener("click", PageNext);

    var zoomIn = document.createElement("button");
    zoomIn.setAttribute("id", "zoomIn");
    document.getElementById("toolbar").appendChild(zoomIn);
    document.getElementById("zoomIn").innerHTML = "Zoom In";
    document.getElementById("zoomIn").addEventListener("click", ZoomIn);

    var zoomOut = document.createElement("button");
    zoomOut.setAttribute("id", "zoomOut");
    document.getElementById("toolbar").appendChild(zoomOut);
    document.getElementById("zoomOut").innerHTML = "Zoom Out";
    document.getElementById("zoomOut").addEventListener("click", ZoomOut);

    //Create canvas
    var pdfcanvas = document.createElement("canvas");
    pdfcanvas.setAttribute("id", "pdfcanvas");
    document.getElementById("viewer").appendChild(pdfcanvas);
}

function DestroyViewer() {
    
    //Getting elements
    var viewer = document.getElementById("viewer");
    var toolbar = document.getElementById("toolbar");
    var backPage = document.getElementById("backPage");
    var nextPage = document.getElementById("nextPage");
    var zoomIn = document.getElementById("zoomIn");
    var zoomOut = document.getElementById("zoomOut");
    var pdfcanvas = document.getElementById("pdfcanvas");

    //Clearing event listeners
    backPage.removeEventListener("click", PageBack);
    nextPage.removeEventListener("click", PageNext);
    zoomIn.removeEventListener("click", ZoomIn);
    zoomOut.removeEventListener("click", ZoomOut);

    //Deleting elements
    pdfcanvas.remove();
    zoomIn.remove();
    zoomOut.remove();
    nextPage.remove();
    backPage.remove();
    toolbar.remove();
    viewer.remove();

}

function ViewerSizeAdjust() {
    //Get elements
    var viewer = document.getElementById("viewer");
    var toolbar = document.getElementById("toolbar");
    var pdfcanvas = document.getElementById("pdfcanvas");
    
    //Set dimensions
    viewer.width = window.innerWidth;
    toolbar.width = viewer.width;
    pdfcanvas.width = viewer.width;
    pdfcanvas.height = window.innerHeight;

    //Prevent spilling of elements
    viewer.style.overflow = "hidden";
    toolbar.style.overflow = "hidden";
    pdfcanvas.style.overflow = "hidden";
}

function PageBack() {
    //Adjust current page offset
    if(pageOffset > -1) {

        pageOffset--;
        DisplayPages();
    }

    console.log(pageOffset);
}

function PageNext() {
    //Adjust current page offset
    if(pageOffset < arrayOfPages.length-1) {

        pageOffset++;
        DisplayPages();
    }

    console.log(pageOffset);
}

function ZoomIn() {
    //TODO
}

function ZoomOut() {
    //TODO
}

function LoadPages() {
    
    //Add pages into array
    for(var x = 1; x <= 5; x++) {
        arrayOfPages[x-1] = new Image();
        arrayOfPages[x-1].src = "testpage" + x + ".png";
    }
}

function DisplayPages() {
    //Getting elements
    var pdfcanvas = document.getElementById("pdfcanvas");
    var context = pdfcanvas.getContext("2d");

    //Clearing Canvas
    context.fillStyle = window.getComputedStyle(pdfcanvas, null).getPropertyValue("background-color");
    context.fillRect(0, 0, pdfcanvas.width, pdfcanvas.height);

    //Drawing pages to canvas
    for(var x = 1; x <= arrayOfPages.length; x++) {
        context.drawImage(arrayOfPages[x-1], (arrayOfPages[x-1].width + 20) * (-pageOffset+x-1), 0);
    }
}