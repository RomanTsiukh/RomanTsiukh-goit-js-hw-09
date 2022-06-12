function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stoptBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector("body"),
}

refs.startBtn.addEventListener('click', startAnyColor)
refs.stoptBtn.addEventListener('click', stopAnyColor)

let colorId = null;

    function startAnyColor () {
        refs.startBtn.disabled = true;
        refs.stoptBtn.disabled = false;
        colorId = setInterval(() => {
            refs.body.style.backgroundColor = getRandomHexColor();
        }, 1000)  
    }
    
    function stopAnyColor() {
        refs.startBtn.disabled = false;
        refs.stoptBtn.disabled = true;
        clearInterval(colorId);
    }

