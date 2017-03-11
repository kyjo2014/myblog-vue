const validators = {
    reqValidator: (req, res, next)=>{
		const body = req.body;
		let message;
		if (body) {
			if (!body.userName || body.userName.length <3 ){
				message = errorMessages.USER_DATA_USERNAME_INVALID;
			} else if (commonUtil.isEmty(body.firstName)){
				message = errorMessages.USER_DATA_FIRSTNAME_INVALID;
			} else if (commonUtil.isEmty(body.lastName)){
				message = errorMessages.USER_DATA_LASTNAME_INVALID;
			} else {
				next();
				return;
			}
		} else {
			message = errorMessages.USER_DATA_INVALID;
		}
		res.status(400).end(message);
	}
}