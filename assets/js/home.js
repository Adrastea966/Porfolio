//Animacion de mascota
function iniciarAnimacion() {
    const gatoCuerpo = document.querySelector('.mascota');
    gatoCuerpo.style.animation = 'avanzar 2s forwards';
    gatoCuerpo.style.opacity = '1';

    setTimeout(() => {
        const ojos = document.querySelectorAll('.ojo-izquierdo, .ojo-derecho');
        ojos.forEach(ojo => {
            ojo.style.animation = 'mover-ojos 3s forwards';
        });
    }, 2000);
}

setTimeout(iniciarAnimacion, 900);