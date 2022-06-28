const get_project_name = () => {
    fetch(FIREBASE_GET_URL)
        .then(response => response.json())
        .then(response => {
            let counter = 1;
            response.forEach(project => {
                new Project_list(counter, project);
                counter++;
            });
        })
}

const get_project_data = async (project_id) => {
    const data = await fetch(FIREBASE_GET_PROJECT_URL + project_id)
        .then(response => response.json());

    return data;
}

const get_information_data = async () => {
    const data = await fetch(FIREBASE_GET_INFORMATION_URL)
        .then(response => response.json());
        
    return data;
}

const send_project_data = async (project_data) => {
    const response = fetch(FIREBASE_POST_URL, {
        method: 'POST',
        body: JSON.stringify(project_data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(r => r.json())
        .catch(console.log);

    return response;
}