const crypto = require('crypto');

const trimModelAttributes = (model) => {
	Object.keys(model.dataValues).forEach((key) => {
		if (typeof model.dataValues[key] === 'string') {
			model.dataValues[key] = model.dataValues[key].trim()
		}
	})

	return JSON.parse(JSON.stringify(model))
};

const generateID = (length) => {
	return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1))
};

const generateUniqueReference = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  // Generate a cryptographically secure random byte array
  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));

  // Convert bytes to a hexadecimal string and truncate to desired length
  let result = randomBytes.toString('hex').slice(0, length);

  // Ensure the string contains only alphanumeric characters
  result = result.replace(/[^a-zA-Z0-9]/g, (char) => characters.charAt(Math.floor(Math.random() * charactersLength)));

  return result;
};

const STATUS = (transactionType) => {
    let transactionStatus = 'INVALID TRANSACTION TYPE';

    if (transactionType.toLowerCase() === "card") {
        transactionStatus = "PENDING";
    } else if (transactionType.toLowerCase() === "virtual account") {
        transactionStatus = "SUCCESS";
    }

    return transactionStatus;
};

const feePercentage = (transactionType) => {
    let charge = 0;

    if(transactionType.toLowerCase() === 'card'){
        charge = 3
    } else if(transactionType.toLowerCase() === 'virtual account'){
        charge = 5
    }

    return (Math.floor(charge * 100) / 100) + '%'
};

const calculateSubTotalAmount = (fee, total) => {
    const percentFee = fee.slice(0, fee.length -1);
    const percentageAmount = (percentFee/100) * total
    const totalAmount = +total - +percentageAmount
    return totalAmount 
};

const toFloat = (number) => {
	if (number === '') {
		return 0
	}

	return parseFloat(number.toString().replaceAll(',', ''))
}

const secureCradNumber = (number) => {
    const save = '*****' + number.slice(-4);
    return number !== 'undefined' ? save : 'NULL';
}

const SUCCESS_STATUS = 'SUCCESS';
const FAILED_STATUS = 'FAILED';
const VIRTUAL = 'virtual account';
const CARD = 'card';
const PENDING_STATUS = 'PENDING';



module.exports = {
    trimModelAttributes,
    generateID,
    generateUniqueReference,
    STATUS,
    feePercentage,
    calculateSubTotalAmount,
    toFloat,
    secureCradNumber,
    SUCCESS_STATUS,
    FAILED_STATUS,
    VIRTUAL,
    CARD,
    PENDING_STATUS
}