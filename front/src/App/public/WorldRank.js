
const dragenter = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = "rgb(107, 104, 255)";
}
const dragover = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = "white";

} 
const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
}
const processChange = (func)=>debounce(() => func());

// const server_url = 'http://localhost:45509'; 
const server_url = 'https://port-0-ayo-serber-builder-12fhqa2blnl9payx.sel5.cloudtype.app';

export {dragenter, dragover, server_url, processChange}