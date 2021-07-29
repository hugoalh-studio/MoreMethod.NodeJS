// $<Vendor>$ ansi-regex (GitHub: https://github.com/chalk/ansi-regex)(NPM: https://npmjs.com/package/ansi-regex)
// $<Note>$ With optimization.
const pattern = [
	"[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
	"(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
].join("|");
const regularExpressionANSIEscapeCode = new RegExp(pattern, "g");
export default regularExpressionANSIEscapeCode;
