// Sends the contact form through EmailJS's REST API. If the provider is
// unavailable, fall back to the visitor's configured mail client.
function send_email() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const email = {
        user_first: document.getElementById('user-first').value,
        user_last: document.getElementById('user-last').value,
        user_email: document.getElementById('user-email').value,
        user_message: document.getElementById('user-message').value,
        user_org: document.getElementById('user-org').value ? document.getElementById('user-org').value : 'no organization filled out'
    };

    const setStatus = (message, state) => {
        if (status) {
            status.textContent = message;
            status.dataset.state = state;
        }
    };

    const openMailClient = () => {
        const subject = encodeURIComponent(`Portfolio contact from ${email.user_first} ${email.user_last}`);
        const body = encodeURIComponent([
            `Name: ${email.user_first} ${email.user_last}`,
            `Email: ${email.user_email}`,
            `Organization: ${email.user_org}`,
            '',
            email.user_message
        ].join('\n'));

        window.location.href = `mailto:2jacobsantos2@gmail.com?subject=${subject}&body=${body}`;
        setStatus('Your email client should open with the message prepared.', 'success');
    };

    const request = window.emailjs
        ? window.emailjs.send("service_40kx1vh", "template_ecsxloc", email)
        : fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: 'service_40kx1vh',
                template_id: 'template_ecsxloc',
                user_id: 'mICcITgoMyDm70Moi',
                template_params: email
            })
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`EmailJS request failed with status ${response.status}`);
            }
        });

    request
        .then(() => {
            setStatus('Email sent successfully. I will get back to you soon.', 'success');
            form.reset();
        })
        .catch(() => {
            openMailClient();
        });
}
