// DirectXTexSharp.h

#pragma once

#include "TexMetadata.h"

using namespace System;
using namespace Runtime::InteropServices;

// Forward decls.
namespace DirectX
{
	class ScratchImage;
}

namespace DirectXTexNet
{

// Mirror of DirectXTex ScratchImage class.
public ref class ScratchImage : public IDisposable
{
public:
	// Create a D3D11 texture from the image.
	virtual IntPtr CreateTexture(IntPtr device);

	// Get image meta-data.
	property TexMetadata^ MetaData
	{
		virtual TexMetadata^ get();
	}

	// Get the raw bytes for a sub-image.
	virtual array<Byte>^ GetRawBytes(UInt32 arrayItem, UInt32 mip);

	// Generate mipmaps for this image.
	virtual void GenerateMipMaps();

	// Create an empty mip chain for this image.
	virtual void CreateEmptyMipChain();

	virtual ScratchImage^ ScratchImage::Resize(Int32 width, Int32 height, bool decompress);

	virtual void SaveToDDS(String^ path);

	~ScratchImage();

internal:
	ScratchImage();

	DirectX::ScratchImage* GetScratchImage() { return scratchImage_; }

private:
	DirectX::ScratchImage* scratchImage_;
};
}
