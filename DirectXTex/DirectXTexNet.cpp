#include "stdafx.h"

#include "DirectXTexNet.h"
#include "ScratchImage.h"

using namespace System::Runtime::InteropServices;

namespace DirectXTexNet
{
	//--------------------------------------------------------------------------------------------------
	// Load an image from a DDS file.
	//--------------------------------------------------------------------------------------------------
	ScratchImage^ DirectXTex::LoadFromDDSFile(String^ filename)
	{
		// Get C rep of filename string.
		pin_ptr<const wchar_t> filenameCStr = PtrToStringChars(filename);

		auto image = gcnew ScratchImage();
		auto hr = DirectX::LoadFromDDSFile(filenameCStr, DirectX::DDS_FLAGS_NONE, nullptr, *image->GetScratchImage());

		// Throw on failure.
		Marshal::ThrowExceptionForHR(hr);

		return image;
	}

}
