class Project_list {
    /**
     * This function creates a new instance of the class 'Project_list' and assigns the values of the parameters 'serial_number' and 'project_info' to the properties 'serial_number' and 'project_info' of the new instance.
     * @param serial_number - The serial number of the project.
     * @param project_info - This is an object that contains the project id and project name.
     */
    constructor(serial_number, project_info) {
        this.project_info = project_info;
        this.serial_number = serial_number;
        this.create();
    }

    /**
     * Creating a new project element with its title and link to the workspace with its corresponding id and title. 
     */
    create = () => {        
        const project = document.createElement("div");
        project.className = "project row justify-between";

        const project_info = document.createElement("div");
        project_info.className = "project-info row";

        const sn = document.createElement("span");
        sn.className = "project-sn";
        sn.innerText = `${this.serial_number}.`;
        
        const title = document.createElement("span");
        title.className = "title";
        title.innerText = this.project_info.project_name;

        const btn = document.createElement("a");
        btn.className = "btn btn-link";
        btn.href = `./workspace.html?id=${this.project_info.id}&title=${this.project_info.project_name}`;
        btn.innerText = "Open project";

        project_info.appendChild(sn);
        project_info.appendChild(title);

        project.appendChild(project_info);
        project.appendChild(btn);

        PROJECT_LIST.appendChild(project);
    }
}