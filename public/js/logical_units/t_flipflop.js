class T {
    /**
     * It creates a new object called a T-Flip Flop.
     * @param position_x - x position of the top left corner of the component
     * @param position_y - the y position of the top left corner of the component
     */
    constructor(position_x, position_y) {
        this.x = position_x;
        this.y = position_y;

        this.width = 80;
        this.height = 100;

        this.name = "T";

        this.gates = [];

        this.gates.push(new And(100, 100, 3));
        this.gates.push(new Nor(400, 100, 2));
        this.gates.push(new Nor(400, 400, 2));
        this.gates.push(new And(100, 400, 3));
        this.gates.push(new Wire(this.gates[3].node[3], this.gates[2].node[1]));
        this.gates.push(new Wire(this.gates[0].node[3], this.gates[1].node[0]));
        this.gates.push(new Wire(this.gates[2].node[2], this.gates[1].node[1]));
        this.gates.push(new Wire(this.gates[1].node[2], this.gates[2].node[0]));
        this.gates.push(new Wire(this.gates[2].node[2], this.gates[3].node[0]));
        this.gates.push(new Wire(this.gates[1].node[2], this.gates[0].node[2]));


        this.node = [];

        this.node.push(new Input(this.x, this.y + this.first_offset(), 0));

        this.node.push(new Input(this.x, this.y + this.second_offset(), 0));

        this.node.push(new Output(this.x + this.width, this.y + this.first_offset()));

        this.node.push(new Output(this.x + this.width, this.y + this.second_offset()));
    }

    /**
     * A function that returns the first offset of the flipflop.
     */
    first_offset = () => this.height / 3;

    /**
     * A function that returns the offset i.e. two third of height of the object.
     */
    second_offset = () => (this.height / 3) * 2;

    /**
     * A function that takes in a stroke color and draws the flipflop.
     * @param stroke_color stroke color for the flipflop
     */
    draw = (stroke_color) => {
        CONTEXT.beginPath();

        CONTEXT.strokeStyle = stroke_color;
        CONTEXT.strokeRect(this.x, this.y, this.width, this.height);

        CONTEXT.font = "2rem Josefin Sans";
        CONTEXT.fillStyle = INACTIVE_COLOR;
        CONTEXT.fillText("T", this.x + (this.width / 3), this.y + (this.height / 2));

        this.node[0].x = this.x - 15;
        this.node[0].y = this.y + this.first_offset();
        this.node[0].draw();

        this.node[1].x = this.x - 15;
        this.node[1].y = this.y + this.second_offset();
        this.node[1].draw();

        this.node[2].x = this.x + this.width;
        this.node[2].y = this.y + this.first_offset();
        this.node[2].draw();

        this.node[3].x = this.x + this.width;
        this.node[3].y = this.y + this.second_offset();
        this.node[3].draw();

        CONTEXT.stroke();

        CONTEXT.closePath();
    }

    /**
     * It is used to update the state of nodes of the flipflop. 
     */
    operate = () => {
        this.gates[0].node[0].state = this.node[0].state;
        this.gates[0].node[1].state = this.node[1].state;
        this.gates[3].node[1].state = this.node[1].state;
        this.gates[3].node[2].state = this.node[0].state;

        this.node[2].state = this.gates[1].node[2].state;
        this.node[3].state = this.gates[2].node[2].state;
    }

    /**
     * It is used to update the state of the flipflop. 
     */
    run = () => {
        if (!this.t_id) {

            this.t_id = setInterval(() => {
                this.gates[4].run();
                this.gates[6].run();
                this.gates[5].run();
                this.gates[1].run();
                this.gates[7].run();
                this.gates[2].run();
                this.gates[0].run();
                this.gates[3].run();
                this.gates[8].run();
                this.gates[9].run();

                this.operate();
                this.draw(INACTIVE_COLOR);
            }, ONE_SECOND);
        }
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


