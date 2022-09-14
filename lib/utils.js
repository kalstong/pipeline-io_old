const fs = require('fs');

function isArray(a) { return Array.isArray(a); }

function isObject(o) { return Object.prototype.toString.call(o) === "[object Object]"; }

function openFileSync(filepath, encoding = 'utf8') {

	try {
		fs.accessSync(filepath, fs.constants.F_OK);
		return fs.readFileSync(filepath, encoding)
	} catch (_) {}

	try {
		let _filepath = path.join(process.cwd(), filepath)
		fs.accessSync(_filepath, fs.constants.F_OK);
		return fs.readFileSync(_filepath, encoding)
	} catch (_) {}

	return undefined
}

function parseArgv(argv, renameMap, skip = 0) {
	if (!isArray(argv))
		return null;
	if (renameMap && !isObject(renameMap))
		return null;
	if (!renameMap)
		renameMap = {};

	const args = {};
	for (let i = skip > 0 ? skip : 0; i < argv.length; i++) {
		let longSwitch = false;
		let shortSwitch = false;
		let token = argv[i];
		let value = undefined;

		if (token.startsWith("--") && token.length > 2) {
			longSwitch = true;
			token = token.substring(2);

			const splitIdx = token.indexOf("=");
			if (splitIdx > -1) {
				value = token.substring(splitIdx + 1);
				token = token.substring(0, splitIdx);
				if (renameMap[token]) token = renameMap[token];
			}
			else if (i + 1 < argv.length) {
				if (renameMap[token]) token = renameMap[token];
				value = argv[i + 1];
				i++;
			}
		}
		else if (token.startsWith("-") && token.length > 1) {
			shortSwitch = true;
			token = token.substring(1);
			if (renameMap[token]) token = renameMap[token];
			if (i + 1 < argv.length) {
				value = argv[i + 1];
				i++;
			}
		}
		else {
			if (renameMap[token]) token = renameMap[token];
			if (i + 1 < argv.length) {
				value = argv[i + 1];
				i++;
			}
		}

		args[token] = { longSwitch, shortSwitch, value };
	}

	return args;
}

module.exports = {
	isArray,
	isObject,
	openFileSync,
	parseArgv
}