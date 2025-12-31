package imgui.extension.nodeeditor;

import com.github.xpenatan.jParser.loader.JParserLibraryLoader;
import com.github.xpenatan.jParser.loader.JParserLibraryLoaderListener;

/**
 * @author xpenatan
 */
public class NodeEditorLoader {

    /*[-JNI;-NATIVE]
        #include "NodeEditorCustom.h"
    */

    public static void init(JParserLibraryLoaderListener listener) {
        JParserLibraryLoader.load("nodeeditor", listener);
    }
}
