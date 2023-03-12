const exerciseForm = document.getElementById("exercise-form");

exerciseForm.addEventListener("submit", (evt) => {
    const userId = document.getElementById("uid").value;
    exerciseForm.action = `/api/users/${userId}/exercises`;

    if(!exerciseForm.date.value) {
        exerciseForm.date.removeAttribute("name");
    }

    exerciseForm.submit();
});
