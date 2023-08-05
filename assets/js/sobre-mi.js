class Circle {
  constructor(element) {
    this.circle = element;
    this.container = document.getElementById('herramientas');
    this.isCircleGrabbed = false;
    this.isCircleReleased = false;
    this.initialMouseX = 0;
    this.initialMouseY = 0;
    this.initialCircleX = 0;
    this.initialCircleY = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.rotation = -45;
    this.gravity = 0.4;
    this.bounceFactor = 0.6;
    this.isFalling = true;

    const mc = new Hammer.Manager(this.circle);
    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));

    mc.on('panstart', this.grabCircle.bind(this));
    mc.on('panmove', this.moveCircle.bind(this));
    mc.on('panend', this.releaseCircle.bind(this));

    setTimeout(() => {
      this.isFalling = false;
      this.speedY = 8 + Math.random() * 5;
      this.speedX = (Math.random() - 2) * 2;
      this.animateCircle();
    }, 4000);
  }

  grabCircle(event) {
    if (this.isCircleGrabbed) return;

    this.isCircleGrabbed = true;
    this.initialMouseX = event.center.x;
    this.initialMouseY = event.center.y;
    this.initialCircleX = this.circle.offsetLeft;
    this.initialCircleY = this.circle.offsetTop;
    this.rotation = 0;

    this.circle.style.transition = 'none';
    this.circle.style.animation = '';
  }

  releaseCircle(event) {
    if (!this.isCircleGrabbed) return;

    this.isCircleGrabbed = false;
    this.isCircleReleased = true;
    this.circle.style.transition = 'transform 0.2s ease-out';

    if (this.isCircleReleased) {
      this.speedX = (event.center.x - this.initialMouseX) * 0.2;
      this.speedY = (event.center.y - this.initialMouseY) * 0.2;
      this.isCircleReleased = false;
      this.animateCircle();
    }
  }

  moveCircle(event) {
    if (!this.isCircleGrabbed) return;

    const moveX = event.center.x - this.initialMouseX;
    const moveY = event.center.y - this.initialMouseY;

    const containerWidth = this.container.offsetWidth;
    const containerHeight = this.container.offsetHeight;
    const circleWidth = this.circle.offsetWidth;
    const circleHeight = this.circle.offsetHeight;

    const maxCircleX = containerWidth - circleWidth;
    const maxCircleY = containerHeight - circleHeight;

    let newCircleX = this.initialCircleX + moveX;
    let newCircleY = this.initialCircleY + moveY;

    if (newCircleX < 0) {
      newCircleX = 0;
    } else if (newCircleX > maxCircleX) {
      newCircleX = maxCircleX;
    }

    if (newCircleY < 0) {
      newCircleY = 0;
    } else if (newCircleY > maxCircleY) {
      newCircleY = maxCircleY;
    }

    this.circle.style.left = `${newCircleX}px`;
    this.circle.style.top = `${newCircleY}px`;

    this.rotation = (moveX / containerWidth) * 45; // Cambiar el ángulo de rotación según el movimiento horizontal
    this.circle.style.transform = `rotate(${this.rotation}deg)`;
  }

  animateCircle() {
    const containerWidth = this.container.offsetWidth;
    const containerHeight = this.container.offsetHeight;
    const circleWidth = this.circle.offsetWidth;
    const circleHeight = this.circle.offsetHeight;

    const maxCircleX = containerWidth - circleWidth;
    const maxCircleY = containerHeight - circleHeight;

    let newCircleX = this.circle.offsetLeft + this.speedX;
    let newCircleY = this.circle.offsetTop + this.speedY;

    if (newCircleX < 0) {
      newCircleX = 0;
      this.speedX *= -this.bounceFactor;
      this.speedY += (Math.random() - 0.5) * 2;
    } else if (newCircleX > maxCircleX) {
      newCircleX = maxCircleX;
      this.speedX *= -this.bounceFactor;
      this.speedY += (Math.random() - 0.5) * 2;
    }

    if (newCircleY < 0) {
      newCircleY = 0;
      this.speedY *= -this.bounceFactor;
      this.speedX += (Math.random() - 0.5) * 2;
    } else if (newCircleY > maxCircleY) {
      newCircleY = maxCircleY;
      this.speedY *= -this.bounceFactor;
      this.speedX += (Math.random() - 0.5) * 2;

      if (Math.abs(this.speedY) < 1) {
        this.speedY = 0;
        this.speedX *= 0.98;
      }
    }

    this.circle.style.left = `${newCircleX}px`;
    this.circle.style.top = `${newCircleY}px`;

    this.speedY += this.gravity;

    this.rotation += this.speedX; // Cambiar el ángulo de rotación según la velocidad horizontal
    this.circle.style.transform = `rotate(${this.rotation}deg)`;

    if (Math.abs(this.speedX) > 0.5 || Math.abs(this.speedY) > 0.5) {
      requestAnimationFrame(this.animateCircle.bind(this));
    }
  }
}

// Crear instancias para cada círculo
const circles = document.getElementsByClassName('elemento');
for (let i = 0; i < circles.length; i++) {
  new Circle(circles[i]);
}