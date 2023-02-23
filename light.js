class AmbientLight {
  constructor(colour, intensity) {
    this.colour = colour;
    this.intensity = intensity;
  }
}

class PointLight {
  constructor(position, colour, intensity) {
    this.position = position;
    this.colour = colour;
    this.intensity = intensity;
  }
}

class DirectionalLight {
  constructor(direction, colour, intensity) {
    this.direction = toVector(direction);
    this.colour = colour;
    this.intensity = intensity;
  }
}
