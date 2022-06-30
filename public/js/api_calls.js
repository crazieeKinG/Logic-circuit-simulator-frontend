/**
 * It fetches the data from the backend api and then displays it on the webpage.
 */
const get_project_name = () => {
    PROJECT_LIST.innerText = "Loading all projects ...";
    fetch(API_GET_URL)
        .then(response => response.json())
        .then(response => {
            PROJECT_LIST.innerHTML = "";
            let counter = 1;
            response.forEach(project => {
                new Project_list(counter, project);
                counter++;
            });
        })
}

/**
 * It fetches data from the API and returns it as a JSON object.
 * @param project_id - the id of the project you want to get data for
 * @returns A Promise that resolves to the data.
 */
const get_project_data = async (project_id) => {
    const data = await fetch(API_GET_PROJECT_URL + project_id)
        .then(response => response.json());

    return data;
}

/**
 * It fetches the data from the API and returns it as a JSON object.
 * @returns A Promise that resolves to the data.
 */
const get_information_data = async () => {
    const data = await fetch(API_GET_INFORMATION_URL)
        .then(response => response.json());

    return data;
}

/**
 * It takes a JSON object as an argument, and sends it to the API endpoint.
 * @param project_data - object to save in the database
 * @returns The response from the server.
 */
const send_project_data = async (project_data) => {
    const response = fetch(API_POST_URL, {
        method: 'POST',
        body: JSON.stringify(project_data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(r => r.json());

    return response;
}

/**
 * It takes a project_id as an argument, and then it makes a DELETE request to the API endpoint, and then it returns the response data
 * @param project_id - the id of the project to be deleted
 * @returns The response_data is an object with a status property.
 */
const delete_project_data = async (project_id) => {
    const response_data = await fetch(API_DELETE_PROJECT_URL + project_id, {
        method: 'DELETE'
    })
        .then(response => response.json());

    return response_data;
}