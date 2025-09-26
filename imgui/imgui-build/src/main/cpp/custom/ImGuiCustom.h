#pragma once

#include "imgui.h"
#include "imgui_internal.h"
#include "IDLHelper.h"

#if defined(_MSC_VER) && _MSC_VER <= 1500 // MSVC 2008 or earlier
#include <stddef.h>     // intptr_t
#else
#include <stdint.h>     // intptr_t
#endif
#include <string>
#include <cstdint>
#include <iostream>

typedef ImVector<ImDrawCmd> VecCmdBuffer;
typedef ImVector<ImDrawIdx> VecIdxBuffer;
typedef ImVector<ImDrawVert> VecVtxBuffer;
typedef ImVector<unsigned int> ImVectorInt;

namespace im = ImGui;

namespace ImGuiWrapper {

class ImGuiInternal {
    // Emscripten webidl don't support binding methods without a class so we need to create a wrapper
    public:
        static ImGuiID                  ImHashData(const void* data, size_t data_size, ImGuiID seed = 0) { return ImHashData(data, data_size, seed); }
        static ImGuiID                  ImHashStr(const char* data, size_t data_size = 0, ImGuiID seed = 0) { return ImHashStr(data, data_size, seed); }

        static ImGuiWindow*             GetCurrentWindow() { return im::GetCurrentWindow(); }
        static ImGuiWindow*             FindWindowByID(ImGuiID id) { return im::FindWindowByID(id); }
        static ImGuiWindow*             FindWindowByName(const char* name) { return im::FindWindowByName(name); }

        // Windows: Display Order and Focus Order
        static void                     FocusWindow(ImGuiWindow* window, ImGuiFocusRequestFlags flags = 0) { im::FocusWindow(window, flags); }

        // Basic Helpers for widget code
        static void                     ItemSize(const ImVec2& size, float text_baseline_y = -1.0f) { im::ItemSize(size, text_baseline_y); }
        static void                     ItemSize(const ImRect& bb, float text_baseline_y = -1.0f) { im::ItemSize(bb, text_baseline_y); }
        static bool                     ItemAdd(const ImRect& bb, ImGuiID id, const ImRect* nav_bb = NULL, ImGuiItemFlags extra_flags = 0) { return im::ItemAdd(bb, id, nav_bb, extra_flags); }
        static bool                     ItemHoverable(const ImRect& bb, ImGuiID id, ImGuiItemFlags item_flags) { return im::ItemHoverable(bb, id, item_flags); }
        static bool                     IsWindowContentHoverable(ImGuiWindow* window, ImGuiHoveredFlags flags = 0) { return im::IsWindowContentHoverable(window, flags); }
        static bool                     IsClippedEx(const ImRect& bb, ImGuiID id) { return im::IsClippedEx(bb, id); }
        static void                     SetLastItemData(ImGuiID item_id, ImGuiItemFlags in_flags, ImGuiItemStatusFlags status_flags, const ImRect& item_rect) { im::SetLastItemData(item_id, in_flags, status_flags, item_rect); }
        static ImVec2                   CalcItemSize(ImVec2 size, float default_w, float default_h) { return im::CalcItemSize(size, default_w, default_h); }
        static float                    CalcWrapWidthForPos(const ImVec2& pos, float wrap_pos_x) { return im::CalcWrapWidthForPos(pos, wrap_pos_x); }
        static void                     PushMultiItemsWidths(int components, float width_full) { im::PushMultiItemsWidths(components, width_full); }
        static bool                     IsItemToggledSelection() { return im::IsItemToggledSelection(); }
        static void                     ShrinkWidths(ImGuiShrinkWidthItem* items, int count, float width_excess) { im::ShrinkWidths(items, count, width_excess); }

        static void                     DockBuilderDockWindow(const char* window_name, ImGuiID node_id) { im::DockBuilderDockWindow(window_name, node_id); }
        static ImGuiDockNode*           DockBuilderGetNode(ImGuiID node_id) { return im::DockBuilderGetNode(node_id); }
        static ImGuiDockNode*           DockBuilderGetCentralNode(ImGuiID node_id) { return im::DockBuilderGetCentralNode(node_id); }
        static ImGuiID                  DockBuilderAddNode(ImGuiID node_id = 0, ImGuiDockNodeFlags flags = 0) { return im::DockBuilderAddNode(node_id, flags); }
        static void                     DockBuilderRemoveNode(ImGuiID node_id) { im::DockBuilderRemoveNode(node_id); }
        static void                     DockBuilderRemoveNodeDockedWindows(ImGuiID node_id, bool clear_settings_refs = true) { im::DockBuilderRemoveNodeDockedWindows(node_id, clear_settings_refs); }
        static void                     DockBuilderRemoveNodeChildNodes(ImGuiID node_id) { im::DockBuilderRemoveNodeChildNodes(node_id); }
        static void                     DockBuilderSetNodePos(ImGuiID node_id, ImVec2& pos) { im::DockBuilderSetNodePos(node_id, pos); }
        static void                     DockBuilderSetNodeSize(ImGuiID node_id, ImVec2& size) { im::DockBuilderSetNodeSize(node_id, size); }
        static ImGuiID                  DockBuilderSplitNode(ImGuiID node_id, ImGuiDir split_dir, float size_ratio_for_node_at_dir, int* out_id_at_dir, int* out_id_at_opposite_dir) { return im::DockBuilderSplitNode(node_id, split_dir, size_ratio_for_node_at_dir, (ImGuiID*)out_id_at_dir, (ImGuiID*)out_id_at_opposite_dir); }
        static void                     DockBuilderCopyDockSpace(ImGuiID src_dockspace_id, ImGuiID dst_dockspace_id, ImVector<const char*>* in_window_remap_pairs) { im::DockBuilderCopyDockSpace(src_dockspace_id, dst_dockspace_id, in_window_remap_pairs); }
        static void                     DockBuilderCopyNode(ImGuiID src_node_id, ImGuiID dst_node_id, ImVector<ImGuiID>* out_node_remap_pairs) { im::DockBuilderCopyNode(src_node_id, dst_node_id, out_node_remap_pairs); }
        static void                     DockBuilderCopyWindowSettings(const char* src_name, const char* dst_name) { im::DockBuilderCopyWindowSettings(src_name, dst_name); }
        static void                     DockBuilderFinish(ImGuiID node_id) { im::DockBuilderFinish(node_id); }

        static bool                     BeginTableEx(const char* name, ImGuiID id, int columns_count, ImGuiTableFlags flags = 0, const ImVec2& outer_size = ImVec2(0, 0), float inner_width = 0.0f) { return im::BeginTableEx(name, id, columns_count, flags, outer_size, inner_width); }

        static ImGuiTabBar*             GetCurrentTabBar() { return im::GetCurrentTabBar(); }
        static ImGuiTabItem*            TabBarFindTabByID(ImGuiTabBar* tab_bar, ImGuiID tab_id) { return im::TabBarFindTabByID(tab_bar, tab_id); }
        static ImGuiTabItem*            TabBarFindTabByOrder(ImGuiTabBar* tab_bar, int order) { return im::TabBarFindTabByOrder(tab_bar, order); }
        static void                     TabBarCloseTab(ImGuiTabBar* tab_bar, ImGuiTabItem* tab) { im::TabBarCloseTab(tab_bar, tab); }
        static void                     TabBarQueueFocus(ImGuiTabBar* tab_bar, ImGuiTabItem* tab) { im::TabBarQueueFocus(tab_bar, tab); }
        static void                     TabBarQueueReorder(ImGuiTabBar* tab_bar, ImGuiTabItem* tab, int offset) { im::TabBarQueueReorder(tab_bar, tab, offset); }

        // Basic Accessors
        static ImGuiID                  GetActiveID() { return im::GetActiveID(); }
        static ImGuiID                  GetFocusID() { return im::GetFocusID(); }
        static void                     SetActiveID(ImGuiID id, ImGuiWindow* window) { im::SetActiveID(id, window); }
        static void                     SetFocusID(ImGuiID id, ImGuiWindow* window) { im::SetFocusID(id, window); }
        static void                     ClearActiveID() { im::ClearActiveID(); }
        static ImGuiID                  GetHoveredID() { return im::GetHoveredID(); }
        static void                     SetHoveredID(ImGuiID id) { im::SetHoveredID(id); }
        static void                     KeepAliveID(ImGuiID id) { im::KeepAliveID(id); }

