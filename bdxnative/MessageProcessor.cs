using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using bdxnative.Messages;
using log4net;

namespace bdxnative {
    public class MessageProcessor {
        private static readonly ILog log = LogManager.GetLogger("message");

        public void Receive(Message msg) {
            log.Info($"Received message {msg.Type}");
            try {
                switch (msg.Type) {
                    case Message.NATIVE_INIT:
                        // Reset resources
                        Program.LoadInitialState();
                        Program.channel.SendMessage(new HelloMessage());
                        break;
                    case Message.NATIVE_CLOSE:
                        // Release other resources..
                        Program.channel.Dispose();
                        return;
                    case Message.FOLDER_GET:
                        var folder = msg.Payload["path"].ToString();
                        var entries = Program.explorer.GetFolderEntries(folder);
                        Program.channel.SendMessage(new FolderEntriesMessage(folder, entries));
                        break;
                }
            } catch (Exception) {
                Program.channel.SendMessage(new FailedToProcessMessage(msg.Type));
            }
        }

    }
}
