package org.jetbrains.base64

interface Base64Encoder {
    @JsName("encode")
    fun encode(src: ByteArray): ByteArray
}