        // Drag and Drop
        static bool                            IsDragDropActive() { return im::IsDragDropActive(); }
        static bool                            BeginDragDropTargetCustom(const ImRect& bb, ImGuiID id) { return im::BeginDragDropTargetCustom(bb, id); }
        static void                            ClearDragDrop() { im::ClearDragDrop(); }
        static bool                            IsDragDropPayloadBeingAccepted() { return im::IsDragDropPayloadBeingAccepted(); }
        static void                            RenderDragDropTargetRect(const ImRect& bb, const ImRect& item_clip_rect) { return im::RenderDragDropTargetRect(bb, item_clip_rect); }

        // Render helpers (those functions don't access any ImGui state!)
        static void                     RenderArrow(ImDrawList* draw_list, ImVec2& pos, ImU32 col, ImGuiDir dir, float scale = 1.0f) { im::RenderArrow(draw_list, pos, col, dir, scale); }
        static void                     RenderBullet(ImDrawList* draw_list, ImVec2& pos, ImU32 col) { im::RenderBullet(draw_list, pos, col); }
        static void                     RenderCheckMark(ImDrawList* draw_list, ImVec2& pos, ImU32 col, float sz) { im::RenderCheckMark(draw_list, pos, col, sz); }
        static void                     RenderArrowPointingAt(ImDrawList* draw_list, ImVec2& pos, ImVec2& half_sz, ImGuiDir direction, ImU32 col) { im::RenderArrowPointingAt(draw_list, pos, half_sz, direction, col); }
        static void                     RenderArrowDockMenu(ImDrawList* draw_list, ImVec2& p_min, float sz, ImU32 col) { im::RenderArrowDockMenu(draw_list, p_min, sz, col); }
        static void                     RenderRectFilledRangeH(ImDrawList* draw_list, const ImRect& rect, ImU32 col, float x_start_norm, float x_end_norm, float rounding) { im::RenderRectFilledRangeH(draw_list, rect, col, x_start_norm, x_end_norm, rounding); }
        static void                     RenderRectFilledWithHole(ImDrawList* draw_list, const ImRect& outer, const ImRect& inner, ImU32 col, float rounding) { im::RenderRectFilledWithHole(draw_list, outer, inner, col, rounding); }
        static ImDrawFlags              CalcRoundingFlagsForRectInRect(const ImRect& r_in, const ImRect& r_outer, float threshold) { return im::CalcRoundingFlagsForRectInRect(r_in, r_outer, threshold); }

        // Widgets
        static void                     TextEx(const char* text, const char* text_end = NULL, ImGuiTextFlags flags = 0) { im::TextEx(text, text_end, flags); }
        static bool                     ButtonEx(const char* label, const ImVec2& size_arg = ImVec2(0, 0), ImGuiButtonFlags flags = 0) { return im::ButtonEx(label, size_arg, flags); }
        static bool                     ArrowButtonEx(const char* str_id, ImGuiDir dir, ImVec2& size_arg, ImGuiButtonFlags flags = 0) { return im::ArrowButtonEx(str_id, dir, size_arg, flags); }
        static bool                     ImageButtonEx(ImGuiID id, ImTextureID texture_id, const ImVec2& image_size, const ImVec2& uv0, const ImVec2& uv1, const ImVec4& bg_col, const ImVec4& tint_col, ImGuiButtonFlags flags = 0);
        static void                     SeparatorEx(ImGuiSeparatorFlags flags, float thickness = 1.0f) { im::SeparatorEx(flags, thickness); }
        static void                     SeparatorTextEx(ImGuiID id, const char* label, const char* label_end, float extra_width) { im::SeparatorTextEx(id, label, label_end, extra_width); }
        static bool                     CheckboxFlags(const char* label, ImS64* flags, ImS64 flags_value) { return im::CheckboxFlags(label, flags, flags_value); }
        static bool                     CheckboxFlags(const char* label, ImU64* flags, ImU64 flags_value) { return im::CheckboxFlags(label, flags, flags_value); }

        // Widgets low-level behaviors
        static bool                     ButtonBehavior(const ImRect& bb, ImGuiID id, bool* out_hovered, bool* out_held, ImGuiButtonFlags flags = 0) { return im::ButtonBehavior(bb, id, out_hovered, out_held, flags); }
        static bool                     DragBehavior(ImGuiID id, ImGuiDataType data_type, void* p_v, float v_speed, const void* p_min, const void* p_max, const char* format, ImGuiSliderFlags flags) { return im::DragBehavior(id, data_type, p_v, v_speed, p_min, p_max, format, flags); }
        static bool                     SliderBehavior(const ImRect& bb, ImGuiID id, ImGuiDataType data_type, void* p_v, const void* p_min, const void* p_max, const char* format, ImGuiSliderFlags flags, ImRect* out_grab_bb) { return im::SliderBehavior(bb, id, data_type, p_v, p_min, p_max, format, flags, out_grab_bb); }
        static bool                     SplitterBehavior(const ImRect& bb, ImGuiID id, ImGuiAxis axis, float* size1, float* size2, float min_size1, float min_size2, float hover_extend = 0.0f, float hover_visibility_delay = 0.0f, ImU32 bg_col = 0) { return im::SplitterBehavior(bb, id, axis, size1, size2, min_size1, min_size2, hover_extend, hover_visibility_delay, bg_col); }
        static bool                     TreeNodeBehavior(ImGuiID id, ImGuiTreeNodeFlags flags, const char* label, const char* label_end = NULL) { return im::TreeNodeBehavior(id, flags, label_end); }
        static void                     TreePushOverrideID(ImGuiID id) { im::TreePushOverrideID(id); }
        static void                     TreeNodeSetOpen(ImGuiID id, bool open) { im::TreeNodeSetOpen(id, open); }
        static bool                     TreeNodeUpdateNextOpen(ImGuiID id, ImGuiTreeNodeFlags flags) { return im::TreeNodeUpdateNextOpen(id, flags); }
        static void                     SetNextItemSelectionUserData(ImGuiSelectionUserData selection_user_data) { im::SetNextItemSelectionUserData(selection_user_data); }

        static ImGuiID                  GetKeyOwner(ImGuiKey key) { return im::GetKeyOwner(key); }
        static void                     SetKeyOwner(ImGuiKey key, ImGuiID owner_id, ImGuiInputFlags flags = 0) { im::SetKeyOwner(key, owner_id, flags); }
        static void                     SetItemKeyOwner(ImGuiKey key, ImGuiInputFlags flags = 0) { im::SetItemKeyOwner(key, flags); }
        static bool                     TestKeyOwner(ImGuiKey key, ImGuiID owner_id) { return im::TestKeyOwner(key, owner_id); }

        static void                     ScrollToItem(ImGuiScrollFlags flags = 0) { im::ScrollToItem(flags); }
        static void                     ScrollToRect(ImGuiWindow* window, const ImRect& rect, ImGuiScrollFlags flags = 0) { im::ScrollToRect(window, rect, flags); }
        static ImVec2                   ScrollToRectEx(ImGuiWindow* window, const ImRect& rect, ImGuiScrollFlags flags = 0) { return im::ScrollToRectEx(window, rect, flags); }
};

class ImGui {
    // Emscripten webidl don't support binding methods without a class so we need to create a wrapper
    public:

        // Context creation and access
        static                          ImGuiContext* CreateContext(ImFontAtlas* shared_font_atlas = NULL) {
                                            ImGuiContext* ctx = im::CreateContext();
                                            ImGui::GetIO().IniFilename = NULL;
                                            return ctx;
                                        }
        static void                     DestroyContext(ImGuiContext* ctx = NULL) { im::DestroyContext(ctx); }
        static ImGuiContext*            GetCurrentContext() { return im::GetCurrentContext(); }
        static void                     SetCurrentContext(ImGuiContext* ctx) { im::SetCurrentContext(ctx); }

        // Main
        static ImGuiIO&                 GetIO() { return im::GetIO(); }
        static ImGuiStyle&              GetStyle() { return im::GetStyle(); }
        static void                     NewFrame() { im::NewFrame(); }
        static void                     EndFrame() { im::EndFrame(); }
        static void                     Render() { im::Render(); }
        static ImDrawData*              GetDrawData() { return im::GetDrawData(); }

