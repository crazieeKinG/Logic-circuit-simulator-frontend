const CURRENT_URL = new URLSearchParams(window.location.search);
const PROJECT_ID = CURRENT_URL.get('id');

if (PROJECT_ID != 'null') {
    get_project_data(PROJECT_ID).then(response => response.data)
        .then(save_data => {
            initialize_canvas(save_data)
        })
}
draw_canvas();

const ref = document.querySelector("#ref");
ref.onclick = () => {
    context.clearRect(0, 0, canvas_width, canvas_height);
    // console.log(units);
    draw_canvas();
}

const clear_node_selection = document.querySelector("#clear_node_selection");
clear_node_selection.onclick = () => {
    selected_input_output_node = [];
    node_selection();
}

const delete_selected_node = document.querySelector("#delete_selected_node");
delete_selected_node.onclick = () => {
    delete units[SELECTED_UNIT];

    for (let index in units) {
        if (units[index].name === "Wire") {
            if (units[index].input_ref[0] === SELECTED_UNIT || units[index].output_ref[0] === SELECTED_UNIT) {
                units[index].delete_unit(index);
            }
        }
    }

    SELECTED_UNIT = null;

    // draw();
}

const node_selection = () => {
    if (selected_input_output_node[0]) {
        const index = selected_input_output_node[0];
        node_selected.innerText = units[index[0]].node[index[1]].name;
    } else {
        node_selected.innerText = "";
    }
}

const project_title = document.getElementById("title");
project_title.value = CURRENT_URL.get("title");

const save_project = document.getElementById("save");
save_project.addEventListener("click", () => {
    const project_data = JSON.parse(JSON.stringify(units));

    for (let index in project_data) {
        if (project_data[index].node) {
            delete project_data[index].node;
        }
    }

    const data = {
        "id": PROJECT_ID,
        "project_data": {
            "project_name": project_title.value,
            "data": { ...project_data }
        }
    }

    send_project_data(data).then(response => {
        const save_status = document.getElementById("save_status");

        console.log(response);
        if (response.success) {
            save_status.innerText = "Saved";
        } else {
            save_status.innerText = "Failed to save";
        }
    })
});