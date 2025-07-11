// script.js

document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitButton = this.querySelector("button");
  const originalText = submitButton.textContent;

  // Disable button
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  // Collect form data
  const formData = {};
  const elements = this.elements;

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (el.name && el.type !== "submit") {
      formData[el.name] = el.value;
    }
  }

  // Send data to GAS
  google.script.run
    .withSuccessHandler(function (response) {
      const statusDiv = document.getElementById("status");

      if (response.success) {
        statusDiv.innerHTML = "<p>✅ Submitted successfully!</p>";
        document.getElementById("myForm").reset();
      } else {
        statusDiv.innerHTML = "<p>❌ Error: " + response.error + "</p>";
      }

      submitButton.disabled = false;
      submitButton.textContent = originalText;
    })
    .processForm(formData);
});