        // Demo, Debug, Information
        static void                     ShowDemoWindow(bool* p_open = NULL) { im::ShowDemoWindow(p_open); }
        static void                     ShowMetricsWindow(bool* p_open = NULL) { im::ShowMetricsWindow(p_open); }
        static void                     ShowDebugLogWindow(bool* p_open = NULL) { im::ShowDebugLogWindow(p_open); }
        static void                     ShowIDStackToolWindow(bool* p_open = NULL) { im::ShowIDStackToolWindow(p_open); }
        static void                     ShowAboutWindow(bool* p_open = NULL) { im::ShowAboutWindow(p_open); }
        static void                     ShowStyleEditor(ImGuiStyle* ref = NULL) { im::ShowStyleEditor(ref); }
        static void                     ShowStyleSelector(const char* label) { im::ShowStyleSelector(label); }
        static void                     ShowFontSelector(const char* label) { im::ShowFontSelector(label); }
        static void                     ShowUserGuide() { im::ShowUserGuide(); }
//        static const char*              GetVersion() { return im::GetVersion(); }

        // Styles
        static void                     StyleColorsDark(ImGuiStyle* dst = NULL) { im::StyleColorsDark(dst); }
        static void                     StyleColorsLight(ImGuiStyle* dst = NULL) { im::StyleColorsLight(dst); }
        static void                     StyleColorsClassic(ImGuiStyle* dst = NULL) { im::StyleColorsClassic(dst); }

        // Windows
        static bool                     Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0) { return im::Begin(name, p_open, flags); }
        static void                     End() { im::End(); }

        // Child Windows
        static bool                     BeginChild(const char* str_id, const ImVec2& size = ImVec2(0, 0), ImGuiChildFlags child_flags = 0, ImGuiWindowFlags window_flags = 0) { return im::BeginChild(str_id, size, child_flags, window_flags); }
        static bool                     BeginChild(ImGuiID id, const ImVec2& size = ImVec2(0, 0), ImGuiChildFlags child_flags = 0, ImGuiWindowFlags window_flags = 0) { return im::BeginChild(id, size, child_flags, window_flags); }
        static void                     EndChild() { im::EndChild(); }

        // Windows Utilities
        static bool                     IsWindowAppearing() { return im::IsWindowAppearing(); }
        static bool                     IsWindowCollapsed() { return im::IsWindowCollapsed(); }
        static bool                     IsWindowFocused(ImGuiFocusedFlags flags=0) { return im::IsWindowFocused(flags); }
        static bool                     IsWindowHovered(ImGuiHoveredFlags flags=0) { return im::IsWindowHovered(flags); }
        static ImDrawList*              GetWindowDrawList() { return im::GetWindowDrawList(); }
        static float                    GetWindowDpiScale() { return im::GetWindowDpiScale(); }
        static ImVec2                   GetWindowPos() { return im::GetWindowPos(); }
        static ImVec2                   GetWindowSize() { return im::GetWindowSize(); }
        static float                    GetWindowWidth() { return im::GetWindowWidth(); }
        static float                    GetWindowHeight() { return im::GetWindowHeight(); }
        static ImGuiViewport*           GetWindowViewport() { return im::GetWindowViewport(); }

        // Window manipulation
        static void                     SetNextWindowPos(const ImVec2& pos, ImGuiCond cond = 0, const ImVec2& pivot = ImVec2(0, 0)) { im::SetNextWindowPos(pos, cond, pivot); }
        static void                     SetNextWindowSize(const ImVec2& size, ImGuiCond cond = 0) { im::SetNextWindowSize(size, cond); }
        static void                     SetNextWindowSizeConstraints(const ImVec2& size_min, const ImVec2& size_max, ImGuiSizeCallback custom_callback = NULL, void* custom_callback_data = NULL) { im::SetNextWindowSizeConstraints(size_min, size_max, custom_callback, custom_callback_data); }
        static void                     SetNextWindowContentSize(const ImVec2& size) { im::SetNextWindowContentSize(size); }
        static void                     SetNextWindowCollapsed(bool collapsed, ImGuiCond cond = 0) { im::SetNextWindowCollapsed(collapsed, cond); }
        static void                     SetNextWindowFocus() { im::SetNextWindowFocus(); }
        static void                     SetNextWindowScroll(const ImVec2& scroll) { im::SetNextWindowScroll(scroll); }
        static void                     SetNextWindowBgAlpha(float alpha) { im::SetNextWindowBgAlpha(alpha); }
        static void                     SetNextWindowViewport(ImGuiID viewport_id) { im::SetNextWindowViewport(viewport_id); }
        static void                     SetWindowPos(const ImVec2& pos, ImGuiCond cond = 0) { im::SetWindowPos(pos, cond); }
        static void                     SetWindowPos(const char* name, const ImVec2& pos, ImGuiCond cond = 0) { im::SetWindowPos(name, pos, cond); }
        static void                     SetWindowSize(const ImVec2& size, ImGuiCond cond = 0) { im::SetWindowSize(size, cond); }
        static void                     SetWindowSize(const char* name, const ImVec2& size, ImGuiCond cond = 0) { im::SetWindowSize(name, size, cond); }
        static void                     SetWindowCollapsed(bool collapsed, ImGuiCond cond = 0) { im::SetWindowCollapsed(collapsed, cond); }
        static void                     SetWindowCollapsed_1(const char* name, bool collapsed, ImGuiCond cond = 0) { im::SetWindowCollapsed(name, collapsed, cond); }
        static void                     SetWindowFocus() { im::SetWindowFocus(); }
        static void                     SetWindowFocus(const char* name) { im::SetWindowFocus(name); }
        static void                     SetWindowFontScale(float scale) { im::SetWindowFontScale(scale); }

        // Windows Scrolling
        static float                    GetScrollX() { return im::GetScrollX(); }
        static float                    GetScrollY() { return im::GetScrollY(); }
        static void                     SetScrollX(float scroll_x) { im::SetScrollX(scroll_x); }
        static void                     SetScrollY(float scroll_y) { im::SetScrollY(scroll_y); }
        static float                    GetScrollMaxX() { return im::GetScrollMaxX(); }
        static float                    GetScrollMaxY() { return im::GetScrollMaxY(); }
        static void                     SetScrollHereX(float center_x_ratio = 0.5f) { im::SetScrollHereX(center_x_ratio); }
        static void                     SetScrollHereY(float center_y_ratio = 0.5f) { im::SetScrollHereY(center_y_ratio); }
        static void                     SetScrollFromPosX(float local_x, float center_x_ratio = 0.5f) { im::SetScrollFromPosX(local_x, center_x_ratio); }
        static void                     SetScrollFromPosY(float local_y, float center_y_ratio = 0.5f) { im::SetScrollFromPosY(local_y, center_y_ratio); }

        // Parameters stacks (shared)
        static void                     PushFont(ImFont* font) { im::PushFont(font); }
        static void                     PopFont() { im::PopFont(); }
        static void                     PushStyleColor(ImGuiCol idx, ImU32 col) { im::PushStyleColor(idx, col); }
        static void                     PushStyleColor(ImGuiCol idx, const ImVec4& col) { im::PushStyleColor(idx, col); }
        static void                     PopStyleColor(int count = 1) { im::PopStyleColor(count); }
        static void                     PushStyleVar(ImGuiStyleVar idx, float val) { im::PushStyleVar(idx, val); }
        static void                     PushStyleVar(ImGuiStyleVar idx, const ImVec2& val) { im::PushStyleVar(idx, val); }
        static void                     PopStyleVar(int count = 1) { im::PopStyleVar(count); }
        static void                     PushItemFlag(ImGuiItemFlags option, bool enabled) { im::PushItemFlag(option, enabled); }
        static void                     PopItemFlag() { im::PopItemFlag(); }

        // Parameters stacks (current window)
        static void                     PushItemWidth(float item_width) { im::PushItemWidth(item_width); }
        static void                     PopItemWidth() { im::PopItemWidth(); }
        static void                     SetNextItemWidth(float item_width) { im::SetNextItemWidth(item_width); }
        static float                    CalcItemWidth() { return im::CalcItemWidth(); }
        static void                     PushTextWrapPos(float wrap_local_pos_x = 0.0f) { im::PushTextWrapPos(wrap_local_pos_x); }
        static void                     PopTextWrapPos() { im::PopTextWrapPos(); }

