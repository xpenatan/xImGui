package imgui.example.basic;

import com.github.xpenatan.gdx.backends.teavm.config.AssetFileHandle;
import com.github.xpenatan.gdx.backends.teavm.config.TeaBuildConfiguration;
import com.github.xpenatan.gdx.backends.teavm.config.TeaBuilder;
import java.io.File;
import java.io.IOException;
import org.teavm.tooling.TeaVMTargetType;
import org.teavm.tooling.TeaVMTool;
import org.teavm.vm.TeaVMOptimizationLevel;

public class Build {

    public static void main(String[] args) throws IOException {
        TeaBuildConfiguration teaBuildConfiguration = new TeaBuildConfiguration();
        teaBuildConfiguration.assetsPath.add(new AssetFileHandle("../assets"));
        teaBuildConfiguration.webappPath = new File("build/dist").getCanonicalPath();
        teaBuildConfiguration.targetType = TeaVMTargetType.JAVASCRIPT;
        TeaBuilder.config(teaBuildConfiguration);
        TeaVMTool tool = new TeaVMTool();
        tool.setOptimizationLevel(TeaVMOptimizationLevel.ADVANCED);
        tool.setMainClass(Launcher.class.getName());
        tool.setObfuscated(true);
        TeaBuilder.build(tool);
    }
}
