using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using bdxnative.Messages;
using log4net;

namespace bdxnative {
    public class MessageProcessor {
        private static readonly ILog log = LogManager.GetLogger(typeof(MessageProcessor));

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
                        Program.channel.SendMessage(new FolderEntriesMessage(folder, 0, 1000, entries));
                        break;
                    case Message.FILE_GET:
                        var fileBlock = Program.explorer.GetFileBlock(msg.Payload["path"].ToString());
                        var type = BdFileDecoder.Export(fileBlock,
                            msg.Payload["extractTextures"]?.ToObject<bool>() ?? false,
                            Program.explorer.GetFileBlockForName, out string path);
                        Program.channel.SendMessage(new FileMessage(path, type));
                        break;
                    case Message.UPSCALE_FILE:
                        break;

                }
            } catch (Exception e) {
#if DEBUG
                log.Warn("Error while processing message", e);
#endif
                Program.channel.SendMessage(new FailedToProcessMessage(msg.Type));
            }
        }
    }
}