        // Style read access
        static ImFont*                  GetFont() { return im::GetFont(); }
        static float                    GetFontSize() { return im::GetFontSize(); }
        static ImVec2                   GetFontTexUvWhitePixel() { return im::GetFontTexUvWhitePixel(); }
        static ImU32                    GetColorU32Style(ImGuiCol idx, float alpha_mul = 1.0f) { return im::GetColorU32(idx, alpha_mul); }
        static ImU32                    GetColorU32(const ImVec4& col) { return im::GetColorU32(col); }
        static ImU32                    GetColorU32(ImU32 col) { return im::GetColorU32(col); }
        static const                    ImVec4& GetStyleColorVec4(ImGuiCol idx) { return im::GetStyleColorVec4(idx); }

        // Layout cursor positioning
        static ImVec2                   GetCursorScreenPos() { return im::GetCursorScreenPos(); }
        static void                     SetCursorScreenPos(const ImVec2& pos) { im::SetCursorScreenPos(pos); }
        static ImVec2                   GetContentRegionAvail() { return im::GetContentRegionAvail(); }
        static ImVec2                   GetCursorPos() { return im::GetCursorPos(); }
        static float                    GetCursorPosX() { return im::GetCursorPosX(); }
        static float                    GetCursorPosY() { return im::GetCursorPosY(); }
        static void                     SetCursorPos(const ImVec2& local_pos) { im::SetCursorPos(local_pos); }
        static void                     SetCursorPosX(float local_x) { im::SetCursorPosX(local_x); }
        static void                     SetCursorPosY(float local_y) { im::SetCursorPosY(local_y); }
        static ImVec2                   GetCursorStartPos() { return im::GetCursorStartPos(); }

        // Other layout functions
        static void                     Separator() { im::Separator(); }
        static void                     SameLine(float offset_from_start_x=0.0f, float spacing=-1.0f) { im::SameLine(offset_from_start_x, spacing); }
        static void                     NewLine() { im::NewLine(); }
        static void                     Spacing() { im::Spacing(); }
        static void                     Dummy(const ImVec2& size) { im::Dummy(size); }
        static void                     Indent(float indent_w = 0.0f) { im::Indent(indent_w); }
        static void                     Unindent(float indent_w = 0.0f) { im::Unindent(indent_w); }
        static void                     BeginGroup() { im::BeginGroup(); }
        static void                     EndGroup() { im::EndGroup(); }
        static void                     AlignTextToFramePadding() { im::AlignTextToFramePadding(); }
        static float                    GetTextLineHeight() { return im::GetTextLineHeight(); }
        static float                    GetTextLineHeightWithSpacing() { return im::GetTextLineHeightWithSpacing(); }
        static float                    GetFrameHeight() { return im::GetFrameHeight(); }
        static float                    GetFrameHeightWithSpacing() { return im::GetFrameHeightWithSpacing(); }

        // ID stack/scopes
        static void                     PushID(const char* str_id) { im::PushID(str_id); }
        static void                     PushID(const char* str_id_begin, const char* str_id_end) { im::PushID(str_id_begin, str_id_end); }
        static void                     PushID(int int_id) { im::PushID(int_id); }
        static void                     PushID(const void* ptr_id) { im::PushID(ptr_id); }
        static void                     PopID() { im::PopID(); }
        static ImGuiID                  GetID(const char* str_id) { return im::GetID(str_id); }
        static ImGuiID                  GetID(const char* str_id_begin, const char* str_id_end) { return im::GetID(str_id_begin, str_id_end); }
        static ImGuiID                  GetID(const void* ptr_id) { return im::GetID(ptr_id); }

        // Widgets: Text
        static void                     TextUnformatted(const char* text, const char* text_end = NULL) { im::TextUnformatted(text, text_end); }
        static void                     Text(const char* fmt) { im::Text(fmt); }
        static void                     TextV(const char* fmt, va_list args) { im::TextV(fmt, args); }
        static void                     TextColored(const ImVec4& col, const char* fmt) { im::TextColored(col, fmt); }
        static void                     TextColoredV(const ImVec4& col, const char* fmt, va_list args) { im::TextColoredV(col, fmt, args); }
        static void                     TextDisabled(const char* fmt) { im::TextDisabled(fmt); }
        static void                     TextDisabledV(const char* fmt, va_list args) { im::TextDisabled(fmt, args); }
        static void                     TextWrapped(const char* fmt) { im::TextWrapped(fmt); }
        static void                     TextWrappedV(const char* fmt, va_list args) { im::TextWrappedV(fmt, args); }
        static void                     LabelText(const char* label, const char* fmt) { im::LabelText(label, fmt); }
        static void                     LabelTextV(const char* label, const char* fmt, va_list args) { im::LabelTextV(label, fmt, args); }
        static void                     BulletText(const char* fmt) { im::BulletText(fmt); }
        static void                     BulletTextV(const char* fmt,  va_list args) { im::BulletTextV(fmt, args); }
        static void                     SeparatorText(const char* label) { im::SeparatorText(label); }

        // Widgets: Main
        static bool                     Button(const char* label, const ImVec2& size = ImVec2(0, 0)) { return im::Button(label, size); }
        static bool                     SmallButton(const char* label) { return im::SmallButton(label); }
        static bool                     InvisibleButton(const char* str_id, const ImVec2& size, ImGuiButtonFlags flags = 0) { return im::InvisibleButton(str_id, size, flags); }
        static bool                     ArrowButton(const char* str_id, ImGuiDir dir) { return im::ArrowButton(str_id, dir); }
        static bool                     Checkbox(const char* label, bool* v) { return im::Checkbox(label, v); }
        static bool                     CheckboxFlags(const char* label, int* flags, int flags_value) { return im::CheckboxFlags(label, flags, flags_value); }
        static bool                     CheckboxFlags(const char* label, unsigned int* flags, unsigned int flags_value) { return im::CheckboxFlags(label, flags, flags_value); }
        static bool                     RadioButton(const char* label, bool active) { return im::RadioButton(label, active); }
        static bool                     RadioButton(const char* label, int* v, int v_button) { return im::RadioButton(label, v, v_button); }
        static void                     ProgressBar(float fraction, const ImVec2& size_arg = ImVec2(-FLT_MIN, 0), const char* overlay = NULL) { im::ProgressBar(fraction, size_arg, overlay); }
        static void                     Bullet() { im::Bullet(); }
        static bool                     TextLink(const char* label) { return im::TextLink(label); }
        static void                     TextLinkOpenURL(const char* label, const char* url = NULL) { im::TextLinkOpenURL(label, url); }

