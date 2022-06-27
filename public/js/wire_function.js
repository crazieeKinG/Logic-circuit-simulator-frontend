const add_wire = () => {
    console.log(selected_input_output_node);
    if (selected_input_output_node.length === 2) {
        const first_node = selected_input_output_node[0];
        const second_node = selected_input_output_node[1];
        index_for_unit++;
        units[index_for_unit] = new Wire(units[first_node[0]].node[first_node[1]], units[second_node[0]].node[second_node[1]], first_node, second_node);
        selected_input_output_node = [];
    }
}

const input_output_nodes = (event) => {
    if (DRAG_UNIT) return;
    console.log(units);
    for (let index in units) {
        if (units[index].name === "Wire") continue;

        mouse_X = event.clientX;
        mouse_Y = event.clientY;


        units[index].clicked(mouse_X, mouse_Y, index);
        add_wire();
        node_selection();
        draw_canvas();
    };
    console.log("...");
}

CANVAS.onclick = input_output_nodes;

const delete_wire_event = (event) => {
    if (DRAG_UNIT) return;

    for (let index in units) {
        if (units[index].name !== "Wire") continue;

        const { x, y } = event.target.getBoundingClientRect();

        mouse_X = event.clientX - x;
        mouse_Y = event.clientY - y;


        units[index].clicked(mouse_X, mouse_Y, index);
        draw_canvas();
    };
    console.log("...");
}

CANVAS.ondblclick = delete_wire_event;