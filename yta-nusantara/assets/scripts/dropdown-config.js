// set the dropdown menu element
const targetEl1 = document.getElementById('dropdownOne');
const targetEl2 = document.getElementById('dropdownTwo');
// set the element that trigger the dropdown menu on click
const triggerEl1 = document.getElementById('dropdownOneButton');
const triggerEl2 = document.getElementById('dropdownTwoButton');

// window width
let windowWidth = document.body.clientWidth

if(windowWidth < 575) {
  triggerEl2.setAttribute('data-dropdown-placement', 'bottom-start')
  triggerEl2.setAttribute('data-dropdown-offset-distance', '60')
  triggerEl2.setAttribute('data-dropdown-offset-skidding', '20')
} else {
  triggerEl2.setAttribute('data-dropdown-placement', 'left-start')
}