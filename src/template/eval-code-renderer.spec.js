const {expect} = require('chai');
const renderer = require('./eval-code-renderer');

describe('eval code renderer', () => {
	beforeEach(() => {
		delete window.foo;
	});

	afterEach(() => {
		delete window.foo;
	});

	it('evaluates code inside backtick fences silently', () => {
		const result = renderer.code('\nwindow.foo = \'red\';\n');
		
		expect(result).to.equal('');
		expect(window.foo).to.equal('red');
	});

	it('interpolates JavaScript values inside backticks', () => {
		expect(renderer.codespan('2 + 2')).to.equal('4');
	});
});