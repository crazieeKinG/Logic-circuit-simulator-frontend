class Switch {
    /**
     * It creates a new object with the given parameters and draws it on the canvas.
     * @param position_x - The x position of the switch
     * @param position_y - The y position of the switch
     * @param [width=20] - The width of the switch
     * @param [height=20] - 20
     */
    constructor(position_x, position_y, width = 20, height = 20) {
        this.x = position_x;
        this.y = position_y;

        this.width = width;
        this.height = height;
        this.name = "Switch";

        this.state_width = this.width / 2;
        this.state_height = this.height / 2;

        this.state_x = this.x + (this.state_width / 2);
        this.state_y = this.y + (this.state_height / 2);

        this.state = 0;

        this.node = [];
        this.node.push(new Output(this.x + this.width, this.y + half_the_value(this.height)));
    }

    /**
     * A function that takes in a stroke color and draws the switch.
     * @param stroke_color stroke color for the switch
     */
    draw = (stroke_color) => {
        CONTEXT.beginPath();

        CONTEXT.font = "1rem Josefin Sans";
        CONTEXT.fillStyle = INACTIVE_COLOR;
        CONTEXT.fillText("Switch", this.x, this.y + (this.height + 20));

        CONTEXT.fillStyle = INACTIVE_COLOR;
        CONTEXT.fillRect(this.x, this.y, this.width, this.height);

        this.state_x = this.x + (this.state_width / 2);
        this.state_y = this.y + (this.state_height / 2);
        CONTEXT.fillStyle = this.state === 0 ? "black" : ACTIVE_COLOR;
        CONTEXT.fillRect(this.state_x, this.state_y, this.state_width, this.state_height);

        this.node[0].x = this.x + this.width;
        this.node[0].y = this.y + half_the_value(this.height);
        CONTEXT.fillStyle = INACTIVE_COLOR;
        this.node[0].draw();

        CONTEXT.strokeStyle = stroke_color;
        CONTEXT.strokeRect(this.x, this.y, this.width, this.height);
    }

    /**
     * It is used to update the state of the gate. 
     */
    run = () => {
        this.node[0].state = this.state;
    }

    /**
     *  A function that checks if the mouse is clicked on the nodes.
     * @param x x position of mouse
     * @param y y position of mouse
     * @param object_index index of the gate in the list of the instances created
     */
    clicked = (x, y, object_index) => {
        if (check_mouse_in_unit(x, y, this.x, this.y, this.width, this.height)) {
            if (check_mouse_in_unit(x, y, this.state_x, this.state_y, this.state_width, this.state_height)) {
                this.state = ++this.state % 2;
            }
        }

        this.node[0].clicked(x, y, object_index, 0);
    }
}


