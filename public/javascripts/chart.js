function main(){
    const test = document.createElement('h1');
    test.textContent = "Hello";
    document.body.appendChild(test);
}

document.addEventListener('DOMContentLoaded', main);