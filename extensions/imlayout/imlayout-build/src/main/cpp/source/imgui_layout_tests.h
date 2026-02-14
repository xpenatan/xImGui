#pragma once

#include "imgui.h"
#include "imgui_internal.h"
#include "imgui_layout.h"
#include "imgui_ext.h"
#include <iostream>
using namespace std;

static void renderContent(bool verticalButtonFill) {
	ImGuiWindow* window = ImGui::GetCurrentWindow();
	ImGuiWindowTempData& DC = window->DC;
	ImGui::Button("B 00", ImVec2(-1, 0));
	ImGui::Text("This is a Text");
	ImGui::TextWrapped("This is a WrappeddddddddddddddText");
	ImGui::Button("B 01", ImVec2(-1, 0));
	ImGui::Button("B 02", ImVec2(0, verticalButtonFill ? -1 : 0));
}

static char* catStr(const char* one, const char* two) {
	char* three = new char[strlen(one) + strlen(two) + 1]{ '\0' };
	strcat_s(three, strlen(one) + 1, one);
	strcat_s(three, strlen(one) + strlen(two) + 1, two);
	return three;
}

static void paintLayout(ImU32 bgColor, ImVec2 size = ImVec2(0, 0)) {
	ImDrawList* drawList = ImGui::GetWindowDrawList();
	ImVec2 regionMax = ImGui::GetContentRegionAvail();

	float height = regionMax.y;
	float width = ImGui::GetContentRegionAvail().x;

	ImVec2 cursorPos = ImGui::GetCursorScreenPos();

	if (size.x > 0 && size.y > 0) {
		width = size.x;
		height = size.y;
	}
	drawList->AddRectFilled(cursorPos, ImVec2(cursorPos.x + width, cursorPos.y + height), bgColor);
}

namespace ImGuiExt
{
	static void HelpMarker(const char* desc)
	{
		ImGui::TextDisabled("(?)");
		if (ImGui::IsItemHovered())
		{
			ImGui::BeginTooltip();
			ImGui::PushTextWrapPos(ImGui::GetFontSize() * 35.0f);
			ImGui::TextUnformatted(desc);
			ImGui::PopTextWrapPos();
			ImGui::EndTooltip();
		}
	}

	inline void extInputTest(const char* name, bool debug) {
		// A custom solution to always set text when input get out of focus by selecting another widget, pressing enter or tab. ESC to cancle input changes.

		HelpMarker("Using custom code");

		//static std::string strbuffer;
		//static std::string myText[3];
		//struct TextCallback
		//{
		//	static int InputTextCallback(ImGuiInputTextCallbackData* data)
		//	{
		//		std::string* str = (std::string*)data->UserData;
		//		if (data->EventFlag == ImGuiInputTextFlags_CallbackResize)
		//		{
		//			// Resize string callback
		//			// If for some reason we refuse the new length (BufTextLen) and/or capacity (BufSize) we need to set them back to what we want.
		//			IM_ASSERT(data->Buf == str->c_str());
		//			str->resize(data->BufTextLen);
		//			data->Buf = (char*)str->c_str();
		//		}
		//		return 0;
		//	}
		//};

		//for (int i = 0; i < 3; ++i) {
		//	ImGui::PushID(i);
		//	ImGui::Text("Value = %s", myText[i].c_str());
		//	ImGui::SameLine();

		//	void* voidValue = (void*)&strbuffer;
		//	int flags = 0;
		//	std::string* stringPtr = static_cast<std::string*>(voidValue);
		//	std::string str = *stringPtr;
		//	str.assign(myText[i]);
		//	flags |= ImGuiInputTextFlags_CallbackResize;
		//	flags |= ImGuiInputTextFlags_EnterReturnsTrue;
		//	char* string = (char*)str.c_str();
		//	int capacity = str.capacity() + 1;
		//	bool isValid = ImGui::InputText("##input text", string, capacity, flags, TextCallback::InputTextCallback, &str);
		//	ImGuiID id = ImGui::GetItemID();
		//	ImGuiInputTextState* state = ImGui::GetInputTextState(id);
		//	bool isItemDeactivated = ImGui::IsItemDeactivated();
		//	bool escKey = ImGui::IsKeyPressed(ImGuiKey_Escape, false);

		//	if (state != NULL && isItemDeactivated && !escKey) {
		//		myText[i].assign(state->TextA.Data, state->CurLenA);
		//	}
		//	ImGui::PopID();
		//}

		//static float value_buffer[4];
		//static float buffer[1];
		//for (int i = 0; i < 4; ++i)
		//{
		//	buffer[0] = value_buffer[i];
		//	ImGui::PushID(i);
		//	ImGui::Text("Value = %f", buffer[0]);
		//	ImGui::SameLine();
		//	int flags = 0;
		//	//flags |= ImGuiInputTextFlags_CallbackCompletion;
		//	//flags |= ImGuiInputTextFlags_EnterReturnsTrue;
		//	//bool ImGui::InputScalar(const char* label, ImGuiDataType data_type, void* p_data, const void* p_step, const void* p_step_fast, const char* format, ImGuiInputTextFlags flags)
		//	float step = 2.0f;
		//	float stepFast = 100.0f;
		//	ImGuiContext& g = *GImGui;
		//	//bool result = ImGui::InputScalar("", ImGuiDataType_Float , &buffer[0], (void*)(&step), (void*)(&stepFast), "%.3f", flags);
		//	bool result = ImGui::InputScalar("", ImGuiDataType_Float, &buffer[0], NULL, NULL, "%.3f", flags);
		//	ImGuiIO& io = g.IO;
		//	bool mouseClicked = io.MouseClicked[0];
		//	ImGuiID id = ImGui::GetItemID();
		//	ImGuiInputTextState* state = ImGui::GetInputTextState(id);
		//	bool escKey = ImGui::IsKeyPressed(ImGuiKey_Escape, false);

		//	bool IsItemDeactivated = ImGui::IsItemDeactivated();

		//	if (IsItemDeactivated) {
		//		if (state != NULL && !escKey) {
		//			bool flag = false;
		//			flag = ImGui::DataTypeApplyFromText(state->TextA.Data, ImGuiDataType_Float, &buffer[0], "%.3f");
		//			value_buffer[i] = buffer[0];
		//		}
		//	}
		//	ImGui::PopID();
		//}
	}

