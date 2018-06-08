using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using BDOToolkit;
using BDOToolkit.Math;
using BDOToolkit.Model;
using Newtonsoft.Json;

namespace bdxnative {
    class JsonData {
        [JsonProperty("meshes")] public IList<Mesh> Meshes;
    }

    class Mesh {
        [JsonProperty("textureName")] public string TextureName;

        [JsonProperty("lods")] public IList<Geometry> LODs;

        [JsonProperty("texturePath")] public string TexturePath;

        [JsonProperty("specTexturePath")] public string SpecTexturePath;

        [JsonProperty("normTexturePath")] public string NormTexturePath;
    }

    class Geometry {
        [JsonProperty("skinIndices")] public IList<Vector4> SkinIndices;

        [JsonProperty("skinWeights")] public IList<Vector4> SkinWeights;

        [JsonProperty("positions")] public IList<float> Positions;

        [JsonProperty("normals")] public IList<float> Normals;

        [JsonProperty("uvs")] public IList<float> UVs;

        [JsonProperty("faceIndices")] public IList<ushort> FaceIndices;
    }

    class Pac2Json {

        private static IEnumerable<float> TangentsToNormals(IEnumerable<byte> tangentData) {
            using (var enm = tangentData.GetEnumerator()) {
                while (enm.MoveNext()) {
                    var x = (double)enm.Current / 255 * Math.PI * 2 - Math.PI;
                    enm.MoveNext();
                    var y = (double)enm.Current / 255 * Math.PI * 2 - Math.PI;
                    enm.MoveNext();
                    var z = (double)enm.Current / 255 * Math.PI * 2 - Math.PI;
                    enm.MoveNext();
                    var w = (double)enm.Current / 255 * Math.PI * 2 - Math.PI;

                    var tangentScalar   = Math.Sin(y);
                    var bitangentScalar = Math.Sin(w);

                    var tx = Math.Cos(x) * Math.Abs(tangentScalar);
                    var ty = Math.Sin(x) * Math.Abs(tangentScalar);
                    var tz = Math.Cos(y);

                    var bx = Math.Cos(z) * Math.Abs(bitangentScalar);
                    var by = Math.Sin(z) * Math.Abs(bitangentScalar);
                    var bz = Math.Cos(w);

                    yield return (float) (ty * bz - by * tz) * (w >= 0 ? 1 : -1);
                    yield return (float) (bx * tz - tx * bz) * (w >= 0 ? 1 : -1);
                    yield return (float) (tx * by - bx * ty) * (w >= 0 ? 1 : -1);
                }
            }
        }

        public static JsonData ReadPAC(FileBlock fb) {
            var pac = new Pac(fb);

            return new JsonData {
                Meshes = pac.Meshes.Select(m => new Mesh {
                    TextureName = m.TextureName,
                    LODs = m.LOD.Select(l => new Geometry {
                        Positions = l.Vertexes.SelectMany(v => v.Position).ToList(),
                        UVs = l.Vertexes.SelectMany(v => v.UV.Select(u => (float) Half.ToHalf(u))).ToList(),
                        FaceIndices = l.FaceIndices,
                        Normals = TangentsToNormals(l.Vertexes.SelectMany(v => v.Normals)).ToList()
                    }).ToList()
                }).ToList()
            };
        }
    }
}