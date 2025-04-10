const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = Buffer.from('a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'); // Fixed 32-byte key

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
};

const decrypt = (encrypted) => {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(encrypted.iv, 'hex'));
    let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error.message);
    throw error;
  }
};

module.exports = { encrypt, decrypt };