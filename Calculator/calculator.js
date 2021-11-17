let btnAll = document.querySelectorAll('.num');
let lastOpr = '';
let btnText = '';
let screenValue = '';
let arrOpr = ['+', '-', '*', '/'];

let screen = document.getElementById('screen');
for (item of btnAll) {
    item.addEventListener('click', function (e) {
        console.log(e.target.innerText);
        btnText = e.target.innerText;
        if (e.target.id == 'clear') {
            screen.value = '';
            screenValue = '';
            lastOpr = '';
        }
        // else if(e.target.id == 'sin') {
        //     screen.value += btnText;
        //     screenValue = screen.value;
            
        // }
        else if (e.target.id == 'inverse') {
            if (screenValue.includes('/') || screenValue.includes('*') || screenValue.includes('+') || screenValue.includes('-') || screenValue.includes('%')) {
                // do nothing
            } else {
                let valOfInv = '1/' + screenValue;
                screenValue = valOfInv;
                screen.value = eval(screenValue);
            }
        }
        else if (e.target.id == 'square') {
            if (screenValue.includes('/') || screenValue.includes('*') || screenValue.includes('+') || screenValue.includes('-') || screenValue.includes('%')) {
                // do nothing
            } else {
                let valOfSq = screenValue + '*' + screenValue;
                screenValue = valOfSq;
                screen.value = eval(screenValue);
                screenValue = screen.value;
            }
        }
        else if (e.target.id == 'square-root') {
            if (screenValue.includes('/') || screenValue.includes('*') || screenValue.includes('+') || screenValue.includes('-') || screenValue.includes('%')) {
                //    do nothing
            } else {
                let valOfSqrt = Math.sqrt(screenValue);
                screen.value = valOfSqrt;
                screenValue = screen.value;
            }
        }
        else if (e.target.id == 'signConvertor') {
            if (screenValue.includes('/') || screenValue.includes('*') || screenValue.includes('+') || screenValue.includes('-') || screenValue.includes('%')) {
                if (screenValue.includes('/') || screenValue.includes('*')) {
                    //    do nothing
                } else {
                    if (screenValue.charAt(0) == '-') {
                        // screenValue = screenValue.replace(/^/, '-');
                        screenValue = screenValue.substring(1);
                        screen.value = screenValue;
                        console.log(screenValue);
                    }
                }
            } else {
                screenValue = '-' + screenValue;
                screen.value = screenValue;
                console.log(6767);
            }
        }

        else if(e.target.id == 'CE') {
            if (screenValue.includes('/') || screenValue.includes('*') || screenValue.includes('+') || screenValue.includes('-') || screenValue.includes('%')){
        
                let ind1 = screenValue.lastIndexOf('/');
                let ind2 = screenValue.lastIndexOf('*');
                let ind3 = screenValue.lastIndexOf('+');
                let ind4 = screenValue.lastIndexOf('-');
                let ind5 = screenValue.lastIndexOf('%');

                let ind = Math.max(ind1, ind2, ind3, ind4, ind5);

                screenValue = screenValue.slice(0, ind);
                screen.value = screenValue;
                // console.log(screenValue);
            } else {
                document.getElementById('clear').click();
            }
        }
        else if (e.target.id == 'backspace') {
            screenValue = screenValue.slice(0, -1);
            screen.value = screenValue;
            lastOpr = screenValue.slice(-1);
        }

        else if (lastOpr == '=' && arrOpr.includes(btnText)) {
            screen.value += btnText;
            screenValue += btnText;
            lastOpr = btnText;
        }
        else if (btnText == 'x') {
            btnText = '*';
            screen.value += btnText;
            screenValue += screen.value;
            lastOpr = btnText;
        }

        else if (btnText == '=') {
            if(screenValue.includes('sin')) {
                screenValue = screenValue.slice(3);
                screenValue = Math.sin(screenValue*Math.PI/180);
                screen.value = screenValue;
            }
            else if(screenValue.includes('cos')) {
                screenValue = screenValue.slice(3);
                screenValue = Math.cos(screenValue*Math.PI/180);
                screen.value = screenValue;
            }
            else if(screenValue.includes('tan')) {
                screenValue = screenValue.slice(3);
                screenValue = Math.tan(screenValue*Math.PI/180);
                screen.value = screenValue;
            }
            else if(screenValue.includes('log')) {
                screenValue = screenValue.slice(3);
                screenValue = Math.log10(screenValue);
                screen.value = screenValue;
            }
            else{
                screen.value = eval(screenValue);
                screenValue = screen.value;
                lastOpr = btnText;
            }
        }
        else if (!(arrOpr.includes(lastOpr)) || !(arrOpr.includes(btnText))) {
            screen.value += btnText;
            screenValue = screen.value;
            lastOpr = btnText;
        }
        
        console.log(screenValue);
    })
}

 screen.addEventListener("keydown", function(e) {
        if((e.keyCode >= 48  && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            
            document.getElementById('num'+ e.key).click();
            // console.log(e.key);
            e.preventDefault();
            // console.log(screenValue);

        }
        else if((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode >= 97 && e.keyCode <= 122) {
            e.preventDefault();
            // console.log(e.key, 'NOT');
        }
        else if(e.keyCode == 13) {
            e.preventDefault();
            document.getElementById('equalopr').click();
        }
        else if(e.keyCode == 8) {
            e.preventDefault();
            document.getElementById('backspace').click();
        }
        
        let basicOpr = [106,107,109,110,111];
        if(basicOpr.includes(e.keyCode)) {
            screenValue += e.key;
            screen.value = screenValue;
        }
    })


// $(document).ready(function() {
//     let exp;
//     $('.num').click(function(e) {
//         console.log($(this).html());
//         exp = String($(this).text());
//         $('#screen').val() = exp;
//     });




// })