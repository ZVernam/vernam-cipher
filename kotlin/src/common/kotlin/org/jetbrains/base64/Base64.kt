package org.jetbrains.base64

interface Base64Encoder {
    fun encode(src: ByteArray): ByteArray
}