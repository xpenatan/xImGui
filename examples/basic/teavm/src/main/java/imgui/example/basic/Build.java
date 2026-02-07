package imgui.example.basic;

import com.github.xpenatan.gdx.teavm.backends.shared.config.AssetFileHandle;
import com.github.xpenatan.gdx.teavm.backends.shared.config.compiler.TeaCompiler;
import com.github.xpenatan.gdx.teavm.backends.web.config.backend.WebBackend;
import java.io.File;
import java.io.IOException;
import org.teavm.vm.TeaVMOptimizationLevel;

public class Build {

    public static void main(String[] args) throws IOException {
        AssetFileHandle assetsPath = new AssetFileHandle("../assets");
        new TeaCompiler(new WebBackend()
                .setStartJettyAfterBuild(true)
                .setWebAssembly(true))
                .addAssets(assetsPath)
                .setOptimizationLevel(TeaVMOptimizationLevel.ADVANCED)
                .setMainClass(Launcher.class.getName())
                .setObfuscated(true)
                .build(new File("build/dist"));
    }
}
