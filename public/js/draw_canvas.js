const draw_canvas = () => {
    context.clearRect(0, 0, canvas_width, canvas_height);

    // for (let index in units) {
    // }

    let selected_color;

    for (let index in units) {

        if (index === SELECTED_UNIT) {
            selected_color = "#72faab";
        } else {
            selected_color = "white";
        }

        units[index].run();
        units[index].draw(selected_color);
    }

    requestAnimationFrame(()=>{
        draw_canvas();
    });
}

const initialize_canvas = (save_data) => {
    console.log(JSON.stringify(save_data));
    for (let index in save_data) {
        index_for_unit = index;
        switch (save_data[index].name) {
            case "AND":
                units[index] = new And(save_data[index].x, save_data[index].y, save_data[index].number_of_inputs);
                break;

            case "OR":
                units[index] = new Or(save_data[index].x, save_data[index].y, save_data[index].number_of_inputs);
                break;

            case "NOT":
                units[index] = new Not(save_data[index].x, save_data[index].y);
                break;

            case "Light":
                units[index] = new Light(save_data[index].x, save_data[index].y);
                break;

            case "Switch":
                units[index] = new Switch(save_data[index].x, save_data[index].y);
                break;

            case "NAND":
                units[index] = new Nand(save_data[index].x, save_data[index].y, save_data[index].number_of_inputs);
                break;

            case "NOR":
                units[index] = new Nor(save_data[index].x, save_data[index].y, save_data[index].number_of_inputs);
                break;

            case "XNOR":
                units[index] = new Xnor(save_data[index].x, save_data[index].y, save_data[index].number_of_inputs);
                break;

            case "XOR":
                units[index] = new Xor(save_data[index].x, save_data[index].y, save_data[index].number_of_inputs);
                break;

            case "JK":
                units[index] = new JK(save_data[index].x, save_data[index].y);
                break;

            case "Frequency":
                units[index] = new Frequency_generator(save_data[index].x, save_data[index].y, save_data[index].frequency);
                break;
                
            case "Wire":
                const output_ref = save_data[index].output_ref;
                const input_ref = save_data[index].input_ref;
                units[index] = new Wire(units[output_ref[0]].node[parseInt(output_ref[1])], units[input_ref[0]].node[parseInt(input_ref[1])], output_ref, input_ref);
                break;

            default:
                break;
        }
        draw_canvas();
    }
}