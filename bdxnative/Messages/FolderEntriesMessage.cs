using System;
using System.Collections.Generic;
using System.Linq;

namespace bdxnative.Messages {
    internal class FolderEntriesMessage : Message {
        public ICollection<BdExplorer.FolderEntry> entries;
        public string path;
        public int total;
        public int count;
        public int offset;

        public FolderEntriesMessage(string path, int offset, int maxSize, ICollection<BdExplorer.FolderEntry> entries) {
            Type = FOLDER_GET_SUCCESS;
            this.path = path;
            this.total = entries.Count;

            if (offset > 0 || entries.Count > maxSize) {
                this.offset = offset;
                this.count = Math.Min(entries.Count - offset, maxSize);
                this.entries = entries.Skip(offset).Take(maxSize).ToList();
            } else {
                this.count = total;
                this.entries = entries;
            }
        }
    }
}