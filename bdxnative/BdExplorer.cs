using System;
using System.Collections.Generic;
using System.IO;
using BDOToolkit;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace bdxnative {
    public class BdExplorer {
        private readonly MetaFileInfo metaFile;
        private FolderEntry root;

        public BdExplorer() {
            metaFile = new MetaFileInfo(Path.Combine(BdDiscovery.PazLocation, "pad00000.meta"));
            metaFile.FillFileBlocks();
            metaFile.FillPazFiles();
            metaFile.FillFileBlockNames();
            BuildFileTree();
        }

        private void BuildFileTree() {
            root = new FolderEntry("");
            foreach (var block in metaFile.FileBlocks) {
                var folder = Traverse(block.FolderName, true);
                folder.children.Add(block.FileName, new FolderEntry(block));
            }
        }

        public ICollection<FolderEntry> GetFolderEntries(string path) {
            return Traverse(path, false).children.Values;
        }

        public FileBlock GetFileBlock(string path) {
            return Traverse(path, false).fileBlock;
        }

        public FileBlock GetFileBlockForName(string fileName) {
            return metaFile.FileBlocks.Find(fb => fileName.Equals(fb.FileName, StringComparison.InvariantCultureIgnoreCase));
        }

        private FolderEntry Traverse(string path, bool create) {
            var split = path.Split(new []{'/'}, StringSplitOptions.RemoveEmptyEntries);
            var current = root;
            foreach (var part in split) {
                var lower = part.ToLower();
                if (current.children.TryGetValue(lower, out var next)) {
                    current = next;
                } else if (create) {
                    var entry = new FolderEntry(part);
                    current.children.Add(lower, entry);
                    current = entry;
                } else {
                    throw new NoSuchEntryException();
                }
            }

            return current;
        }

        public class NoSuchEntryException : Exception {
        }

        public enum EntryType {
            file,
            directory
        }

        public class FolderEntry {
            [JsonProperty("type"), JsonConverter(typeof(StringEnumConverter))]
            public EntryType Type { get; }

            [JsonProperty("name")]
            public string Name { get; }

            [JsonProperty("size")]
            public int? Size { get; }

            [JsonIgnore] public readonly Dictionary<string, FolderEntry> children;

            [JsonIgnore] public readonly FileBlock fileBlock;

            public FolderEntry(string name) {
                Type = EntryType.directory;
                Name = name;
                children = new Dictionary<string, FolderEntry>();
            }

            public FolderEntry(FileBlock fileBlock) {
                Type = EntryType.file;
                Name = fileBlock.FileName;
                Size = fileBlock.Size;
                this.fileBlock = fileBlock;
            }
        }
    }
}