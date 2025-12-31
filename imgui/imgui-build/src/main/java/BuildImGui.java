import com.github.xpenatan.jParser.builder.BuildMultiTarget;
import com.github.xpenatan.jParser.builder.BuildTarget;
import com.github.xpenatan.jParser.builder.targets.AndroidTarget;
import com.github.xpenatan.jParser.builder.targets.EmscriptenTarget;
import com.github.xpenatan.jParser.builder.targets.LinuxTarget;
import com.github.xpenatan.jParser.builder.targets.MacTarget;
import com.github.xpenatan.jParser.builder.targets.WindowsMSVCTarget;
import com.github.xpenatan.jParser.builder.tool.BuildToolListener;
import com.github.xpenatan.jParser.builder.tool.BuildToolOptions;
import com.github.xpenatan.jParser.builder.tool.BuilderTool;
import com.github.xpenatan.jParser.core.JParser;
import com.github.xpenatan.jParser.idl.IDLClassOrEnum;
import com.github.xpenatan.jParser.idl.IDLReader;
import com.github.xpenatan.jParser.idl.IDLRenaming;
import java.util.ArrayList;

public class BuildImGui {

    public static void main(String[] args) {
        WindowsMSVCTarget.DEBUG_BUILD = false;

        String libName = "imgui";
        String modulePrefix = "imgui";
        String basePackage = "imgui";
        String sourceDir =  "/build/imgui";

        JParser.CREATE_IDL_HELPER = false;

        BuildToolOptions.BuildToolParams data = new BuildToolOptions.BuildToolParams();
        data.libName = libName;
        data.idlName = libName;
        data.webModuleName = libName;
        data.packageName = basePackage;
        data.cppSourcePath = sourceDir;
        data.modulePrefix = modulePrefix;

        BuildToolOptions op = new BuildToolOptions(data, args);
        op.addAdditionalIDLRefPath(IDLReader.getIDLHelperFile());

        BuilderTool.build(op, new BuildToolListener() {
            @Override
            public void onAddTarget(BuildToolOptions op, IDLReader idlReader, ArrayList<BuildMultiTarget> targets) {
                if(op.containsArg("teavm")) {
                    targets.add(getTeaVMTarget(op, idlReader));
                }
                if(op.containsArg("windows64")) {
                    targets.add(getWindowTarget(op));
                }
                if(op.containsArg("linux64")) {
                    targets.add(getLinuxTarget(op));
                }
                if(op.containsArg("mac64")) {
                    targets.add(getMacTarget(op, false));
                }
                if(op.containsArg("macArm")) {
                    targets.add(getMacTarget(op, true));
                }
                if(op.containsArg("android")) {
                    // TODO fix android input and ui scale (Widgets are too small)
                    targets.add(getAndroidTarget(op));
                }
//                if(op.containsArg("iOS")) {
//                    targets.add(getIOSTarget(op));
//                }
            }
        }, new IDLRenaming() {

            @Override
            public String obtainNewPackage(IDLClassOrEnum idlClassOrEnum, String classPackage) {
                if(idlClassOrEnum.isEnum()) {
                    classPackage = "enums";
                }
                return classPackage;
            }

            @Override
            public String getIDLEnumName(String enumName) {
                String newName = null;
                if(enumName.contains("_")) {
                    String[] s = enumName.split("_", 2);
                    newName = s[1];
                    switch(newName) {
                        case "0":
                        case "1":
                        case "2":
                        case "3":
                        case "4":
                        case "5":
                        case "6":
                        case "7":
                        case "8":
                        case "9":
                        case "10":
                            newName = "Num_" + newName;
                        break;
                    }
                    if(enumName.startsWith("ImGuiMod")) {
                        newName = null;
                    }
                }
                if(newName != null) {
                    enumName = newName;
                }
                return enumName;
            }
        });
    }

