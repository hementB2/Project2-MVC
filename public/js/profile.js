const newFormHandler = async (event) => {

  event.preventDefault();}

 // Get all the data from the user inputs
 async function doupload(event) {
  event.preventDefault();
  const phone = document.querySelector("#phoneNumber").value.trim();
  const emergencyName = document.querySelector("#emergencyName").value.trim();
  const emergencyPhone = document.querySelector("#emergencyPhone").value.trim();
  // Pulling from id=userId in profile.handlebars
  const userId = document.querySelector("#userId").value;
  const fileInput = document.querySelector("#files");
  const formData = new FormData();
  // Checking to see if user gave us a profile picture
  if (fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"]; // Array of allowed file forms for profile pictures
    if (allowedExtensions.indexOf(fileExtension) === -1) {
      alert("Please upload a valid image file.");
      return; // If the user does not provide a good extension then they cannot upload a profile picture and return a custom message
    }
    // Append user information and profile picture
    formData.append("picture", fileInput.files[0]);
  }
  if (phone) formData.append("phoneNumber", phone);
  if (emergencyName) formData.append("emergencyName", emergencyName);
  if (emergencyPhone) formData.append("emergencyNumber", emergencyPhone);
  for (const value of formData.entries()) {
    console.log(value);
  }
  const response = await fetch(`/api/users/${userId}`, {
    method: "PATCH", // Instead of PUT for partial field input
    body: formData,
  });
  if (response.ok) {
    document.location.reload(); // Profile picture will reload for the user
  } else {
    alert("User could not be updated." + response.statusText); // Send alert to user that their information could not be updated
  }
}
document.querySelector("#form").addEventListener("submit", doupload); 

function doFileupload() {
   
  alert('your file has been uploaded');
  location.reload();
}