//movimiento ojos gato
document.addEventListener('DOMContentLoaded', function () {
    const eyes = document.querySelectorAll('.movimiento');

    document.addEventListener('mousemove', function (event) {
        eyes.forEach(function (eye) {
            const boundingBox = eye.getBoundingClientRect();
            const eyeX = boundingBox.left + boundingBox.width / 2;
            const eyeY = boundingBox.top + boundingBox.height / 2;

            const deltaX = event.clientX - eyeX;
            const deltaY = event.clientY - eyeY;
            const angle = Math.atan2(deltaY, deltaX);
            const angleDeg = angle * (180 / Math.PI);

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = boundingBox.width / 3;

            const translateX = Math.cos(angle) * Math.min(distance, maxDistance);
            const translateY = Math.sin(angle) * Math.min(distance, maxDistance);

            eye.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });
});

//formulario de contacto
const $form = document.querySelector('#form');
const $buttonMailTo = document.querySelector('#mail-to')

$form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(this)
    $buttonMailTo.setAttribute('href',
        `mailto:liu_creations@outlook.com?subject= Nombre: ${form.get('name')} Correo: ${form.get('email')}&body=${form.get('message')}`
    )
    $buttonMailTo.click()
}