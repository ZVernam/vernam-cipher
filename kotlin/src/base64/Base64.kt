package org.jetbrains.base64

import kotlinx.browser.window

object Base64Factory {
    fun createEncoder() = JsBase64Encoder
}

object JsBase64Encoder {
    fun encode(src: ByteArray): ByteArray {
        val string = src.decodeToString()
        val encodedString = window.btoa(string)
        return encodedString.encodeToByteArray()
    }
}