        // Widgets: Images
        static void                     Image(int user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0, 0), const ImVec2& uv1 = ImVec2(1, 1), const ImVec4& tint_col = ImVec4(1, 1, 1, 1), const ImVec4& border_col = ImVec4(0, 0, 0, 0)) { im::Image((ImTextureID)user_texture_id, size, uv0, uv1, tint_col, border_col); }
        static bool                     ImageButton(const char* str_id, int user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0, 0), const ImVec2& uv1 = ImVec2(1, 1), const ImVec4& bg_col = ImVec4(0, 0, 0, 0), const ImVec4& tint_col = ImVec4(1, 1, 1, 1)) { return im::ImageButton(str_id, (ImTextureID)user_texture_id, size, uv0, uv1, bg_col, tint_col); }

        // Widgets: Combo Box (Dropdown)
        static bool                     BeginCombo(const char* label, const char* preview_value, ImGuiComboFlags flags = 0) { return im::BeginCombo(label, preview_value, flags); }
        static void                     EndCombo() { im::EndCombo(); }
        static bool                     Combo(const char* label, int* current_item, const char* items_separated_by_zeros, int popup_max_height_in_items = -1) { return im::Combo(label, current_item, items_separated_by_zeros, popup_max_height_in_items); }

        // Widgets: Drag Sliders
        static bool                     DragFloat(const char* label, float* v, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0) { return im::DragFloat(label, v, v_speed, v_min, v_max, format, flags); }
        static bool                     DragFloat2(const char* label, float v[2], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0) { return im::DragFloat2(label, v, v_speed, v_min, v_max, format, flags); }
        static bool                     DragFloat3(const char* label, float v[3], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0) { return im::DragFloat3(label, v, v_speed, v_min, v_max, format, flags); }
        static bool                     DragFloat4(const char* label, float v[4], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0) { return im::DragFloat4(label, v, v_speed, v_min, v_max, format, flags); }
        static bool                     DragFloatRange2(const char* label, float* v_current_min, float* v_current_max, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", const char* format_max = NULL, ImGuiSliderFlags flags = 0) { return im::DragFloatRange2(label, v_current_min, v_current_max, v_speed, v_min, v_max, format, format_max, flags); }
        static bool                     DragInt(const char* label, int* v, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0) { return im::DragInt(label, v, v_speed, v_min, v_max, format, flags); }
        static bool                     DragInt2(const char* label, int v[2], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0) { return im::DragInt2(label, v, v_speed, v_min, v_max, format, flags); }
        static bool                     DragInt3(const char* label, int v[3], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0) { return im::DragInt3(label, v, v_speed, v_min, v_max, format, flags); }
        static bool                     DragInt4(const char* label, int v[4], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0) { return im::DragInt4(label, v, v_speed, v_min, v_max, format, flags); }
        static bool                     DragIntRange2(const char* label, int* v_current_min, int* v_current_max, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", const char* format_max = NULL, ImGuiSliderFlags flags = 0) { return im::DragIntRange2(label, v_current_min, v_current_max, v_speed, v_min, v_max, format, format_max, flags); }

        // Widgets: Regular Sliders
        static bool                     SliderFloat(const char* label, float* v, float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0) { return im::SliderFloat(label, v, v_min, v_max, format, flags); }
        static bool                     SliderFloat2(const char* label, float v[2], float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0) { return im::SliderFloat2(label, v, v_min, v_max, format, flags); }
        static bool                     SliderFloat3(const char* label, float v[3], float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0) { return im::SliderFloat3(label, v, v_min, v_max, format, flags); }
        static bool                     SliderFloat4(const char* label, float v[4], float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0) { return im::SliderFloat4(label, v, v_min, v_max, format, flags); }
        static bool                     SliderAngle(const char* label, float* v_rad, float v_degrees_min = -360.0f, float v_degrees_max = +360.0f, const char* format = "%.0f deg", ImGuiSliderFlags flags = 0) { return im::SliderAngle(label, v_rad, v_degrees_min, v_degrees_max, format, flags); }
        static bool                     SliderInt(const char* label, int* v, int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0) { return im::SliderInt(label, v, v_min, v_max, format, flags); }
        static bool                     SliderInt2(const char* label, int v[2], int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0) { return im::SliderInt2(label, v, v_min, v_max, format, flags); }
        static bool                     SliderInt3(const char* label, int v[3], int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0) { return im::SliderInt3(label, v, v_min, v_max, format, flags); }
        static bool                     SliderInt4(const char* label, int v[4], int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0) { return im::SliderInt4(label, v, v_min, v_max, format, flags); }
        static bool                     VSliderFloat(const char* label, const ImVec2& size, float* v, float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0) { return im::VSliderFloat(label, size, v, v_min, v_max, format, flags); }
        static bool                     VSliderInt(const char* label, const ImVec2& size, int* v, int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0) { return im::VSliderInt(label, size, v, v_min, v_max, format, flags); }

        // Widgets: Input with Keyboard
        static bool                     InputText(const char* label, char* buf, int buf_size, ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL) { return im::InputText(label, buf, buf_size, flags, callback, user_data); }
        static bool                     InputTextMultiline(const char* label, char* buf, int buf_size, const ImVec2& size = ImVec2(0, 0), ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL) { return im::InputTextMultiline(label, buf, buf_size, size, flags, callback, user_data); }
        static bool                     InputTextWithHint(const char* label, const char* hint, char* buf, int buf_size, ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL) { return im::InputTextWithHint(label, hint, buf, buf_size, flags, callback, user_data); }
        static bool                     InputFloat(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, const char* format = "%.3f", ImGuiInputTextFlags flags = 0) { return im::InputFloat(label, v, step, step_fast, format, flags); }
        static bool                     InputFloat2(const char* label, float v[2], const char* format = "%.3f", ImGuiInputTextFlags flags = 0) { return im::InputFloat2(label, v, format, flags); }
        static bool                     InputFloat3(const char* label, float v[3], const char* format = "%.3f", ImGuiInputTextFlags flags = 0) { return im::InputFloat3(label, v, format, flags); }
        static bool                     InputFloat4(const char* label, float v[4], const char* format = "%.3f", ImGuiInputTextFlags flags = 0) { return im::InputFloat4(label, v, format, flags); }
        static bool                     InputInt(const char* label, int* v, int step = 1, int step_fast = 100, ImGuiInputTextFlags flags = 0) { return im::InputInt(label, v, step, step_fast, flags); }
        static bool                     InputInt2(const char* label, int v[2], ImGuiInputTextFlags flags = 0) { return im::InputInt2(label, v, flags); }
        static bool                     InputInt3(const char* label, int v[3], ImGuiInputTextFlags flags = 0) { return im::InputInt3(label, v, flags); }
        static bool                     InputInt4(const char* label, int v[4], ImGuiInputTextFlags flags = 0) { return im::InputInt4(label, v, flags); }
        static bool                     InputDouble(const char* label, double* v, double step = 0.0, double step_fast = 0.0, const char* format = "%.6f", ImGuiInputTextFlags flags = 0) { return im::InputDouble(label, v, step, step_fast, format, flags); }

        // Widgets: Color Editor/Picker
        static bool                     ColorEdit3(const char* label, float col[3], ImGuiColorEditFlags flags = 0) { return im::ColorEdit3(label, col, flags); }
        static bool                     ColorEdit4(const char* label, float col[4], ImGuiColorEditFlags flags = 0) { return im::ColorEdit4(label, col, flags); }
        static bool                     ColorPicker3(const char* label, float col[3], ImGuiColorEditFlags flags = 0) { return im::ColorPicker3(label, col, flags); }
        static bool                     ColorPicker4(const char* label, float col[4], ImGuiColorEditFlags flags = 0, const float* ref_col = NULL) { return im::ColorPicker4(label, col, flags); }
        static bool                     ColorButton(const char* desc_id, const ImVec4& col, ImGuiColorEditFlags flags = 0, const ImVec2& size = ImVec2(0, 0)) { return im::ColorButton(desc_id, col, flags); }
        static void                     SetColorEditOptions(ImGuiColorEditFlags flags) { return im::SetColorEditOptions(flags); }

        // Widgets: Trees
        static bool                     TreeNode(const char* label) { return im::TreeNode(label); }
        static bool                     TreeNode(const char* str_id, const char* fmt) { return im::TreeNode(str_id, fmt); }
        static bool                     TreeNode(const void* ptr_id, const char* fmt) { return im::TreeNode(ptr_id, fmt); }
        static bool                     TreeNodeV(const char* str_id, const char* fmt, va_list args) { return im::TreeNodeV(str_id, fmt, args); }
        static bool                     TreeNodeV(const void* ptr_id, const char* fmt, va_list args) { return im::TreeNodeV(ptr_id, fmt, args); }
        static bool                     TreeNodeEx(const char* label, ImGuiTreeNodeFlags flags = 0) { return im::TreeNodeEx(label, flags); }
        static bool                     TreeNodeEx(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt) { return im::TreeNodeEx(str_id, flags, fmt); }
        static bool                     TreeNodeEx(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt) { return im::TreeNodeEx(ptr_id, flags, fmt); }
        static bool                     TreeNodeExV(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) { return im::TreeNodeExV(str_id, flags, fmt, args); }
        static bool                     TreeNodeExV(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) { return im::TreeNodeExV(ptr_id, flags, fmt, args); }
        static void                     TreePush(const char* str_id) { im::TreePush(str_id); }
        static void                     TreePop() { im::TreePop(); }
        static float                    GetTreeNodeToLabelSpacing() { return im::GetTreeNodeToLabelSpacing(); }
        static bool                     CollapsingHeader(const char* label, ImGuiTreeNodeFlags flags = 0) { return im::CollapsingHeader(label, flags); }
        static bool                     CollapsingHeader(const char* label, bool* p_visible, ImGuiTreeNodeFlags flags = 0) { return im::CollapsingHeader(label, p_visible, flags); }
        static void                     SetNextItemOpen(bool is_open, ImGuiCond cond = 0) { im::SetNextItemOpen(is_open, cond); }
        static void                     SetNextItemStorageID(ImGuiID storage_id) { im::SetNextItemStorageID(storage_id); }

        // Widgets: Selectables
        static bool                     Selectable(const char* label, bool selected = false, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0, 0)) { return im::Selectable(label, selected, flags, size); }
        static bool                     Selectable(const char* label, bool* p_selected, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0, 0)) { return im::Selectable(label, p_selected, flags, size); }

         // Multi-selection system for Selectable(), Checkbox(), TreeNode() functions
        static ImGuiMultiSelectIO*      BeginMultiSelect(ImGuiMultiSelectFlags flags, int selection_size = -1, int items_count = -1) { return im::BeginMultiSelect(flags, selection_size, items_count); }
        static ImGuiMultiSelectIO*      EndMultiSelect() { return im::EndMultiSelect(); }
        static void                     SetNextItemSelectionUserData(ImGuiSelectionUserData selection_user_data) { im::SetNextItemSelectionUserData(selection_user_data); }
        static bool                     IsItemToggledSelection() { return im::IsItemToggledSelection(); }


        // Widgets: List Boxes
        static bool                     BeginListBox(const char* label, const ImVec2& size = ImVec2(0, 0)) { return im::BeginListBox(label, size); }
        static void                     EndListBox() { im::EndListBox(); }

        // Widgets: Data Plotting
        static void                     PlotLines(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0), int stride = sizeof(float)) { im::PlotLines(label, values, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size, stride); }
        static void                     PlotHistogram(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0), int stride = sizeof(float)) { im::PlotHistogram(label, values, values_count, values_offset, overlay_text, scale_min, scale_max, graph_size, stride); }

        // Widgets: Value() Helpers.
        static void                     Value(const char* prefix, bool b) { im::Value(prefix, b); }
        static void                     Value(const char* prefix, int v) { im::Value(prefix, v); }
        static void                     Value(const char* prefix, unsigned int v) { im::Value(prefix, v); }
        static void                     Value(const char* prefix, float v, const char* float_format = NULL) { im::Value(prefix, v, float_format); }

        // Widgets: Menus
        static bool                     BeginMenuBar() { return im::BeginMenuBar(); }
        static void                     EndMenuBar() { im::EndMenuBar(); }
        static bool                     BeginMainMenuBar() { return im::BeginMainMenuBar(); }
        static void                     EndMainMenuBar() { im::EndMainMenuBar(); }
        static bool                     BeginMenu(const char* label, bool enabled = true) { return im::BeginMenu(label, enabled); }
        static void                     EndMenu() { im::EndMenu(); }
        static bool                     MenuItem(const char* label, const char* shortcut = NULL, bool selected = false, bool enabled = true) { return im::MenuItem(label, shortcut, selected, enabled); }
        static bool                     MenuItem(const char* label, const char* shortcut, bool* p_selected, bool enabled = true) { return im::MenuItem(label, shortcut, enabled); }

        // Tooltips
        static bool                     BeginTooltip() { return im::BeginTooltip(); }
        static void                     EndTooltip() { im::EndTooltip(); }
        static void                     SetTooltip(const char* fmt) { im::SetTooltip(fmt); }
        static void                     SetTooltipV(const char* fmt, va_list args) { im::SetTooltipV(fmt, args); }

        // Tooltips: helpers
        static bool                     BeginItemTooltip() { return im::BeginItemTooltip(); }
        static void                     SetItemTooltip(const char* fmt) { im::SetItemTooltip(fmt); }

        // Popups, Modals
        static bool                     BeginPopup(const char* str_id, ImGuiWindowFlags flags = 0) { return im::BeginPopup(str_id, flags); }
        static bool                     BeginPopupModal(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0) { return im::BeginPopupModal(name, p_open, flags); }

        // Popups: open/close functions
        static void                     EndPopup() { im::EndPopup(); }
        static void                     OpenPopup(const char* str_id, ImGuiPopupFlags popup_flags = 0) { im::OpenPopup(str_id, popup_flags); }
        static void                     OpenPopup(ImGuiID id, ImGuiPopupFlags popup_flags = 0) { im::OpenPopup(id, popup_flags); }
        static void                     OpenPopupOnItemClick(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1) { im::OpenPopupOnItemClick(str_id, popup_flags); }
        static void                     CloseCurrentPopup() { im::CloseCurrentPopup(); }

        // Popups: open+begin combined functions helpers
        static bool                     BeginPopupContextItem(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1) { return im::BeginPopupContextItem(str_id, popup_flags); }
        static bool                     BeginPopupContextWindow(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1) { return im::BeginPopupContextWindow(str_id, popup_flags); }
        static bool                     BeginPopupContextVoid(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1) { return im::BeginPopupContextVoid(str_id, popup_flags); }

        // Popups: query functions
        static bool                     IsPopupOpen(const char* str_id, ImGuiPopupFlags flags = 0) { return im::IsPopupOpen(str_id, flags); }

        // Tables
        static bool                     BeginTable(const char* str_id, int column, ImGuiTableFlags flags = 0, const ImVec2& outer_size = ImVec2(0.0f, 0.0f), float inner_width = 0.0f) { return im::BeginTable(str_id, column, flags, outer_size, inner_width); }
        static void                     EndTable() { im::EndTable(); }
        static void                     TableNextRow(ImGuiTableRowFlags row_flags = 0, float min_row_height = 0.0f) { im::TableNextRow(row_flags, min_row_height); }
        static bool                     TableNextColumn() { return im::TableNextColumn(); }
        static bool                     TableSetColumnIndex(int column_n) { return im::TableSetColumnIndex(column_n); }

        // Tables: Headers & Columns declaration
        static void                     TableSetupColumn(const char* label, ImGuiTableColumnFlags flags = 0, float init_width_or_weight = 0.0f, ImGuiID user_id = 0) { im::TableSetupColumn(label, flags, init_width_or_weight, user_id); }
        static void                     TableSetupScrollFreeze(int cols, int rows) { im::TableSetupScrollFreeze(cols, rows); }
        static void                     TableHeader(const char* label) { im::TableHeader(label); }
        static void                     TableHeadersRow() { im::TableHeadersRow(); }
        static void                     TableAngledHeadersRow() { im::TableAngledHeadersRow(); }

        // Tables: Sorting & Miscellaneous functions
        static ImGuiTableSortSpecs*     TableGetSortSpecs() { return im::TableGetSortSpecs(); }
        static int                      TableGetColumnCount() { return im::TableGetColumnCount(); }
        static int                      TableGetColumnIndex() { return im::TableGetColumnIndex(); }
        static int                      TableGetRowIndex() { return im::TableGetRowIndex(); }
        static const char*              TableGetColumnName(int column_n = -1) { return im::TableGetColumnName(column_n); }
        static ImGuiTableColumnFlags    TableGetColumnFlags(int column_n = -1) { return im::TableGetColumnFlags(column_n); }
        static void                     TableSetColumnEnabled(int column_n, bool v) { im::TableSetColumnEnabled(column_n, v); }
        static void                     TableSetBgColor(ImGuiTableBgTarget target, ImU32 color, int column_n = -1) { im::TableSetBgColor(target, color, column_n); }

        // Tab Bars, Tabs
        static bool                     BeginTabBar(const char* str_id, ImGuiTabBarFlags flags = 0) { return im::BeginTabBar(str_id, flags); }
        static void                     EndTabBar() { im::EndTabBar(); }
        static bool                     BeginTabItem(const char* label, bool* p_open = NULL, ImGuiTabItemFlags flags = 0) { return im::BeginTabItem(label, p_open, flags); }
        static void                     EndTabItem() { im::EndTabItem(); }
        static bool                     TabItemButton(const char* label, ImGuiTabItemFlags flags = 0) { return im::TabItemButton(label, flags); }
        static void                     SetTabItemClosed(const char* tab_or_docked_window_label) { im::SetTabItemClosed(tab_or_docked_window_label); }

        // Docking
        static ImGuiID                  DockSpace(ImGuiID id, const ImVec2& size = ImVec2(0, 0), ImGuiDockNodeFlags flags = 0, const ImGuiWindowClass* window_class = NULL) { return im::DockSpace(id, size, flags, window_class); }
        static ImGuiID                  DockSpaceOverViewport(ImGuiID dockspace_id = 0, const ImGuiViewport* viewport = NULL, ImGuiDockNodeFlags flags = 0, const ImGuiWindowClass* window_class = NULL) { return im::DockSpaceOverViewport(dockspace_id, viewport, flags, window_class); }
        static void                     SetNextWindowDockID(ImGuiID dock_id, ImGuiCond cond = 0) { im::SetNextWindowDockID(dock_id, cond); }
        static void                     SetNextWindowClass(const ImGuiWindowClass* window_class) { im::SetNextWindowClass(window_class); }
        static ImGuiID                  GetWindowDockID() { return im::GetWindowDockID(); }
        static bool                     IsWindowDocked() { return im::IsWindowDocked(); }

        // Logging/Capture
