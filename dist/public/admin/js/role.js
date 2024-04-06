// Send Permissions via Form
const tablePermissions = document.querySelector('[table-permissions]');
if (tablePermissions) {
    const buttonSubmit = document.querySelector('[button-submit]')

    buttonSubmit.addEventListener('click', (e) => {
        let results = [];

        const rows = tablePermissions.querySelectorAll('[data-name]');

        rows.forEach(row => {
            const name = row.getAttribute('data-name');
            const inputs = row.querySelectorAll('input');

            // the first row of the table is admin's ids
            // set original permissions = []
            if (name == 'id') {
                inputs.forEach(input => {
                    const value = input.value;
                    results[results.length] = {
                        id: value,
                        permissions: []
                    }
                })
            } else {
                inputs.forEach((input, index) => {
                    if (input.checked) {
                        results[index].permissions.push(name);
                    }
                });
            }

        });

        const formChangePermissions = document.getElementById('form-change-permissions');
        const inputPermissions = formChangePermissions.querySelector('input');
        inputPermissions.value = JSON.stringify(results);
        formChangePermissions.submit();

    });

}
// End Send Permissions via Form

// Display Default Permissions
const dataRecords = document.querySelector('[data-records]');
if (dataRecords) {
    const roles = JSON.parse(dataRecords.getAttribute('data-records'));
    const tablePermissions = document.querySelector('[table-permissions]');

    roles.forEach((role, index) => {
        const permissions = role.permissions;
        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`tr[data-name="${permission}"]`);
            const input = row.querySelectorAll('input')[index];
            input.checked = true;
        })
    })

}
// End Display Default Permissions
