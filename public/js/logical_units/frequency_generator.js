class Frequency_generator {
    /**
     * "This function creates a new object called Frequency, which has a property called frequency.
     * @param position_x - x position of the object
     * @param position_y - The y position of the object
     * @param frequency - the frequency of the waveform
     */
    constructor(position_x, position_y, frequency) {
        this.x = position_x;
        this.y = position_y;

        this.width = 80;
        this.height = 50;
        this.name = "Frequency";

        this.frequency = parseFloat(frequency);
        this.frequency_generator_id = "";

        this.node = [];
        this.node.push(new Output(this.x + this.width, this.y + half_the_value(this.height)));
    }

    /**
     * A function that takes in a stroke color and draws the frequency generator.
     * @param stroke_color stroke color for frequency generator
     */
    draw = (stroke_color) => {
        CONTEXT.beginPath();

        CONTEXT.font = "1rem Josefin Sans";
        CONTEXT.fillStyle = INACTIVE_COLOR;
        CONTEXT.fillText(`Frequency - ${this.frequency}`, this.x, this.y + (this.height + 20));

        const mid_height = this.y + half_the_value(this.height);

        CONTEXT.moveTo(this.x, mid_height);
        CONTEXT.lineTo(this.x + 10, mid_height);
        CONTEXT.lineTo(this.x + 20, mid_height + 10);
        CONTEXT.lineTo(this.x + 30, mid_height - 20);
        CONTEXT.lineTo(this.x + 50, mid_height + 20);
        CONTEXT.lineTo(this.x + 60, mid_height - 10);
        CONTEXT.lineTo(this.x + 70, mid_height);
        CONTEXT.lineTo(this.x + 80, mid_height);

        this.node[0].x = this.x + this.width;
        this.node[0].y = this.y + half_the_value(this.height);
        this.node[0].draw();

        CONTEXT.strokeStyle = stroke_color;
        CONTEXT.stroke();

        CONTEXT.closePath();
    }

    /**
     * It is used to update the state of the frequency generator. 
     */
    run = () => {
        if (!this.frequency_generator_id) {
            this.frequency_generator_id = setInterval(() => {
                this.node[0].state = ++this.node[0].state % 2;
                this.draw();
            }, this.frequency * 1000);
        }
    }
    /**
     *  A function that checks if the mouse is clicked on the nodes.
     * @param x x position of mouse
     * @param y y position of mouse
     * @param object_index index of the gate in the list of the instances created
     */
    clicked = (x, y, object_index) => {
        this.node[0].clicked(x, y, object_index, 0);
    }
}





