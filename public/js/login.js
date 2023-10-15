// for login
const loginHandler = async (event) => {
    event.preventDefault();

    
    const email = document.querySelector('#user-email').value.trim();
    const password = document.querySelector('#user-password').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body:   JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

// for signup

const signupHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#signup-name').value.trim();
    const email = document.querySelector('#signup-emali').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    
    if (name && email && password) {
        console.log('sign up works')
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document
.querySelector('.login-form')
.addEventListener('submit', loginHandler);

document
.querySelector('.signup-form')
.addEventListener('submit', signupHandler);