using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bdxnative.Messages {
    class FailedToProcessMessage : Message {
        public FailedToProcessMessage(string msgType) {
            Type = msgType + "_FAILED";
        }
    }
}
