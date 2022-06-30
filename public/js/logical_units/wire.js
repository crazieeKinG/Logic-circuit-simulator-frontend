class Wire {
    /**
     * This function creates a wire object that connects two ports together.
     * The function then sets the input and output ports of the wire to the arguments passed in. It then sets the output_ref and input_ref to the arguments passed in.
     * @param output_port - The output port of the component that the wire is connected to.
     * @param input_port - The input port of the component that the wire is connected to.
     * @param out_reference - The reference to the output port of the component that the wire is connected to.
     * @param in_reference - The reference to the input port of the component that the wire is connected to.
     */
    constructor(output_port, input_port, out_reference, in_reference) {
        this.input = output_port;
        this.output = input_port;
        this.name = "Wire";
        this.output_ref = out_reference;
        this.input_ref = in_reference;
    }

    /**
     *  A function that draws the wire. 
     */
    draw = () => {
        CONTEXT.beginPath();

        CONTEXT.strokeStyle = this.input.state === 1 ? ACTIVE_COLOR : INACTIVE_COLOR;

        CONTEXT.moveTo(this.input.x + this.input.width, this.input.y + (this.input.height / 2));
        CONTEXT.lineTo(this.output.x, this.output.y + (this.output.height / 2));

        CONTEXT.stroke();
        CONTEXT.fill();

        CONTEXT.closePath();
    }

    /**
     * It is used to update the state of endpoints of wire. 
     */
    run = () => {
        if (this.input.name === "Output node") {
            this.output.state = this.input.state;
        } else {
            this.input.state = this.output.state;
        }
    }

    /**
     * Checking if the mouse is clicked on the wire. 
     */
    check_mouse_in_wire = (mouse_x, mouse_y, left_node_x, left_node_y, right_node_x, right_node_y) => {
        const slope = (right_node_y - left_node_y) / (right_node_x - left_node_x);
        const slope_of_line = Math.abs(Math.atan(slope)).toFixed(1);
        const slope_of_line_include_width = Math.abs(Math.atan(slope * 2)).toFixed(1);

        const equate = Math.abs(Math.atan((mouse_y - left_node_y) / (mouse_x - left_node_x))).toFixed(1);

        return slope_of_line <= equate && equate <= slope_of_line_include_width;
    }

    /**
     * Checking if the mouse is clicked inside the wire. 
     */
    check_mouse_inside_wire = (mouse_x, mouse_y, left_node_x, left_node_y, right_node_x, right_node_y) => {
        const check_y = (mouse_y >= left_node_y && mouse_y <= right_node_y);
        const check_x = (mouse_x <= left_node_x && mouse_x >= right_node_x) || (mouse_x >= left_node_x && mouse_x <= right_node_x);

        return check_x && check_y;
    }

    /**
     *  A function that checks if the mouse is clicked on the wire.
     * @param x x position of mouse
     * @param y y position of mouse
     * @param object_index index of the wire in the list of the instances created
     */
    clicked = (mouse_x, mouse_y, index) => {
        const left_node = this.input.y < this.output.y ? this.input : this.output;
        const right_node = this.input.y > this.output.y ? this.input : this.output;

        if (this.check_mouse_in_wire(mouse_x, mouse_y, left_node.x, left_node.y, right_node.x, right_node.y) && this.check_mouse_inside_wire(mouse_x, mouse_y, left_node.x, left_node.y, right_node.x, right_node.y)) {
            this.delete_unit(index);
        }
    }

    delete_unit = (index) => {
        this.output.state = 0;
        delete units[index];
    }
}