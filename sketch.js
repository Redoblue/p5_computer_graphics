let Vw = 1;
let Vh = 1;
let d = 1;
let inf = 999999;
let BACKGROUND_COLOR = [0, 0, 0, 255];

let spheres;

function setup() {
    BACKGROUND_COLOR = color(BACKGROUND_COLOR);
    createCanvas(500, 500);

    spheres = [
        new Sphere([0, -1, 3], 1, [255, 0, 0, 255]),
        new Sphere([2,  0, 4], 1, [0, 0, 255, 255]),
        new Sphere([-2, 0, 4], 1, [0, 255, 0, 255])
    ]

    refresh();
}

function draw() {
    // refresh();
}

function refresh() {
    let O = [0, 0, 0];
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let V = canvas_to_viewport(x, y);
            colour = trace_ray(O, V, 1, inf);
            set(x, height - y, colour);
        }
    }
    updatePixels();
}

function canvas_to_viewport(x, y) {
    return [(x - width / 2) * Vw / width, (y - height / 2) * Vh / height, d];
}

function trace_ray(O, V, t_min, t_max) {
    let closest_t = inf;
    let closest_sphere = null;
 
    for (let sphere of spheres) {
        const [t1, t2] = sphere.intersect(O, V);

        if (t_min < t1 && t1 < t_max && t1 < closest_t) {
            closest_t = t1;
            closest_sphere = sphere;
        }

        if (t_min < t2 && t2 < t_max && t2 < closest_t) {
            closest_t = t2;
            closest_sphere = sphere;
        }
    }

    if (closest_sphere == null) {
        return BACKGROUND_COLOR;
    }

    return closest_sphere.colour;
}