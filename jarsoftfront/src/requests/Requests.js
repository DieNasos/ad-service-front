export function getBy(urlBeginning, param) {
    let request = new XMLHttpRequest();
    request.open("GET", urlBeginning + param,false);
    request.send();
    let obj = null;
    if (request.readyState === 4 && request.status === 200) {
        if (request.responseText.length !== 0) {
            console.log(request);
            console.log(JSON.parse(request.responseText));
            obj = JSON.parse(request.responseText);
        }
    }
    return obj;
}

export function getAll(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url,false);
    request.send();
    let objs = [];
    if (request.readyState === 4 && request.status === 200) {
        if (request.responseText.length !== 0) {
            objs = JSON.parse(request.responseText);
        }
    }
    return objs;
}

export function deleteByID(urlBeginning, id) {
    let request = new XMLHttpRequest();
    request.open("DELETE", urlBeginning + id, false);
    request.send();
    return request.status;
}

export function save(url, params) {
    let request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(params));
    return request.status;
}

export function create(url, params) {
    let request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(params));
    return request.status;
}