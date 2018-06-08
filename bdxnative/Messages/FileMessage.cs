using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace bdxnative.Messages {
    class FileMessage : Message {

        [JsonProperty("fileType"), JsonConverter(typeof(StringEnumConverter))]
        public BdFileDecoder.FileType FileType { get; }

        [JsonProperty("path")]
        public string Path { get; }

        public FileMessage(string path, BdFileDecoder.FileType fileType) {
            Type = FILE_GET_SUCCESS;
            Path = path;
            FileType = fileType;
        }
    }
}
