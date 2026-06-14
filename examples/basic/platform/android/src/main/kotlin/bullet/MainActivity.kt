package bullet

import imgui.example.basic.ImGuiGame
import io.github.libfdx.backend.android.AndroidApplicationActivity
import io.github.libfdx.backend.android.AndroidApplicationConfig
import io.github.libfdx.backend.android.AndroidGlesProvider
import io.github.libfdx.imgui.gl.FdxImGuiGl

class MainActivity : AndroidApplicationActivity() {
    override fun createApplicationConfig(): AndroidApplicationConfig =
        AndroidApplicationConfig()
            .title("ImGui Android GLES Basic Example")
            .graphics(AndroidGlesProvider())

    override fun createApplicationListener() = ImGuiGame(FdxImGuiGl.renderer())
}
