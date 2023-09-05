async function checkCode(db, code, userid) {
	var data = await db.getData("/" + userid);

	if (data == code) {
		await db.delete("/" + userid);
		return true
	} else {
		return false
	}
}


async function createCode(code, db, userid) {
	await db.push("/" + userid, code);
	return code;
}


module.exports = { checkCode, createCode }