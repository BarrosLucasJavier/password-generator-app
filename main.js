const range = document.querySelector('input[type="range"]');
const rangeh2 = document.querySelector('.lengthContainer h2');
range.addEventListener("input", ()=>{
    let rangeValue = range.value * (100 / 20 )+ '%'
    rangeh2.textContent = range.value;
    range.style.setProperty('--litters-range', rangeValue)
})