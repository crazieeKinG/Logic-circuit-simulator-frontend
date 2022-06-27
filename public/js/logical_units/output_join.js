class Output {
    constructor(position_x, position_y, width = 10, height = 10) {
        this.x = position_x;
        this.y = position_y;
        this.width = width;
        this.height = height;

        this.state = 0;
        this.name = "Output node";

        this.draw();
    }

    draw = () => {
        this.x += this.width / 2;
        this.y -= this.height / 2;
        context.fillStyle = this.state === 1 ? active_color : "white";
        context.fillRect(this.x, this.y, this.width, this.height)
    }

    clicked = (x, y, parent_index, object_index) => {
        if (check_mouse_in_unit(x, y, this.x, this.y, this.width, this.height)) {
            console.log("clicked output");
            selected_input_output_node.push([parent_index, object_index])
        }
    }
}