package org.jetbrains.base64

val global = js("typeof window === 'undefined' ? global : window")

actual object Base64Factory {
    actual fun createEncoder(): Base64Encoder = JsBase64Encoder
}

object JsBase64Encoder : Base64Encoder {
    override fun encode(src: ByteArray): ByteArray {
        val string = src.decodeToString()
        val encodedString = global.btoa(string) as String
        return encodedString.encodeToByteArray()
    }
}