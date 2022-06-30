class Information {
    /**
     * This function creates a new instance of the class 'Information' and assigns the value of the parameters 'unit_information' to the properties 'unit_information' of the new instance.
     * @param unit_information - This is an object that contains all the information about the logical unit.
     */
    constructor(unit_information) {
        this.unit_information = unit_information;
        this.create_section();
    }

    /** 
     * Creating a information section with title, description and truth table of the units. 
     */
    create_section = () => {
        const title = document.createElement('h4');
        title.innerText = this.unit_information.title;
        title.style.marginBottom = ".5rem";
        INFORMATION_SECTION.appendChild(title);

        const description = document.createElement('p');
        description.innerText = this.unit_information.description;
        INFORMATION_SECTION.appendChild(description);

        if (this.unit_information.truth_table) {
            const table_label = document.createElement('label');
            table_label.htmlFor = "truth_table";
            table_label.innerText = "Truth Table";
            table_label.style.width = "100%";
            INFORMATION_SECTION.appendChild(table_label);

            const table = document.createElement('table');
            table.id = "truth_table";

            this.unit_information.truth_table.forEach(row => {
                const table_row = document.createElement('tr');

                const keys = Object.keys(row).sort();

                for (let key of keys) {
                    const table_data = document.createElement('td');

                    table_data.innerText = row[key];

                    table_row.appendChild(table_data);
                }

                table.appendChild(table_row);
            });

            INFORMATION_SECTION.appendChild(table);
        }
    }
}

/**
 * It takes the data from the array of INFORMATION_DATA and creates a new Information object based on the name of the selected unit.
 */
const update_information_section = () => {
    if (selected_unit === null) {
        INFORMATION_SECTION.innerHTML = "";
    } else {
        INFORMATION_SECTION.innerHTML = "";
        
        INFORMATION_DATA.forEach((data) => {
            console.log("...", data.id);
            if (data.id === units[selected_unit].name) {
                new Information(data);
                return;
            }
        });
    }
}