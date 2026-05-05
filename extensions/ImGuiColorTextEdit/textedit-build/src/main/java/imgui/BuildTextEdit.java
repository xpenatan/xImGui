package imgui;

import com.github.xpenatan.jParser.builder.BuildMultiTarget;
import com.github.xpenatan.jParser.builder.BuildTarget;
import com.github.xpenatan.jParser.builder.targets.EmscriptenTarget;
import com.github.xpenatan.jParser.builder.targets.LinuxTarget;
import com.github.xpenatan.jParser.builder.targets.MacTarget;
import com.github.xpenatan.jParser.builder.targets.WindowsMSVCTarget;
import com.github.xpenatan.jParser.builder.tool.BuildToolListener;
import com.github.xpenatan.jParser.builder.tool.BuildToolOptions;
import com.github.xpenatan.jParser.builder.tool.BuilderTool;
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
        data.webModuleName = libName;
        data.packageName = basePackage;
        data.cppSourcePath = sourceDir;
        data.modulePrefix = modulePrefix;
        BuildToolOptions op = new BuildToolOptions(data, args);

        String imguiPath = new File("./../../../imgui/").getCanonicalPath().replace("\\", "/");
        op.addAdditionalIDLRefPath(IDLReader.parseFile(imguiPath + "/imgui-build/src/main/cpp/imgui.idl"));
        op.addAdditionalIDLRefPath(IDLReader.getRuntimeHelperFile());
        BuilderTool.build(op, new BuildToolListener() {
            @Override
            public void onAddTarget(BuildToolOptions op, IDLReader idlReader, ArrayList<BuildMultiTarget> targets) {
                if(op.containsArg("web_wasm")) {
                    targets.add(getTeaVMTarget(op, idlReader, imguiPath));
                }
                if(op.containsArg("windows64_jni")) {
                    targets.add(getWindowTarget(op, imguiPath, false));
                }
                if(op.containsArg("linux64_jni")) {
                    targets.add(getLinuxTarget(op, imguiPath, false));
                }
                if(op.containsArg("mac64_jni")) {
                    targets.add(getMacTarget(op, false, imguiPath, false));
                }
                if(op.containsArg("macArm_jni")) {
                    targets.add(getMacTarget(op, true, imguiPath, false));
                }
//                if(op.containsArg("android_jni")) {
//                    targets.add(getAndroidTarget(op, imguiPath));
//                }
//                if(op.containsArg("ios_jni")) {
//                    targets.add(getIOSTarget(op, imguiPath));
//                }

                if(op.containsArg("windows64_ffm")) {
                    targets.add(getWindowTarget(op, imguiPath, true));
                }
                if(op.containsArg("linux64_ffm")) {
                    targets.add(getLinuxTarget(op, imguiPath, true));
                }
                if(op.containsArg("mac64_ffm")) {
                    targets.add(getMacTarget(op, false, imguiPath, true));
                }
                if(op.containsArg("macArm_ffm")) {
                    targets.add(getMacTarget(op, true, imguiPath, true));
                }
            }
        });
    }

    private static BuildMultiTarget getWindowTarget(BuildToolOptions op, String imguiPath, boolean isFFM) {
        String imguiRootBuildPath = imguiPath + "/imgui-build";
        String imguiCustomSourcePath = imguiRootBuildPath + "/src/main/cpp/custom";
        String imguiBuildPath = imguiRootBuildPath + "/build";
        String imguiCppPath = imguiBuildPath + "/c++";
        String imguiSourcePath = imguiBuildPath + "/imgui";
        String libBuildCPPPath = op.getModuleBuildCPPPath();
        String sourceDir = op.getSourceDir();

        String api = isFFM ? "ffm" : "jni";

        BuildMultiTarget multiTarget = new BuildMultiTarget();

        WindowsMSVCTarget compileStaticTarget = new WindowsMSVCTarget();
        compileStaticTarget.libDirSuffix += api;
        compileStaticTarget.isStatic = true;
        compileStaticTarget.cppFlags.add("-std:c++17");
        compileStaticTarget.headerDirs.add("-I" + imguiSourcePath);
        compileStaticTarget.headerDirs.add("-I" + sourceDir);
        compileStaticTarget.headerDirs.add("-I" + imguiCustomSourcePath);
        compileStaticTarget.cppInclude.add(sourceDir + "/*.cpp");
        // Boost regex
        compileStaticTarget.headerDirs.add("-I" + sourceDir + "/vendor/regex/include");
        compileStaticTarget.headerDirs.add("-includecmath");
        compileStaticTarget.cppInclude.add(sourceDir + "/vendor/regex/src/*.cpp");
        multiTarget.add(compileStaticTarget);

        // Compile glue code and link
        WindowsMSVCTarget linkTarget = new WindowsMSVCTarget();
        linkTarget.libDirSuffix += api;
        if(isFFM) {
            linkTarget.setupFFMGlueCode(libBuildCPPPath);
        }
        else {
            linkTarget.setupJNIGlueCode(libBuildCPPPath);
        }
        linkTarget.cppFlags.add("-std:c++17");
        linkTarget.headerDirs.add("-I" + imguiSourcePath);
        linkTarget.headerDirs.add("-I" + sourceDir);
        linkTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        linkTarget.headerDirs.add("-I" + imguiCustomSourcePath);
        linkTarget.linkerFlags.add("/WHOLEARCHIVE:" + imguiCppPath + "/libs/windows/vc/" + api + "/imgui64.lib");
        linkTarget.linkerFlags.add("/WHOLEARCHIVE:" + libBuildCPPPath + "/libs/windows/vc/" + api + "/textedit64_.lib");
        linkTarget.linkerFlags.add("-DLL");
        multiTarget.add(linkTarget);

        return multiTarget;
    }

    private static BuildMultiTarget getLinuxTarget(BuildToolOptions op, String imguiPath, boolean isFFM) {
        String imguiRootBuildPath = imguiPath + "/imgui-build";
        String imguiCustomSourcePath = imguiRootBuildPath + "/src/main/cpp/custom";
        String imguiBuildPath = imguiRootBuildPath + "/build";
        String imguiSourcePath = imguiBuildPath + "/imgui";
        String imguiCppPath = imguiBuildPath + "/c++";
        String libBuildCPPPath = op.getModuleBuildCPPPath();
        String sourceDir = op.getSourceDir();

        String api = isFFM ? "ffm" : "jni";

        BuildMultiTarget multiTarget = new BuildMultiTarget();

        LinuxTarget compileStaticTarget = new LinuxTarget();
        compileStaticTarget.libDirSuffix += api;
        compileStaticTarget.isStatic = true;
        compileStaticTarget.cppFlags.add("-std=c++17");
        compileStaticTarget.cppFlags.add("-fPIC");
        compileStaticTarget.headerDirs.add("-I" + imguiSourcePath);
        compileStaticTarget.headerDirs.add("-I" + sourceDir);
        compileStaticTarget.headerDirs.add("-I" + imguiCustomSourcePath);
        compileStaticTarget.cppInclude.add(sourceDir + "/*.cpp");
        // Boost regex
        compileStaticTarget.headerDirs.add("-I" + sourceDir + "/vendor/regex/include");
        compileStaticTarget.headerDirs.add("-includecmath");
        compileStaticTarget.cppInclude.add(sourceDir + "/vendor/regex/src/*.cpp");
        multiTarget.add(compileStaticTarget);

        // Compile glue code and link
        LinuxTarget linkTarget = new LinuxTarget();
        linkTarget.libDirSuffix += api;
        if(isFFM) {
            linkTarget.setupFFMGlueCode(libBuildCPPPath);
        }
        else {
            linkTarget.setupJNIGlueCode(libBuildCPPPath);
        }
        linkTarget.cppFlags.add("-std=c++17");
        linkTarget.cppFlags.add("-fPIC");
        linkTarget.headerDirs.add("-I" + imguiSourcePath);
        linkTarget.headerDirs.add("-I" + sourceDir);
        linkTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        linkTarget.headerDirs.add("-I" + imguiCustomSourcePath);
        linkTarget.linkerFlags.add(libBuildCPPPath + "/libs/linux/" + api + "/libtextedit64_.a");

        linkTarget.linkerFlags.add("-Wl,-rpath,$ORIGIN");
        linkTarget.linkerFlags.add("-L" + imguiCppPath + "/libs/linux");
        linkTarget.linkerFlags.add("-limgui64");

        multiTarget.add(linkTarget);

        return multiTarget;
    }

    private static BuildMultiTarget getMacTarget(BuildToolOptions op, boolean isArm, String imguiPath, boolean isFFM) {
        String imguiRootBuildPath = imguiPath + "/imgui-build";
        String imguiCustomSourcePath = imguiRootBuildPath + "/src/main/cpp/custom";
        String imguiBuildPath = imguiRootBuildPath + "/build";
        String imguiSourcePath = imguiBuildPath + "/imgui";
        String libBuildCPPPath = op.getModuleBuildCPPPath();
        String sourceDir = op.getSourceDir();

        String api = isFFM ? "ffm" : "jni";

        BuildMultiTarget multiTarget = new BuildMultiTarget();

        MacTarget compileStaticTarget = new MacTarget(isArm);
        compileStaticTarget.libDirSuffix += api;
        compileStaticTarget.isStatic = true;
        compileStaticTarget.cppFlags.add("-std=c++17");
        compileStaticTarget.cppFlags.add("-fPIC");
        compileStaticTarget.headerDirs.add("-I" + imguiSourcePath);
        compileStaticTarget.headerDirs.add("-I" + sourceDir);
        compileStaticTarget.headerDirs.add("-I" + imguiCustomSourcePath);
        compileStaticTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        compileStaticTarget.cppInclude.add(sourceDir + "/*.cpp");
        // Boost regex
        compileStaticTarget.headerDirs.add("-I" + sourceDir + "/vendor/regex/include");
        compileStaticTarget.headerDirs.add("-includecmath");
        compileStaticTarget.cppInclude.add(sourceDir + "/vendor/regex/src/*.cpp");
        multiTarget.add(compileStaticTarget);

        // Compile glue code and link
        MacTarget linkTarget = new MacTarget(isArm);
        linkTarget.libDirSuffix += api;
        if(isFFM) {
            linkTarget.setupFFMGlueCode(libBuildCPPPath);
        }
        else {
            linkTarget.setupJNIGlueCode(libBuildCPPPath);
        }
        linkTarget.cppFlags.add("-std=c++17");
        linkTarget.cppFlags.add("-fPIC");
        linkTarget.cppFlags.add("-DIMGUI_USER_CONFIG=\"ImGuiCustomConfig.h\"");
        linkTarget.headerDirs.add("-I" + imguiSourcePath);
        linkTarget.headerDirs.add("-I" + sourceDir);
        linkTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        linkTarget.headerDirs.add("-I" + imguiCustomSourcePath);
        if(isArm) {
            linkTarget.linkerFlags.add(libBuildCPPPath + "/libs/mac/arm/" + api + "/libtextedit64_.a");
        }
        else {
            linkTarget.linkerFlags.add(libBuildCPPPath + "/libs/mac/" + api + "/libtextedit64_.a");
        }

        // Use -undefined dynamic_lookup so symbols from imgui can be resolved at runtime
        // from already-loaded libraries instead of requiring the dylib file on disk.
        linkTarget.linkerFlags.add("-undefined");
        linkTarget.linkerFlags.add("dynamic_lookup");

        multiTarget.add(linkTarget);

        return multiTarget;
    }

    private static BuildMultiTarget getTeaVMTarget(BuildToolOptions op, IDLReader idlReader, String imguiPath) {
        String imguiRootBuildPath = imguiPath + "/imgui-build";
        String imguiCustomSourcePath = imguiRootBuildPath + "/src/main/cpp/custom";
        String imguiBuildPath = imguiRootBuildPath + "/build";
        String imguiSourcePath = imguiBuildPath + "/imgui";
        String libBuildCPPPath = op.getModuleBuildCPPPath();
        String sourceDir = op.getSourceDir();

        BuildMultiTarget multiTarget = new BuildMultiTarget();

        String config;
        if(BuildTarget.isWindows()) {
            config = "-DIMGUI_USER_CONFIG=\"\\\"ImGuiCustomConfig.h\\\"\"";
        }
        else {
            config = "-DIMGUI_USER_CONFIG=\"ImGuiCustomConfig.h\"";
        }

        // Make a static library
        EmscriptenTarget compileStaticTarget = new EmscriptenTarget();
        compileStaticTarget.isStatic = true;
        compileStaticTarget.cppFlags.add("-std=c++17");
        compileStaticTarget.cppFlags.add(config);
        compileStaticTarget.compileGlueCode = false;
        compileStaticTarget.headerDirs.add("-I" + imguiSourcePath);
        compileStaticTarget.headerDirs.add("-I" + sourceDir);
        compileStaticTarget.headerDirs.add("-I" + imguiCustomSourcePath);
        compileStaticTarget.cppInclude.add(sourceDir + "/*.cpp");
        // Boost regex
        compileStaticTarget.headerDirs.add("-I" + sourceDir + "/vendor/regex/include");
        compileStaticTarget.cppInclude.add(sourceDir + "/vendor/regex/src/*.cpp");
        multiTarget.add(compileStaticTarget);

        // Compile glue code and link
        EmscriptenTarget linkTarget = new EmscriptenTarget();
        linkTarget.mainModuleName = "runtime";
        linkTarget.idlReader = idlReader;
        linkTarget.cppFlags.add("-std=c++17");
        linkTarget.headerDirs.add("-I" + imguiSourcePath);
        linkTarget.headerDirs.add("-I" + sourceDir);
        linkTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        linkTarget.headerDirs.add("-I" + imguiCustomSourcePath);
        linkTarget.headerDirs.add("-include" + op.getCustomSourceDir() + "TextEditCustom.h");
        linkTarget.headerDirs.add("-include" + imguiCustomSourcePath + "/ImGuiCustom.h");
        linkTarget.linkerFlags.add(libBuildCPPPath + "/libs/emscripten/textedit_.a");
        linkTarget.linkerFlags.add("-sSIDE_MODULE=2");
        linkTarget.linkerFlags.add("-lc++abi"); // C++ ABI (exceptions, thread_atexit, etc.)
        linkTarget.linkerFlags.add("-lc++"); // C++ STL (std::cout, std::string, etc.)
        linkTarget.linkerFlags.add("-lc"); // C standard library (fopen, fclose, printf, etc.)
        multiTarget.add(linkTarget);

        return multiTarget;
    }
}