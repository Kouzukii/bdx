using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using bdxnative.Messages;
using log4net;
using Microsoft.Win32.SafeHandles;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace bdxnative {
    public class NodeIPC : IDisposable {
        private static Encoding utf8 = new UTF8Encoding(false);
        private static ILog log = LogManager.GetLogger(typeof(NodeIPC));
        private SafeFileHandle channel;

        private JsonSerializer serializer = new JsonSerializer {
            Culture = CultureInfo.InvariantCulture,
            NullValueHandling = NullValueHandling.Ignore,
            Formatting = Formatting.None,
            TypeNameHandling = TypeNameHandling.None
        };

        private JsonTextWriter writer;
        private StreamReader reader;
        private Stream fs;

        public NodeIPC() {
            var chanenv = Environment.GetEnvironmentVariable("BDX_FD");
            if (!int.TryParse(chanenv, out int ipcchan)) {
#if DEBUG
                fs = new MultiStream(Console.OpenStandardInput(), Console.OpenStandardOutput());
                Program.LoadInitialState();
                return;
#else
                throw new MissingIpcChannelException();
#endif
            }

            channel = Interop._get_osfhandle(ipcchan);
            if (Interop.GetFileType(channel) != Interop.FileType.FileTypePipe) {
                throw new InvalidChannelException();
            }

            fs = new FileStream(channel, FileAccess.ReadWrite);
        }

        ~NodeIPC() {
            Dispose(false);
        }

        public void SendMessage(Message msg) {
            serializer.Serialize(writer, msg);
            writer.Flush();
            fs.WriteByte(0x0A);
        }

        public void Listen() {
            writer = new JsonTextWriter(new StreamWriter(fs, utf8));
            reader = new StreamReader(fs, utf8);
            try {
                while (true) {
                    try {
                        var data = reader.ReadLine();
                        using (var jr = new JsonTextReader(new StringReader(data ?? throw new InvalidOperationException()))) {
                            Message msg = serializer.Deserialize<Message>(jr);
                            Program.msgProcessor.Receive(msg);
                        }
                        log.Info("Finished processing message");
                    } catch (JsonException e) {
                        log.Warn("Invalid message", e);
                    }
                }
            } catch (Exception e) {
                log.Warn("Listener interrupted. Exiting", e);
            }
        }

        public class MissingIpcChannelException : Exception {
        }

        public class InvalidChannelException : Exception {
        }

        private void Dispose(bool disposing) {
            if (disposing) {
                channel?.Dispose();
                fs?.Close();
                fs?.Dispose();
            }
        }

        public void Dispose() {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}