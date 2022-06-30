class Light {
    /**
     * This function creates a new object called Light, which has a radius, x and y coordinates, a center x and y, a width and height, a name, and a node.
     * @param position_x - The x position of the light.
     * @param position_y - The y position of the light.
     */
    constructor(position_x, position_y) {
        this.radius = 15;

        this.x = position_x;
        this.y = position_y;

        this.center_x = this.x + this.radius;
        this.center_y = this.y + this.radius;

        this.width = this.radius * 2;
        this.height = this.radius * 2;

        this.name = "Light";

        this.node = [];
        this.node.push(new Input(this.x - this.radius, this.y));
    }

    /**
     * A function that takes in a stroke color and draws the light.
     * @param stroke_color stroke color for the light
     */
    draw = (stroke_color) => {
        CONTEXT.beginPath();

        CONTEXT.font = "1rem Josefin Sans";
        CONTEXT.fillStyle = INACTIVE_COLOR;
        CONTEXT.fillText("Light", this.x, this.y + (this.height + 20));

        this.center_x = this.x + this.radius;
        this.center_y = this.y + this.radius;

        CONTEXT.arc(this.center_x, this.center_y, this.radius, 0, Math.PI * 2);

        this.node[0].x = this.center_x - this.width;
        this.node[0].y = this.center_y;
        CONTEXT.fillStyle = INACTIVE_COLOR;
        this.node[0].draw();

        CONTEXT.strokeStyle = stroke_color;
        CONTEXT.stroke();

        CONTEXT.fillStyle = this.node[0].state === 1 ? ACTIVE_COLOR : FILL_COLOR;
        CONTEXT.fill();
        CONTEXT.closePath();
    }

    /**
     *  A function that checks if the mouse is clicked on the nodes.
     * @param x x position of mouse
     * @param y y position of mouse
     * @param object_index index of the gate in the list of the instances created
     */
    clicked = (x, y, object_index) => {
        this.node[0].clicked(x, y, object_index, 0)
    }


    /**
     * A function that draws the light. 
     */
    run = () => {
        this.draw();
    }
}


