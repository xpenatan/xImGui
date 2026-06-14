import java.io.File
import java.util.*

object LibExt {
    const val groupId = "com.github.xpenatan.xImGui"
    const val libName = "xImGui"
    var isRelease = false
    var libVersion: String = ""
        get() {
            return getVersion()
        }

    const val javaMainTarget = "1.8"
    const val javaWebTarget = "11"
    const val javaModernTarget = "17"
    const val javaFFMTarget = "25"

    const val jParserVersion = "1.1.4"
    const val libFdxVersion = "-SNAPSHOT"

    const val jUnitVersion = "4.12"

    const val useRepoLibs = false
}

private fun getVersion(): String {
    var libVersion = "-SNAPSHOT"
    val file = File("gradle.properties")
    if(file.exists()) {
        val properties = Properties()
        properties.load(file.inputStream())
        val version = properties.getProperty("version")
        if(LibExt.isRelease) {
            libVersion = version
        }
    }
    else {
        if(LibExt.isRelease) {
            throw RuntimeException("properties should exist")
        }
    }
    return libVersion
}
