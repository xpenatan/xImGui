package imgui.teavm;

import org.teavm.extension.spi.substitution.SubstitutionPolicy;
import org.teavm.extension.spi.substitution.SubstitutionSink;

public class XImGuiSubstitutionPolicy implements SubstitutionPolicy {
    @Override
    public void contribute(SubstitutionSink sink) {
        sink.substitutePackage("javax", "emu.javax");
    }
}