    private static BuildMultiTarget getWindowTarget(BuildToolOptions op) {
        BuildMultiTarget multiTarget = new BuildMultiTarget();
        String libBuildCPPPath = op.getModuleBuildCPPPath();
        String sourceDir = op.getSourceDir();

        // Make a static library
        WindowsMSVCTarget windowsTarget = new WindowsMSVCTarget();
        windowsTarget.cppFlags.add("-std:c++17");
        windowsTarget.cppFlags.add("/DIMGUI_EXPORTS");
        windowsTarget.cppFlags.add("/DIMGUI_USER_CONFIG=\"\\\"ImGuiCustomConfig.h\\\"\"");
        windowsTarget.isStatic = true;
        windowsTarget.headerDirs.add("-I" + sourceDir);
        windowsTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        windowsTarget.cppInclude.add(sourceDir + "/*.cpp");
        windowsTarget.cppInclude.add(op.getCustomSourceDir() + "*.cpp");
        multiTarget.add(windowsTarget);

        // Compile glue code and link
        WindowsMSVCTarget linkTarget = new WindowsMSVCTarget();
        linkTarget.addJNIHeaders();
        linkTarget.cppFlags.add("-std:c++17");
        linkTarget.cppFlags.add("/DIMGUI_EXPORTS");
        linkTarget.cppFlags.add("/DIMGUI_USER_CONFIG=\"\\\"ImGuiCustomConfig.h\\\"\"");
        linkTarget.headerDirs.add("-I" + sourceDir);
        linkTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        linkTarget.headerDirs.add("-I" + libBuildCPPPath + "/src/jniglue");
        linkTarget.linkerFlags.add(libBuildCPPPath + "/libs/windows/vc/imgui64_.lib");
        linkTarget.cppInclude.add(libBuildCPPPath + "/src/jniglue/JNIGlue.cpp");
        multiTarget.add(linkTarget);

        return multiTarget;
    }

    private static BuildMultiTarget getLinuxTarget(BuildToolOptions op) {
        BuildMultiTarget multiTarget = new BuildMultiTarget();
        String libBuildCPPPath = op.getModuleBuildCPPPath();
        String sourceDir = op.getSourceDir();

        // Make a static library
        LinuxTarget linuxTarget = new LinuxTarget();
        linuxTarget.isStatic = true;
        linuxTarget.cppFlags.add("-std=c++17");
        linuxTarget.cppFlags.add("-DIMGUI_USER_CONFIG=\"ImGuiCustomConfig.h\"");
        linuxTarget.headerDirs.add("-I" + sourceDir);
        linuxTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        linuxTarget.cppInclude.add(sourceDir + "/*.cpp");
        multiTarget.add(linuxTarget);

        // Compile glue code and link
        LinuxTarget linkTarget = new LinuxTarget();
        linkTarget.addJNIHeaders();
        linkTarget.cppFlags.add("-std=c++17");
        linkTarget.cppFlags.add("-DIMGUI_USER_CONFIG=\"ImGuiCustomConfig.h\"");
        linkTarget.headerDirs.add("-I" + sourceDir);
        linkTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        linkTarget.linkerFlags.add(libBuildCPPPath + "/libs/linux/libimgui64_.a");
        linkTarget.cppInclude.add(libBuildCPPPath + "/src/jniglue/JNIGlue.cpp");
        multiTarget.add(linkTarget);

        return multiTarget;
    }

    private static BuildMultiTarget getMacTarget(BuildToolOptions op, boolean isArm) {
        BuildMultiTarget multiTarget = new BuildMultiTarget();
        String libBuildCPPPath = op.getModuleBuildCPPPath();
        String sourceDir = op.getSourceDir();

        // Make a static library
        MacTarget macTarget = new MacTarget(isArm);
        macTarget.isStatic = true;
        macTarget.cppFlags.add("-std=c++17");
        macTarget.headerDirs.add("-I" + sourceDir);
        macTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        macTarget.cppFlags.add("-DIMGUI_USER_CONFIG=\"ImGuiCustomConfig.h\"");
        macTarget.cppInclude.add(sourceDir + "/*.cpp");
        multiTarget.add(macTarget);

        // Compile glue code and link
        MacTarget linkTarget = new MacTarget(isArm);
        linkTarget.addJNIHeaders();
        linkTarget.cppFlags.add("-std=c++17");
        linkTarget.cppFlags.add("-DIMGUI_USER_CONFIG=\"ImGuiCustomConfig.h\"");
        linkTarget.headerDirs.add("-I" + sourceDir);
        linkTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        if(isArm) {
            linkTarget.linkerFlags.add(libBuildCPPPath + "/libs/mac/arm/libimgui64_.a");
        }
        else {
            linkTarget.linkerFlags.add(libBuildCPPPath + "/libs/mac/libimgui64_.a");
        }
        linkTarget.cppInclude.add(libBuildCPPPath + "/src/jniglue/JNIGlue.cpp");
        multiTarget.add(linkTarget);

        return multiTarget;
    }

