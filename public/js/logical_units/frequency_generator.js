class Frequency_generator {
    constructor(position_x, position_y, frequency) {
        this.x = position_x;
        this.y = position_y;

        this.width = 80;
        this.height = 50;

        this.name = "Frequency";

        this.frequency = parseFloat(frequency);
        this.frequency_generator_id = "";

        this.node = [];
        this.node.push(new Output(this.x + this.width, this.y + this.offset()));

        this.draw("white");
    }

    offset = () => this.height / 2;

    draw = (stroke_color) => {
        context.beginPath();

        const mid_height = this.y + this.offset();

        context.moveTo(this.x, mid_height);
        context.lineTo(this.x + 10, mid_height);
        context.lineTo(this.x + 20, mid_height + 10);
        context.lineTo(this.x + 30, mid_height - 20);
        context.lineTo(this.x + 50, mid_height + 20);
        context.lineTo(this.x + 60, mid_height - 10);
        context.lineTo(this.x + 70, mid_height);
        context.lineTo(this.x + 80, mid_height);

        this.node[0].x = this.x + this.width;
        this.node[0].y = this.y + this.offset();
        this.node[0].draw();

        context.strokeStyle = stroke_color;
        context.stroke();

        context.closePath();
    }

    run = () => {
        if (!this.frequency_generator_id) {
            // clearInterval(this.frequency_generator_id);

            this.frequency_generator_id = setInterval(() => {
                this.node[0].state = ++this.node[0].state % 2;
                // console.log(this.frequency_generator_id, "..");
                console.log(this.frequency, "..");
                this.draw();
            }, this.frequency * 1000);
        }

    }
    clicked = (x, y, object_index) => {
        this.node[0].clicked(x, y, object_index, 0);
    }
}

const frequency_generator_btn = [...document.getElementsByClassName("frequency_generator")];
frequency_generator_btn.forEach(frequency_generator => {

    frequency_generator.addEventListener("click", () => {
        console.log(index_for_unit);
        index_for_unit++;
        console.log(index_for_unit);
        const position_x = window.innerWidth / 2;
        const position_y = position_x / 2;
        units[index_for_unit] = new Frequency_generator(position_x, position_y,frequency_generator.getAttribute("custom_frequency"));
    });
}); 