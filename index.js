let posi = 1;
let para = document.getElementById("para").innerText;
let main_player = document.getElementById("main_player")
let bot_player = document.getElementById("bot_player")
let input = document.getElementById("input");
let start_button = document.getElementById("start")
let round = Math.round(para.length / 5);
let left = 60 / round;
let player_finish;
let bot_finish;
let timer_interval;
let time_left_interval;
let bot_interval;
button = () => {
    document.getElementById("dropdown").disabled = true;
    start_button.disabled = true;
    timer_func()
    timer_interval = setInterval(timer_func, 1000);
    setTimeout(start, 5000);

};
let remain_time = 60;
time_left = () => {
    document.getElementById("timer").innerText = `Time Left: ${remain_time--}`
    if (remain_time <= '0') {
        clearInterval(time_left_interval)
        document.getElementById("timer").style.display = "none";
        document.getElementById("hide_div2").style.display = "block";
        clearInterval(bot_interval)
    }
}
start = () => {
    clearInterval(timer_interval)
    time_left_interval = setInterval(
        time_left, 1000);
    time_left()
    input.disabled = false;
    input.focus();
    input.addEventListener("input", () => {
        let given = input.value;
        if (given.length === 0) {
            input.style.backgroundColor = "white"
        } else if (given[given.length - 1] === para[given.length - 1] && para.startsWith(given)) {
            input.style.backgroundColor = "lightgreen"
            if (given.length % 5 === 0) {
                main_player.style.left = `${Math.floor(given.length / 5) * left}%`;
            }
            if (Math.floor(given.length / 5) * left === 60) {
                player_finish = Math.floor(given.length / 5) * left;
                input.disabled = true;
                main_player.style.transform = "unset";
                posi++;
                let time__ = document.getElementById("timer").innerText;
                let time_taken = 60 - (parseInt(`${time__[time__.length - 2]}${time__[time__.length - 1]}`));
                let speed = (((para.length) / 6) / time_taken) * 60;
                document.getElementById("speed").innerText += `${Math.round(speed)} wpm`;
                if (localStorage.getItem('best') < Math.round(speed)) {
                    localStorage.setItem('best', Math.round(speed))
                }
                document.getElementById("best").innerText += `${localStorage.getItem('best')} wpm`;
                if (player_finish >= 60 && bot_finish >= 60) {
                    clearInterval(time_left_interval)
                    document.getElementById("timer").style.display = "none";
                    document.getElementById("hide_div").style.display = "block";
                }
            }
        } else {
            input.style.backgroundColor = "red"
        }
    });
    let bot_length = 0;
    bot_interval = setInterval(() => {
        bot_length += parseInt(document.getElementById('dropdown').value);
        if (bot_length >= 5) {
            bot_player.style.left = `${Math.floor(bot_length / 5) * left}%`;
        }
        if (Math.floor(bot_length / 5) * left >= 60) {
            bot_finish = Math.floor(bot_length / 5) * left;
            clearInterval(bot_interval)
            bot_player.style.transform = "unset";
            posi++;
            if (player_finish >= 60 && bot_finish >= 60) {
                clearInterval(time_left_interval)
                document.getElementById("timer").style.display = "none";
                document.getElementById("hide_div").style.display = "block";
            }
        }
    }, 1000);
}
timer = 5;
timer_func = () => {
    document.getElementById("timer").style.display = "block";
    document.getElementById("timer").innerText = `Race Start after: ${timer--}`;
}
reset = () => {
    start_button.disabled = false;

    window.top.location.reload(true);
}
hide = () => {
    document.getElementById("hide_div").style.display = "none";
}
hide2 = () => {
    document.getElementById("hide_div2").style.display = "none";
}