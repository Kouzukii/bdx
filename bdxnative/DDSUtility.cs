using System;
using System.IO;
using System.Reflection;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using DirectXTexNet;

namespace bdxnative {
    class DDSUtility {
        private static readonly double LN2 = Math.Log(2);

        private static int CeilPowerOfTwo(int value) {
            return (int)Math.Pow(2, Math.Ceiling(Math.Log(value) / LN2));
        }

        public static string GetUpscaledName(string path) {
            return Path.ChangeExtension(path, ".upscaled" + Path.GetExtension(path));
        }

        public static string Upscale(string path) {
            using (var image = DirectXTex.LoadFromDDSFile(path)) {
                var meta = image.MetaData;
                var newImg = image.Resize(CeilPowerOfTwo(meta.Width), CeilPowerOfTwo(meta.Height), true);
                path = GetUpscaledName(path);
                newImg.SaveToDDS(path);
            }

            return path;
        }
    }
}