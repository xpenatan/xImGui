package imgui;

import com.github.xpenatan.jParser.builder.BuildMultiTarget;
import com.github.xpenatan.jParser.builder.targets.EmscriptenTarget;
import com.github.xpenatan.jParser.builder.targets.LinuxTarget;
import com.github.xpenatan.jParser.builder.targets.MacTarget;
import com.github.xpenatan.jParser.builder.targets.WindowsMSVCTarget;
import com.github.xpenatan.jParser.builder.tool.BuildToolListener;
import com.github.xpenatan.jParser.builder.tool.BuildToolOptions;
import com.github.xpenatan.jParser.builder.tool.BuilderTool;
import com.github.xpenatan.jParser.core.JParser;
import com.github.xpenatan.jParser.idl.IDLReader;
import java.io.File;
import java.util.ArrayList;

public class BuildTextEdit {

    public static void main(String[] args) throws Exception {
//        WindowsMSVCTarget.DEBUG_BUILD = true;

        String libName = "textedit";
        String basePackage = "imgui.extension.textedit";
        String modulePrefix = "textedit";
        String sourceDir =  "/build/ImGuiColorTextEdit";

        BuildToolOptions.BuildToolParams data = new BuildToolOptions.BuildToolParams();
        data.libName = libName;
        data.idlName = "ColorTextEdit";
        data.webModuleName = "imgui";
        data.packageName = basePackage;
        data.cppSourcePath = sourceDir;
        data.modulePrefix = modulePrefix;
        BuildToolOptions op = new BuildToolOptions(data, args);

        JParser.CREATE_IDL_HELPER = false;
        String imguiPath = new File("./../../../imgui/").getCanonicalPath().replace("\\", "/");
        op.addAdditionalIDLRefPath(imguiPath + "/imgui-build/src/main/cpp/imgui.idl");
        BuilderTool.build(op, new BuildToolListener() {
            @Override
            public void onAddTarget(BuildToolOptions op, IDLReader idlReader, ArrayList<BuildMultiTarget> targets) {
                if(op.containsArg("teavm")) {
                    targets.add(getTeaVMTarget(op, imguiPath));
                }
                if(op.containsArg("windows64")) {
                    targets.add(getWindowTarget(op, imguiPath));
                }
                if(op.containsArg("linux64")) {
                    targets.add(getLinuxTarget(op, imguiPath));
                }
                if(op.containsArg("mac64")) {
                    targets.add(getMacTarget(op, false, imguiPath));
                }
                if(op.containsArg("macArm")) {
                    targets.add(getMacTarget(op, true, imguiPath));
                }
//                if(op.containsArg("android")) {
//                    targets.add(getAndroidTarget(op, imguiPath));
//                }
//                if(op.containsArg("iOS")) {
//                    targets.add(getIOSTarget(op, imguiPath));
//                }
            }
        });
    }

    private static BuildMultiTarget getWindowTarget(BuildToolOptions op, String imguiPath) {
        String imguiCppPath = imguiPath + "/imgui-build/build/imgui";
        String sourceDir = op.getSourceDir();

        BuildMultiTarget multiTarget = new BuildMultiTarget();

        WindowsMSVCTarget windowsTarget = new WindowsMSVCTarget();
        windowsTarget.isStatic = true;
        windowsTarget.cppFlags.add("-std:c++17");
        windowsTarget.headerDirs.add("-I" + imguiCppPath);
        windowsTarget.headerDirs.add("-I" + sourceDir);
        windowsTarget.cppInclude.add(sourceDir + "/*.cpp");

        // Boost regex
        windowsTarget.headerDirs.add("-I" + sourceDir + "/vendor/regex/include");
        windowsTarget.headerDirs.add("-includecmath");
        windowsTarget.cppInclude.add(sourceDir + "/vendor/regex/src/*.cpp");

        multiTarget.add(windowsTarget);

        return multiTarget;
    }

    private static BuildMultiTarget getLinuxTarget(BuildToolOptions op, String imguiPath) {
        String imguiCppPath = imguiPath + "/imgui-build/build/imgui";
        String sourceDir = op.getSourceDir();

        BuildMultiTarget multiTarget = new BuildMultiTarget();

        LinuxTarget linuxTarget = new LinuxTarget();
        linuxTarget.isStatic = true;
        linuxTarget.cppFlags.add("-std=c++17");
        linuxTarget.headerDirs.add("-I" + imguiCppPath);
        linuxTarget.headerDirs.add("-I" + sourceDir);
        linuxTarget.cppInclude.add(sourceDir + "/*.cpp");

        // Boost regex
        linuxTarget.headerDirs.add("-I" + sourceDir + "/vendor/regex/include");
        linuxTarget.headerDirs.add("-includecmath");
        linuxTarget.cppInclude.add(sourceDir + "/vendor/regex/src/*.cpp");

        multiTarget.add(linuxTarget);

        return multiTarget;
    }

    private static BuildMultiTarget getMacTarget(BuildToolOptions op, boolean isArm, String imguiPath) {
        String imguiCppPath = imguiPath + "/imgui-build/build/imgui";
        String sourceDir = op.getSourceDir();

        BuildMultiTarget multiTarget = new BuildMultiTarget();

        MacTarget macTarget = new MacTarget(isArm);
        macTarget.isStatic = true;
        macTarget.cppFlags.add("-std=c++17");
        macTarget.headerDirs.add("-I" + imguiCppPath);
        macTarget.headerDirs.add("-I" + sourceDir);
        macTarget.cppInclude.add(sourceDir + "/*.cpp");

        // Boost regex
        macTarget.headerDirs.add("-I" + sourceDir + "/vendor/regex/include");
        macTarget.headerDirs.add("-includecmath");
        macTarget.cppInclude.add(sourceDir + "/vendor/regex/src/*.cpp");

        multiTarget.add(macTarget);

        return multiTarget;
    }

    private static BuildMultiTarget getTeaVMTarget(BuildToolOptions op, String imguiPath) {
        String imguiCppPath = imguiPath + "/imgui-build/build/imgui";
        String sourceDir = op.getSourceDir();

        BuildMultiTarget multiTarget = new BuildMultiTarget();

        // Make a static library
        EmscriptenTarget libTarget = new EmscriptenTarget(null);
        libTarget.isStatic = true;
        libTarget.cppFlags.add("-std=c++17");
        libTarget.compileGlueCode = false;
        libTarget.headerDirs.add("-I" + imguiCppPath);
        libTarget.headerDirs.add("-I" + sourceDir);
        libTarget.cppInclude.add(sourceDir + "/*.cpp");

        // Boost regex
        libTarget.headerDirs.add("-I" + sourceDir + "/vendor/regex/include");
        libTarget.cppInclude.add(sourceDir + "/vendor/regex/src/*.cpp");

        multiTarget.add(libTarget);

        return multiTarget;
    }
}