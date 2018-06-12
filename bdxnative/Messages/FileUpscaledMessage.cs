using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace bdxnative.Messages {
    class FileUpscaledMessage : Message {

        [JsonProperty("textureType")]
        public string TextureType { get; }

        [JsonProperty("path")]
        public string Path { get; }

        public FileUpscaledMessage(string path, string textureType) {
            Type = FILE_UPSCALE_SUCCESS;
            Path = path;
            TextureType = textureType;
        }
    }
}
