class Sphere {

    constructor(center, radius, colour) {
        this.center = center;
        this.radius = radius;
        this.colour = color(colour);
    }

    intersect(O, V) {
        let CO = toVector(sub2(O, this.center));
        let D = toVector(sub2(V, O));

        let a = D.dot(D);
        let b = 2 * D.dot(CO);
        let c = CO.dot(CO) - this.radius * this.radius;

        let discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return [inf, inf];
        }

        let t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        let t2 = (-b - Math.sqrt(discriminant)) / (2 * a);

        return [t1, t2];
    }
}