    private static BuildMultiTarget getTeaVMTarget(BuildToolOptions op, IDLReader idlReader) {
        BuildMultiTarget multiTarget = new BuildMultiTarget();
        String libBuildCPPPath = op.getModuleBuildCPPPath();
        String sourceDir = op.getSourceDir();

        String config;
        if(BuildTarget.isWindows()) {
            config = "-DIMGUI_USER_CONFIG=\"\\\"ImGuiCustomConfig.h\\\"\"";
        }
        else {
            config = "-DIMGUI_USER_CONFIG=\"ImGuiCustomConfig.h\"";
        }

        // Make a static library
        EmscriptenTarget libTarget = new EmscriptenTarget();
        libTarget.isStatic = true;
        libTarget.cppFlags.add("-std=c++17");
        libTarget.cppFlags.add(config);
        libTarget.compileGlueCode = false;
        libTarget.headerDirs.add("-I" + sourceDir);
        libTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        libTarget.cppInclude.add(sourceDir + "/*.cpp");
        libTarget.cppFlags.add("-DIMGUI_DISABLE_FILE_FUNCTIONS");
        libTarget.cppFlags.add("-DIMGUI_DEFINE_MATH_OPERATORS");
        multiTarget.add(libTarget);

        // Compile glue code and link
        EmscriptenTarget linkTarget = new EmscriptenTarget();
        linkTarget.mainModuleName = "idl";
        linkTarget.idlReader = idlReader;
        linkTarget.cppFlags.add("-std=c++17");
        linkTarget.headerDirs.add("-I" + sourceDir);
        linkTarget.headerDirs.add("-I" + op.getCustomSourceDir());
        linkTarget.headerDirs.add("-include" + op.getCustomSourceDir() + "ImGuiCustom.h");
        linkTarget.linkerFlags.add(libBuildCPPPath + "/libs/emscripten/imgui_.a");
        linkTarget.linkerFlags.add("-sSIDE_MODULE=1");
        linkTarget.linkerFlags.add("-lc++abi"); // C++ ABI (exceptions, thread_atexit, etc.)
        linkTarget.linkerFlags.add("-lc++"); // C++ STL (std::cout, std::string, etc.)
        linkTarget.linkerFlags.add("-lc"); // C standard library (fopen, fclose, printf, etc.)
        multiTarget.add(linkTarget);

        return multiTarget;
    }

    private static BuildMultiTarget getAndroidTarget(BuildToolOptions op) {
        BuildMultiTarget multiTarget = new BuildMultiTarget();
        String sourceDir = op.getSourceDir();
        String libBuildCPPPath = op.getModuleBuildCPPPath();

        AndroidTarget.ApiLevel apiLevel = AndroidTarget.ApiLevel.Android_10_29;
        ArrayList<AndroidTarget.Target> targets = new ArrayList<>();

        targets.add(AndroidTarget.Target.x86);
        targets.add(AndroidTarget.Target.x86_64);
        targets.add(AndroidTarget.Target.armeabi_v7a);
        targets.add(AndroidTarget.Target.arm64_v8a);

        for(int i = 0; i < targets.size(); i++) {
            AndroidTarget.Target target = targets.get(i);

            // Make a static library
            AndroidTarget androidTarget = new AndroidTarget(target, apiLevel);
            androidTarget.isStatic = true;
            androidTarget.cppFlags.add("-std=c++17");
            androidTarget.headerDirs.add("-I" + sourceDir);
            androidTarget.cppInclude.add(sourceDir + "/imgui/**.cpp");
            androidTarget.cppFlags.add("-Wno-error=format-security");
            androidTarget.cppFlags.add("-DIMGUI_DISABLE_FILE_FUNCTIONS");
            androidTarget.cppFlags.add("-DIMGUI_DEFINE_MATH_OPERATORS");
            multiTarget.add(androidTarget);

            // Compile glue code and link
            AndroidTarget linkTarget = new AndroidTarget(target, apiLevel);
            linkTarget.addJNIHeaders();
            linkTarget.cppFlags.add("-std=c++17");
            linkTarget.headerDirs.add("-I" + sourceDir);
            linkTarget.headerDirs.add("-I" + op.getCustomSourceDir());
            linkTarget.cppInclude.add(libBuildCPPPath + "/src/jniglue/JNIGlue.cpp");
            linkTarget.linkerFlags.add(libBuildCPPPath + "/libs/android/" + target.getFolder() +"/lib" + op.libName + ".a");
            linkTarget.cppFlags.add("-Wno-error=format-security");
            linkTarget.cppFlags.add("-DIMGUI_DISABLE_FILE_FUNCTIONS");
            linkTarget.cppFlags.add("-DIMGUI_DEFINE_MATH_OPERATORS");
            linkTarget.linkerFlags.add("-Wl,-z,max-page-size=16384");
            multiTarget.add(linkTarget);
        }

        return multiTarget;
    }
}