//        static void                     LogToTTY(int auto_open_depth = -1) { im::LogToTTY(auto_open_depth); }
//        static void                     LogToFile(int auto_open_depth = -1, const char* filename = NULL) { im::LogToFile(auto_open_depth); }
//        static void                     LogToClipboard(int auto_open_depth = -1) { im::LogToClipboard(auto_open_depth); }
//        static void                     LogFinish() { im::LogFinish(); }
//        static void                     LogButtons() { im::LogButtons(); }
//        static void                     LogText(const char* fmt) { im::LogText(fmt); }
//        static void                     LogTextV(const char* fmt, va_list args) { im::LogTextV(fmt, args); }

        // Drag and Drop
        static bool                     BeginDragDropSource(ImGuiDragDropFlags flags = 0) { return im::BeginDragDropSource(flags); }
        // Changed SetDragDropPayload to pass int data
        static bool                     SetDragDropPayload(const char* type, int data, ImGuiCond cond = 0) { return im::SetDragDropPayload(type, &data, sizeof(int), cond); }
        static void                     EndDragDropSource() { im::EndDragDropSource(); }
        static bool                     BeginDragDropTarget() { return im::BeginDragDropTarget(); }
        static const ImGuiPayload*      AcceptDragDropPayload(const char* type, ImGuiDragDropFlags flags = 0) { return im::AcceptDragDropPayload(type, flags); }
        static void                     EndDragDropTarget() { im::EndDragDropTarget(); }
        static const ImGuiPayload*      GetDragDropPayload() { return im::GetDragDropPayload(); }

        // Disabling [BETA API]
        static void                     BeginDisabled(bool disabled = true) { im::BeginDisabled(disabled); }
        static void                     EndDisabled() { im::EndDisabled(); }

        // Clipping
        static void                     PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect) { im::PushClipRect(clip_rect_min, clip_rect_max, intersect_with_current_clip_rect); }
        static void                     PopClipRect() {  im::PopClipRect(); }

        // Focus, Activation
        static void                     SetItemDefaultFocus() {  im::SetItemDefaultFocus(); }
        static void                     SetKeyboardFocusHere(int offset = 0) { im::SetKeyboardFocusHere(offset); }

        // Overlapping mode
        static void                     SetNextItemAllowOverlap() { im::SetNextItemAllowOverlap(); }

        // Item/Widgets Utilities and Query Functions
        static bool                     IsItemHovered(ImGuiHoveredFlags flags = 0) { return im::IsItemHovered(flags); }
        static bool                     IsItemActive() { return im::IsItemActive(); }
        static bool                     IsItemFocused() { return im::IsItemFocused(); }
        static bool                     IsItemClicked(ImGuiMouseButton mouse_button = 0) { return im::IsItemClicked(mouse_button); }
        static bool                     IsItemVisible() { return im::IsItemVisible(); }
        static bool                     IsItemEdited() { return im::IsItemEdited(); }
        static bool                     IsItemActivated() { return im::IsItemActivated(); }
        static bool                     IsItemDeactivated() { return im::IsItemDeactivated(); }
        static bool                     IsItemDeactivatedAfterEdit() { return im::IsItemDeactivatedAfterEdit(); }
        static bool                     IsItemToggledOpen() { return im::IsItemToggledOpen(); }
        static bool                     IsAnyItemHovered() { return im::IsAnyItemHovered(); }
        static bool                     IsAnyItemActive() { return im::IsAnyItemActive(); }
        static bool                     IsAnyItemFocused() { return im::IsAnyItemFocused(); }
        static ImGuiID                  GetItemID() { return im::GetItemID(); }
        static ImVec2                   GetItemRectMin() { return im::GetItemRectMin(); }
        static ImVec2                   GetItemRectMax() { return im::GetItemRectMax(); }
        static ImVec2                   GetItemRectSize() { return im::GetItemRectSize(); }

        // Viewports
        static ImGuiViewport*           GetMainViewport() { return im::GetMainViewport(); }

        // Background/Foreground Draw Lists
        static ImDrawList*              GetBackgroundDrawList() { return im::GetBackgroundDrawList(); }
        static ImDrawList*              GetBackgroundDrawList(ImGuiViewport* viewport) { return im::GetBackgroundDrawList(viewport); }
        static ImDrawList*              GetForegroundDrawList() { return im::GetForegroundDrawList(); }
        static ImDrawList*              GetForegroundDrawList(ImGuiViewport* viewport) { return im::GetForegroundDrawList(viewport); }

        // Miscellaneous Utilities
        static bool                     IsRectVisible(const ImVec2& size) { return im::IsRectVisible(size); }
        static bool                     IsRectVisible(const ImVec2& rect_min, const ImVec2& rect_max) { return im::IsRectVisible(rect_min, rect_max); }
        static double                   GetTime() { return im::GetTime(); }
        static int                      GetFrameCount() { return im::GetFrameCount(); }
        static ImDrawListSharedData*    GetDrawListSharedData() { return im::GetDrawListSharedData(); }
