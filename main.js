var viewerOpen = false;

document.getElementById("viewerToggler").addEventListener("click", toggleViewer);

function toggleViewer() {

    var button = document.getElementById("viewerToggler");

    if(viewerOpen == true) {

        destroyViewer();
        button.innerHTML = "Open PDF";
        viewerOpen = false;

    } else {

        createViewer();
        button.innerHTML = "Close PDF";
        viewerOpen = true;
    }

}

function createViewer() {
    
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

function destroyViewer() {
    
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

function PageBack() {
    //TODO
}

function PageNext() {
    //TODO
}

function ZoomIn() {
    //TODO
}

function ZoomOut() {
    //TODO
}