class And {
    constructor(position_x, position_y, inputs) {
        console.log("and gate construct");

        this.x = position_x;
        this.y = position_y;
        this.width = 25;
        this.height = 50;
        this.number_of_inputs = inputs;
        this.name = "AND";

        this.node = [];

        for (let index = 1; index <= inputs; index++) {
            this.node.push(new Input(this.x, this.y + this.input_offset(index), 0));
        }

        this.node.push(new Output(this.x + this.width, this.y + this.output_offset()));

        this.draw("white");
        // this.run();
    }


    input_offset = (index) => (this.height / (this.number_of_inputs + 1)) * index;

    output_offset = () => this.height / 2;

    draw = (stroke_color) => {
        context.beginPath();

        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y + this.height);

        const radius = this.height / 2;

        context.arc(this.x, this.y + radius, radius, to_radian(90), to_radian(-90), true);


        for (let index = 0; index < this.number_of_inputs; index++) {
            this.node[index].x = this.x - this.width;
            this.node[index].y = this.y + this.input_offset(index + 1);
            this.node[index].draw();
        }

        this.node[this.number_of_inputs].x = this.x + this.width;
        this.node[this.number_of_inputs].y = this.y + this.output_offset();
        this.node[this.number_of_inputs].draw();

        context.strokeStyle = stroke_color;
        context.stroke();
        context.fillStyle = fill_color;
        context.fill();

        context.closePath();
    }

    operate = () => {
        let count_low_state = 0;

        for (let index = 0; index < this.number_of_inputs; index++) {
            if (this.node[index].state === 1) count_low_state++;
        }

        if (count_low_state === this.number_of_inputs) return 1;
        else return 0;
    }

    run = () => {
        // requestAnimationFrame(this.run);
        this.node[this.number_of_inputs].state = this.operate();
    }

    clicked = (x, y, object_index) => {
        console.log("and");
        if (check_mouse_in_unit(x, y, this.x, this.y, this.width, this.height)) {
            console.log("clicked and");
        }

        for (let index in this.node) {
            this.node[index].clicked(x, y, object_index, index);
        }
    }
}


const and_btn = [...document.getElementsByClassName("and_gate")];
and_btn.forEach(and_gate=>{
    and_gate.addEventListener("click", () => {
        console.log(index_for_unit);
        index_for_unit++;
        console.log(index_for_unit);
        const position_x = window.innerWidth / 2;
        const position_y = position_x / 2;
        units[index_for_unit] = new And(position_x, position_y, parseInt(and_gate.getAttribute('inputs')));
    });
})