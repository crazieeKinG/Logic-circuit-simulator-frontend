/**
 * The function is called when the user clicks on the canvas. The event is passed to the function. The event is used to get the x and y coordinates of the mouse click. The x and y coordinates are used to check if the user clicked on a unit. If the user clicked on a unit, the function selects that unit.
 * @param event - the event object
 * @returns - Nothing
 */
let select_unit = (event) => {
    event.preventDefault();

    mouse_x = event.x - x;
    mouse_y = event.y - y;

    for (let index in units) {
        if (check_mouse_in_unit(mouse_x, mouse_y, units[index].x, units[index].y, units[index].width, units[index].height)) {
            selected_unit = index;
            update_information_section();
            units[selected_unit].stroke = true;
            drag_unit = true;
            dx = mouse_x - units[index].x;
            dy = mouse_y - units[index].y;

            if (units[selected_unit].frequency) {
                frequency_value.value = units[selected_unit].frequency;
            }
            draw_canvas();

            return;
        }
    }
}

/**
 * If the user is dragging a unit, prevent the default action, get the mouse position, set the unit's position to the mouse position, and draw the canvas.
 * @param event - The event object.
 * @returns - Nothing
 */
let move_unit = (event) => {
    if (!drag_unit) return;

    event.preventDefault();

    mouse_x = event.x - x;
    mouse_y = event.y - y;

    units[selected_unit].x = mouse_x - dx;
    units[selected_unit].y = mouse_y - dy;
    dx = mouse_x - units[selected_unit].x;
    dy = mouse_y - units[selected_unit].y;

    draw_canvas();
}

/**
 * If the user is dragging a unit, prevent the default action of the event, and set the stroke of the
 * selected unit to false.
 * @param event - The event object.
 * @returns The function is being returned.
 */
let deselect_unit = (event) => {
    if (!drag_unit) return;

    event.preventDefault();

    units[selected_unit].stroke = false;
    drag_unit = false;
}

CANVAS.onmousedown = select_unit;
CANVAS.onmousemove = move_unit;
CANVAS.onmouseup = deselect_unit;
