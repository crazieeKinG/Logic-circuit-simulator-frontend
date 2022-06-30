class Not {
    /**
     *  The constructor function for the NOT gate class.
     * @param position_x - x position of the gate on the canvas
     * @param position_y - the y position of the gate
     */
    constructor(position_x, position_y) {
        this.x = position_x;
        this.y = position_y;
        this.width = 25;
        this.height = 50;
        this.name = "NOT";

        this.node = [];

        this.node.push(new Input(this.x, this.y + half_the_value(this.height), 0));

        this.node.push(new Output(this.x + this.width, this.y + half_the_value(this.height)));
    }

    /**
     * A function that takes in a stroke color and draws the gate.
     * @param stroke_color stroke color for the gate
     */
    draw = (stroke_color) => {
        CONTEXT.beginPath();

        CONTEXT.font = "1rem Josefin Sans";
        CONTEXT.fillStyle = INACTIVE_COLOR;
        CONTEXT.fillText("NOT", this.x, this.y + (this.height + 20));

        const radius = 5;

        CONTEXT.moveTo(this.x, this.y);
        CONTEXT.lineTo(this.x, this.y + this.height);
        CONTEXT.lineTo(this.x + this.width, this.y + half_the_value(this.height));
        CONTEXT.lineTo(this.x - 1, this.y);


        this.node[0].x = this.x - this.width;
        this.node[0].y = this.y + half_the_value(this.height);
        this.node[0].draw();

        this.node[1].x = this.x + this.width + (radius);
        this.node[1].y = this.y + half_the_value(this.height);
        this.node[1].draw();

        CONTEXT.strokeStyle = stroke_color;
        CONTEXT.stroke();

        CONTEXT.fillStyle = FILL_COLOR;
        CONTEXT.fill();

        CONTEXT.closePath();

        CONTEXT.beginPath();

        CONTEXT.arc(this.x + this.width, this.y + half_the_value(this.height), radius, 0, Math.PI * 2);
        CONTEXT.fillStyle = INACTIVE_COLOR;
        CONTEXT.fill();

        CONTEXT.closePath();
    }

    /**
     * It is used to update the state of the gate. 
     */
    run = () => {
        this.node[1].state = (this.node[0].state + 1) % 2;
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



