window.addEventListener("beforeunload", (e) => {
    if(!document.getElementById("save_status").innerHTML.includes("check-circle-fill.svg")) {
        e.preventDefault();
        e.returnValue = "";
    }
});

$(document).ready(() => {
    document.getElementById("printDoc").addEventListener("click", () => {
        document.getElementById("notPrinted").style.display = "none";
        window.print();
        document.getElementById("notPrinted").style.display = "initial";
    });


    function save_text_change() {
        let saveText = document.getElementById("save_status");
        saveText.innerHTML = `<img src="./SVGs/exclamation-circle-fill.svg" width="16px">&Tab;Not Saved`;
        saveText.classList.replace("text-success", "text-secondary");

        document.getElementById("page-area").removeEventListener("change", save_text_change);
    }
    document.getElementById("page-area").addEventListener("keydown", save_text_change);  

    addEventListener("keydown", (e) => {
        if(e.ctrlKey == true && (e.key == 'S' || e.key == 's')) {
            let saveText = document.getElementById("save_status");
            saveText.innerHTML = `<img src="./SVGs/check-circle-fill.svg" width="16px">&Tab;Tried Saving`;
            saveText.classList.replace("text-secondary", "text-success");

            document.getElementById("page-area").addEventListener("change", save_text_change);
        }
    });

    addEventListener("keydown", (e) => {
        if(e.ctrlKey == true && (e.key == 'p' || e.key == 'P')) {
            e.preventDefault();
            document.getElementById("printDoc").click();
        }
    });

    document.getElementById("readModeBtn").addEventListener("click", () => {
        let x = document.getElementById("readModeBtn");
        if(x.style.backgroundColor != "var(--orange_main_trans)") {
            x.style.backgroundColor = "var(--orange_main_trans)";
            x.title = "Disable Read Mode";
            document.getElementById("textFormattingToolbar").style.opacity = "0.45";
            document.getElementById("pageFormattingToolbar").style.opacity = "0.45";
            
            for(let x of document.querySelectorAll("#pageFormattingToolbar > div > button")) {
                x.setAttribute("disabled", false);
            }
        }
        else {
            x.style.backgroundColor = "#f8f9fa";
            x.title = "Enable Read Mode";
            document.getElementById("textFormattingToolbar").style.opacity = "1";
            document.getElementById("pageFormattingToolbar").style.opacity = "1";

            for(let x of document.querySelectorAll("#pageFormattingToolbar > div > button")) {
                x.removeAttribute("disabled");
            }
        }
        
        for(let x of document.getElementsByClassName("mainContent")) {
            x.toggleAttribute("contenteditable");
        }
    });

    document.getElementById("themeChanger").addEventListener("click", () => {
        document.getElementById("themeChangerInput").click();
    });

    document.getElementById("themeChangerInput").addEventListener("change", () => {
        let val = document.getElementById("themeChangerInput").value;
        document.documentElement.style.setProperty("--orange_main", val);
        document.getElementById("colorP").value = val;
        document.documentElement.style.setProperty("--orange_main_trans", val + "44");
        document.getElementById("themeDot").style.backgroundColor = val;
    });
});