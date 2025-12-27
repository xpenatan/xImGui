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
import java.io.IOException;
import java.util.ArrayList;

public class BuildImLayout {

    public static void main(String[] args) throws IOException {
        WindowsMSVCTarget.DEBUG_BUILD = true;

        String libName = "imlayout";
        String basePackage = "imgui.extension.imlayout";
        String modulePrefix = "imlayout";
        String sourceDir =  "/src/main/cpp/source";

        BuildToolOptions.BuildToolParams data = new BuildToolOptions.BuildToolParams();
        data.libName = libName;
        data.idlName = libName;
        data.webModuleName = "imgui";
        data.packageName = basePackage;
        data.cppSourcePath = sourceDir;
        data.modulePrefix = modulePrefix;
        BuildToolOptions op = new BuildToolOptions(data, args);

        JParser.CREATE_IDL_HELPER = false;

        String imguiPath = new File("./../../../imgui/").getCanonicalPath().replace("\\", "/");
        op.addAdditionalIDLRefPath(IDLReader.parseFile(imguiPath + "/imgui-build/src/main/cpp/imgui.idl"));
        op.addAdditionalIDLRefPath(IDLReader.getIDLHelperFile());
        BuilderTool.build(op, new BuildToolListener() {
            @Override
            public void onAddTarget(BuildToolOptions op, IDLReader idlReader, ArrayList<BuildMultiTarget> targets) {
                if(op.containsArg("teavm")) {
                    targets.add(getTeaVMTarget(op, idlReader, imguiPath));
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
        String imguiRootBuildPath = imguiPath + "/imgui-build";
        String imguiCustomSourcePath = imguiRootBuildPath + "/src/main/cpp/custom";
        String imguiBuildPath = imguiRootBuildPath + "/build";
        String imguiCppPath = imguiBuildPath + "/c++";
        String imguiSourcePath = imguiBuildPath + "/imgui";
        String libBuildCPPPath = op.getModuleBuildCPPPath();
        String libACustomPath = imguiCppPath + "/custom";
        String sourceDir = op.getSourceDir();

        BuildMultiTarget multiTarget = new BuildMultiTarget();

        WindowsMSVCTarget windowsTarget = new WindowsMSVCTarget();
        windowsTarget.isStatic = true;
        windowsTarget.cppFlags.add("-std:c++17");
        windowsTarget.cppFlags.add("/DIMGUI_USER_CONFIG=\"\\\"ImGuiCustomConfig.h\\\"\"");
        windowsTarget.headerDirs.add("-I" + imguiSourcePath);
        windowsTarget.headerDirs.add("-I" + sourceDir);
        windowsTarget.headerDirs.add("-I" + imguiCustomSourcePath);
        windowsTarget.cppInclude.add(sourceDir + "/*.cpp");
        multiTarget.add(windowsTarget);

        // Compile glue code and link
        WindowsMSVCTarget linkTarget = new WindowsMSVCTarget();
        linkTarget.addJNIHeaders();
        linkTarget.cppFlags.add("-std:c++17");
        linkTarget.cppFlags.add("/DIMGUI_USER_CONFIG=\"\\\"ImGuiCustomConfig.h\\\"\"");
        linkTarget.headerDirs.add("-I" + imguiSourcePath);
        linkTarget.headerDirs.add("-I" + sourceDir);
        linkTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        linkTarget.headerDirs.add("-I" + libBuildCPPPath + "/src/jniglue");
        linkTarget.headerDirs.add("-I" + imguiCustomSourcePath);
        linkTarget.linkerFlags.add("/WHOLEARCHIVE:" + imguiCppPath + "/libs/windows/vc/imgui64.lib");
        linkTarget.linkerFlags.add("/WHOLEARCHIVE:" + libBuildCPPPath + "/libs/windows/vc/imlayout64_.lib");
        linkTarget.cppInclude.add(libBuildCPPPath + "/src/jniglue/JNIGlue.cpp");
        multiTarget.add(linkTarget);

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
        multiTarget.add(macTarget);

        return multiTarget;
    }

    private static BuildMultiTarget getTeaVMTarget(BuildToolOptions op, IDLReader idlReader, String imguiPath) {
        String imguiCppPath = imguiPath + "/imgui-build/build/imgui";
        String libBuildCPPPath = op.getModuleBuildCPPPath();
        String sourceDir = op.getSourceDir();

        BuildMultiTarget multiTarget = new BuildMultiTarget();

        // Make a static library
        EmscriptenTarget libTarget = new EmscriptenTarget();
        libTarget.isStatic = true;
        libTarget.cppFlags.add("-std=c++17");
        libTarget.compileGlueCode = false;
        libTarget.headerDirs.add("-I" + imguiCppPath);
        libTarget.headerDirs.add("-I" + sourceDir);
        libTarget.cppInclude.add(sourceDir + "/*.cpp");
        multiTarget.add(libTarget);

        // Compile glue code and link
        EmscriptenTarget linkTarget = new EmscriptenTarget();
        linkTarget.mainModuleName = "idl";
        linkTarget.idlReader = idlReader;
        linkTarget.cppFlags.add("-std=c++17");
        linkTarget.headerDirs.add("-I" + imguiCppPath);
        linkTarget.headerDirs.add("-I" + sourceDir);
        linkTarget.headerDirs.add("-include" + op.getCustomSourceDir() + "ImLayoutCustom.h");
        linkTarget.linkerFlags.add(libBuildCPPPath + "/libs/emscripten/imlayout_.a");
        linkTarget.linkerFlags.add("-sSIDE_MODULE=2");
        linkTarget.linkerFlags.add("-lc++abi"); // C++ ABI (exceptions, thread_atexit, etc.)
        linkTarget.linkerFlags.add("-lc++"); // C++ STL (std::cout, std::string, etc.)
        linkTarget.linkerFlags.add("-lc"); // C standard library (fopen, fclose, printf, etc.)
        multiTarget.add(linkTarget);

        return multiTarget;
    }

//
//    private static BuildTarget getAndroidBuildTarget() {
//        AndroidTarget androidTarget = new AndroidTarget();
//        androidTarget.headerDirs.add("src/imgui");
//        androidTarget.cppIncludes.add("**/imgui/*.cpp");
//        androidTarget.cppFlags.add("-Wno-error=format-security");
//        return androidTarget;
//    }
}