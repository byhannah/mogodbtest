export default class UsersListHtml {
    constructor() {
        this.list = document.createElement('table');

        this.list.innerHTML = `<thead><tr>
            <th>name</th>
            <th>email</th>
            <th>action</th>
        </tr></thead>
        <tbody></tbody>`;

        document.querySelector(".users-list").appendChild = this.list;
    }
}