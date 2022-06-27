class JK {
    constructor(position_x, position_y) {
        this.x = position_x;
        this.y = position_y;

        this.width = 80;
        this.height = 100;

        this.name = "JK";

        this.gates = [];

        this.gates.push(new Nand(100, 100, 3));
        this.gates.push(new Nand(400, 100, 2));
        this.gates.push(new Nand(400, 400, 2));
        this.gates.push(new Nand(100, 400, 3));
        this.gates.push(new Wire(this.gates[3].node[3], this.gates[2].node[1]));
        this.gates.push(new Wire(this.gates[0].node[3], this.gates[1].node[0]));
        this.gates.push(new Wire(this.gates[2].node[2], this.gates[1].node[1]));
        this.gates.push(new Wire(this.gates[1].node[2], this.gates[2].node[0]));
        this.gates.push(new Wire(this.gates[2].node[2], this.gates[0].node[2]));
        this.gates.push(new Wire(this.gates[1].node[2], this.gates[3].node[0]));


        this.node = [];

        this.node.push(new Input(this.x, this.y + this.first_offset(), 0));

        this.node.push(new Input(this.x, this.y + (this.height / 2), 0));

        this.node.push(new Input(this.x, this.y + this.second_offset(), 0));

        this.node.push(new Output(this.x + this.width, this.y + this.first_offset()));

        this.node.push(new Output(this.x + this.width, this.y + this.second_offset()));

        this.draw("white");
    }

    first_offset = () => this.height / 3

    second_offset = () => (this.height / 3) * 2;

    draw = (stroke_color) => {
        context.beginPath();

        context.strokeStyle = stroke_color;
        context.strokeRect(this.x, this.y, this.width, this.height);

        context.font = "2rem Josefin Sans";
        context.fillStyle = "white";
        context.fillText("JK", this.x + (this.width / 4), this.y + (this.height / 2));

        this.node[0].x = this.x - 15;
        this.node[0].y = this.y + this.first_offset();
        this.node[0].draw();

        this.node[1].x = this.x - 15;
        this.node[1].y = this.y + (this.height / 2);
        this.node[1].draw();

        this.node[2].x = this.x - 15;
        this.node[2].y = this.y + this.second_offset();
        this.node[2].draw();

        this.node[3].x = this.x + this.width;
        this.node[3].y = this.y + this.first_offset();
        this.node[3].draw();

        this.node[4].x = this.x + this.width;
        this.node[4].y = this.y + this.second_offset();
        this.node[4].draw();

        context.stroke();

        context.closePath();
    }

    operate = () => {
        this.gates[0].node[0].state = this.node[0].state;
        this.gates[0].node[1].state = this.node[1].state;
        this.gates[3].node[1].state = this.node[1].state;
        this.gates[3].node[2].state = this.node[2].state;

        this.node[3].state = this.gates[1].node[2].state;
        this.node[4].state = this.gates[2].node[2].state;
    }

    run = () => {
        if (!this.jk_id) {
            // clearInterval(this.frequency_generator_id);

            this.jk_id = setInterval(() => {
                this.gates[4].run();
                this.gates[5].run();
                this.gates[6].run();
                this.gates[1].run();
                this.gates[7].run();
                this.gates[2].run();
                this.gates[0].run();
                this.gates[3].run();
                console.log(this.gates.length);
                this.operate();
                this.draw("white");
                // this.draw();
            }, 1000/60);
        }

    }

    clicked = (x, y, object_index) => {
        for (let index in this.node) {
            this.node[index].clicked(x, y, object_index, index);
        }
    }
}

const jk_btn = document.getElementById("jk_flipflop");
jk_btn.addEventListener("click", () => {
    console.log(index_for_unit);
    index_for_unit++;
    console.log(index_for_unit);
    const position_x = window.innerWidth / 2;
    const position_y = position_x / 2;
    units[index_for_unit] = new JK(position_x, position_y);
});