class Light {
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

        this.draw("white");
    }

    input_one_offest = () => this.width;

    draw = (stroke_color) => {

        context.beginPath();

        this.center_x = this.x + this.radius;
        this.center_y = this.y + this.radius;

        context.arc(this.center_x, this.center_y, this.radius, 0, Math.PI * 2);


        this.node[0].x = this.center_x - this.input_one_offest();
        this.node[0].y = this.center_y;
        context.fillStyle = "white";
        this.node[0].draw();

        context.strokeStyle = stroke_color;
        context.stroke();

        context.fillStyle = this.node[0].state === 1 ? active_color : fill_color;
        context.fill();
        context.closePath();
    }

    clicked = (x, y, object_index) => {
        console.log("light");
        if (check_mouse_in_unit(x, y, this.x, this.y, this.width, this.height)) {
            console.log("clicked light");
        }

        this.node[0].clicked(x, y, object_index, 0)
    }

    run = () => {
        this.draw();
    }
}

const light_btn = document.getElementById("light_output");
light_btn.addEventListener("click", () => {
    console.log(index_for_unit);
    index_for_unit++;
    console.log(index_for_unit);
    const position_x = window.innerWidth / 2;
    const position_y = position_x / 2;
    units[index_for_unit] = new Light(position_x, position_y);
});