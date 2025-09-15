#pragma once

#include <string>
#include "imgui_node_editor.h"

typedef ax::NodeEditor::CanvasSizeMode CanvasSizeMode;
typedef ax::NodeEditor::FlowDirection FlowDirection;
typedef ax::NodeEditor::PinKind PinKind;
typedef ax::NodeEditor::SaveReasonFlags SaveReasonFlags;

namespace n = ax::NodeEditor;

using namespace ax::NodeEditor;

class LoadSaveSettingsListener {
    public:

        virtual ~LoadSaveSettingsListener() {
        }

        virtual void onLoad(std::string* data) = 0;
        virtual bool onSave(std::string* data, SaveReasonFlags reason) = 0;
};

struct UserData {
    std::string data;
    LoadSaveSettingsListener* listener = NULL;
};

class NodeEditor {

private:

public:

    static void SetCurrentEditor(EditorContext* ctx) { n::SetCurrentEditor(ctx); }
    static EditorContext* GetCurrentEditor() { return n::GetCurrentEditor(); }
    static EditorContext* CreateEditor(LoadSaveSettingsListener* listener = NULL) {
        Config config;
        UserData* userData = new UserData();
        config.UserPointer = (void*)userData;
        if(listener != NULL) {
            userData->listener = listener;
        }

        config.LoadSettings = [](char* data, void* userPointer) -> size_t {
            UserData* userData = (UserData*)userPointer;
            std::string& stringData = userData->data;
            if(data == NULL) {
                if(userData->listener != NULL) {
                    userData->listener->onLoad(&stringData);
                    return stringData.size();
                }
            }
            else {
                strcpy(data, stringData.c_str());
            }
            return 0;
        };
        config.SaveSettings = [](const char* data, size_t size, SaveReasonFlags reason, void* userPointer) -> bool {
            UserData* userData = (UserData*)userPointer;
            if(userData->listener != NULL) {
                std::string& stringData = userData->data;
                stringData = data;
                bool flag = userData->listener->onSave(&stringData, reason);
                return flag;
            }
            return false;
        };
        return n::CreateEditor(&config);
    }
    static void DestroyEditor(EditorContext* ctx) { n::DestroyEditor(ctx); }
    static const Config& GetConfig(EditorContext* ctx = nullptr) { return n::GetConfig(ctx); }

    static Style& GetStyle() { return n::GetStyle(); }
    static const std::string GetStyleColorName(StyleColor colorIndex) { return n::GetStyleColorName(colorIndex); }

    static void PushStyleColor(StyleColor colorIndex, const ImVec4& color) { n::PushStyleColor(colorIndex, color); }
    static void PopStyleColor(int count = 1) { n::PopStyleColor(count); }

    static void PushStyleVar(StyleVar varIndex, float value) { n::PushStyleVar(varIndex, value); }
    static void PushStyleVar(StyleVar varIndex, const ImVec2& value) { n::PushStyleVar(varIndex, value); }
    static void PushStyleVar(StyleVar varIndex, const ImVec4& value) { n::PushStyleVar(varIndex, value); }
    static void PopStyleVar(int count = 1) { n::PopStyleVar(count); }

    static void Begin(const char* id, const ImVec2& size = ImVec2(0, 0)) { n::Begin(id, size); }
    static void End() { n::End(); }

    static void BeginNode(int id) { n::BeginNode(id); }
    static void BeginPin(int id, PinKind kind) { n::BeginPin(id, kind); }
    static void PinRect(const ImVec2& a, const ImVec2& b) { n::PinRect(a, b); }
    static void PinPivotRect(const ImVec2& a, const ImVec2& b) { n::PinPivotRect(a, b); }
    static void PinPivotSize(const ImVec2& size) { n::PinPivotSize(size); }
    static void PinPivotScale(const ImVec2& scale) { n::PinPivotScale(scale); }
    static void PinPivotAlignment(const ImVec2& alignment) { n::PinPivotAlignment(alignment); }
    static void EndPin() { n::EndPin(); }
    static void Group(const ImVec2& size) { n::Group(size); }
    static void EndNode() { n::EndNode(); }

    static bool BeginGroupHint(int nodeId) { return n::BeginGroupHint(nodeId); }
    static ImVec2 GetGroupMin() { return n::GetGroupMin(); }
    static ImVec2 GetGroupMax() { return n::GetGroupMax(); }
    static ImDrawList* GetHintForegroundDrawList() { return n::GetHintForegroundDrawList(); }
    static ImDrawList* GetHintBackgroundDrawList() { return n::GetHintBackgroundDrawList(); }
    static void EndGroupHint() { n::EndGroupHint(); }

