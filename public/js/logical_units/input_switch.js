class Switch {
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

        this.node.push(new Output(this.x + this.width, this.y + this.output_offset()));

        this.draw("white");
    }

    output_offset = () => this.height / 2;

    draw = (stroke_color) => {
        context.beginPath();

        context.fillStyle = "white";
        context.fillRect(this.x, this.y, this.width, this.height);

        this.state_x = this.x + (this.state_width / 2);
        this.state_y = this.y + (this.state_height / 2);
        context.fillStyle = this.state === 0 ? "black" : active_color;
        context.fillRect(this.state_x, this.state_y, this.state_width, this.state_height);

        this.node[0].x = this.x + this.width;
        this.node[0].y = this.y + this.output_offset();
        context.fillStyle = "white";
        this.node[0].draw();

        context.strokeStyle = stroke_color;
        context.strokeRect(this.x, this.y, this.width, this.height);
    }

    run = () => {
        this.node[0].state = this.state;
        this.draw();
    }


    clicked = (x, y, object_index) => {
        console.log("socket");
        if (check_mouse_in_unit(x, y, this.x, this.y, this.width, this.height)) {

            console.log("clicked socket");

            if (check_mouse_in_unit(x, y, this.state_x, this.state_y, this.state_width, this.state_height)) {
                this.state = ++this.state % 2;
                console.log("socket state");
            }
        }

        this.node[0].clicked(x, y, object_index, 0);
    }
}

const switch_btn = document.getElementById("switch_input");
switch_btn.addEventListener("click", () => {
    console.log(index_for_unit);
    index_for_unit++;
    console.log(index_for_unit);
    const position_x = window.innerWidth / 2;
    const position_y = position_x / 2;
    units[index_for_unit] = new Switch(position_x, position_y);
});