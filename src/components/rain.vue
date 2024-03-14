<template>
    <div class="rainMain"></div>
</template>
<script>
window.onload = function () {
    const box = document.querySelector('.rainMain');
    let boxHeight = box.clientHeight;
    let boxWidth = box.clientWidth;
    setInterval(() => {
        const rain = document.createElement('div');
        rain.classList.add('rain');
        rain.style.top = 0;
        rain.style.left = Math.random() * boxWidth + 'px';
        box.appendChild(rain);

        let race = 1;
        const timer = setInterval(() => {
            if (parseInt(rain.style.top) > boxHeight) {
                clearInterval(timer);
                box.removeChild(rain);
            }
            race++;
            rain.style.top = parseInt(rain.style.top) + race + 'px';
        }, 20)
    }, 50)
};
</script>
<style>
.rainMain {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
    pointer-events: none;
}

.rain {
    position: absolute;
    width: 2px;
    height: 50px;
    background: linear-gradient(rgba(255, 255, 255, .3), rgba(255, 255, 255, .6));
}
</style>
