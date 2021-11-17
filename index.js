"use strict";

$(document).ready(() => {
    // Set the custom mouse pointer
    let customMousePointer = document.getElementById("cursor_svg");
    window.addEventListener("mousemove", (event) => {
        event = event || window.event;
        customMousePointer.style.top = event.pageY + "px";
        customMousePointer.style.left = event.pageX + "px";
    });

    const load_first_time = () => {
        let load_screen = document.getElementById("loading_screen");
        let load_screen_spinner = $("#loading_screen > .spinner-border");

        setTimeout(() => {
            $("#loading_screen > h2").eq(0).fadeIn("slow");
            $("#loading_screen > h2").eq(1).fadeIn("slow");
        }, 1000);

        // Animate the spinner
        load_screen_spinner.css("font-size", "+=25px");
        load_screen_spinner.removeClass("top-50");
        load_screen_spinner.animate({
            top: "75%",
            fontSize: "-=25px"
        });
        
        const slide_up = function() {
            $("#loading_screen").slideUp("slow");
        }
        setTimeout(slide_up, 4000);
        setTimeout(() => {document.body.style.overflowY = "hidden"}, 0);
        setTimeout(() => {document.body.style.overflowY = "scroll"}, 4000);
    }
    
    // Show the loader
        load_first_time();

    // ------------------------------------------------------------------------------------------------------------------
    // Make Headings Appear
    function makeHeadingAppear(id_name) {
        let heading = document.getElementById(id_name);
        $("#" + id_name).slideDown("slow");
    };
    
    let i=0;
    setInterval(() => {
        let text_content;
        if(i == 0) {
            text_content = "Create.";
            $("#animated_slideup_text").text(" ");
        }
        else if(i == 1)
            text_content = " Schedule.";
        else if(i == 2)
            text_content = " Repeat.";
        
        $("#animated_slideup_text").text($("#animated_slideup_text").text() + text_content).slideDown("slow");
        
        (i == 2) ? (i = 0) : i++;
    }, 1000);

    // Scrolling effects
    $(window).scroll(() => {
        // Scrollbar effect
        if(window.scrollY >= 0) {
            let prog_bar_top = document.getElementById("page_fill_bar");
            prog_bar_top.classList.remove("bg-dark");
            $("#page_fill_bar").css("background-color", "royalblue").css("width", ((document.body.scrollTop || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100) + "%");
        } else {
            let prog_bar_top = document.getElementById("page_fill_bar");
            prog_bar_top.classList.add("bg-dark");
        }

        // Change the navbar properties on scroll
        let navbar = document.getElementById("menu");
        let carousel = document.getElementById("introCarousel");
        if(window.scrollY >= 20 && window.scrollY < (carousel.offsetTop + carousel.offsetHeight)) {
            navbar.style.transition = "0.5s";
            navbar.classList.remove("navbar-dark", "bg-dark");
            navbar.classList.add("navbar-light", "bg-light", "shadow", "fixed-top");
        } else if(window.scrollY <= 1) {
            navbar.classList.add("navbar-dark", "bg-dark");
            navbar.classList.remove("navbar-light", "bg-light", "shadow", "fixed-top");
        } 
        else if(window.scrollY >= (carousel.offsetTop + carousel.offsetHeight)) {
            navbar.classList.add("navbar-dark");
            navbar.classList.remove("navbar-light", "bg-light");
            navbar.style.backgroundColor = "#FF7F27";
        }
    });

    // Show the card content for the team member cards
    function showContent(contentClass, i) {
        let content = document.getElementsByClassName(contentClass)[i];
        let heightToTransition = teamMemberContentButton[i].offsetTop - document.getElementsByClassName("card-img-bottom")[i].offsetTop;
        let angleToRotate = 180;
        
        teamMemberContentButton[i].style.transition = "0.75s";
        content.animate([
            { opacity: "0%",
            transform: "translateY(100%)" },
            { opacity: "0%" },
            { opacity: "0%" },
            { opacity: "100%",
            transform: "translateY(0%)" }
        ], {
            duration: 500,
            iterations: 1
        });
        
        if(content.style.display == "none") {
            heightToTransition *= -1;
            content.style.display = "block";
            content.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        }
        else {
            angleToRotate = 0;
            heightToTransition = 0;
            content.style.display = "none";
        }
        
        teamMemberContentButton[i].style.transform = `translateY(${heightToTransition}px) rotate(${angleToRotate}deg)`;
        content.style.position = "absolute";
        content.style.top = document.getElementsByClassName("card-img-bottom")[i].offsetTop + teamMemberContentButton[i].offsetHeight + "px";
        content.style.minHeight = document.getElementsByClassName("card-img-bottom")[i].offsetHeight - teamMemberContentButton[i].offsetHeight + "px";
    }

    let teamMemberContentButton = document.getElementsByClassName("show_card_content");
    for(let i=0; i < teamMemberContentButton.length; i++) {
        teamMemberContentButton[i].style.position = "absolute";
        teamMemberContentButton[i].style.bottom = "0px";
        teamMemberContentButton[i].style.left = "44%";
        teamMemberContentButton[i].addEventListener("click", () => { 
            showContent("show_card_content-content", i);
        });
    }

    // On scroll animations
    function onScollShow(className, i) {
        let ele = document.getElementsByClassName(className)[i];
        if(ele.getBoundingClientRect().top < window.innerHeight - 250) {
            $(`.${className}:nth-child(${i+1})`).css({opacity: 0}).animate({opacity: 1, padding: "0px 0px"}, 500);
        }
    }

    function counterCardShow(className, i) {
        let ele = document.getElementsByClassName(className)[i];
        if(ele.getBoundingClientRect().top < window.innerHeight - 250) {
            $(`.${className}:nth-child(${i+1})`).css({transform: "rotateZ(0deg)"}).animate({opacity: 1}, 0.3);
        }
    }

    window.addEventListener("scroll", () => {
        onScollShow("card-img-bottom", 0);
        onScollShow("card-img-bottom", 1);
        onScollShow("card-img-bottom", 2);
        counterCardShow("counter_card", 0);
        counterCardShow("counter_card", 1);
        counterCardShow("counter_card", 2);
    });

    function pause(ms) {
        let currTime = Date.now();
        while(Date.now() - currTime < ms)
            continue;
    }

    // Counter animation
    window.addEventListener("scroll", () => {
        let counterVal = document.querySelectorAll(".counter > span");
        let counterValMax = [3, 2, 5];
        let counterCard = document.getElementsByClassName("counter_card");
        for(let i=0; i < counterCard.length; i++) {
            if(counterCard[i].getBoundingClientRect().top < window.innerHeight - 150) {   
                while(parseInt(counterVal[i].innerHTML) < counterValMax[i]) {
                    counterVal[i].innerHTML = parseInt(counterVal[i].innerHTML) + 1;
                    pause(50);
                }
            }
        }
    });
});