/**
 * drag and drop feature.
 */
let select_unit = (event) => {
    event.preventDefault();
    console.log(units);
    console.log(SELECTED_UNIT);

    mouse_X = event.clientX;
    mouse_Y = event.clientY;

    for (let index in units) {

        if (check_mouse_in_unit(mouse_X, mouse_Y, units[index].x, units[index].y, units[index].width, units[index].height)) {
            SELECTED_UNIT = index;
            update_information_section();
            units[SELECTED_UNIT].stroke = true;
            DRAG_UNIT = true;
            DX = units[index].x - mouse_X;
            DY = units[index].y - mouse_Y;
            draw_canvas();

            return;
        }
    }
}

let move_unit = (event) => {
    if (!DRAG_UNIT) return;

    event.preventDefault();

    mouse_X = event.clientX;
    mouse_Y = event.clientY;

    units[SELECTED_UNIT].x = mouse_X + DX;
    units[SELECTED_UNIT].y = mouse_Y + DY;

    draw_canvas();
}

let deselect_unit = (event) => {
    if (!DRAG_UNIT) return;

    event.preventDefault();

    units[SELECTED_UNIT].stroke = false;
    DRAG_UNIT = false;
}

CANVAS.onmousedown = select_unit;
CANVAS.onmousemove = move_unit;
CANVAS.onmouseup = deselect_unit;

/**
 * drag and drop end
 */