/*
A custom renderer for Marked that, instead of outputting code blocks, evaluates
them.
*/

const marked = require('marked');

let renderer = new marked.Renderer();

/* Evaluate code blocks without outputting anything. */

renderer.code = src => {
	const func = new Function(src);

	func.apply(window);
	return '';
};

/*
Evaluate code spans, and if they end up having a non-null or undefined result,
output it.
*/

renderer.codespan = src => {
	const func = new Function(`return (${src})`);
	const result = func.apply(window);

	if (result !== null && result !== undefined) {
		return result.toString();
	}
}

module.exports = renderer;