let clock = () => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();

    var n = date.getDay();

    let day;
    if (n===1) day = "Monday";
    if (n===2) day = "Tueday";
    if (n===3) day = "Wedday";
    if (n===4) day = "Thuday";
    if (n===5) day = "Friday";
    if (n===6) day = "Satday";
    if (n===7) day = "Sunday";

    let period = "AM";
    if (hrs == 0)
    {
      hrs = 12;
    }
    else if (hrs >= 12)
    {
      hrs = hrs - 12;
      period = "PM";
    }

    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
  
    let time = `${hrs}:${mins}:${secs} ${period}`;
    let fulltime = `<strong>${day}</strong>, <mark style='background-color: #FF7F2744;'>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</mark>   ${hrs}:${mins}:${secs} ${period}`;
    document.getElementById("clock").innerText = time;
    document.getElementById("clockFull").innerHTML = fulltime;
    setTimeout(clock, 1000);
};
  
clock();  