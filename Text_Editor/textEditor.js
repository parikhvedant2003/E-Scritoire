$(document).ready(() => {
    window.addEventListener("scroll", () => {
        if(window.scrollY >= document.getElementById("menu").offsetHeight) {
            document.getElementById("toolbars").classList.add("fixed-top");
        } else { document.getElementById("toolbars").classList.remove("fixed-top"); }
    });

    let currentPage = 0;
    // By default, page is of A4 size
    let currHeight = "29.7cm", currWidth = "21cm";
    document.getElementById("executePageSize").addEventListener("click", () => {
        let selectedsize = document.getElementById("pageSizeOptions");
        
        let pageHeights = [], pageWidths = [];
        pageHeights["A4"] = "29.7cm";
        pageWidths["A4"] = "21cm";
        pageHeights["Legal"] = "35.56cm";
        pageWidths["Legal"] = "21.59cm";
        pageHeights["Tabloid"] = "43.18cm";
        pageWidths["Tabloid"] = "27.94cm";
        pageHeights["Letter"] = "27.94cm";
        pageWidths["Letter"] = "21.59cm";
        pageHeights["Executive"] = "26.67cm";
        pageWidths["Executive"] = "18.41cm";
        
        let height, width;
        if(selectedsize.value == "Custom") {
            height = document.getElementById("pageHeightSetter").value + "cm";
            width = document.getElementById("pageWidthSetter").value + "cm";
            currHeight = height;
            currWidth = width;
        } else {
            height = pageHeights[selectedsize.value];
            width = pageWidths[selectedsize.value];
            currWidth = width;
            currHeight = height;
        }

        document.querySelector(":root").style.setProperty("--page_height", height);
        let pages = document.getElementsByClassName("page");
        for(let i=0; i < pages.length; i++) {
            pages[i].style.minHeight = height;
            pages[i].style.maxHeight = height;
            pages[i].style.width = width;
        }
    });
    
    document.getElementById("pageSizeOptions").addEventListener("change", () => {
        let selectedsize = document.getElementById("pageSizeOptions");
        let customDiv = document.getElementById("customPageDimensionsDiv");
        if(selectedsize.value == "Custom") {
            customDiv.classList.remove("d-none");
        } else {
            customDiv.classList.add("d-none");
        }
    });

    let pageBGColor = "white";
    let recentBGColors = [];
    // Changing the Background Color of the page
    let colorDots = document.getElementsByClassName("colorDot");
    for(let  i=0; i < colorDots.length; i++) {
        colorDots[i].addEventListener("click", () => {
            let pages = document.getElementsByClassName("page");
            for(let j=0; j < pages.length; j++)
                pages[j].style.backgroundColor = colorDots[i].style.backgroundColor;
                pageBGColor = colorDots[i].style.backgroundColor;
        });
    }

    document.getElementById("pageBackgroundColorSetter").addEventListener("change", () => {
        let pages = document.getElementsByClassName("page");
            for(let j=0; j < pages.length; j++)
                pages[j].style.backgroundColor = document.getElementById("pageBackgroundColorSetter").value;
                pageBGColor = document.getElementById("pageBackgroundColorSetter").value;
    });

    // Insert an image
    document.getElementById("insertImageModalBtn").addEventListener("click", () => {
        let image = document.getElementById("insertImageSetter").files[0];
        let imgHolder = document.createElement("div");
        
        if(document.getElementById("imageObjective").checked) {
            let currPage = document.getElementsByClassName("page");
            for(let x of currPage)
                x.style.backgroundImage = `url("${URL.createObjectURL(image)}")`;
            return;
        }
        
        imgHolder.innerHTML += "<img src='" + URL.createObjectURL(image) + "' style='width: 90%; height: 100%;' class='img-holder-div-img'>";
        imgHolder.setAttribute("tabindex", "0");
        imgHolder.setAttribute("contenteditable", "false");
        imgHolder.style.resize = "both";
        imgHolder.style.border = "2px solid var(--orange_main)";
        imgHolder.style.width = "50%";
        imgHolder.classList.add("img-holder-div");    
        imgHolder.style.display = "flex";    
        
        // Remove Button
        let close = document.createElement("button");
        close.classList.add("btn", "btn-close", "imgRemover");
        close.setAttribute("onclick", "return this.parentElement.remove();");
        close.style.display = "none";
        imgHolder.appendChild(close);

        let tempDiv = document.createElement("div");
        tempDiv.append(imgHolder);
        document.execCommand("insertHTML", true, tempDiv.innerHTML);
        
        let afterspan = document.createElement("div");
        afterspan.innerHTML = "&nbsp;";
        afterspan.setAttribute("contenteditable", "true");
        afterspan.style.outline = "none";
        document.getElementsByClassName("mainContent")[currentPage].appendChild(afterspan);
    });

    let imgHolders = document.getElementsByClassName("img-holder-div");
    $("body").click(function(event) {
        if(event.target.classList.contains("img-holder-div-img")) {
            let target = event.target;
            target.parentElement.style.border = "2px solid var(--orange_main)";
            target.parentElement.style.resize = "both";
            target.parentElement.style.outline = "none";
            target.nextSibling.style.display = "inline-block";
        } else {
            for(let i=0; i < imgHolders.length; i++) {
                imgHolders[i].style.border = "none";
                imgHolders[i].style.resize = "none";
                document.querySelectorAll(".img-holder-div > button")[i].style.display = "none";
            }
        }
    });

    // Add a page
    function addPage(){
        let pageApp = document.createElement("div");
        pageApp.classList.add("page", "shadow", "border", "border-5", "p-3", "mx-auto");
        pageApp.style.width = currWidth;
        pageApp.style.minHeight = currHeight;
        pageApp.style.backgroundColor = pageBGColor;
        document.getElementById("page-area").appendChild(pageApp);
        pageApp.id = currentPage + 2;
        
        let page = document.createElement("div");
        page.classList.add("p-3", "mainContent");
        page.setAttribute("tabindex", "0");
        page.setAttribute("contenteditable", "true");
        page.style.outline = "none";
        pageApp.appendChild(page);
        page.focus();
        currentPage ++;

        applyPageBorders();
        document.getElementById("setTheme").click();
        pageApp.addEventListener("keyup", (e) => { autoaddPage(pageApp, e); });
        return pageApp.id;
    }

    document.getElementById("addAPage").addEventListener("click", () => {
        addPage();
    });

    // Get the active page
    let activePage;
    function getActivePage(className) {
        let activePage = document.activeElement;
        while(!activePage.classList.contains(className)) {
            activePage = activePage.parentElement;
            if(activePage.tagName == "body")
                return "";
        }

        return activePage.id;
    }

    // Automatically remove a page on backspace
    document.activeElement.addEventListener("keydown", (event) => {
        let activePage = getActivePage("page");
        if(activePage != "") {
            let page = document.getElementById(activePage);
            if(event.keyCode == 8 && (page.firstChild.childNodes.length == 1 && page.firstChild.childNodes[0].innerHTML == "") || page.firstChild.childNodes.length == 0 && page.id !== "01") {
                page.remove();
                currentPage --;
                
                let lastPage = document.querySelector(`.page:last-child > .mainContent > div:last-child`);
                lastPage.setAttribute("tabindex", "0");
                lastPage.focus();

            }
        }
    });

    
    // -----------------------------    PROPERTY CHANGES    -----------------------------------

    // Font functions
    function addColorDot(arr, MAXSIZE, color, dotClass, nodeString, ListenerFunc) {
        for(let x of arr)
            if(x.style.backgroundColor == color)
                return;
        
        let colorBox = document.querySelector(nodeString);
        if(arr.length > MAXSIZE - 1) {
            let first = arr.shift();
            first.remove();
        } 

        if(arr.length <= MAXSIZE) {
            let colorDotNew = document.createElement("span");
            colorDotNew.classList.add(dotClass);
            colorDotNew.style.backgroundColor = color;
            colorDotNew.style.marginRight = "5px";
            colorBox.appendChild(colorDotNew);
            arr.push(colorDotNew);

            colorDotNew.addEventListener("click", () => { ListenerFunc(colorDotNew) });
        }
    }

    // Font Highlight
    let defHighlightColor = "yellow";
    let recentHighlightColors = [];
    
    let colorHighlightDots = document.getElementsByClassName("colorHighlightDot");
    function highlightBtnFunc(ele) {
        defHighlightColor = ele.style.backgroundColor;
        document.getElementById("backColorBtn").style.backgroundColor = defHighlightColor;
    }
    
    for(let i=0; i < colorHighlightDots.length; i++) {
        colorHighlightDots[i].addEventListener("click", () => { highlightBtnFunc(colorHighlightDots[i]) });
    }
    document.getElementById("highlightColorSetter").addEventListener("change", () => {
        defHighlightColor = document.getElementById("highlightColorSetter").value;
        document.getElementById("backColorBtn").style.backgroundColor = defHighlightColor;
    });
    document.getElementById("execHighlight").addEventListener("click", () => {
        addColorDot(recentHighlightColors, 5, defHighlightColor, "colorHighlightDot", "#recentHighlights", highlightBtnFunc);
    });

    // Font Color
    let defFontColor = "lightcoral", recentFontColors = [];
    let colorFontDots = document.getElementsByClassName("colorFontDot");
    function fontColorBtnFunc(ele) {
        defFontColor = ele.style.backgroundColor;
        document.querySelector("#foreColorBtn > span").style.borderBottom = "2px solid " + defFontColor;
    }

    for(let i=0; i < colorFontDots.length; i++) {
        colorFontDots[i].addEventListener("click", () => { fontColorBtnFunc(colorFontDots[i]) });
    }
    document.getElementById("fontColorSetter").addEventListener("change", () => {
        defFontColor = document.getElementById("fontColorSetter").value;
        document.querySelector("#foreColorBtn > span").style.borderBottom = "3px solid " + defFontColor;
    });
    document.getElementById("execFontColor").addEventListener("click", () => {
        addColorDot(recentFontColors, 5, defFontColor, "colorFontDot", "#recentFontColors", fontColorBtnFunc);
    });
    document.getElementById("pageBackgroundColorBtn").addEventListener("click", () => {
        addColorDot(recentBGColors, 5, pageBGColor, "colorDot", "#recentBackgrounds", () => { return; });
    });

    // Font Formatting
    document.getElementById("decreaseFont").addEventListener("click", () => {
        let fontSize = document.getElementById("fontSizeDisplay");
        if(parseInt(fontSize.innerHTML) > 8) {
            fontSize.innerHTML = parseInt(fontSize.innerHTML) - 1;
            setFontSize(fontSize.innerHTML, "px");
        }
    });
    
    document.getElementById("increaseFont").addEventListener("click", () => {
        let fontSize = document.getElementById("fontSizeDisplay");
        if(parseInt(fontSize.innerHTML) < 72) {
            fontSize.innerHTML = parseInt(fontSize.innerHTML) + 1;
            setFontSize(fontSize.innerHTML, "px");    
        }
    });

    let setFontSize = function(size, unit) {
        let span = $("<span/>", { text: document.getSelection() }).css("font-size", size + unit).prop("outerHTML");
        document.execCommand("insertHTML", false, span);
    }

    let basicBtns = ["boldBtn", "italicBtn", "underlineBtn", "justifyLeft", "justifyRight", "justifyCenter", "justifyFull", "superscriptBtn", "subscriptBtn", "strikeThroughBtn", "foreColorBtn", "backColorBtn"];
    for(let x of basicBtns) {
        document.getElementById(x).addEventListener("click", () => {
            if(x == "foreColorBtn") {
                document.execCommand(x.replace("Btn", ""), false, defFontColor);
                return;
            }
            
            if(x == "backColorBtn") {
                document.execCommand(x.replace("Btn", ""), false, defHighlightColor);
                return;
            }
            
            document.execCommand(x.replace("Btn", ""));
        });
    }

    let basicBtnsKeys = ["B", "I", "U", "4", "6", "8", "2", "^", "#", "_", "7", "9"];
    document.getElementById("page-area").addEventListener("keydown", (e) => {
        if(e.ctrlKey == true && basicBtnsKeys.includes(e.key)) {
            e.preventDefault();
            let i = basicBtnsKeys.indexOf(e.key);
            document.getElementById(basicBtns[i]).click();
        }
    }, false);

    document.getElementById("URLSetter").addEventListener("click", () => {
        defURL = document.getElementById("URLValue").value;
        if(!defURL.startsWith("https://"))
            defURL = "https://" + defURL;
    });

    let defURL = "";
    document.getElementById("createLink").addEventListener("click", () => {
        if(document.getSelection().toString() != "")
            document.execCommand("createLink", true, defURL);    
    });

    let defFontStyle = "Calibri";
    document.getElementById("fontStyleSelector").addEventListener("change", () => {
        defFontStyle = document.getElementById("fontStyleSelector").value;
        if(document.getSelection)
            document.execCommand("fontName", false, defFontStyle);
    });



    // Page Borders
    let defBorder = { color: "black", width: "0.5px", style: "none", enable: { top: true, bottom: true, left: true, right: true } };

    document.getElementById("applyPageBorder").addEventListener("click", applyPageBorders);

    function applyPageBorders() {
        let pages = document.getElementsByClassName("mainContent");
        for(let page of pages) {
            page.style.borderLeft = (defBorder.enable.left) ? (defBorder.width + " " + defBorder.style + " " + defBorder.color) : "none";
            page.style.borderRight = (defBorder.enable.right) ? (defBorder.width + " " + defBorder.style + " " + defBorder.color) : "none";
            page.style.borderTop = (defBorder.enable.top) ? (defBorder.width + " " + defBorder.style + " " + defBorder.color) : "none";
            page.style.borderBottom = (defBorder.enable.bottom) ? (defBorder.width + " " + defBorder.style + " " + defBorder.color) : "none";
        }
    }

    let pageBorderDiv = document.getElementsByClassName("divbox");
    for(let i=0; i < pageBorderDiv.length; i++) {
        pageBorderDiv[i].addEventListener("click", () => {
            let curr = pageBorderDiv[i];
            curr.classList.add("divbox-selected");
            defBorder.style = curr.style.borderStyle;
            
            // Remove other selections
            for(let j=0; j < pageBorderDiv.length; j++) {
                if(j != i && pageBorderDiv[j].classList.contains("divbox-selected")) {
                    pageBorderDiv[j].classList.remove("divbox-selected");
                } 
            }
        });
    }

    document.getElementById("pageBorderSelect").addEventListener("change", () => { defBorder.width = $("#pageBorderSelect").val(); });
    
    document.getElementById("pageBorderColorSelect").addEventListener("change", () => { defBorder.color = $("#pageBorderColorSelect").val(); });

    for(let dir of document.getElementsByClassName("page-border-dir-enable")) {
        dir.addEventListener("change", () => {
            let direction = dir.id.replace("Border", "");
            defBorder.enable[direction] = !defBorder.enable[direction];
        });
    }

    function autoaddPage(x, e) {
        if(e.keyCode < 32 && e.keyCode > 127)
            return;

        let currPage = getActivePage("page");
        if(x.firstElementChild.clientHeight < x.firstElementChild.scrollHeight) {
            let lastDiv = document.querySelector(`div[id="${currPage}"] > .mainContent > div:last-child`);
            lastDiv.innerHTML = lastDiv.innerHTML.slice(0, -1);

            newPage = addPage();
            let div = document.createElement("div");
            document.querySelector(`div[id="${newPage}"] > .mainContent`).appendChild(div);
            
            if(e.keyCode < 32 && e.keyCode > 127)
                return;
            else
                document.querySelector(`div[id="${newPage}"] > .mainContent > div:first-child`).innerHTML += e.key;
            return;
        }
    }

    for(let x of document.getElementsByClassName("page")) {
        x.addEventListener("keyup", (e) => { autoaddPage(x, e) });
    }


    // Themes for pages
    let themes = document.getElementsByClassName("divbox2");
    let currSelected = themes[3];
    for(let x of themes) {
        x.addEventListener("click", () => {
            x.firstElementChild.classList.add("divbox-selected2");
            currSelected = x;
            document.getElementById("sayThemeId").innerHTML = currSelected.id;
            for(let y of themes) {
                if(y != x && y.firstElementChild.classList.contains("divbox-selected2"))
                    y.firstElementChild.classList.remove("divbox-selected2");
            }
        });
    }

    document.getElementById("colorP").addEventListener("change", () => {
        let x = document.documentElement;
        x.style.setProperty("--colorP", document.getElementById("colorP").value);
    });
    document.getElementById("colorS").addEventListener("change", () => {
        let x = document.documentElement;
        x.style.setProperty("--colorS", document.getElementById("colorS").value);
    });

    document.getElementById("setTheme").addEventListener("click", () => {
        document.getElementById(currSelected.id).click();
    });

    document.getElementById("Classic").addEventListener("click", () => {
        let page = document.getElementsByClassName("page");
        for(let x of page) {
            x.style.setProperty("background-image", "linear-gradient(315deg, var(--colorP), var(--colorS))");
            x.firstElementChild.style.backgroundColor = "white";
        }
    });

    document.getElementById("SolarDark").addEventListener("click", () => {
        let page = document.getElementsByClassName("page");
        for(let x of page) {
            x.style.setProperty("background-image", "linear-gradient(315deg, var(--colorP), var(--colorS))");
            x.firstElementChild.style.backgroundColor = "transparent";
        }
    });

    document.getElementById("TwoShades").addEventListener("click", () => {
        let page = document.getElementsByClassName("page");
        for(let x of page) {
            x.style.setProperty("background-image", "linear-gradient(315deg, var(--colorP) 50%, var(--colorS) 50%)");
            x.firstElementChild.style.backgroundColor = "transparent";
        }
    });

    document.getElementById("Plain").addEventListener("click", () => {
        let page = document.getElementsByClassName("page");
        for(let x of page) {
            x.style.backgroundImage = "none";
            x.firstElementChild.style.backgroundColor = "white";
        }
    });
});