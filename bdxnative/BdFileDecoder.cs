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

        private static string GetSpecularName(string texture) {
            if (texture.EndsWith("_dm")) return texture.Substring(0, texture.Length - 2) + "sp.dds";
            return texture + "_sp.dds";
        }

        private static string GetNormalName(string texture) {
            if (texture.EndsWith("_dm")) return texture.Substring(0, texture.Length - 2) + "n.dds";
            return texture + "_n.dds";
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
            var upscaled = DDSUtility.GetUpscaledName(path);

            if (ft == FileType.PAC) {
                var file = new FileInfo(path + ".json");
                path = file.FullName;
                var data = Pac2Json.ReadPAC(fb);

                if (exportTextures) {
                    foreach (var mesh in data.Meshes) {
                        var texture = textureResolver($"{mesh.TextureName}.dds");
                        if (texture != null) Export(texture, false, null, out mesh.TexturePath);
                        var normalTexture = textureResolver(GetNormalName(mesh.TextureName));
                        if (normalTexture != null) Export(normalTexture, false, null, out mesh.NormTexturePath);
                        var specularTexture = textureResolver(GetSpecularName(mesh.TextureName));
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
                    if (File.Exists(upscaled)) File.Delete(upscaled);

                    File.WriteAllBytes(hash, BitConverter.GetBytes(fb.Hash));
                } else {
                    if (File.Exists(upscaled)) path = upscaled;
                }
            }

            return ft;
        }
    }
}