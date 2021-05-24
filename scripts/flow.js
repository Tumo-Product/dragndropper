let canvas = document.getElementById('canvas');

let BB = canvas.getBoundingClientRect();
let offsetX = BB.left, offsetY = BB.top;
let dragOk = false;
let startX, startY;

let circles = [];

const mouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Mouse position
    let mx = parseInt(e.clientX - offsetX);
    let my = parseInt(e.clientY - offsetY);

    dragOk = false;
    for (let circle of circles) {
        if (intersects(mx, my, circle)) {
            dragOk = true;
            circle.dragging = true;
        }
    }

    startX = mx;
    startY = my;
}

const intersects = (x, y, circle) => {
    console.log(circle);
    if (x > circle.x && x < circle.x + circle.width && y > circle.y && y < circle.y + circle.height) return true;
    else return false;
}

const mouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dragOk = false;

    let mx = parseInt(e.clientX - offsetX);
    let my = parseInt(e.clientY - offsetY);

    for (let circle of circles) {
        circle.dragging = false;

        if (intersects(mx, my, {x: circle.stick.x, y: circle.stick.y, width: 100, height: 100})) { // TODO: Fix sticking behaviour
            gfx.redrawImage(circle.img, circle.stick.x, circle.stick.y, circle.width, circle.height);
        } else {
            gfx.redrawImage(circle.img, circle.x, circle.y, circle.width, circle.height);
        }
    }
}

const mouseMove = (e) => {
    if (dragOk) {
        // Mouse position
        let mx = parseInt(e.clientX - offsetX);
        let my = parseInt(e.clientY - offsetY);

        // calculate the distance the mouse has moved since the last mousemove
        let dx = mx - startX;
        let dy = my - startY;

        for (let circle of circles) {
            if (circle.dragging) {
                let newX = circle.x + dx;
                let newY = circle.y + dy;
                gfx.redrawImage(circle.img, newX, newY, circle.width, circle.height);
            }
        }
    }
}

const onPageLoad = async () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let data = await parser.dataFetch("../imageSets.json");

    for (let set of data.sets) {
        let bgInfo = await gfx.drawImage(set.background, undefined, undefined, true, 0.35);

        let icons = set.icons;
        for (let i = 0; i < icons.length; i++) {
            circles.push(await gfx.drawImage(icons[i].img, bgInfo.x, bgInfo.y + i * 90, false, 0.05));
            circles[i].stick = icons[i].stick;
        }
    }

    gfx.toggleLoadingScreen();

    canvas.onmousedown = mouseDown;
    canvas.onmousemove = mouseMove;
    canvas.onmouseup = mouseUp;
}

onPageLoad();