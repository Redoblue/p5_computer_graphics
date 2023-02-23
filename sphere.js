class Sphere {

    constructor(center, radius, colour, specular) {
        this.center = center;
        this.radius = radius;
        this.colour = color(colour);
        this.specular = specular;
    }

    intersect(O, D) {
        let CO = toVector(pSub(O, this.center));

        let a = D.dot(D);
        let b = 2 * D.dot(CO);
        let c = CO.dot(CO) - this.radius * this.radius;

        let discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return [Infinity, Infinity];
        }

        let t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        let t2 = (-b - Math.sqrt(discriminant)) / (2 * a);

        return [t1, t2];
    }
}