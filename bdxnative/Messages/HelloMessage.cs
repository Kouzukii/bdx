using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace bdxnative.Messages {
    [Serializable]
    public class HelloMessage : Message {
        public HelloMessage() {
            Type = NATIVE_HELLO;
        }

        [JsonProperty("connection")] public string connection = "ok";
    }
}