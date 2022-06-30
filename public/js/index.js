INFORMATION_SECTION.innerText = "Loading all information ...";
PROJECT_TITLE.value = CURRENT_URL.get("title");
get_information_data().then(response => {
    INFORMATION_SECTION.innerHTML = "";
    response.forEach(information => {
        INFORMATION_DATA.push(information);
    });
});

if (project_id != 'null') {
    get_project_data(project_id).then(response => response.data)
        .then(save_data => {
            initialize_canvas(save_data)
            data_loaded = true;
        });
}
draw_canvas();