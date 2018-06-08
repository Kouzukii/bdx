//using System;
//using System.IO;
//using System.Reflection;
//using CSharpImageLibrary;

//namespace bdxnative {
//    class DDSUtility {
//        private static readonly double LN2 = Math.Log(2);

//        private static readonly MethodInfo Resize =
//            typeof(ImageEngine).GetMethod("Resize", new[] { typeof(MipMap), typeof(double), typeof(double) });

//        private static bool isPowerOfTwo(int value) {
//            return (value & (value - 1)) == 0 && value != 0;
//        }

//        private static int ceilPowerOfTwo(int value) {
//            return (int) Math.Pow(2, Math.Ceiling(Math.Log(value) / LN2));
//        }

//        static void Upscale(string path) {
//            var engineImage = new ImageEngineImage(path);
//            if (!isPowerOfTwo(engineImage.Width) || !isPowerOfTwo(engineImage.Height)) {
//                var mipCount = engineImage.MipMaps.Count;
//                engineImage.MipMaps[0] = (MipMap) Resize.Invoke(null,
//                    new object[] {
//                        engineImage.MipMaps[0],
//                        (double) ceilPowerOfTwo(engineImage.Width) / engineImage.Width,
//                        (double) ceilPowerOfTwo(engineImage.Height) / engineImage.Height
//                    });
//                engineImage.MipMaps.RemoveRange(1, mipCount - 1);
//                var data = engineImage.Save(engineImage.FormatDetails, MipHandling.GenerateNew, removeAlpha: false);
//                File.WriteAllBytes(path, data);
//            }
//        }
//    }
//}