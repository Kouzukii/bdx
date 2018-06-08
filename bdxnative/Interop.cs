using System;
using System.Runtime.InteropServices;
using System.Text;
using Microsoft.Win32.SafeHandles;

namespace bdxnative {
    internal static class Interop {
        internal enum FileType : uint
        {
            FileTypeChar = 0x0002,
            FileTypeDisk = 0x0001,
            FileTypePipe = 0x0003,
            FileTypeRemote = 0x8000,
            FileTypeUnknown = 0x0000,
        }
        internal const int CSIDL_COMMON_STARTMENU = 0x16;
        internal const int CSIDL_COMMON_DESKTOPDIRECTORY = 0x19;

        [DllImport("shell32.dll")]
        internal static extern bool SHGetSpecialFolderPath(IntPtr hwndOwner, [Out] StringBuilder lpszPath, int nFolder, bool fCreate);

        [DllImport("msvcrt.dll")]
        internal static extern SafeFileHandle _get_osfhandle(int fd);
        
        [DllImport("kernel32.dll")]
        internal static extern FileType GetFileType(IntPtr hFile);
        
        [DllImport("kernel32.dll")]
        internal static extern FileType GetFileType(SafeFileHandle hFile);
    }
}