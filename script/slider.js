const slider = document.querySelector('.products__list');
const buttons = document.querySelectorAll('.products__arrow');
const items = document.querySelectorAll('.products__item');

const sliderTranform = (to) => {

    const width = document.querySelector('.products__item').offsetWidth
    const currentPosition = +slider.style.left.replace('-', '').replace('px', '')

    let i = 0;

    if (to === 'next') {
        if (currentPosition === 0 ) {
            i = 1
        } else if (currentPosition > 0 && currentPosition < width * (items.length - 1)) {
            i = currentPosition / width + 1
        }
    } else {
        if (currentPosition === 0 ) {
            i = (items.length - 1)
        } else if (currentPosition > 0) {
            i = currentPosition / width - 1
        }
    }

    
    slider.style.left = `-${width * i}px`
}


for (let index = 0; index < buttons.length; index++) {
    const button = buttons[index];
    button.addEventListener('click', (e) => {
        e.preventDefault()
        if (button.classList.contains('products__arrow--prev')) {
            sliderTranform('prev')
        } else {
            sliderTranform('next')
        }
        
    })
    
}
