let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerRef = document.querySelector('.timerDisplay');
let int = null;
let running = false;

document.getElementById('startTimer').addEventListener('click', ()=>
{
    if(int !== null)
    {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
    running = true;
});

document.getElementById('pauseTimer').addEventListener('click', ()=>
{
    clearInterval(int);
    running = false;
});

document.getElementById('resetTimer').addEventListener('click', ()=>
{
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timerRef.innerHTML = '00 : 00 : 00 : 00';
    running = false;
});

function displayTimer()
{
    milliseconds += 1;
    if(milliseconds == 100)
    {
        milliseconds = 0;
        seconds++;
        if(seconds == 60)
        {
            seconds = 0;
            minutes++;
            if(minutes == 60)
            {
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;

    timerRef.innerHTML = h + " : " + m + " : " + s + " : " + ms;
}

window.addEventListener("load", () => {
        let l = localStorage.getItem("timerDisplayEscritoire").split(",");
        let strL = l;
        for(let i=0; i < l.length; i++) {
            l[i] = Number(l[i]);
        }
        [hours, minutes, seconds, milliseconds] = l;

        if(localStorage.getItem("timerRunning") == "false") {
            timerRef.innerHTML = strL[0] + " : " + strL[1]  + " : " + strL[2] + " : " + strL[3];
            return;
        }
        else {
            if(int !== null)
            {
                clearInterval(int);
            }
            int = setInterval(displayTimer, 10);
            running = true;
        }
});

window.addEventListener("beforeunload", () => { 
    let time = timerRef.innerHTML.split(" : ");
    if(localStorage.getItem("timerDisplayEscritoire"))
        localStorage.removeItem("timerDisplayEscritoire");
    localStorage.setItem("timerDisplayEscritoire", time);
    localStorage.setItem("timerRunning", running);
});