	inline void test01(const char* name, bool debug) {
		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");
		HelpMarker("Layout with\nX: WRAP_PARENT\nY: WRAP_PARENT\nPaddingLeft: 0\nPaddingRight: 0");
		ImGui::Button("Outside Begin", ImVec2(-0.1, 0));
		{
			ImLayout::BeginLayout(idChild, ImLayout::WRAP_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(0, 0, 0, 0));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		HelpMarker("Layout with\nX: WRAP_PARENT\nY: WRAP_PARENT\nPaddingLeft: 40\nPaddingRight: 0");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild2, ImLayout::WRAP_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(40, 0, 0, 0));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		HelpMarker("Layout with\nX: WRAP_PARENT\nY: WRAP_PARENT\nPaddingLeft: 0\nPaddingRight: 40");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild3, ImLayout::WRAP_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(0, 40, 0, 0));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		HelpMarker("Layout with\nX: WRAP_PARENT\nY: WRAP_PARENT\nPaddingLeft: 40\nPaddingRight: 40");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild4, ImLayout::WRAP_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(40, 40, 0, 0));
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));
		delete[] idChild;


	}

	inline void test02(const char* name, bool debug) {
		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");
		HelpMarker("Layout with\nX: MATCH_PARENT\nY: WRAP_PARENT\nPaddingLeft: 0\nPaddingRight: 0");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(2, 2, 0, 0));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		HelpMarker("Layout with\nX: MATCH_PARENT\nY: WRAP_PARENT\nPaddingLeft: 40\nPaddingRight: 0");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild2, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(40, 0, 0, 0));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		HelpMarker("Layout with\nX: MATCH_PARENT\nY: WRAP_PARENT\nPaddingLeft: 0\nPaddingRight: 40");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild3, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(0, 40, 0, 0));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		HelpMarker("Layout with\nX: MATCH_PARENT\nY: WRAP_PARENT\nPaddingLeft: 40\nPaddingRight: 40");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild4, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(40, 40, 0, 0));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		delete[] idChild;
	}

	inline void test03(const char* name, bool debug) {
		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");

		HelpMarker("Layout with\nX: 300\nY: 110\nPaddingLeft: 0\nPaddingRight: 0");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{

			ImU32 bgColor = ImGui::GetColorU32(ImVec4(0xFF / 255.0f, 0x00 / 255.0f, 0x00 / 255.0f, 255 / 255.0f));
			paintLayout(bgColor, ImVec2(300, 110));

			ImLayout::BeginLayout(idChild, 300, 110, ImGuiLayoutOptions(0, 0, 0, 0));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		HelpMarker("Layout with\nX: 300\nY: 110\nPaddingLeft: 40\nPaddingRight: 0");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImU32 bgColor = ImGui::GetColorU32(ImVec4(0xFF / 255.0f, 0x00 / 255.0f, 0x00 / 255.0f, 255 / 255.0f));
			paintLayout(bgColor, ImVec2(300, 110));
			ImLayout::BeginLayout(idChild2, 300, 110, ImGuiLayoutOptions(40, 0, 0, 0));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		HelpMarker("Layout with\nX: 300\nY: 110\nPaddingLeft: 0\nPaddingRight: 40");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImU32 bgColor = ImGui::GetColorU32(ImVec4(0xFF / 255.0f, 0x00 / 255.0f, 0x00 / 255.0f, 255 / 255.0f));
			paintLayout(bgColor, ImVec2(300, 110));

			ImLayout::BeginLayout(idChild2, 300, 110, ImGuiLayoutOptions(0, 40, 0, 0));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		HelpMarker("Layout with\nX: 300\nY: 110\nPaddingLeft: 40\nPaddingRight: 40");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild4, 300, 110, ImGuiLayoutOptions(40, 40, 0, 0));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		delete[] idChild;
	}

	inline void test04(const char* name, bool debug) {
		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");

		HelpMarker("Layout with\nX: MATCH_PARENT\nY: WRAP_PARENT\nPaddingTop: 40\nPaddingBottom: 0");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(0, 0, 40, 00));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		HelpMarker("Layout with\nX: MATCH_PARENT\nY: WRAP_PARENT\nPaddingTop: 0\nPaddingBottom: 40");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild2, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(0, 0, 0, 40));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		HelpMarker("Layout with\nX: MATCH_PARENT\nY: WRAP_PARENT\nPaddingTop: 40\nPaddingBottom: 40");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild3, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(0, 0, 40, 40));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		delete[] idChild;
	}

	inline void test05(const char* name, bool debug) {
		HelpMarker("Layout with\nX: MATCH_PARENT\nY: MATCH_PARENT\nPaddingTop: 40\nPaddingBottom: 0");
		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild, ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, ImGuiLayoutOptions(0, 0, 40, 0));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		delete[] idChild;
	}

	inline void test06(const char* name, bool debug) {
		HelpMarker("Layout with\nX: MATCH_PARENT\nY: MATCH_PARENT\nPaddingTop: 0\nPaddingBottom: 40");
		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild, ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, ImGuiLayoutOptions(0, 0, 0, 40));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(true);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		delete[] idChild;
	}

	inline void test07(const char* name, bool debug) {
		HelpMarker("Layout with\nX: MATCH_PARENT\nY: MATCH_PARENT\nPaddingTop: 40\nPaddingBottom: 40");
		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild, ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, ImGuiLayoutOptions(0, 0, 40, 40));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(true);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		delete[] idChild;
	}

	inline void test08(const char* name, bool debug) {
		HelpMarker("Layout with\nX: MATCH_PARENT\nY: 200\nPaddingTop: 0\nPaddingBottom: 40");
		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild, ImLayout::MATCH_PARENT, 200, ImGuiLayoutOptions(0, 0, 0, 0));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(true);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		delete[] idChild;
	}

	inline void test09(const char* name, bool debug) {
		HelpMarker("Layout with\nX: MATCH_PARENT\nY: MATCH_PARENT\nPaddingLeft: 40\nPaddingRight: 40\nPaddingTop: 40\nPaddingBottom: 40");
		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild, ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, ImGuiLayoutOptions(40, 40, 40, 40));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(true);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		delete[] idChild;
	}

	inline void test10(const char* name, bool debug) {
		HelpMarker("Layout with\nX: MATCH_PARENT\nY: WRAP_PARENT\nPaddingleft: 2\nPaddingRight: 2\nPaddingTop: 2\nPaddingBottom: 2");
		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(2, 2, 2, 2));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		delete[] idChild;
	}

	inline void test11(const char* name, bool debug) {
		HelpMarker("Multi child layout test");
		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");
		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild, ImLayout::MATCH_PARENT, 200, ImGuiLayoutOptions(1, 1, 1, 1));
			{

				ImGui::Button("Button Layout 01", ImVec2(-0.1f, 0));
				ImU32 bgColor = ImGui::GetColorU32(ImVec4(0xFF / 255.0f, 0x00 / 255.0f, 0x00 / 255.0f, 255 / 255.0f));
				paintLayout(bgColor);

				ImLayout::BeginLayout(idChild2, ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, ImGuiLayoutOptions(4, 4, 4, 4));
				{
					ImU32 bgColor = ImGui::GetColorU32(ImVec4(0x00 / 255.0f, 0xFF / 255.0f, 0x00 / 255.0f, 255 / 255.0f));
					paintLayout(bgColor);

					ImLayout::BeginLayout(idChild3, ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, ImGuiLayoutOptions(4, 4, 4, 4));
					{
						ImU32 bgColor = ImGui::GetColorU32(ImVec4(0x00 / 255.0f, 0x00 / 255.0f, 0xFF / 255.0f, 255 / 255.0f));
						paintLayout(bgColor);
					}
					ImLayout::EndLayout();
				}
				ImLayout::EndLayout();
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		delete[] idChild;
	}

	inline void test12(const char* name, bool debug) {
		ImGuiContext& g = *GImGui;
		HelpMarker("Multi child layout test");


		static float paddingLeft = 1.0f;
		static float paddingTop = 1.0f;
		static float paddingRight = 1.0f;
		static float paddingBottom = 1.0f;
		ImGui::SliderFloat("Layout Padding Left", &paddingLeft, 0.0f, 10.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Right", &paddingRight, 0.0f, 10.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Top", &paddingTop, 0.0f, 10.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Bottom", &paddingBottom, 0.0f, 10.0f, "%.0f");

		static float paddingLeft2 = 1.0f;
		static float paddingTop2 = 1.0f;
		static float paddingRight2 = 1.0f;
		static float paddingBottom2 = 1.0f;
		ImGui::SliderFloat("Layout Padding Left2", &paddingLeft2, 0.0f, 10.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Right2", &paddingRight2, 0.0f, 10.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Top2", &paddingTop2, 0.0f, 10.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Bottom2", &paddingBottom2, 0.0f, 10.0f, "%.0f");


		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");
		ImGui::Button("Outside Begin", ImVec2(150, 0));
		{
			ImLayout::BeginLayout(idChild4, 200, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(0, 0, 0, 0));

			ImU32 bgColor = ImGui::GetColorU32(ImVec4(0xFF / 255.0f, 0xFF / 255.0f, 0xFF / 255.0f, 255 / 255.0f));
			paintLayout(bgColor);
			ImLayout::BeginLayout(idChild, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(paddingLeft, paddingRight, paddingTop, paddingBottom));
			{
				ImU32 bgColor = ImGui::GetColorU32(ImVec4(0xFF / 255.0f, 0x00 / 255.0f, 0x00 / 255.0f, 255 / 255.0f));
				paintLayout(bgColor);
				ImLayout::BeginLayout(idChild3, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(paddingLeft2, paddingRight2, paddingTop2, paddingBottom2));
				{
					ImU32 bgColor = ImGui::GetColorU32(ImVec4(0x00 / 255.0f, 0x00 / 255.0f, 0xFF / 255.0f, 255 / 255.0f));
					paintLayout(bgColor);
					renderContent(false);
				}
				ImLayout::EndLayout();
			}
			ImLayout::EndLayout();

			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		delete[] idChild;
	}

	inline void test13(const char* name, bool debug) {
		ImGuiContext& g = *GImGui;
		HelpMarker("Combining IDs test");
		ImGui::Button("Outside Begin", ImVec2(150, 0));
		{
			ImLayout::BeginLayout(name, 200, 200, ImGuiLayoutOptions(1, 1, 1, 1));
			{
				ImLayout::ShowLayoutDebug();
				ImLayout::BeginLayout("child", 170, 170, ImGuiLayoutOptions(2, 2, 2, 2));
				{
					ImLayout::ShowLayoutDebug();
					renderContent(false);
				}
				ImLayout::EndLayout();
			}
			ImLayout::EndLayout();

			ImLayout::BeginLayout("child", 150, 150, ImGuiLayoutOptions(2, 2, 2, 2));
			{
				ImLayout::ShowLayoutDebug();
				renderContent(false);
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));
	}

	inline void test14(const char* name, bool debug) {
		ImGuiContext& g = *GImGui;
		HelpMarker("Test if a widget size match the same layout size if there is no padding");

		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");

		static float paddingLeft = 0.0f;
		static float paddingTop = 0.0f;
		static float paddingRight = 0.0f;
		static float paddingBottom = 0.0f;
		ImGui::SliderFloat("Layout Padding Left", &paddingLeft, 0.0f, 100.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Right", &paddingRight, 0.0f, 100.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Top", &paddingTop, 0.0f, 100.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Bottom", &paddingBottom, 0.0f, 100.0f, "%.0f");

		float mouseX = g.IO.MousePos.x;
		float mouseY = g.IO.MousePos.y;
		//std::cout << "" << std::endl;
		//std::cout << "" << std::endl;
		//std::cout << "" << std::endl;
		//std::cout << "" << std::endl;
		//std::cout << "" << std::endl;
		//std::cout << "MouseX: " << mouseX << std::endl;
		//std::cout << "mouseY: " << mouseY << std::endl;

		ImGui::Button("Outside Begin", ImVec2(150, 0));
		{
			ImGui::Text("Layout SizeX: MATCH_PARENT, SizeY: 16");
			ImLayout::BeginLayout(idChild, ImLayout::MATCH_PARENT, 16, ImGuiLayoutOptions(paddingLeft, paddingRight, paddingTop, paddingBottom));
			{
				ImLayout::ShowLayoutDebug();
				ImU32 bgColor = ImGui::GetColorU32(ImVec4(0x00 / 255.0f, 0x00 / 255.0f, 0xFF / 255.0f, 255 / 255.0f));
				paintLayout(bgColor);
			}
			ImLayout::EndLayout();
			
			ImGui::Text("Layout SizeX: 16, SizeY: WRAP_CONTENT");
			ImLayout::BeginLayout(idChild2, 16, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(paddingLeft, paddingRight, paddingTop, paddingBottom));
			{
				ImLayout::ShowLayoutDebug();
				ImGui::Button("TEST", ImVec2(-0.1f, 0));
			}
			ImLayout::EndLayout();

			ImGui::Text("Layout SizeX: WRAP_PARENT, SizeY: MATCH_PARENT");
			ImLayout::BeginLayout(idChild3, ImLayout::WRAP_PARENT, ImLayout::MATCH_PARENT, ImGuiLayoutOptions(paddingLeft, paddingRight, paddingTop, paddingBottom));
			{
				ImLayout::ShowLayoutDebug();
				ImGui::Button("TEST", ImVec2(0, -0.1f));
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));
	}

	inline void test15(const char* name, bool debug) {

	}

	inline void test16(const char* name, bool debug) {
		ImGuiContext& g = *GImGui;
		HelpMarker("Test algin");
		static float paddingLeft = 0.0f;
		static float paddingRight = 0.0f;
		static float paddingTop = 0.0f;
		static float paddingBottom = 0.0f;
		static float alignX = 0.5f;
		static float offsetX = 0.0f;
		static float alignY = 0.5f;
		static float offsetY = 0.0f;
		static int matchXLayout = 1;
		static int matchYLayout = 0;
		static bool matchXButton = false;
		static bool matchYButton = false;
		ImGui::SliderFloat("Layout Padding Left", &paddingLeft, 0.0f, 10.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Right", &paddingRight, 0.0f, 10.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Top", &paddingTop, 0.0f, 10.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Bottom", &paddingBottom, 0.0f, 10.0f, "%.0f");
		ImGui::SliderFloat("AlignX", &alignX, 0.0f, 1.0f, "%.2f");
		ImGui::SliderFloat("AlignY", &alignY, 0.0f, 1.0f, "%.2f");
		ImGui::SliderFloat("OffsetX", &offsetX, -10.0f, 10.0f, "%.2f");
		ImGui::SliderFloat("OffsetY", &offsetY, -10.0f, 10.0f, "%.2f");


		ImGui::RadioButton("x: 300", &matchXLayout, 0);
		ImGui::SameLine();
		ImGui::RadioButton("x: MATCH_CONTENT", &matchXLayout, 1);
		ImGui::SameLine();
		ImGui::RadioButton("x: WRAP_CONTENT", &matchXLayout, 2);

		ImGui::RadioButton("y: 200", &matchYLayout, 0);
		ImGui::SameLine();
		ImGui::RadioButton("y: MATCH_CONTENT", &matchYLayout, 1);
		ImGui::SameLine();
		ImGui::RadioButton("y: WRAP_CONTENT", &matchYLayout, 2);

		ImGui::Checkbox("MatchXButton", &matchXButton);
		ImGui::Checkbox("MatchYButton", &matchYButton);

		int sizeX = 300;
		int sizeY = 200;
		if (matchXLayout == 1) {
			sizeX = ImLayout::MATCH_PARENT;
		}
		else if (matchXLayout == 2) {
			sizeX = ImLayout::WRAP_PARENT;
		}		
		if (matchYLayout == 1) {
			sizeY = ImLayout::MATCH_PARENT;
		}
		else if (matchYLayout == 2) {
			sizeY = ImLayout::WRAP_PARENT;
		}

		ImLayout::BeginLayout(name, sizeX, sizeY, ImGuiLayoutOptions(paddingLeft, paddingRight, paddingTop, paddingBottom));
		{
			ImLayout::ShowLayoutDebug();
			ImU32 bgColor = ImGui::GetColorU32(ImVec4(0x44 / 255.0f, 0x44 / 255.0f, 0x44 / 255.0f, 100 / 255.0f));
			paintLayout(bgColor);

			//std::cout << "----------" << std::endl;
			//std::cout << "Size 01: " << ImGui::GetContentRegionAvail().y << std::endl;

			ImLayout::AlignLayout(alignX, alignY, offsetX, offsetY);

			//std::cout << "Size 02: " << ImGui::GetContentRegionAvail().y << std::endl;

			ImGui::Button("Hello   1", ImVec2(0, 40));
			ImGui::SameLine();

			//std::cout << "Size 03: " << ImGui::GetContentRegionAvail().y << std::endl;

			ImGui::Button("Hello ", ImVec2(0, 0));
			ImGui::SameLine();
			ImGui::Button("Hello ", ImVec2(0, 60));

			ImGui::SameLine();
			ImGui::Button("Hello3", ImVec2(matchXButton ? -1 : 0, matchYButton ? -1 : 0));
		}
		ImLayout::EndLayout();
		ImGui::Button("Bottom");
	}

	inline void test17(const char* name, bool debug) {
		ImLayout::BeginBoundingBox();
		ImGui::Button("TEST##btn1", ImVec2(50, 0));
		ImRect boundingBox = ImLayout::EndBoundingBox();
		ImLayout::DrawBoundingBox_2(boundingBox.Min, boundingBox.Max, 255, 0, 0, 90);

		ImLayout::BeginBoundingBox();
		ImGui::Button("TEST##btn2", ImVec2(50, 0));
		boundingBox = ImLayout::EndBoundingBox();
		ImLayout::DrawBoundingBox_2(boundingBox.Min, boundingBox.Max, 255, 0, 0, 90);

		ImLayout::BeginBoundingBox();
		ImGui::Button("TEST##btn3", ImVec2(50, 0));
		ImGui::SameLine();
		ImGui::Button("TEST##btn4", ImVec2(30, 0));
		boundingBox = ImLayout::EndBoundingBox();
		ImLayout::DrawBoundingBox_2(boundingBox.Min, boundingBox.Max, 255, 0, 0, 90);
	}

	inline void test18(const char* name, bool debug) {
		ImGuiStyle& style = ImGui::GetStyle();

		// Set up sliders

		static float alignX = 0.5f;
		static float alignY = 0.5f;

		ImGui::SliderFloat("AlignX", &alignX, 0.0f, 1.0f, "%.2f");
		ImGui::SliderFloat("AlignY", &alignY, 0.0f, 1.0f, "%.2f");

		static float btnHeight01 = 90;
		ImGui::SliderFloat("Height01", &btnHeight01, 0.0f, 250.0f, "%.0f");

		static float btnHeight02 = 60;
		ImGui::SliderFloat("Height02", &btnHeight02, 0.0f, 250.0f, "%.0f");

		static float btnHeight03 = 70;
		ImGui::SliderFloat("Height03", &btnHeight03, 0.0f, 250.0f, "%.0f");

		static float btnHeight04 = 40;
		ImGui::SliderFloat("Height04", &btnHeight04, 0.0f, 250.0f, "%.0f");

		ImGui::SliderFloat2("CellPadding", (float*)&style.CellPadding, 0.0f, 20.0f, "%.0f");

		// FIRST TABLE

		if (ImGui::BeginTable("01", 4, ImGuiTableFlags_Borders | ImGuiTableFlags_Resizable | ImGuiTableFlags_Reorderable))
		{
			ImGui::TableSetupColumn("A0", ImGuiTableColumnFlags_WidthFixed);
			ImGui::TableSetupColumn("A1");
			ImGui::TableSetupColumn("A2");
			ImGui::TableSetupColumn("A3");
			ImGui::TableHeadersRow();

			ImGui::TableNextColumn();

			float maxHeight1 = ImGuiExt::GetTableRowHeight();

			ImGui::Text("Row Height: %.1f", maxHeight1);

			ImGui::Button("01", ImVec2(0, btnHeight01));

			float contentHeight01 = ImGuiExt::GetTableContentHeight();

			ImGuiExt::CalculateTableRowHeight();

			ImGui::TableNextColumn();

			ImLayout::BeginLayout("###idd", ImLayout::MATCH_PARENT, maxHeight1 == 0 ? ImLayout::WRAP_PARENT : maxHeight1);
			ImLayout::ShowLayoutDebug();
			ImLayout::AlignLayout(alignX, alignY);
			ImGui::Text("MyText");
			ImLayout::EndLayout();

			float contentHeight02 = ImGuiExt::GetTableContentHeight();
			//ImGuiExt::CalculateTableRowHeight(); // since this view depends of row height there is no need to calculate

			ImGui::TableNextColumn();

			ImGui::Button("03", ImVec2(0, btnHeight03));

			float contentHeight03 = ImGuiExt::GetTableContentHeight();

			ImGuiExt::CalculateTableRowHeight();

			ImGui::TableNextColumn();

			ImGui::Button("04", ImVec2(0, btnHeight04));

			float contentHeight04 = ImGuiExt::GetTableContentHeight();

			ImGuiExt::CalculateTableRowHeight();

			// Next row
			ImGui::TableNextColumn();
			ImGui::Text("contentHeight01: %.1f", contentHeight01);
			ImGui::TableNextColumn();
			ImGui::Text("contentHeight02: %.1f", contentHeight02);
			ImGui::TableNextColumn();
			ImGui::Text("contentHeight03: %.1f", contentHeight03);
			ImGui::TableNextColumn();
			ImGui::Text("contentHeight04: %.1f", contentHeight04);

			ImGui::EndTable();
		}

		// SECOND TABLE

		if (ImGui::BeginTable("02", 4, ImGuiTableFlags_Borders | ImGuiTableFlags_Resizable | ImGuiTableFlags_Reorderable))
		{
			ImGui::TableSetupColumn("B0");
			ImGui::TableSetupColumn("B1");
			ImGui::TableSetupColumn("B2");
			ImGui::TableSetupColumn("B3");
			ImGui::TableHeadersRow();

			ImGui::TableNextColumn();

			float maxHeight1 = ImGuiExt::GetTableRowHeight();

			ImGui::Text("Row Height: %.1f", maxHeight1);

			ImGui::Button("01", ImVec2(0, btnHeight01));


			static bool check = false;
			ImGui::Checkbox("check", &check);

			float contentHeight01 = ImGuiExt::GetTableContentHeight();

			ImGuiExt::CalculateTableRowHeight();

			ImGui::TableNextColumn();

			ImGui::Button("02", ImVec2(0, btnHeight02));

			float contentHeight02 = ImGuiExt::GetTableContentHeight();
			ImGuiExt::CalculateTableRowHeight();

			ImGui::TableNextColumn();

			ImGui::Button("03", ImVec2(0, btnHeight03));

			float contentHeight03 = ImGuiExt::GetTableContentHeight();

			ImGuiExt::CalculateTableRowHeight();

			ImGui::TableNextColumn();

			ImGui::Button("04", ImVec2(0, btnHeight04));

			float contentHeight04 = ImGuiExt::GetTableContentHeight();

			ImGuiExt::CalculateTableRowHeight();

			// Next row
			ImGui::TableNextColumn();
			ImGui::Text("contentHeight01: %.1f", contentHeight01);
			ImGui::TableNextColumn();
			ImGui::Text("contentHeight02: %.1f", contentHeight02);
			ImGui::TableNextColumn();
			ImGui::Text("contentHeight03: %.1f", contentHeight03);
			ImGui::TableNextColumn();
			ImGui::Text("contentHeight04: %.1f", contentHeight04);

			ImGui::EndTable();
		}

		ImGui::Indent();
		ImGui::Indent();
		ImGui::Indent();

		ImLayout::BeginLayout("rootLayout", ImLayout::MATCH_PARENT, 20);
		ImLayout::AlignLayout(0, 0.5f);
		ImGui::Text("1 - Test");
		ImLayout::EndLayout();
		ImGui::Indent();

		ImLayout::BeginLayout("fullLayoutttt", ImLayout::MATCH_PARENT, 20);
		{
			ImLayout::AlignLayout(0.5, 0.5);

			ImLayout::ShowLayoutDebug();
			ImLayout::ShowLayoutDebugClipping();


			ImLayout::BeginAlign("imlayout", ImLayout::WRAP_PARENT, ImLayout::MATCH_PARENT, 0.0, 0.5);
				{

					ImLayout::ShowLayoutDebug();
				ImLayout::ShowLayoutDebugClipping();

				ImGui::ArrowButton("Arrow", ImGuiDir_Right);
				ImGui::SameLine();
				ImGui::Text("2 - Test");
			}
			ImLayout::EndAlign();

			ImGui::SameLine();

			ImLayout::BeginLayout("algin02", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT);
			{
				ImGui::Button("TEST");
			}
			ImLayout::EndLayout();
		}
		ImLayout::EndLayout();
	}

	inline void render_file(const char* name, float thumbnailSize) {
		ImGuiLayoutOptions op;
		op.paddingBottom = 5;
		op.paddingLeft = 4;
		op.paddingRight = 4;
		op.clipping = false;

		ImLayout::BeginLayout(name, thumbnailSize, ImLayout::WRAP_PARENT);
		{
			ImGui::Button("Btn", ImVec2(thumbnailSize, thumbnailSize));
			ImLayout::BeginAlign(name, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, 0.5f, 0, 0, 0, op);
			{
				ImGui::TextWrapped(name);
			}
			ImLayout::EndAlign();

		}
		ImLayout::EndLayout();
	}

	inline void test_tree(const char* name, bool debug) {
		int flags = ImGuiTableFlags_Resizable | ImGuiTableFlags_ScrollY;
		if (ImGui::BeginTable("ContentBrowser", 2, flags)) {

			ImGui::TableSetupColumn("C0", ImGuiTableColumnFlags_WidthStretch, 0.2f);
			ImGui::TableSetupColumn("C1", ImGuiTableColumnFlags_WidthStretch, 0.8f);

			ImGui::TableNextRow();
			ImGui::TableSetColumnIndex(0);

			float height = 10;
			ImGui::SetNextItemOpen(true, ImGuiCond_Once);
			ImLayout::BeginTree_1("RootId");
			{
				ImLayout::BeginTreeLayout(ImLayout::GetTreeHeight(height), false, false);
				{
					ImLayout::SetOrientation(ImOrientation::HORIZONTAL);
					ImLayout::BeginAlign("111", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 0.0, 0.5);
					{
						ImGui::Text("Root");
						//ImLayout::ShowLayoutDebug();
					}
					ImLayout::EndAlign();

					ImGui::SameLine();
					ImLayout::BeginAlign("222", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 1.0, 0.5);
					{
						if (ImGui::Button("CLICK ME")) {
							std::cout << "CLICK ME" << std::endl;
						}
						ImGui::SameLine();
						ImGui::Text("- 22");
						//ImLayout::ShowLayoutDebug();
					}
					ImLayout::EndAlign();
				}
				ImLayout::EndTreeLayout();
				if (ImLayout::IsTreeOpen()) {
					{
						ImLayout::BeginTree_1("Assets");
						ImLayout::BeginTreeLayout(ImLayout::GetTreeHeight(height), false, false);
						ImGui::Text("Assets");
						ImLayout::EndTreeLayout();
						if (ImLayout::IsTreeOpen()) {

							{
								{
									ImLayout::BeginTree_1("Item");
									ImLayout::BeginTreeLayout(ImLayout::GetTreeHeight(height), true, false);
									ImGui::Text("Item");
									ImLayout::EndTreeLayout();
									if (ImLayout::IsTreeOpen()) {
									}
									ImLayout::EndTree();
								}
							}
						}
						ImLayout::EndTree();

						ImLayout::BeginTree_1("Folder");
						ImLayout::BeginTreeLayout(ImLayout::GetTreeHeight(height), false, false);
						ImGui::Text("Folder");
						ImLayout::EndTreeLayout();
						if (ImLayout::IsTreeOpen()) {

							{
								{
									ImLayout::BeginTree_1("Item");
									ImLayout::BeginTreeLayout(ImLayout::GetTreeHeight(height), true, false);
									ImGui::Text("Item");
									ImLayout::EndTreeLayout();
									if (ImLayout::IsTreeOpen()) {
									}
									ImLayout::EndTree();
								}
							}
						}
						ImLayout::EndTree();


						ImLayout::BeginTree_1("Folder2");
						ImLayout::BeginTreeLayout(ImLayout::GetTreeHeight(height), true, false);
						ImGui::Text("Folder2");
						ImLayout::EndTreeLayout();
						ImLayout::EndTree();
					}
				}
			}
			ImLayout::EndTree();

			ImGui::TableSetColumnIndex(1);

			ImGuiContext* imGuiContext = ImGui::GetCurrentContext();
			float availSizeX = ImGui::GetContentRegionAvail().x;
			float cursorX = ImGui::GetCursorScreenPos().x;

			static int thumbnailSize = 90;
			static int padding = 8;	
			static int itemSize = 10;

			ImGui::DragInt("Item Size", &itemSize, 0.1f, 0, 100);
			ImGui::DragInt("Padding", &padding, 0.1f, 0, 60);
			ImGui::DragInt("ThumbnailSize", &thumbnailSize, 0.1f, 40, 128);

			for (int i = 0; i < itemSize; i++) {

				if (i == 1) {
					render_file("Test World big name", thumbnailSize);
				}
				else if (i == 8) {
					render_file("Test World very very very very big name", thumbnailSize);
				}
				else {
					ImGui::PushID(i);
					render_file("Test", thumbnailSize);
					ImGui::PopID();
				}
				ImRect rect = imGuiContext->LastItemData.Rect;

				float lastItemX = rect.Max.x - cursorX;

				if (i + 1 < itemSize) {
					bool sameLine = false;
					float padThumbSize = thumbnailSize + padding;
					float finalX = lastItemX + padThumbSize;

					if (finalX < availSizeX) {
						sameLine = true;
					}
					if (sameLine) {
						ImGui::SameLine(0, padding);
					}
				}
				ImVec2 cursorPosStart = ImGui::GetCursorPos();
			}

			ImGui::EndTable();
		}
	}

	inline void test_layout_orientation(const char* name, bool debug) {

		ImGui::SetWindowSize(ImVec2(500, 400));
		int width = 0;
		if (ImGui::Button("75")) {
			width = 75;
		}
		ImGui::SameLine();
		if (ImGui::Button("175")) {
			width = 175;
		}	
		ImGui::SameLine();
		if (ImGui::Button("176")) {
			width = 176;
		}
		float availX = ImGui::GetContentRegionAvail().x;
		float availY = ImGui::GetContentRegionAvail().y;
		ImGui::Text("%f", availX);
		ImGui::Text("%f", availY);
		int flags = ImGuiTableFlags_Resizable | ImGuiTableFlags_ScrollY;
		if (ImGui::BeginTable("ContentBrowser", 2, flags)) {

			if (width > 0) {
				ImGui::TableSetColumnWidth(0, width);
			}

			ImGui::TableSetupColumn("C0", ImGuiTableColumnFlags_WidthStretch, 0.2f);
			ImGui::TableSetupColumn("C1", ImGuiTableColumnFlags_WidthStretch, 0.8f);

			ImGui::TableNextRow();
			ImGui::TableSetColumnIndex(0);
			{
			}
			ImGui::TableSetColumnIndex(1);
			{
				ImGui::Text("%f", ImGui::GetContentRegionAvail().x);
				ImLayout::BeginLayout("menu1", ImLayout::MATCH_PARENT, 22);
				{
					int menuColor = ImColor(255, 255, 255, 20);
					//ImLayout::SetOrientation(ImOrientation::HORIZONTAL);
					ImGuiLayout* imGuiLayout1 = ImLayout::GetCurrentLayout();
					ImGui::GetWindowDrawList()->AddRectFilled(imGuiLayout1->position, imGuiLayout1->getAbsoluteSize(), menuColor);
					ImLayout::BeginAlign("path", 50, ImLayout::MATCH_PARENT, 0, 0.5f);
					{
						ImGui::Text("TEST1");
					}
					ImLayout::EndLayout();
					ImGui::SameLine();
					ImLayout::BeginAlign("gear", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 1.0f, 0.0f);
					{
						ImLayout::ShowLayoutDebug();
						if (ImGui::Button("A", ImVec2(22, 22))) {

						}
					}
					ImLayout::EndLayout();
				}
				ImLayout::EndLayout();

				ImLayout::BeginLayout("menu2", ImLayout::MATCH_PARENT, 22);
				{
					int menuColor = ImColor(255, 255, 255, 40);
					//ImLayout::SetOrientation(ImOrientation::HORIZONTAL);
					ImGuiLayout* imGuiLayout1 = ImLayout::GetCurrentLayout();
					ImGui::GetWindowDrawList()->AddRectFilled(imGuiLayout1->position, imGuiLayout1->getAbsoluteSize(), menuColor);
					ImLayout::BeginAlign("path", ImLayout::WRAP_PARENT, ImLayout::MATCH_PARENT, 0, 0.5f);
					{
						ImGui::Text("TEST2");
					}
					ImLayout::EndLayout();
					ImGui::SameLine();
					ImLayout::BeginAlign("gear", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 1.0f, 0.0f);
					{
						ImLayout::ShowLayoutDebug();
						if (ImGui::Button("B", ImVec2(22, 22))) {

						}
					}
					ImLayout::EndLayout();
				}
				ImLayout::EndLayout();

				ImLayout::BeginLayout("menu3", ImLayout::MATCH_PARENT, 22);
				{
					ImLayout::ShowLayoutDebug();
					int menuColor = ImColor(255, 255, 255, 20);
					ImLayout::SetOrientation(ImOrientation::HORIZONTAL);
					ImGuiLayout* imGuiLayout1 = ImLayout::GetCurrentLayout();
					ImGui::GetWindowDrawList()->AddRectFilled(imGuiLayout1->position, imGuiLayout1->getAbsoluteSize(), menuColor);
					ImLayout::BeginAlign("path", 50, ImLayout::MATCH_PARENT, 0, 0.5f);
					{
						ImGui::Text("TEST3");
					}
					ImLayout::EndLayout();
					ImGui::SameLine();
					ImLayout::BeginAlign("gear", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 1.0f, 0.0f);
					{
						ImLayout::ShowLayoutDebug();
						if (ImGui::Button("C", ImVec2(22, 22))) {

						}
					}
					ImLayout::EndLayout();
				}
				ImLayout::EndLayout();

				ImLayout::BeginLayout("menu4", ImLayout::MATCH_PARENT, 22);
				{
					int menuColor = ImColor(255, 255, 255, 40);
					ImLayout::SetOrientation(ImOrientation::HORIZONTAL);
					ImGuiLayout* imGuiLayout1 = ImLayout::GetCurrentLayout();
					ImGui::GetWindowDrawList()->AddRectFilled(imGuiLayout1->position, imGuiLayout1->getAbsoluteSize(), menuColor);
					ImLayout::BeginAlign("path", ImLayout::WRAP_PARENT, ImLayout::MATCH_PARENT, 0, 0.5f);
					{
						ImGui::Text("TEST4");
					}
					ImLayout::EndLayout();
					ImGui::SameLine();
					ImLayout::BeginAlign("gear", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 1.0f, 0.0f);
					{
						ImLayout::ShowLayoutDebug();
						if (ImGui::Button("D", ImVec2(22, 22))) {

						}
					}
					ImLayout::EndLayout();
				}
				ImLayout::EndLayout();

				ImLayout::BeginLayout("menu5", ImLayout::MATCH_PARENT, 22);
				{
					int menuColor = ImColor(255, 255, 255, 20);
					ImLayout::SetOrientation(ImOrientation::HORIZONTAL);
					ImGuiLayout* imGuiLayout1 = ImLayout::GetCurrentLayout();
					ImGui::GetWindowDrawList()->AddRectFilled(imGuiLayout1->position, imGuiLayout1->getAbsoluteSize(), menuColor);
					ImLayout::BeginAlign("path1", 40, ImLayout::MATCH_PARENT, 0, 0.5f);
					{
						ImGui::Text("TEST5");
					}
					ImLayout::EndLayout();
					ImGui::SameLine();
					ImLayout::BeginAlign("gear", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 0.0f, 0.0f);
					{
						ImLayout::ShowLayoutDebug();
						if (ImGui::Button("D", ImVec2(-1, 22))) {

						}
					}
					ImLayout::EndLayout();
					ImGui::SameLine();
					ImLayout::BeginAlign("path2", 40, ImLayout::MATCH_PARENT, 0, 0.5f);
					{
						ImGui::Text("TEST2");
					}
					ImLayout::EndLayout();
				}
				ImLayout::EndLayout();

				ImLayout::BeginLayout("menu6", ImLayout::MATCH_PARENT, 22);
				{
					int menuColor = ImColor(255, 255, 255, 20);
					ImLayout::SetOrientation(ImOrientation::HORIZONTAL);
					ImGuiLayout* imGuiLayout1 = ImLayout::GetCurrentLayout();
					ImGui::GetWindowDrawList()->AddRectFilled(imGuiLayout1->position, imGuiLayout1->getAbsoluteSize(), menuColor);
					ImLayout::BeginAlign("path1", ImLayout::WRAP_PARENT, ImLayout::MATCH_PARENT, 0, 0.5f);
					{
						ImGui::Text("TEST6");
					}
					ImLayout::EndLayout();
					ImGui::SameLine();
					ImLayout::BeginAlign("gear", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 0.0f, 0.0f);
					{
						ImLayout::ShowLayoutDebug();
						if (ImGui::Button("D", ImVec2(-1, 22))) {

						}
					}
					ImLayout::EndLayout();
					ImGui::SameLine();
					ImLayout::BeginAlign("path2", ImLayout::WRAP_PARENT, ImLayout::MATCH_PARENT, 0, 0.5f);
					{
						ImGui::Text("TEST2");
					}
					ImLayout::EndLayout();
				}
				ImLayout::EndLayout();

				ImLayout::BeginLayout("menu7", ImLayout::MATCH_PARENT, 22);
				{
					int menuColor = ImColor(255, 255, 255, 20);
					ImLayout::SetOrientation(ImOrientation::HORIZONTAL);
					ImGuiLayout* imGuiLayout1 = ImLayout::GetCurrentLayout();
					ImGui::GetWindowDrawList()->AddRectFilled(imGuiLayout1->position, imGuiLayout1->getAbsoluteSize(), menuColor);
					ImLayout::BeginAlign("path1", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 0, 0.5f);
					{
						ImGui::Text("TEST7");
					}
					ImLayout::EndLayout();
					ImGui::SameLine();
					ImLayout::BeginAlign("gear", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 0.0f, 0.0f);
					{
						ImLayout::ShowLayoutDebug();
						if (ImGui::Button("D", ImVec2(-1, 22))) {

						}
					}
					ImLayout::EndLayout();
					ImGui::SameLine();
					ImLayout::BeginAlign("path2", 50, ImLayout::MATCH_PARENT, 0, 0.5f);
					{
						ImLayout::ShowLayoutDebug();
						ImGui::Text("TEST2");
					}
					ImLayout::EndLayout();
				}
				ImLayout::EndLayout();

				ImLayout::BeginLayout("menu8", ImLayout::MATCH_PARENT, 22);
				{
					int menuColor = ImColor(255, 255, 255, 20);
					ImLayout::SetOrientation(ImOrientation::HORIZONTAL);
					ImGuiLayout* imGuiLayout1 = ImLayout::GetCurrentLayout();
					ImGui::GetWindowDrawList()->AddRectFilled(imGuiLayout1->position, imGuiLayout1->getAbsoluteSize(), menuColor);
					ImLayout::BeginAlign("path1", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 0, 0.5f);
					{
						ImLayout::ShowLayoutDebug();
						ImGui::Text("TEST8");
					}
					ImLayout::EndLayout();
					ImGui::SameLine();
					ImLayout::BeginAlign("gear", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 0.0f, 0.0f);
					{
						ImLayout::ShowLayoutDebug();
						if (ImGui::Button("D", ImVec2(-1, 22))) {

						}
					}
					ImLayout::EndLayout();
					ImGui::SameLine();
					ImLayout::BeginAlign("path2", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 0, 0.5f);
					{
						ImLayout::ShowLayoutDebug();
						ImGui::Text("TEST2");
					}
					ImLayout::EndLayout();
				}
				ImLayout::EndLayout();

				ImLayout::BeginLayout("menu9", ImLayout::MATCH_PARENT, 22);
				{
					int menuColor = ImColor(255, 255, 255, 20);
					ImLayout::SetOrientation(ImOrientation::HORIZONTAL);
					ImGuiLayout* imGuiLayout1 = ImLayout::GetCurrentLayout();
					ImGui::GetWindowDrawList()->AddRectFilled(imGuiLayout1->position, imGuiLayout1->getAbsoluteSize(), menuColor);
					ImLayout::BeginAlign("path1", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 0, 0.5f);
					{
						ImLayout::ShowLayoutDebug();
						ImGui::Text("TEST9");
					}
					ImLayout::EndLayout();
					ImGui::SameLine();
					ImLayout::BeginAlign("gear", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 0.0f, 0.0f);
					{
						ImLayout::ShowLayoutDebug();
						if (ImGui::Button("D", ImVec2(-1, 22))) {

						}
					}
					ImLayout::EndLayout();
				}
				ImLayout::EndLayout();
			}
			ImGui::EndTable();
		}
	}

	inline void testFail01(const char* name, bool debug) {
		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");
		char* idChild5 = catStr(name, "child5");
		char* idChild6 = catStr(name, "child6");
		char* idChild7 = catStr(name, "child7");

		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild4, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(0, 0, 0, 0));
			{
				renderContent(false);

				ImGui::SameLine();
				ImLayout::BeginLayout(idChild6, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(0, 0, 0, 0));
				{

					ImGui::Text("This is a Texaaaaat");
					ImGui::TextWrapped("This is a WrappeddddddddddddddText");
					ImGui::Button("B 01", ImVec2(-0.1f, 0));
					ImGui::Button("B 02", ImVec2(0, 0));
				}
				ImLayout::EndLayout();

				ImGui::SameLine();
				ImLayout::BeginLayout(idChild7, ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, ImGuiLayoutOptions(0, 0, 0, 0));
				{
					renderContent(false);
				}
				ImLayout::EndLayout();

			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		delete[] idChild;
	}

	inline void testFail02(const char* name, bool debug) {
		char* idChild = catStr(name, "child");
		char* idChild2 = catStr(name, "child2");
		char* idChild3 = catStr(name, "child3");
		char* idChild4 = catStr(name, "child4");
		char* idChild5 = catStr(name, "child5");
		char* idChild6 = catStr(name, "child6");
		char* idChild7 = catStr(name, "child7");

		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImLayout::BeginLayout(idChild4, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(0, 0, 0, 0));
			{

				renderContent(false);

				ImGui::SameLine();

				ImLayout::BeginLayout(idChild6, ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, ImGuiLayoutOptions(0, 0, 0, 0));
				{

					ImGui::Text("This is a Texaaaaat");
					ImGui::TextWrapped("This is a WrappeddddddddddddddText");
					ImGui::Button("B 01", ImVec2(-0.1f, 0));
					ImGui::Button("B 02", ImVec2(0, 0));
				}
				ImLayout::EndLayout();

				ImGui::SameLine();
				ImLayout::BeginLayout(idChild7, 150, ImLayout::MATCH_PARENT, ImGuiLayoutOptions(0, 0, 0, 0));
				{
					renderContent(false);
				}
				ImLayout::EndLayout();

				ImLayout::BeginLayout(idChild, 300, ImLayout::MATCH_PARENT, ImGuiLayoutOptions(0, 0, 0, 0));
				{
					renderContent(false);
				}
				ImLayout::EndLayout();
			}
			ImLayout::EndLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));

		delete[] idChild;
	}

	inline void example01(const char* name) {
		static float paddingLeft = 0.0f;
		static float paddingTop = 0.0f;
		static float paddingRight = 0.0f;
		static float paddingBottom = 0.0f;
		ImGui::SliderFloat("Layout Padding Left", &paddingLeft, 0.0f, 10.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Right", &paddingRight, 0.0f, 10.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Top", &paddingTop, 0.0f, 10.0f, "%.0f");
		ImGui::SliderFloat("Layout Padding Bottom", &paddingBottom, 0.0f, 10.0f, "%.0f");
		ImGuiCollapseLayoutOptions options;
		options.paddingLeft = paddingLeft;
		options.paddingRight = paddingRight;
		options.paddingTop = paddingTop;
		options.paddingBottom = paddingBottom;

		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			bool isOpen = ImLayout::BeginCollapseLayout("##id01", "Title", ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, options);
			if (isOpen) {
				ImU32 bgColor = ImGui::GetColorU32(ImVec4(0x44 / 255.0f, 0x44 / 255.0f, 0x44 / 255.0f, 100 / 255.0f));
				paintLayout(bgColor);
				renderContent(false);
			}
			ImLayout::EndCollapseLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));
	}

	inline void example02(const char* name) {
		static bool isOpen = false;
		static bool isOpen2 = false;
		static bool isOpen3 = false;


		ImGui::Button("Outside Begin", ImVec2(150, 0));
		{
			ImLayout::BeginCollapseLayout_2("##id01", &isOpen, "Left", 150, ImLayout::WRAP_PARENT);
			if (isOpen) {
				renderContent(false);
			}
			ImLayout::EndCollapseLayout();

			ImGui::SameLine();

			ImLayout::BeginCollapseLayout_2("##id02", &isOpen2, "Right", 150, ImLayout::WRAP_PARENT);
			if (isOpen2) {

				renderContent(false);

				ImLayout::BeginCollapseLayout_2("##id03", &isOpen3, "Child", ImLayout::MATCH_PARENT, 120);

				ImLayout::EndCollapseLayout();
			}
			ImLayout::EndCollapseLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));
	}

	inline void example03(const char* name) {
		static bool isOpen = false;
		static bool isOpen2 = false;
		static bool isOpen3 = false;


		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImGuiCollapseLayoutOptions options;
			ImLayout::BeginCollapseLayoutEx_3("##id01", &isOpen, "Left", ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, options);

			//std::cout << "Size1: " << ImGui::GetContentRegionAvail().y << std::endl;

			ImLayout::BeginAlign("id011", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 1.0f, 0.5f, -5);

			float size = ImGui::GetContentRegionAvail().y;

			//std::cout << "Size2: " << size << std::endl;
			ImGui::Text("Right Align Text");
			ImLayout::EndAlign();

			ImLayout::EndCollapseFrameLayout();
			if (isOpen) {
				renderContent(false);
			}
			ImLayout::EndCollapseLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));
	}

	inline void example04(const char* name) {

		ImGui::Button("Outside Begin", ImVec2(-0.1f, 0));
		{
			ImGuiCollapseLayoutOptions options;
			bool isOpen = ImLayout::BeginCollapseLayoutEx("##id01", "Left", ImLayout::MATCH_PARENT, ImLayout::WRAP_PARENT, options);

			//std::cout << "Size1: " << ImGui::GetContentRegionAvail().y << std::endl;

			ImLayout::BeginAlign("##id02", ImLayout::WRAP_PARENT, ImLayout::MATCH_PARENT, 0.0f, 0.5f);

			float size = ImGui::GetContentRegionAvail().y;

			//std::cout << "Size2: " << ImGui::GetContentRegionAvail().y << std::endl;

			int padding = 2;
			ImGui::Button(0, ImVec2(-0.1f, 0));

			ImLayout::EndAlign();

			ImGui::SameLine();

			ImLayout::BeginAlign("##id03", ImLayout::MATCH_PARENT, ImLayout::MATCH_PARENT, 1.0f, 0.5f, -5);
			ImLayout::ShowLayoutDebug();

			ImGui::Text("Right Align Text");

			ImLayout::EndAlign();

			ImLayout::EndCollapseFrameLayout();
			if (isOpen) {
				renderContent(false);
			}
			ImLayout::EndCollapseLayout();
		}
		ImGui::Button("Outside End", ImVec2(-0.1f, 0));
	}

	inline void ShowLayoutTests()
	{
		static int e = 0;
		ImGui::Begin("Tests", NULL, ImGuiWindowFlags_HorizontalScrollbar);

		int i = 0;
		ImGui::RadioButton("Ext InputText", &e, i++);
		ImGui::RadioButton("test01", &e, i++);
		ImGui::RadioButton("test02", &e, i++);
		ImGui::RadioButton("test03", &e, i++);
		ImGui::RadioButton("test04", &e, i++);
		ImGui::RadioButton("test05", &e, i++);
		ImGui::RadioButton("test06", &e, i++);
		ImGui::RadioButton("test07", &e, i++);
		ImGui::RadioButton("test08", &e, i++);
		ImGui::RadioButton("test09", &e, i++);
		ImGui::RadioButton("test10", &e, i++);
		ImGui::RadioButton("test11", &e, i++);
		ImGui::RadioButton("test12", &e, i++);
		ImGui::RadioButton("test13", &e, i++);
		ImGui::RadioButton("test14", &e, i++);
		ImGui::RadioButton("test15", &e, i++);
		ImGui::RadioButton("test16", &e, i++);
		ImGui::RadioButton("test17", &e, i++);
		ImGui::RadioButton("test18", &e, i++);
		ImGui::RadioButton("test_tree", &e, i++);
		ImGui::RadioButton("test_orientation", &e, i++);
		ImGui::RadioButton("example01", &e, i++);
		ImGui::RadioButton("example02", &e, i++);
		ImGui::RadioButton("example03", &e, i++);
		ImGui::RadioButton("example04", &e, i++);

		i = 0;
		ImGui::Begin("Test", NULL, ImGuiWindowFlags_HorizontalScrollbar);
		if (e == i++)
			extInputTest("extInputTest", false);
		if (e == i++)
			test01("test01", false);
		if (e == i++)
			test02("test02", false);
		if (e == i++)
			test03("test03", false);
		if (e == i++)
			test04("test04", false);
		if (e == i++)
			test05("test05", false);
		if (e == i++)
			test06("test06", false);
		if (e == i++)
			test07("test07", false);
		if (e == i++)
			test08("test08", false);
		if (e == i++)
			test09("test09", false);
		if (e == i++)
			test10("test10", false);
		if (e == i++)
			test11("test10", false);
		if (e == i++)
			test12("test12", false);
		if (e == i++)
			test13("test13", false);
		if (e == i++)
			test14("test14", false);
		if (e == i++)
			test15("test15", false);
		if (e == i++)
			test16("test16", false);
		if (e == i++)
			test17("test17", false);
		if (e == i++)
			test18("test18", false);
		if (e == i++)
			test_tree("test_tree", false);		
		if (e == i++)
			test_layout_orientation("test_orientation", false);
		if (e == i++)
			example01("example01");
		if (e == i++)
			example02("example02");
		if (e == i++)
			example03("example03");
		if (e == i++)
			example04("example04");
		ImGui::End();

		ImGui::End();
	};
}
