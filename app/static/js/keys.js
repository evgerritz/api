const description_key = document.getElementById('description_key'),
      readout_key = document.getElementById('readout_key'),
      get_key = document.getElementById('get_key'),
      keys_table = document.getElementById('keys_table');
      keys_list = document.getElementById('keys_list');


function submission_ready() {
    return Boolean(description_key.value);
}
function refresh_button() {
    get_key.disabled = !submission_ready();
}

description_key.oninput = refresh_button;

get_key.onclick = function(e) {
    fetch('/keys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description: description_key.value,
        })
    })
        .then(response => response.json())
        .then(key => {
            description_key.value = '';
            refresh_button();
            readout_key.value = key.token;
            readout_key.style.display = 'inline-block';
            readout_key.select();
            document.execCommand('copy');
            get_key.textContent = 'Copied!';
            setTimeout(function() {
                get_key.textContent = 'Get key';
            }, 1500);
            load_keys();
        });
};

readout_key.onfocus = function(e) {
    this.select();
};

function delete_key(id) {

}

function load_keys() {
    fetch('/keys', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(keys => {
            keys_list.innerHTML = '';
            for (let key of keys) {
                let tr = document.createElement('tr');

                let td_token = document.createElement('td');
                let input = document.createElement('input');
                input.type = 'text';
                input.value = key.token;
                input.readonly = true;
                input.onclick = function(e) {
                    this.select();
                };
                td_token.appendChild(input);
                tr.appendChild(td_token);

                for (let property of ['description']) {
                    let td = document.createElement('td');
                    td.textContent = key[property];
                    tr.appendChild(td);
                }

                // Create delete button
                let td_delete = document.createElement('td');
                let button = document.createElement('button');
                button.className = 'fail';
                let icon = document.createElement('i');
                icon.className = 'fa fa-trash';
                button.appendChild(icon);
                button.appendChild(document.createTextNode('Delete'));
                button.onclick = function() {
                    delete_key(key.id);
                };
                td_delete.appendChild(button);
                tr.appendChild(td_delete);

                keys_list.appendChild(tr);
            }
            keys_table.style.display = Boolean(keys.length) ? 'block' : 'none';
        });
}

load_keys();