//        static const char*              GetStyleColorName(ImGuiCol idx) { return im::GetStyleColorName(idx); }
        static void                     SetStateStorage(ImGuiStorage* storage) { im::SetStateStorage(storage); }
        static ImGuiStorage*            GetStateStorage() { return im::GetStateStorage(); }

        // Text Utilities
        static ImVec2                   CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f) { return im::CalcTextSize(text, text_end, hide_text_after_double_hash, wrap_width); }

        // Color Utilities
        static ImVec4                   ColorConvertU32ToFloat4(ImU32 in) { return im::ColorConvertU32ToFloat4(in); }
        static ImU32                    ColorConvertFloat4ToU32(const ImVec4& in) { return im::ColorConvertFloat4ToU32(in); }
        static void                     ColorConvertRGBtoHSV(float r, float g, float b, float* out_h, float* out_s, float* out_v) { float & out_h2 = *out_h; float & out_s2 = *out_s; float & out_v2 = *out_v; im::ColorConvertRGBtoHSV(r, g, b, out_h2, out_s2, out_v2); }
        static void                     ColorConvertHSVtoRGB(float h, float s, float v, float* out_r, float* out_g, float* out_b) { float & out_r2 = *out_r; float & out_g2 = *out_g; float & out_b2 = *out_b; im::ColorConvertHSVtoRGB(h, s, v, out_r2, out_g2, out_b2); }

        // Inputs Utilities: Keyboard/Mouse/Gamepad
        static bool                     IsKeyDown(ImGuiKey key) { return im::IsKeyDown(key); }
        static bool                     IsKeyPressed(ImGuiKey key, bool repeat = true) { return im::IsKeyPressed(key, repeat); }
        static bool                     IsKeyReleased(ImGuiKey key) { return im::IsKeyReleased(key); }
        static bool                     IsKeyChordPressed(ImGuiKeyChord key_chord) { return im::IsKeyChordPressed(key_chord); }
        static int                      GetKeyPressedAmount(ImGuiKey key, float repeat_delay, float rate) { return im::GetKeyPressedAmount(key, repeat_delay, rate); }
