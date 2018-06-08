using System;
using System.IO;
using BDOToolkit;
using log4net;
using Newtonsoft.Json;

namespace bdxnative {
    static class BdFileDecoder {
        private static readonly JsonSerializer serializer = new JsonSerializer();
        private static readonly ILog log = LogManager.GetLogger(typeof(BdFileDecoder));

        public delegate FileBlock FileBlockResolver(string file);

        public enum FileType {
            DDS,
            PAC,
            Text,
            Unknown
        }

        private static FileStream FullCreate(this FileInfo fileInfo) {
            fileInfo.Directory?.Create();
            return fileInfo.Create();
        }

        public static FileType Export(FileBlock fb, bool exportTextures, FileBlockResolver textureResolver,
            out string path) {
            FileType ft = FileType.Unknown;
            switch (Path.GetExtension(fb.FileName)?.ToLowerInvariant()) {
                case ".pac":
                    ft = FileType.PAC;
                    break;

                case ".dds":
                    ft = FileType.DDS;
                    break;

                case ".txt":
                case ".xml":
                    ft = FileType.Text;
                    break;
            }

            path = Path.Combine(BdDiscovery.DataDir, fb.FolderName, fb.FileName);

            if (ft == FileType.PAC) {
                var file = new FileInfo(path);
                var data = Pac2Json.ReadPAC(fb);

                if (exportTextures) {
                    foreach (var mesh in data.Meshes) {
                        var texture = textureResolver($"{mesh.TextureName}.dds");
                        if (texture != null) Export(texture, false, null, out mesh.TexturePath);
                        var normalTexture = textureResolver($"{mesh.TextureName}_n.dds");
                        if (normalTexture != null) Export(normalTexture, false, null, out mesh.NormTexturePath);
                        var specularTexture = textureResolver($"{mesh.TextureName}_sp.dds");
                        if (specularTexture != null) Export(specularTexture, false, null, out mesh.SpecTexturePath);
                    }
                }

                using (var writer = new StreamWriter(file.FullCreate())) {
                    serializer.Serialize(writer, data);
                }
            } else {
                var hash = path + ".hash";

                if (!File.Exists(hash) || BitConverter.ToInt32(File.ReadAllBytes(hash), 0) != fb.Hash) {
                    fb.Extract(BdDiscovery.DataDir);

                    File.WriteAllBytes(hash, BitConverter.GetBytes(fb.Hash));
                }
            }

            return ft;
        }
    }
}