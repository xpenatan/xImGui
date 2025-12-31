#include <cmath>
#pragma once

#include "TextEditor.h"
#include "imgui.h"
#include "IDLHelper.h"

typedef TextEditor::SetViewAtLineMode SetViewAtLineMode;
typedef TextEditor::LanguageDefinitionId LanguageDefinitionId;
typedef TextEditor::PaletteId PaletteId;

using Ed = TextEditor;

namespace TextEditorWrapper {
// This wrapper is necessary to support all methods.
// There is about 4 methods that wont work with webidl

class TextEditor {

private:
    Ed ed;

public:
    void SetReadOnlyEnabled(bool aValue) { ed.SetReadOnlyEnabled(aValue); }
    bool IsReadOnlyEnabled() const { return ed.IsReadOnlyEnabled(); }
    void SetAutoIndentEnabled(bool aValue) { ed.SetAutoIndentEnabled(aValue); }
    bool IsAutoIndentEnabled() const { return ed.IsAutoIndentEnabled(); }
    void SetShowWhitespacesEnabled(bool aValue) { ed.SetShowWhitespacesEnabled(aValue); }
    bool IsShowWhitespacesEnabled() const { return ed.IsShowWhitespacesEnabled(); }
    void SetShowLineNumbersEnabled(bool aValue) { ed.SetShowLineNumbersEnabled(aValue); }
    bool IsShowLineNumbersEnabled() const { return ed.IsShowLineNumbersEnabled(); }
    void SetShortTabsEnabled(bool aValue) { ed.SetShortTabsEnabled(aValue); }
    bool IsShortTabsEnabled() const { return ed.IsShortTabsEnabled(); }
    int GetLineCount() const { return ed.GetLineCount(); }
    void SetPalette(PaletteId aValue) { ed.SetPalette(aValue); }
    PaletteId GetPalette() const { return ed.GetPalette(); }
    void SetLanguageDefinition(LanguageDefinitionId aValue) { ed.SetLanguageDefinition(aValue); }
    LanguageDefinitionId GetLanguageDefinition() const { return ed.GetLanguageDefinition(); }
    const std::string GetLanguageDefinitionName() const { return ed.GetLanguageDefinitionName(); }
    void SetTabSize(int aValue) { ed.SetTabSize(aValue); }
    int GetTabSize() const { return ed.GetTabSize(); }
    void SetLineSpacing(float aValue) { ed.SetLineSpacing(aValue); }
    float GetLineSpacing() const { return ed.GetLineSpacing(); }

    static void SetDefaultPalette(PaletteId aValue) { Ed::SetDefaultPalette(aValue); }
    static PaletteId GetDefaultPalette() { return Ed::GetDefaultPalette(); }

    void SelectAll() { ed.SelectAll(); }
    void SelectLine(int aLine) { ed.SelectLine(aLine); }
    void SelectRegion(int aStartLine, int aStartChar, int aEndLine, int aEndChar) { ed.SelectRegion(aStartLine, aStartChar, aEndLine, aEndChar); }
    void SelectNextOccurrenceOf(const char* aText, int aTextSize, bool aCaseSensitive = true) { ed.SelectNextOccurrenceOf(aText, aTextSize, aCaseSensitive); }
    void SelectAllOccurrencesOf(const char* aText, int aTextSize, bool aCaseSensitive = true) { ed.SelectAllOccurrencesOf(aText, aTextSize, aCaseSensitive); }
    bool AnyCursorHasSelection() const { return ed.AnyCursorHasSelection(); }
    bool AllCursorsHaveSelection() const { return ed.AllCursorsHaveSelection(); }
    void ClearExtraCursors() { ed.ClearExtraCursors(); }
    void ClearSelections() { ed.ClearSelections(); }
    void SetCursorPosition(int aLine, int aCharIndex) { ed.SetCursorPosition(aLine, aCharIndex); }
    void GetCursorPosition(int* outLine, int* outColumn) const { ed.GetCursorPosition(*outLine, *outColumn); }
    int GetFirstVisibleLine() { return ed.GetFirstVisibleLine(); }
    int GetLastVisibleLine() { return ed.GetLastVisibleLine(); }
    void SetViewAtLine(int aLine, SetViewAtLineMode aMode) { ed.SetViewAtLine(aLine, aMode); }

    void Copy() { ed.Copy(); }
    void Cut() { ed.Cut(); }
    void Paste() { ed.Paste(); }
    void Undo(int aSteps = 1) { ed.Undo(aSteps); }
    void Redo(int aSteps = 1) { ed.Redo(aSteps); }
    bool CanUndo() const { return ed.CanUndo(); }
    bool CanRedo() const { return ed.CanRedo(); }
    int GetUndoIndex() const { return ed.GetUndoIndex(); }

    void SetText(const char* aText) {
        ed.SetText(aText);
    }
    std::string GetText() const { return ed.GetText(); }

    void SetTextLines(const std::vector<std::string>& aLines) { ed.SetTextLines(aLines); }
    std::vector<std::string> GetTextLines() const { return ed.GetTextLines(); }

    bool Render(const char* aTitle, bool aParentIsFocused = false, const ImVec2& aSize = ImVec2(), bool aBorder = false) {
        return ed.Render(aTitle, aParentIsFocused, aSize, aBorder);
    }
};

}
