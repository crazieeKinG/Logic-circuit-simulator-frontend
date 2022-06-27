class Wire {
    constructor(output_port, input_port, out_reference, in_reference) {
        this.input = output_port;
        this.output = input_port;
        this.name = "Wire";
        this.output_ref = out_reference;
        this.input_ref = in_reference;


        // this.draw();
        this.run();
    }

    draw = () => {
        context.beginPath();

        context.strokeStyle = this.input.state === 1 ? active_color : "white";

        context.moveTo(this.input.x + this.input.width, this.input.y + (this.input.height / 2));
        context.lineTo(this.output.x, this.output.y + (this.output.height / 2));

        context.stroke();
        context.fill();

        context.closePath();
    }

    run = () => {
        // requestAnimationFrame(this.pass_state);

        // console.log("passing");

        if (this.input.name === "Output node") {
            this.output.state = this.input.state;
        } else {
            this.input.state = this.output.state;
        }
    }

    check_mouse_in_wire = (mouse_x, mouse_y, left_node_x, left_node_y, right_node_x, right_node_y) => {
        const slope = (right_node_y - left_node_y) / (right_node_x - left_node_x);
        const slope_of_line = Math.abs(Math.atan(slope)).toFixed(1);
        const slope_of_line_include_width = Math.abs(Math.atan(slope * 2)).toFixed(1);

        const equate = Math.abs(Math.atan((mouse_y - left_node_y) / (mouse_x - left_node_x))).toFixed(1);

        console.log(equate)

        return slope_of_line <= equate && equate <= slope_of_line_include_width;
    }

    check_mouse_inside_wire = (mouse_x, mouse_y, left_node_x, left_node_y, right_node_x, right_node_y) => {
        const check_y = (mouse_y >= left_node_y && mouse_y <= right_node_y);
        const check_x = (mouse_x <= left_node_x && mouse_x >= right_node_x) || (mouse_x >= left_node_x && mouse_x <= right_node_x);

        return check_x && check_y;
    }

    clicked = (mouse_X, mouse_Y, index) => {
        console.log("wire");
        const left_node = this.input.y < this.output.y ? this.input : this.output;
        const right_node = this.input.y > this.output.y ? this.input : this.output;

        if (this.check_mouse_in_wire(mouse_X, mouse_Y, left_node.x, left_node.y, right_node.x, right_node.y) && this.check_mouse_inside_wire(mouse_X, mouse_Y, left_node.x, left_node.y, right_node.x, right_node.y)) {
            console.log("clicked wire");
            this.delete_unit(index);
        }
    }

    delete_unit = (index) => {
        this.output.state = 0;
        delete units[index];
    }
}