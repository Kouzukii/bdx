using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using log4net;

namespace bdxnative {
    class BdWatcher {
        private static ILog log = LogManager.GetLogger(typeof(BdWatcher));

        public BdWatcher() {
            new Thread(Watcher){IsBackground = true, Name = "Watcher"}.Start();
        }

        private void Watcher() {

        }
    }
}
