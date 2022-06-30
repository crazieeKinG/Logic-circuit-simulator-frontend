/**
 * Convert a degree value to radians.
 * @param degree - The degree to convert to radians.
 * @returns the degree multiplied by the value of PI divided by 180.
 */
const to_radian = (degree) => {
    return degree * (Math.PI / 180);
}

/**
 * If the mouse is within the unit's x, y coordinates, and within the unit's width and height, then return true.
 * @param mouse_x - The x position of the mouse.
 * @param mouse_y - The y coordinate of the mouse.
 * @param unit_x - The x position of the unit.
 * @param unit_y - The y position of the unit.
 * @param unit_width - The width of the unit.
 * @param unit_height - The height of the unit.
 * @returns - boolean value.
 */
const check_mouse_in_unit = (mouse_x, mouse_y, unit_x, unit_y, unit_width, unit_height) => {
    return (mouse_x >= unit_x && mouse_x <= (unit_x + unit_width)) && (mouse_y >= unit_y && mouse_y <= (unit_y + unit_height));
}
/**
 * A function that returns the half of the value.
 */
const half_the_value = (value) => value / 2;