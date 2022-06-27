class Not {
    constructor(position_x, position_y) {
        console.log("not gate construct");

        this.x = position_x;
        this.y = position_y;
        this.width = 25;
        this.height = 50;
        this.name = "NOT";

        this.node = [];

        this.node.push(new Input(this.x, this.y + this.offset(), 0));

        this.node.push(new Output(this.x + this.width, this.y + this.offset()));

        this.draw("white");
        // this.run();
    }

    offset = () => this.height / 2;

    draw = (stroke_color) => {
        context.beginPath();

        const radius = 5;


        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y + this.height);
        context.lineTo(this.x + this.width, this.y + this.offset());
        context.lineTo(this.x - 1, this.y);


        this.node[0].x = this.x - this.width;
        this.node[0].y = this.y + this.offset();
        this.node[0].draw();

        this.node[1].x = this.x + this.width + (radius);
        this.node[1].y = this.y + this.offset();
        this.node[1].draw();

        context.strokeStyle = stroke_color;
        context.stroke();

        context.fillStyle = fill_color;
        context.fill();



        context.closePath();

        context.beginPath();

        context.arc(this.x + this.width, this.y + this.offset(), radius, 0, Math.PI * 2);
        context.fillStyle = "white";
        context.fill();

        context.closePath();
    }

    run = () => {
        // requestAnimationFrame(this.run);
        this.node[1].state = (this.node[0].state + 1) % 2;
    }

    clicked = (x, y, object_index) => {
        console.log("and");
        if (check_mouse_in_unit(x, y, this.x, this.y, this.width, this.height)) {
            console.log("clicked not");
        }

        for (let index in this.node) {
            this.node[index].clicked(x, y, object_index, index);
        }
    }
}


const not_btn = document.getElementById("not_gate");
not_btn.addEventListener("click", () => {
    index_for_unit++;
    console.log(index_for_unit);
    const position_x = window.innerWidth / 2;
    const position_y = position_x / 2;
    units[index_for_unit] = new Not(position_x, position_y);
});