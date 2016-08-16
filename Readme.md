**Vernam Cipher**
[![Build Status](https://travis-ci.org/zeckson/vernam-cipher.svg?branch=master)](https://travis-ci.org/zeckson/vernam-cipher)

JavaScript implementation of [Vernam Cipher](https://en.wikipedia.org/wiki/Gilbert_Vernam#The_Vernam_cipher) with some extended technique which make it unbreakable. This implementation is used for irreversible password generation.

Features:
- irreversible (because of module of alphabet)
- md5 password hash (frequent analysis proof)
- cryptic output, which passes all password validators
- offline support

Todo:
- [x] Browser implemenation
- [] Hash function usage
- [] Usage Examples
- [] Tests
- [] Node.js library compatible
- [] NPM distribution