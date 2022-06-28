const INFORMATION_SECTION = document.getElementById("information");
const INFORMATION_DATA = [];
get_information_data().then(response=>{
    response.forEach(information=>{
        INFORMATION_DATA.push(information);
        console.log(information);
        console.log(INFORMATION_DATA);
    });
});

console.log(INFORMATION_DATA);

class Information {
    constructor(data) {
        this.data = data;

        this.create_section();
    }

    create_section = () => {
        const title = document.createElement('h4');
        title.innerText = this.data.title;
        INFORMATION_SECTION.appendChild(title);

        const description = document.createElement('p');
        description.innerText = this.data.description;
        INFORMATION_SECTION.appendChild(description);

        if (this.data.table) {
            const table = document.createElement('table');

            this.data.truth_table.forEach(row => {
                const table_row = document.createElement('tr');

                for (let key in row) {
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

update_information_section = () => {
    console.log(SELECTED_UNIT);
    if (SELECTED_UNIT === null) {
        INFORMATION_SECTION.innerHTML = "";
    } else {
        INFORMATION_SECTION.innerHTML = "";

        console.log("..", INFORMATION_DATA);
        INFORMATION_DATA.forEach((data)=>{
            console.log("...", data.id );
            if (data.id === units[SELECTED_UNIT].name) {
                console.log(data);
                new Information(data);
                return;
            }
        });
    }
}