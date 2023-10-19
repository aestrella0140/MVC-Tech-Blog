const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-name').value.trim();
    const comment = document.querySelector('#post-comment').value.trim();

    if (title && comment) {
        console.log('hello world new post')
        const respnseData = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, comment}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (respnseData.ok) {
            document.location.replace('/profile');
        } else {
            console.log('Failed to create post');
        }
    }
};

const deleteButtonHandler = async (event) =>{
    console.log('hello world')
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            console.log('failed to delete post');
        }
    }
};

document
.querySelector('.new-post')
.addEventListener('submit', postFormHandler);

document
.querySelector('.post-list')
.addEventListener('click', deleteButtonHandler);