//        static const char*              GetKeyName(ImGuiKey key) { return im::GetKeyName(key); }
        static void                     SetNextFrameWantCaptureKeyboard(bool want_capture_keyboard) { im::SetNextFrameWantCaptureKeyboard(want_capture_keyboard); }

        // Inputs Utilities: Shortcut Testing & Routing [BETA]
        static bool                     Shortcut(ImGuiKeyChord key_chord, ImGuiInputFlags flags = 0) { return im::Shortcut(key_chord, flags); }
        static void                     SetNextItemShortcut(ImGuiKeyChord key_chord, ImGuiInputFlags flags = 0) { im::SetNextItemShortcut(key_chord, flags); }

        // Inputs Utilities: Key/Input Ownership [BETA]
        static void                     SetItemKeyOwner(ImGuiKey key) { im::SetItemKeyOwner(key); }

        // Inputs Utilities: Mouse specific
        static bool                     IsMouseDown(ImGuiMouseButton button) { return im::IsMouseDown(button); }
        static bool                     IsMouseClicked(ImGuiMouseButton button, bool repeat = false) { return im::IsMouseClicked(button); }
        static bool                     IsMouseReleased(ImGuiMouseButton button) { return im::IsMouseReleased(button); }
        static bool                     IsMouseDoubleClicked(ImGuiMouseButton button) { return im::IsMouseDoubleClicked(button); }
        static int                      GetMouseClickedCount(ImGuiMouseButton button) { return im::GetMouseClickedCount(button); }
        static bool                     IsMouseHoveringRect(const ImVec2& r_min, const ImVec2& r_max, bool clip = true) { return im::IsMouseHoveringRect(r_min, r_max, clip); }
        static bool                     IsMousePosValid(const ImVec2* mouse_pos = NULL) { return im::IsMousePosValid(mouse_pos); }
        static bool                     IsAnyMouseDown() { return im::IsAnyMouseDown(); }
        static ImVec2                   GetMousePos() { return im::GetMousePos(); }
        static ImVec2                   GetMousePosOnOpeningCurrentPopup() { return im::GetMousePosOnOpeningCurrentPopup(); }
        static bool                     IsMouseDragging(ImGuiMouseButton button, float lock_threshold = -1.0f) { return im::IsMouseDragging(button, lock_threshold); }
        static ImVec2                   GetMouseDragDelta(ImGuiMouseButton button = 0, float lock_threshold = -1.0f) { return im::GetMouseDragDelta(button, lock_threshold); }
        static void                     ResetMouseDragDelta(ImGuiMouseButton button = 0) { im::ResetMouseDragDelta(button); }
        static ImGuiMouseCursor         GetMouseCursor() { return im::GetMouseCursor(); }
        static void                     SetMouseCursor(ImGuiMouseCursor cursor_type) { im::SetMouseCursor(cursor_type); }
        static void                     SetNextFrameWantCaptureMouse(bool want_capture_mouse) { im::SetNextFrameWantCaptureMouse(want_capture_mouse); }

        // Clipboard Utilities
//        static const char*              GetClipboardText() { return im::GetClipboardText(); }
        static void                     SetClipboardText(const char* text) { im::SetClipboardText(text); }

        // Settings/.Ini Utilities
        static void                     LoadIniSettingsFromDisk(const char* ini_filename) { im::LoadIniSettingsFromDisk(ini_filename); }
        static void                     LoadIniSettingsFromMemory(const char* ini_data, size_t ini_size=0) { im::LoadIniSettingsFromMemory(ini_data, ini_size); }
        static void                     SaveIniSettingsToDisk(const char* ini_filename) { im::SaveIniSettingsToDisk(ini_filename); }
        static const std::string        SaveIniSettingsToMemory(size_t* out_ini_size = NULL) { return im::SaveIniSettingsToMemory(out_ini_size); }

        // Debug Utilities
        static void                     DebugTextEncoding(const char* text) { im::DebugTextEncoding(text); }
        static bool                     DebugCheckVersionAndDataLayout(const char* version_str, size_t sz_io, size_t sz_style, size_t sz_vec2, size_t sz_vec4, size_t sz_drawvert, size_t sz_drawidx) { return im::DebugCheckVersionAndDataLayout(version_str, sz_io, sz_style, sz_vec2, sz_vec4, sz_drawvert, sz_drawidx); }

        // Memory Allocators
//        static void                     SetAllocatorFunctions(ImGuiMemAllocFunc alloc_func, ImGuiMemFreeFunc free_func, void* user_data = NULL) { im::SetAllocatorFunctions(alloc_func, free_func, user_data); }
//        static void                     GetAllocatorFunctions(ImGuiMemAllocFunc* p_alloc_func, ImGuiMemFreeFunc* p_free_func, void** p_user_data) { im::GetAllocatorFunctions(p_alloc_func, p_free_func, p_user_data); }
//        static void*                    MemAlloc(size_t size) { return im::MemAlloc(size); }
//        static void                     MemFree(void* ptr) { im::MemFree(ptr); }

        // (Optional) Platform/OS interface for multi-viewport support
        static ImGuiPlatformIO&         GetPlatformIO() { return im::GetPlatformIO(); }
        static void                     UpdatePlatformWindows() { im::UpdatePlatformWindows(); }
        static void                     RenderPlatformWindowsDefault(void* platform_render_arg = NULL, void* renderer_render_arg = NULL) { im::RenderPlatformWindowsDefault(platform_render_arg, renderer_render_arg); }
        static void                     DestroyPlatformWindows() { im::DestroyPlatformWindows(); }
        static ImGuiViewport*           FindViewportByID(ImGuiID id) { return im::FindViewportByID(id); }
        static ImGuiViewport*           FindViewportByPlatformHandle(void* platform_handle) { return im::FindViewportByPlatformHandle(platform_handle); }
};
}

class ClipboardTextFunction
{
    public:
        std::string text;
        virtual ~ClipboardTextFunction() {
        }

        virtual void onGetClipboardText(std::string* strOut) = 0;
        virtual void onSetClipboardText(std::string* text) = 0;
};

static const char* ImGui_Impl_GetClipboardText(void* user_data) {
    auto addr = reinterpret_cast<std::uintptr_t>(user_data);
    ClipboardTextFunction* clipboardFunction = reinterpret_cast<ClipboardTextFunction*>(addr);
    std::string& str = clipboardFunction->text;
    str.clear();
    clipboardFunction->onGetClipboardText(&str);
    return str.c_str();
}

static void ImGui_Impl_SetClipboardText(void* user_data, const char* text) {
    auto addr = reinterpret_cast<std::uintptr_t>(user_data);
    ClipboardTextFunction* clipboardFunction = reinterpret_cast<ClipboardTextFunction*>(addr);
    std::string& str = clipboardFunction->text;
    str = text;
    clipboardFunction->onSetClipboardText(&str);
}

class ImHelper {
    public:
        static void setClipboardTextFunction(ImGuiIO * io, ClipboardTextFunction * clipboardFunction) {
            auto pointer = reinterpret_cast<std::uintptr_t>(clipboardFunction);
            io->ClipboardUserData = (void*)pointer;
            io->SetClipboardTextFn = &ImGui_Impl_SetClipboardText;
            io->GetClipboardTextFn = &ImGui_Impl_GetClipboardText;
        }

        static void memcpyIdx(void* destination, ImDrawList * drawList, int num) {
            memcpy(destination, drawList->IdxBuffer.Data, num);
        }

        static void memcpyVtx(void* destination, ImDrawList * drawList, int num) {
            memcpy(destination, drawList->VtxBuffer.Data, num);
        }

        static void memcpyFont(ImFontAtlas* fontAtlas, IDLByteArray* byteArray, int* width, int* height) {
            unsigned char* pixels;
            fontAtlas->GetTexDataAsRGBA32(&pixels, width, height);
            int size = (*width) * (*height) * 4;
            byteArray->resize(size);
            for(int i = 0; i < size; i++) {
                byteArray->setValue(i, pixels[i]);
            }
        }

        static void updateFontName(ImFont* font, const char* name, float size_pixels) {
            ImFontConfig* fontConfig = const_cast<ImFontConfig*>(font->ConfigData);
            ImFormatString(fontConfig->Name, IM_ARRAYSIZE(fontConfig->Name), "%s, %.0fpx", name, size_pixels);
        }

        static intptr_t getTextureId(ImDrawCmd* nativeObject) {
            return (intptr_t)nativeObject->TextureId;
        }

        static void setIniFilename(ImGuiIO * io, char* fileName) {
            // not possible to change a readonly attribute in webidl file.
            io->IniFilename = fileName;
        }

        static void removeIniFilename(ImGuiIO * io) {
            // not possible to change a readonly attribute in webidl file.
            ImGui::GetIO().IniFilename = NULL;
        }

        static int getImGuiPayloadData(ImGuiPayload * payload) {
            return *(const int*)payload->Data;
        }
};