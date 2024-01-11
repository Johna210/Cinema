const headerImage = document.querySelector('.top-image');
const headerDescription = document.querySelector('.header-image .description');
const subDivImages = document.querySelectorAll('.sub-div img');
const subDivDescriptions = document.querySelectorAll('.sub-div .description');



subDivImages.forEach((image, index) => {
    image.addEventListener('click', () => {
       
        const clickedImageSrc = image.src;
        const clickedImageDescription = subDivDescriptions[index].innerText;
        
     
        image.src = headerImage.src;
        subDivDescriptions[index].innerText = headerDescription.innerText;
        headerImage.src = clickedImageSrc;
        headerDescription.innerText = clickedImageDescription;
    });
});





 const addButton = document.querySelector('.add-button');
 addButton.addEventListener('click', function() {

     addToWatchList();
 });
 function addToWatchList() {
    
     alert('Movie added to watch list');
 }
 


 function confirmLogout() {
    return confirm("Are you sure you want to log out?");
}

function confirmDeleteAccount() {
    return confirm("Are you sure you want to delete your account?");
}


