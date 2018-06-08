using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics.CodeAnalysis;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace bdxnative.Messages {
    [Serializable]
    public class Message {

        public const string NATIVE_HELLO = "NATIVE_HELLO";
        public const string NATIVE_INIT = "NATIVE_INIT";
        public const string NATIVE_CLOSE = "NATIVE_CLOSE";
        public const string FOLDER_GET = "FOLDER_GET";
        public const string FOLDER_GET_SUCCESS = "FOLDER_GET_SUCCESS";
        public const string FILE_GET = "FILE_GET";
        public const string FILE_GET_SUCCESS = "FILE_GET_SUCCESS";
        public const string UPSCALE_FILE = "UPSCALE_FILE";

        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        [JsonIgnore]
        public ReadOnlyDictionary<string, JToken> Payload => new ReadOnlyDictionary<string, JToken>(_additionalData);

        [JsonExtensionData] private IDictionary<string, JToken> _additionalData;
    }
}