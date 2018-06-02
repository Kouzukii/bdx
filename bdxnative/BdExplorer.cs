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
                folder.children.Add(block.FileName, new FolderEntry(block.FileName, block.Size));
            }
        }

        public ICollection<FolderEntry> GetFolderEntries(string path) {
            return Traverse(path, false).children.Values;
        }

        private FolderEntry Traverse(string path, bool create) {
            var split = path.Split(new []{'/'}, StringSplitOptions.RemoveEmptyEntries);
            var current = root;
            foreach (var part in split) {
                if (current.children.TryGetValue(part, out var next)) {
                    current = next;
                } else if (create) {
                    var entry = new FolderEntry(part);
                    current.children.Add(part, entry);
                    current = entry;
                } else {
                    throw new NoSuchFolderException();
                }
            }

            return current;
        }

        public class NoSuchFolderException : Exception {
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

            public FolderEntry(string name) {
                Name = name;
                Type = EntryType.directory;
                children = new Dictionary<string, FolderEntry>();
            }

            public FolderEntry(string name, int size) {
                Name = name;
                Size = size;
            }
        }
    }
}