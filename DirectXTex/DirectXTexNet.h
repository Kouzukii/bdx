// DirectXTexNet.h

#pragma once

using namespace System;

namespace DirectXTexNet
{
	// Forward decl.
	ref class ScratchImage;

	// Static class containing the global functions for file handling.
	public ref class DirectXTex
	{
	public:
		static ScratchImage^ LoadFromDDSFile(String^ filename);
	};
}
