import '../sass/app.scss';

function component() {
	const element = document.createElement('div');
	element.innerHTML = '<div>lala</div>'
	element.classList.add('hello');
	return element;
}

document.body.appendChild(component());
