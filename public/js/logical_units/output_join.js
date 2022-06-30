class Output {
    /**
     * This function creates a new object with the properties x, y, width, height, color, state, and name, and then assigns values to those properties.
     * @param position_x - The x position of the node
     * @param position_y - The y position of the node
     * @param [width=10] - width of the node
     * @param [height=10] - The height of the node
     */
    constructor(position_x, position_y, width = 10, height = 10) {
        this.x = position_x;
        this.y = position_y;
        this.width = width;
        this.height = height;
        this.color = INACTIVE_COLOR;   

        this.state = 0;
        this.name = "Output node";
    }

    /**
     * A function that draws the output node.
     */
    draw = () => {
        this.x += this.width / 2;
        this.y -= this.height / 2;
        CONTEXT.fillStyle = this.color === SELECTED_COLOR ? this.color : this.state === 1 ? ACTIVE_COLOR : this.color;
        CONTEXT.fillRect(this.x, this.y, this.width, this.height)
    }

    /**
     *  A function that checks if the mouse is clicked on the nodes.
     * @param x x position of mouse
     * @param y y position of mouse
     * @param parent_index index of the gate in the list of the instances created
     * @param object_index index of the node in the list of the parent object
     */
    clicked = (x, y, parent_index, object_index) => {
        if (check_mouse_in_unit(x, y, this.x, this.y, this.width, this.height)) {
            selected_input_output_node.push([parent_index, object_index])
        }
    }
}