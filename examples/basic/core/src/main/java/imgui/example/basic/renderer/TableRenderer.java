package imgui.example.basic.renderer;

import imgui.ImGui;
import imgui.enums.ImGuiTableColumnFlags;
import imgui.enums.ImGuiTableFlags;

public class TableRenderer implements UIRenderer {

    public TableRenderer() {
    }

    public void render() {
        ImGuiTableFlags flags1 = ImGuiTableFlags.Borders;
        if (ImGui.BeginTable("table1", 3, flags1))
        {
            // We could also set ImGuiTableFlags_SizingFixedFit on the table and all columns will default to ImGuiTableColumnFlags_WidthFixed.
            ImGui.TableSetupColumn("one", ImGuiTableColumnFlags.WidthStretch, 0.1f); // Default to 100.0f
            ImGui.TableSetupColumn("two", ImGuiTableColumnFlags.WidthStretch, 0.4f); // Default to 200.0f
            ImGui.TableSetupColumn("three", ImGuiTableColumnFlags.WidthStretch);       // Default to auto
            ImGui.TableHeadersRow();
            for (int row = 0; row < 4; row++)
            {
                ImGui.TableNextRow();
                for (int column = 0; column < 3; column++)
                {
                    ImGui.TableSetColumnIndex(column);
                    if (row == 0)
                        ImGui.Text("(w: %5.1f)");
                    else
                        ImGui.Text("Hello %d,%d");
                }
            }
            ImGui.EndTable();
        }
    }

    @Override
    public String getName() {
        return "Table";
    }
}
