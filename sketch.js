let viewport_size = 1;
let projection_plane_z = 1;
let camera_position = [0, 0, 0];
let background_color = [255, 255, 255, 255];

let spheres;
let lights;

function setup() {
    background_color = color(background_color);
    createCanvas(500, 500);

    spheres = [
        new Sphere([0, -1, 3], 1, [255, 0, 0, 255]),
        new Sphere([2, 0, 4], 1, [0, 0, 255, 255]),
        new Sphere([-2, 0, 4], 1, [0, 255, 0, 255]),
        new Sphere([0, -5001, 0], 5000, [255, 255, 0, 255])
    ]
    lights = [
        new AmbientLight([255, 255, 255, 255], 0.2),
        new PointLight([2, 1, 0], [255, 255, 255, 255], 0.6),
        new DirectionalLight([1, 4, 4], [255, 255, 255, 255], 0.2)
    ]

    refresh();
}

function draw() {
    // refresh();
}

function refresh() {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let direction = canvas_to_viewport(x, y);
            colour = trace_ray(camera_position, direction, 1, Infinity);
            set(x, height - y, colour);
        }
    }
    updatePixels();
}

function canvas_to_viewport(x, y) {
    return createVector(
        (x - width / 2) * viewport_size / width,
        (y - height / 2) * viewport_size / height, 
        projection_plane_z);
}

function trace_ray(origin, direction, t_min, t_max) {
    let closest_t = Infinity;
    let closest_sphere = null;

    for (let sphere of spheres) {
        const [t1, t2] = sphere.intersect(origin, direction);

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
        return background_color;
    }

    let point = pAdd(origin, direction.mult(closest_t).array()); // P = O + tD
    let normal = toVector(pSub(point, closest_sphere.center)).normalize(); // N = (P - C) / |P - C|
    return colorMult(closest_sphere.colour, compute_lighting(point, normal));
}

function compute_lighting(point, normal) {
    let i = 0.0;
    for (let light of lights) {
        if (light instanceof AmbientLight) {
            i += light.intensity;
        } else {
            let vec_l;
            if (light instanceof PointLight) {
                vec_l = toVector(pSub(light.position, point));
            } else {
                vec_l = light.direction;
            }
            vec_l.normalize();
            n_dot_l = normal.dot(vec_l);
            if (n_dot_l > 0) {
                i += light.intensity * n_dot_l;
            }
        }
    }

    return i;
}