#pragma once

using namespace System;

namespace DirectXTexNet
{
	// Managed mirror of DirectX::TexMetadata
	public ref struct TexMetadata
	{
	public:
		Int32 Width;
		Int32 Height;		// Should be 1 for 1D textures
		Int32 Depth;		    // Should be 1 for 1D or 2D textures
		Int32 ArraySize;	    // For cubemap, this is a multiple of 6
		Int32 MipLevels;
		UInt32 MiscFlags;
		UInt32 MiscFlags2;
		UInt32 Format;		// DXGI_FORMAT
		UInt32 Dimension;
	};

	inline TexMetadata^ TexMetadataFromNative(DirectX::TexMetadata native)
	{
		TexMetadata^ result = gcnew TexMetadata;

		result->Width = native.width;
		result->Height = native.height;
		result->Depth = native.depth;
		result->ArraySize = native.arraySize;
		result->MipLevels = native.mipLevels;
		result->MiscFlags = native.miscFlags;
		result->MiscFlags2 = native.miscFlags2;
		result->Format = native.format;
		result->Dimension = native.dimension;

		return result;
	}
}
