// sends automated email
// uses https://dashboard.emailjs.com/admin/account/subscription
function send_email(){

    let email = {
        user_first: document.getElementById('user-first').value,
        user_last: document.getElementById('user-last').value,
        user_email: document.getElementById('user-email').value,
        user_message: document.getElementById('user-message').value,
        user_org: document.getElementById('user-org').value ? document.getElementById('user-org').value : 'no organization filled out'
    }

    emailjs.send("service_40kx1vh", "template_ecsxloc", email)
        .then(() => {
            Swal.fire({
                title: "Email Has been Sent!",
                text: "I will reach back to you as soon as I can!",
                icon: "success"
            });
            document.getElementById('contact-form').reset();
        })
        .catch((error) => {
            console.error("Email failed to send", error);
            Swal.fire({
                icon: "error",
                title: "Uh Oh...",
                text: "Something went wrong! Try again Later"
            });
        });
}