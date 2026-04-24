const bcrypt = require("bcrypt");

//criptação de senha, importar isso para logins
async function senhaCrypt(senhaUncrypt){
    const passwordCrypting = await bcrypt.hash(senhaUncrypt, 12);
    return passwordCrypting    
}

//usar no login, compara o que o usuario colocou("senhaUser") com a senha do DB("senhaCrypted")

async function senhaDeCrypt(senhaUser, senhaCrypted){

    const isValid = await bcrypt.compare(senhaUser, senhaCrypted);
    return isValid //se for falso, retorna erro, se for verdadeiro, tem que retornar um JWT
}

module.exports = {
    senhaCrypt,
    senhaDeCrypt
};