let para_list = ["I want to be in the arena. I want to be brave with my life. And when we make the choice to dare greatly, we sign up to get our asses kicked. We can choose courage or we can choose comfort, but we can't have both. Not at the same time.", "Without fear there cannot be courage.", "Without fear there cannot be courage.",
    "A star falls from the sky and into your hands. Then it seeps through your veins and swims inside your blood and becomes every part of you. And then you have to put it back into the sky. And it's the most painful thing you'll ever have to do and that you've ever done. But what's yours is yours. Whether it's up in the sky or here in your hands. And one day, it'll fall from the sky and hit you in the head real hard and that time, you won't have to put it back in the sky again.",
    "Live boldly. Push yourself. Don't settle.",
    "Just because you fall once, doesn't mean you're fall at everything. Keep trying, hold on, and always trust yourself, because if you don't then who will??",
    "Everything happens for a reason and, something better will come along for me!",
    "The starting point of all achievement is DESIRE. Keep this constantly in mind. Weak desire brings weak results, just as a small fire makes a small amount of heat.",
    "Travel is never a matter of money but of courage",
    "I'm unpredictable, I never know where I'm going until I get there, I'm so random, I'm always growing, learning, changing, I'm never the same person twice. But one thing you can be sure of about me; is I will always do exactly what I want to do.",
    "Everything you want is on the other side of fear.",
    "The world is wide, and I will not waste my life in friction when it could be turned into momentum. ",
    "Good works is giving to the poor and the helpless, but divine works is showing them their worth to the One who matters.",
    "You don't win races by wishing, you win them by running faster than everyone else does.",
    "If you pick some one, you're really safe. If they pick you, you have to be careful.",
    "Things will change: you won't feel this way forever. And anyway, sometimes the hardest lessons to learn are the ones your soul needs most.",
    "Those who bring sunshine to the lives of others cannot keep it from themselves.",
    "When things do not go your way, remember that every challenge — every adversity — contains within it the seeds of opportunity and growth.",
    "As my sufferings mounted I soon realized that there were two ways in which I could respond to my situation -- either to react with bitterness or seek to transform the suffering into a creative force. I decided to follow the latter course.",
    "Do not yearn to be popular; be exquisite. Do not desire to be famous; be loved. Do not take pride in being expected; be palpable, unmistakable.",
    "Words can never fully say what we want them to say, for they fumble, stammer, and break the best porcelain. The best one can hope for is to find along the way someone to share the path, content to walk in silence, for the heart communes best when it does not try to speak.",
    "Believe me, It would be better if we didn't meet again. Go back to school. Go back to your life. And next time they ask you, say no. Killing is for grown-ups and you're still a child.",
    "Just be yourself, there is no one better.",
    "You must learn to let go. Release the stress. You were never in control anyway.",
    "Wanting to be someone else is a waste of the person you are.",
    "It does not matter how long you are spending on the earth, how much money you have gathered or how much attention you have received. It is the amount of positive vibration you have radiated in life that matters,",
    "Travel far enough, you meet yourself.",
    "If a man is to shed the light of the sun upon other men, he must first of all have it within himself.",
    "I have a dream that one day little black boys and girls will be holding hands with little white boys and girls.",
    "A writer must teach himself that the basest of all things is to be afraid. ",
    "I don't want anyone to hold back who they are. It's not okay… it's not a good thing"

    ,
    "Fourscore and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.",
    "It is harder to crack prejudice than an atom.",
    "If you really want to do something, you'll find a way. If you don't, you'll find an excuse.",
    "Free at last, Free at last, Thank God almighty we are free at last.",
    "I learned this, at least, by my experiment; that if one advances confidently in the direction of his dreams, and endeavors to live the life which he has imagined, he will meet with a success unexpected in common hours..",
    "If I look at the mass I will never act.",
    "Because paper has more patience than people. ",
    "You can't always judge people by the things they done. You got to judge them by what they are doing now."
]
document.getElementById("para").innerText = para_list[Math.round(Math.random() * (para_list.length - 1))]
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
let remain_time = 120;
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
            if (Math.floor(given.length / 5.2) * left >= 60 || given.length === (para.length)) {
                main_player.style.left = `60%`
                player_finish = 60;
                input.disabled = true;
                main_player.style.transform = "unset";
                posi++;
                let time__ = document.getElementById("timer").innerText;
                time__ = time__.replace('Time Left: ','')
                let time_taken = 120 - (parseInt(time__));
                let speed = (((para.length) / 5) / time_taken) * 60;
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
