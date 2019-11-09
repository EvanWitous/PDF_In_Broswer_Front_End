var viewerOpen = false;
var arrayOfPages = new Array();
var pageOffset = 0;
var zoomLevel = 100;
var scrollY = 0;
var scrollX = 0;

document.getElementById("viewerToggler").addEventListener("click", ToggleViewer);
document.getElementById("viewerToggler").style.overflow = "hidden";

document.addEventListener("keydown", (event) => {

    const keyName = event.key;

    if(keyName === "[") {

        PageBack();

    } else if(keyName === "]") {

        PageNext();

    } else if(keyName === "ArrowLeft") {

        ScrollLeft();

    } else if(keyName === "ArrowRight") {

        ScrollRight();
    
    } else if(keyName === "ArrowUp") {

        ScrollUp();

    } else if(keyName === "ArrowDown") {

        ScrollDown();

    }


}, false);

function ToggleViewer() {

    var button = document.getElementById("viewerToggler");

    if(viewerOpen == true) {

        DestroyViewer();
        arrayOfPages = new Array();
        button.innerHTML = "Open PDF";
        viewerOpen = false;

    } else {

        CreateViewer();
        LoadPages();
        ViewerSizeAdjust();
        button.innerHTML = "Close PDF";
        viewerOpen = true;
    }
}

function CreateViewer() {

    //Creates Container
    var container = document.createElement("div");
    container.setAttribute("id", "viewer");
    document.body.appendChild(container);
    document.getElementById("viewer").style.position = "fixed";

    //Create toolbar
    var toolbar = document.createElement("div");
    toolbar.setAttribute("id", "toolbar");
    document.getElementById("viewer").appendChild(toolbar);

    //Create nav buttons
    var refresher = document.createElement("button");
    refresher.setAttribute("id", "refresher");
    document.getElementById("toolbar").appendChild(refresher);
    document.getElementById("refresher").innerHTML = "Refresh";
    document.getElementById("refresher").addEventListener("click", ViewerSizeAdjust);

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
    var refresher = document.getElementById("refresher");
    var backPage = document.getElementById("backPage");
    var nextPage = document.getElementById("nextPage");
    var zoomIn = document.getElementById("zoomIn");
    var zoomOut = document.getElementById("zoomOut");
    var pdfcanvas = document.getElementById("pdfcanvas");

    //Clearing event listeners
    refresher.removeEventListener("click", ViewerSizeAdjust);
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
    refresher.remove();
    toolbar.remove();
    viewer.remove();
}

function ViewerSizeAdjust() {
    //Get elements
    var widget = document.getElementById("viewerToggler");
    var viewer = document.getElementById("viewer");
    var toolbar = document.getElementById("toolbar");
    var pdfcanvas = document.getElementById("pdfcanvas");
    
    //Set dimensions
    widget.width = window.innerWidth;
    viewer.width = widget.width;
    toolbar.width = viewer.width;
    pdfcanvas.width = viewer.width + arrayOfPages[pageOffset].width;
    pdfcanvas.height = window.innerHeight + arrayOfPages[pageOffset].height;

    //Prevent spilling of elements
    widget.style.overflow = "hidden";
    viewer.style.overflow = "hidden";
    toolbar.style.overflow = "hidden";
    pdfcanvas.style.overflow = "hidden";

    scrollX = 0;
    scrollY = 0;

    //Draw to new veiwer
    DisplayPages();
}

function PageBack() {
    //Adjust current page offset
    if(pageOffset > 0 && viewerOpen == true) {

        pageOffset--;
        DisplayPages();
    }
}

function PageNext() {
    //Adjust current page offset
    if(pageOffset < arrayOfPages.length-1 && viewerOpen == true) {

        pageOffset++;
        DisplayPages();
    }
}

function ZoomIn() {
    
    if(zoomLevel <= 400) {

        zoomLevel *= 2;
        scrollY *= 2;
        scrollX *= 2;
        DisplayPages();
    }
}

function ZoomOut() {
    
    if(zoomLevel >= 50) {

        zoomLevel /= 2;

        scrollY = Math.max(scrollY/2, (-arrayOfPages[pageOffset].height * (zoomLevel/100)) + window.innerHeight - 130);
        scrollX = Math.max(scrollX/2, (-arrayOfPages[pageOffset].width * (zoomLevel/100)) + window.innerWidth - 20);

        if(scrollY > 0) {

            scrollY = 0;
        }

        if(scrollX > 0) {

            scrollX = 0;
        }

        DisplayPages();
    }
}

function ScrollUp() {

    if(viewerOpen == true) {
        
        if(scrollY < 0) {

            scrollY += 10;
            DisplayPages();
        }
    }
}

function ScrollDown() {

    if(viewerOpen == true) {
    
        if(scrollY > (-arrayOfPages[pageOffset].height * (zoomLevel/100)) + window.innerHeight - 130) {

            scrollY -= 10;
            DisplayPages();
        }
    }
}

function ScrollLeft() {
    
    if(viewerOpen == true) {

        if(scrollX < 0) {

            scrollX += 10;
            DisplayPages();
        }
    }
}

function ScrollRight() {

    if(viewerOpen == true) {

        if(scrollX > (-arrayOfPages[pageOffset].width * (zoomLevel/100)) + window.innerWidth - 20) {

            scrollX -= 10;
            DisplayPages();
        }
    }
}

function LoadPages() {
    //Add pages into array
    for(var x = 1; x <= 5; x++) {
        
        arrayOfPages[x-1] = new Image();
        arrayOfPages[x-1].src = "testresources/testpage" + x + ".png";
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
        
        context.drawImage(arrayOfPages[x-1], (arrayOfPages[x-1].width * (zoomLevel/100) + 20) * (-pageOffset+x-1) + 10 + scrollX, 10 + scrollY, arrayOfPages[x-1].width * (zoomLevel/100), arrayOfPages[x-1].height * (zoomLevel/100));
    }
}