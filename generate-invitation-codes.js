const crypto = require('crypto');

function generateSaltedHash(invitationCode, salt) {
    const encoder = new TextEncoder();
    const data = encoder.encode(invitationCode + salt);
    const hashBuffer = crypto.createHash('sha256').update(invitationCode + salt).digest();
    const hashArray = Array.from(hashBuffer);
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const SALT = 'ANTISTRESS_TEST_2024_SALT_KEY';
const invitationCodes = ['MTS6688'];

console.log('=== 邀请码加密生成工具 ===');
console.log('盐值:', SALT);
console.log('\n生成的加密邀请码:');

const encryptedCodes = invitationCodes.map(code => {
    const hash = generateSaltedHash(code, SALT);
    console.log(`${code} -> ${hash}`);
    return hash;
});

console.log('\n=== 配置代码 ===');
console.log('const invitationConfig = {');
console.log('    salt: "' + SALT + '",');
console.log('    validCodeHashes: [');
encryptedCodes.forEach((hash, index) => {
    const comma = index < encryptedCodes.length - 1 ? ',' : '';
    console.log('        "' + hash + '"' + comma);
});
console.log('    ]');
console.log('};');