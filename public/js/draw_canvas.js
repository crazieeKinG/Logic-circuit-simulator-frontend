/**
 * It draws the canvas at regular interval of time.
 */
const draw_canvas = () => {
    CONTEXT.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let selected_color;

    if (!data_loaded && project_id !== "null") {
        draw_loading_screen();
    }

    for (let index in units) {

        if (index === selected_unit) {
            selected_color = SELECTED_COLOR;
        } else {
            selected_color = INACTIVE_COLOR;
        }

        units[index].run();
        units[index].draw(selected_color);
    }

    requestAnimationFrame(() => {
        draw_canvas();
    });
}

/**
 * It takes a JSON object and creates the objects that were saved in the JSON object.
 * @param save_data - The data that is saved.
 */
const initialize_canvas = (save_data) => {
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

            case "SR":
                units[index] = new SR(save_data[index].x, save_data[index].y);
                break;

            case "T":
                units[index] = new T(save_data[index].x, save_data[index].y);
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
    }
}

/**
 * It draws the loading screen on the canvas.
 */
const draw_loading_screen = () => {
    CONTEXT.font = "5rem Josefin Sans";
    CONTEXT.fillStyle = INACTIVE_COLOR;
    CONTEXT.fillText("Loading...", (CANVAS_WIDTH / 4), (CANVAS_HEIGHT / 2));
}