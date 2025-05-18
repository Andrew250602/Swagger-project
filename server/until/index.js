const generateCode = (baseCode, increment) => {
    // const min = 0
    // const max = 100
    // if(increment < max || increment > min) {
    //     increment ++
    // }
    const formattedNumber = String(increment).padStart(3, '0');
    return `${baseCode}_${formattedNumber}`;
}
module.exports = generateCode