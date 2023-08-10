//Carrusel
$(document).ready(function () {
  $('.tarjetas').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});

//Agarrar gato 
class Heart {
  constructor(element) {
    this.heart = element;
    this.container = document.getElementById('contenedor-gato');
    this.isHeartGrabbed = false;
    this.isHeartReleased = false;
    this.initialMouseX = 0;
    this.initialMouseY = 0;
    this.initialHeartX = 0;
    this.initialHeartY = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.rotation = -45;
    this.gravity = 0.4;
    this.bounceFactor = 0.6;
    this.isFalling = false;

    const mc = new Hammer.Manager(this.heart);
    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

    mc.on('panstart', this.grabHeart.bind(this));
    mc.on('panmove', this.moveHeart.bind(this));
    mc.on('panend', this.releaseHeart.bind(this));
  }

  grabHeart(event) {
    if (this.isHeartGrabbed) return;

    this.isHeartGrabbed = true;
    this.isHeartReleased = false; // Reset isHeartReleased
    this.initialMouseX = event.center.x;
    this.initialMouseY = event.center.y;
    this.initialHeartX = this.heart.offsetLeft;
    this.initialHeartY = this.heart.offsetTop;
    this.rotation = 0;

    this.heart.style.transition = 'none';
  }

  releaseHeart(event) {
    if (!this.isHeartGrabbed) return;

    this.isHeartGrabbed = false;
    this.isHeartReleased = true;
    this.heart.style.transition = 'transform 0.2s ease-out';

    if (this.isHeartReleased) {
      this.speedX = (event.center.x - this.initialMouseX) * 0.2;
      this.speedY = (event.center.y - this.initialMouseY) * 0.2;
      this.isHeartReleased = false;
      this.isFalling = true; // Enable falling physics
      this.animateHeart();
    }
  }

  moveHeart(event) {
    if (!this.isHeartGrabbed) return;

    const moveX = event.center.x - this.initialMouseX;
    const moveY = event.center.y - this.initialMouseY;

    const containerWidth = this.container.offsetWidth;
    const containerHeight = this.container.offsetHeight;
    const heartWidth = this.heart.offsetWidth;
    const heartHeight = this.heart.offsetHeight;

    const maxHeartX = containerWidth - heartWidth;
    const maxHeartY = containerHeight - heartHeight;

    let newHeartX = this.initialHeartX + moveX;
    let newHeartY = this.initialHeartY + moveY;

    if (newHeartX < 0) {
      newHeartX = 0;
    } else if (newHeartX > maxHeartX) {
      newHeartX = maxHeartX;
    }

    if (newHeartY < 0) {
      newHeartY = 0;
    } else if (newHeartY > maxHeartY) {
      newHeartY = maxHeartY;
    }

    this.heart.style.left = `${newHeartX}px`;
    this.heart.style.top = `${newHeartY}px`;

    this.rotation = (moveX / containerWidth) * 45;
    this.heart.style.transform = `rotate(${this.rotation}deg)`;
  }

  animateHeart() {
    if (!this.isFalling) return;

    const containerWidth = this.container.offsetWidth;
    const containerHeight = this.container.offsetHeight;
    const heartWidth = this.heart.offsetWidth;
    const heartHeight = this.heart.offsetHeight;

    const maxHeartX = containerWidth - heartWidth;
    const maxHeartY = containerHeight - heartHeight;

    let newHeartX = this.heart.offsetLeft + this.speedX;
    let newHeartY = this.heart.offsetTop + this.speedY;

    if (newHeartX < 0) {
      newHeartX = 0;
      this.speedX *= -this.bounceFactor;
      this.speedY += (Math.random() - 0.5) * 2;
    } else if (newHeartX > maxHeartX) {
      newHeartX = maxHeartX;
      this.speedX *= -this.bounceFactor;
      this.speedY += (Math.random() - 0.5) * 2;
    }

    if (newHeartY < 0) {
      newHeartY = 0;
      this.speedY *= -this.bounceFactor;
      this.speedX += (Math.random() - 0.5) * 2;
    } else if (newHeartY > maxHeartY) {
      newHeartY = maxHeartY;
      this.speedY *= -this.bounceFactor;
      this.speedX += (Math.random() - 0.5) * 2;

      if (Math.abs(this.speedY) < 1) {
        this.speedY = 0;
        this.speedX *= 0.98;
      }
    }

    this.heart.style.left = `${newHeartX}px`;
    this.heart.style.top = `${newHeartY}px`;

    this.speedY += this.gravity;

    this.rotation += this.speedX;
    this.heart.style.transform = `rotate(${this.rotation}deg)`;

    if (Math.abs(this.speedX) > 0.5 || Math.abs(this.speedY) > 0.5) {
      requestAnimationFrame(this.animateHeart.bind(this));
    }
  }
}

const hearts = document.getElementsByClassName('mascota2');
for (let i = 0; i < hearts.length; i++) {
  new Heart(hearts[i]);
}