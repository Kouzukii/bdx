using System.Collections.Generic;

namespace bdxnative.Messages {
    internal class FolderEntriesMessage : Message {
        public ICollection<BdExplorer.FolderEntry> entries;
        public string path;

        public FolderEntriesMessage(string path, ICollection<BdExplorer.FolderEntry> entries) {
            Type = FOLDER_SUCCESS;
            this.path = path;
            this.entries = entries;
        }
    }
}