    static ImDrawList* GetNodeBackgroundDrawList(int nodeId) { return n::GetNodeBackgroundDrawList(nodeId); }

    static bool Link(int id, int startPinId, int endPinId, const ImVec4& color = ImVec4(1, 1, 1, 1), float thickness = 1.0f) { return n::Link(id, startPinId, endPinId, color, thickness); }

    static void Flow(int linkId, FlowDirection direction = FlowDirection::Forward) { return n::Flow(linkId, direction); }

    static bool BeginCreate(const ImVec4& color = ImVec4(1, 1, 1, 1), float thickness = 1.0f) { return n::BeginCreate(color, thickness); }
    static bool QueryNewLink(long long* startId, long long* endId) { return n::QueryNewLink((PinId*)&startId[0], (PinId*)&endId[0]); }
    static bool QueryNewLink(long long* startId, long long* endId, const ImVec4& color, float thickness = 1.0f) { return n::QueryNewLink((PinId*)&startId[0], (PinId*)&endId[0], color, thickness); }
    static bool QueryNewNode(long long* pinId) { return n::QueryNewNode((PinId*)&pinId[0]); }
    static bool QueryNewNode(long long* pinId, const ImVec4& color, float thickness = 1.0f) { return n::QueryNewNode((PinId*)&pinId[0], color, thickness); }
    static bool AcceptNewItem() { return n::AcceptNewItem(); }
    static bool AcceptNewItem(const ImVec4& color, float thickness = 1.0f) { return n::AcceptNewItem(color, thickness); }
    static void RejectNewItem() { n::RejectNewItem(); }
    static void RejectNewItem(const ImVec4& color, float thickness = 1.0f) { n::RejectNewItem(color, thickness); }
    static void EndCreate() { n::EndCreate(); }

    static bool BeginDelete() { return n::BeginDelete(); }
    static bool QueryDeletedLink(long long* linkId, long long* startId = nullptr, long long* endId = nullptr) {
        PinId* startPinId = nullptr;
        PinId* endPinId = nullptr;
        if(startId != nullptr) {
            startPinId = (PinId*)&startId[0];
        }
        if(endId != nullptr) {
            endPinId = (PinId*)&endId[0];
        }
        return n::QueryDeletedLink((LinkId*)&linkId[0], startPinId, endPinId);
    }
    static bool QueryDeletedNode(long long* nodeId) { return n::QueryDeletedNode((NodeId*)&nodeId[0]); }
    static bool AcceptDeletedItem(bool deleteDependencies = true) { return n::AcceptDeletedItem(deleteDependencies); }
    static void RejectDeletedItem() { n::RejectDeletedItem(); }
    static void EndDelete() { n::EndDelete(); }

    static void SetNodePosition(int nodeId, const ImVec2& editorPosition) { n::SetNodePosition(nodeId, editorPosition); }
    static void SetGroupSize(int nodeId, const ImVec2& size) { n::SetGroupSize(nodeId, size); }
    static ImVec2 GetNodePosition(int nodeId) { return n::GetNodePosition(nodeId); }
    static ImVec2 GetNodeSize(int nodeId) { return n::GetNodeSize(nodeId); }
    static void CenterNodeOnScreen(int nodeId) { n::CenterNodeOnScreen(nodeId); }
    static void SetNodeZPosition(int nodeId, float z) { n::SetNodeZPosition(nodeId, z); }
    static float GetNodeZPosition(int nodeId) { return n::GetNodeZPosition(nodeId); }

    static void RestoreNodeState(int nodeId) { n::RestoreNodeState(nodeId); }

    static void Suspend() { n::Suspend(); }
    static void Resume() { n::Resume(); }
    static bool IsSuspended() { return n::IsSuspended(); }

    static bool IsActive() { return n::IsActive(); }

    static bool HasSelectionChanged() { return n::HasSelectionChanged(); }
    static int  GetSelectedObjectCount() { return n::GetSelectedObjectCount(); }
    static int  GetSelectedNodes(long long* nodes, int size) { return n::GetSelectedNodes((NodeId*)&nodes[0], size); }
    static int  GetSelectedLinks(long long* links, int size) { return n::GetSelectedLinks((LinkId*)&links[0], size); }
    static bool IsNodeSelected(int nodeId) { return n::IsNodeSelected(nodeId); }
    static bool IsLinkSelected(int linkId) { return n::IsLinkSelected(linkId); }
    static void ClearSelection() { n::ClearSelection(); }
    static void SelectNode(int nodeId, bool append = false) { n::SelectNode(nodeId, append); }
    static void SelectLink(int linkId, bool append = false) { n::SelectLink(linkId, append); }
    static void DeselectNode(int nodeId) { n::DeselectNode(nodeId); }
    static void DeselectLink(int linkId) { n::DeselectLink(linkId); }

