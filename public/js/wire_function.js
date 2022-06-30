/**
 * If the selected_input_output_node array has a value, then set the node_selected innerText to the name of the node at the index of the selected_input_output_node array, and set the color of the node to SELECTED_COLOR else clear the node_selected innerText. 
 */
const node_selection = () => {
    if (selected_input_output_node[0]) {
        const index = selected_input_output_node[0];
        NODE_SELECTED.innerText = units[index[0]].node[index[1]].name;
        units[index[0]].node[index[1]].color = SELECTED_COLOR;
    } else {
        NODE_SELECTED.innerText = "";
    }
}

/**
 * If two nodes are selected then it creates a new Wire object, and then sets the color of the two nodes that the wire is connected to INACTIVE_COLOR.
 */
const add_wire = () => {
    if (selected_input_output_node.length === 2) {
        const first_node = selected_input_output_node[0];
        const second_node = selected_input_output_node[1];

        index_for_unit++;
        units[index_for_unit] = new Wire(units[first_node[0]].node[first_node[1]], units[second_node[0]].node[second_node[1]], first_node, second_node);

        units[first_node[0]].node[first_node[1]].color = INACTIVE_COLOR;
        units[second_node[0]].node[second_node[1]].color = INACTIVE_COLOR;
        selected_input_output_node = [];
    }
}

/**
 * If the user is not dragging a unit, then it checks if the mouse is over a node, and if it is, it will add a wire to the node.
 * @param event - the mouse event.
 * @returns - Nothing
 */
const input_output_nodes = (event) => {
    if (drag_unit) return;

    for (let index in units) {
        if (units[index].name === "Wire") continue;

        mouse_x = event.clientX;
        mouse_y = event.clientY;


        units[index].clicked(mouse_x, mouse_y, index);
        add_wire();
        node_selection();
    };
}

/**
 * If the user is not dragging a unit, then check if the user clicked on a wire, and if so, delete it.
 * The function is called when the user double clicks on the canvas.
 * @param event - the mouse event that was triggered.
 * @returns - Nothing
 */
const delete_wire_event = (event) => {
    if (drag_unit) return;

    for (let index in units) {
        if (units[index].name !== "Wire") continue;

        mouse_x = event.clientX - x;
        mouse_y = event.clientY - y;        
        
        units[index].clicked(mouse_x, mouse_y, index);
    };
}

CANVAS.onclick = input_output_nodes;
CANVAS.ondblclick = delete_wire_event;