class Nor {
    /**
     * The constructor function for the NOR gate class, which takes in the position of the gate, the number of inputs, and creates the gate.
     * @param position_x - x coordinate of the gate
     * @param position_y - the y position of the gate
     * @param inputs - number of inputs to the gate
     */
    constructor(position_x, position_y, inputs) {
        this.x = position_x;
        this.y = position_y;
        this.width = 25;
        this.height = 50;
        this.name = "NOR";
        this.number_of_inputs = inputs;

        this.dx = 8;

        this.node = [];

        for (let index = 1; index <= inputs; index++) {
            this.node.push(new Input(this.x, this.y + this.input_offset(index), 0));
        }

        this.node.push(new Output(this.x + this.width, this.y + half_the_value(this.height)));
    }

    /**
    * A function that takes in an index and returns the offset of the input.
    * @param index The index of the input
    * @returns offset of the input based on index
    */
    input_offset = (index) => (this.height / (this.number_of_inputs + 1)) * index;

    /**
     * A function that takes in a stroke color and draws the gate.
     * @param stroke_color stroke color for the gate
     */
    draw = (stroke_color) => {
        CONTEXT.beginPath();

        CONTEXT.font = "1rem Josefin Sans";
        CONTEXT.fillStyle = INACTIVE_COLOR;
        CONTEXT.fillText("NOR", this.x, this.y + (this.height + 20));

        const radius_one = this.height;
        let radius_two = this.height / 2;

        CONTEXT.arc(this.x - radius_one + this.dx, this.y + radius_two, radius_one, to_radian(-30), to_radian(30), false);

        CONTEXT.arc(this.x, this.y + radius_two, radius_two, to_radian(90), to_radian(-90), true);

        for (let index = 0; index < this.number_of_inputs; index++) {
            this.node[index].x = this.x - this.width;
            this.node[index].y = this.y + this.input_offset(index + 1);
            this.node[index].draw();
        }

        radius_two = 5;

        this.node[this.number_of_inputs].x = this.x + this.width + radius_two;
        this.node[this.number_of_inputs].y = this.y + half_the_value(this.height);
        this.node[this.number_of_inputs].draw();

        CONTEXT.strokeStyle = stroke_color;
        CONTEXT.stroke();
        CONTEXT.fillStyle = FILL_COLOR;
        CONTEXT.fill();

        CONTEXT.closePath();

        CONTEXT.beginPath();

        CONTEXT.arc(this.x + this.width, this.y + half_the_value(this.height), radius_two, 0, Math.PI * 2);
        CONTEXT.fillStyle = INACTIVE_COLOR;
        CONTEXT.fill();

        CONTEXT.closePath();
    }

    /**
    *  A function that reads the number of inputs and returns the state of the gate. 
    * @returns the state based on the input nodes.
    */
    operate = () => {
        let count_low_state = 0;

        for (let index = 0; index < this.number_of_inputs; index++) {
            if (this.node[index].state === 0) count_low_state++;
        }

        if (count_low_state === this.number_of_inputs) return 1;
        else return 0;
    }

    /**
     * It is used to update the state of the gate. 
     */
    run = () => {
        this.node[this.number_of_inputs].state = this.operate();
    }

    /**
     *  A function that checks if the mouse is clicked on the nodes.
     * @param x x position of mouse
     * @param y y position of mouse
     * @param object_index index of the gate in the list of the instances created
     */
    clicked = (x, y, object_index) => {
        for (let index in this.node) {
            this.node[index].clicked(x, y, object_index, index);
        }
    }
}