    static bool DeleteNode(int nodeId) { return n::DeleteNode(nodeId); }
    static bool DeleteLink(int linkId) { return n::DeleteLink(linkId); }

    static bool HasAnyLinksNode(int nodeId) { return n::HasAnyLinks((NodeId)nodeId); }
    static bool HasAnyLinksPin(int pinId) { return n::HasAnyLinks((PinId)pinId); }
    static int BreakLinksNode(int nodeId) { return n::BreakLinks((NodeId)nodeId); }
    static int BreakLinksPin(int pinId) { return n::BreakLinks((PinId)pinId); }

    static void NavigateToContent(float duration = -1) { n::NavigateToContent(duration); }
    static void NavigateToSelection(bool zoomIn = false, float duration = -1) { n::NavigateToSelection(zoomIn, duration); }

    static bool ShowNodeContextMenu(long long* nodeId) { return n::ShowNodeContextMenu((NodeId*)&nodeId[0]); }
    static bool ShowPinContextMenu(long long* pinId) { return n::ShowPinContextMenu((PinId*)&pinId[0]); }
    static bool ShowLinkContextMenu(long long* linkId) { return n::ShowLinkContextMenu((LinkId*)&linkId[0]); }
    static bool ShowBackgroundContextMenu() { return n::ShowBackgroundContextMenu(); }

    static void EnableShortcuts(bool enable) { n::EnableShortcuts(enable); }
    static bool AreShortcutsEnabled() { return n::AreShortcutsEnabled(); }

    static bool BeginShortcut() { return n::BeginShortcut(); }
    static bool AcceptCut() { return n::AcceptCut(); }
    static bool AcceptCopy() { return n::AcceptCopy(); }
    static bool AcceptPaste() { return n::AcceptPaste(); }
    static bool AcceptDuplicate() { return n::AcceptDuplicate(); }
    static bool AcceptCreateNode() { return n::AcceptCreateNode(); }
    static int  GetActionContextSize() { return n::GetActionContextSize(); }
    static int  GetActionContextNodes(long long* nodes, int size) { return n::GetActionContextNodes((NodeId*)&nodes[0], size); }
    static int  GetActionContextLinks(long long* links, int size) { return n::GetActionContextLinks((LinkId*)&links[0], size); }
    static void EndShortcut() { n::EndShortcut(); }

    static float GetCurrentZoom() { return n::GetCurrentZoom(); }

    static int GetHoveredNode() { return (intptr_t)(uintptr_t)n::GetHoveredNode(); }
    static int GetHoveredPin() { return (intptr_t)(uintptr_t)n::GetHoveredPin(); }
    static int GetHoveredLink() { return (intptr_t)(uintptr_t)n::GetHoveredLink(); }
    static int GetDoubleClickedNode() { return (intptr_t)(uintptr_t)n::GetDoubleClickedNode(); }
    static int GetDoubleClickedPin() { return (intptr_t)(uintptr_t)n::GetDoubleClickedPin(); }
    static int GetDoubleClickedLink() { return (intptr_t)(uintptr_t)n::GetDoubleClickedLink(); }
    static bool IsBackgroundClicked() { return n::IsBackgroundClicked(); }
    static bool IsBackgroundDoubleClicked() { return n::IsBackgroundDoubleClicked(); }
    static ImGuiMouseButton GetBackgroundClickButtonIndex() { return n::GetBackgroundClickButtonIndex(); }
    static ImGuiMouseButton GetBackgroundDoubleClickButtonIndex() { return n::GetBackgroundDoubleClickButtonIndex(); }

    static bool GetLinkPins(int linkId, long long* startPinId, long long* endPinId) { return n::GetLinkPins(linkId, (PinId*)&startPinId[0], (PinId*)&endPinId[0]); }

    static bool PinHadAnyLinks(int pinId) { return n::PinHadAnyLinks(pinId); }

    static ImVec2 GetScreenSize() { return n::GetScreenSize(); }
    static ImVec2 ScreenToCanvas(const ImVec2& pos) { return n::ScreenToCanvas(pos); }
    static ImVec2 CanvasToScreen(const ImVec2& pos) { return n::CanvasToScreen(pos); }

    static int GetNodeCount() { return n::GetNodeCount(); }
    static int GetOrderedNodeIds(long long* nodes, int size) { return n::GetOrderedNodeIds((NodeId*)&nodes[0], size); }
};