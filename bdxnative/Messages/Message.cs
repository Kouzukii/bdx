using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
        public const string FILE_UPSCALE = "FILE_UPSCALE";
        public const string FILE_UPSCALE_SUCCESS = "FILE_UPSCALE_SUCCESS";

        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        [JsonExtensionData] private IDictionary<string, JToken> _additionalData;

        public JToken this[string key] => _additionalData[key];
    }
}