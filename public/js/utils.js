const to_radian = (degree) => {
    return degree * (Math.PI / 180);
}

const check_mouse_in_unit = (mouse_x, mouse_y, unit_x, unit_y, unit_width, unit_height) => {
    return (mouse_x >= unit_x && mouse_x <= (unit_x + unit_width)) && (mouse_y >= unit_y && mouse_y <= (unit_y + unit_height));
}