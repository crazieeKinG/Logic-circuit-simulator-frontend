/**
 * Clearing the node selection. 
 */
CLEAR_NODE_SELECTION.addEventListener(CLICK_EVENT, () => {
    const index = selected_input_output_node[0];
    units[index[0]].node[index[1]].color = INACTIVE_COLOR;
    selected_input_output_node = [];
    node_selection();
});

/**
 * Deleting the selected unit.
 */
DELETE_SELECTED_NODE.addEventListener(CLICK_EVENT, () => {
    delete units[selected_unit];

    for (let index in units) {
        if (units[index].name === "Wire") {
            if (units[index].input_ref[0] === selected_unit || units[index].output_ref[0] === selected_unit) {
                units[index].delete_unit(index);
            }
        }
    }
    selected_unit = null;
});

SAVE_PROJECT.addEventListener(CLICK_EVENT, () => {
    STATUS.innerText = "Saving";
    const project_data = JSON.parse(JSON.stringify(units));

    for (let index in project_data) {
        if (project_data[index].node) {
            delete project_data[index].node;
        }
    }

    const data = {
        "id": project_id,
        "project_data": {
            "project_name": PROJECT_TITLE.value,
            "data": { ...project_data }
        }
    }

    send_project_data(data).then(response => {
        if (response.success) {
            STATUS.innerText = "Saved";
            if (!!response.project_id) {
                project_id = response.project_id;
            }
        } else {
            STATUS.innerText = "Failed to save";
        }
    })
});

DELETE_PROJECT.addEventListener(CLICK_EVENT, () => {
    if (project_id === "null") {
        STATUS.innerText = "Project not saved";
    }
    else if (confirm(`Delete project: ${CURRENT_URL.get("title")} ?`)) {
        delete_project_data(project_id).then(response => {
            if (response.success) {
                window.location.replace("./index.html");
            } else {
                STATUS.innerText = "Delete project failed!!!";
            }
        }).catch(() => {
            STATUS.innerText = "Failed to delete!";
        })
    }
});