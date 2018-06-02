using System;
using System.Runtime.InteropServices;
using log4net;

namespace bdxnative {
    public class Program {
        private static readonly ILog log = LogManager.GetLogger("bdxnative");

        public static NodeIPC channel;
        public static BdExplorer explorer;
        public static MessageProcessor msgProcessor;

        public static int Main(string[] args) {
            try {
                channel = new NodeIPC();
            } catch (NodeIPC.MissingIpcChannelException) {
                log.Fatal("missing ipc channel");
                return 1;
            } catch (NodeIPC.InvalidChannelException) { 
                log.Fatal("invalid ipc channel");
                return 1;
            }

            log.Info("creating message processor");
            msgProcessor = new MessageProcessor();

            log.Info("connecting to bdxhost");
            channel.Listen();

#if DEBUG
            Console.ReadLine();
#endif

            return 0;
        }

        public static void LoadInitialState() {
            explorer = new BdExplorer();
        }
    }
}