class Input {
    constructor(position_x, position_y, state = 0, width = 10, height = 10) {
        this.x = position_x;
        this.y = position_y;
        this.width = width;
        this.height = height;

        this.state = state;
        this.name = "Input node";
    }

    draw = () => {
        this.y -= this.height / 2;

        context.fillStyle = this.state === 1 ? active_color : "white";

        context.fillRect(this.x, this.y, this.width, this.height)
    }

    clicked = (x, y, parent_index, object_index) => {

        if (check_mouse_in_unit(x, y, this.x, this.y, this.width, this.height)) {
            console.log(this);
            console.log("clicked input");
            selected_input_output_node.push([parent_index, object_index])
        }
    }
}