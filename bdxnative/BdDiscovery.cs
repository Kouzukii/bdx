using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IWshRuntimeLibrary;
using Microsoft.Win32;
using File = System.IO.File;

namespace bdxnative {
    public static class BdDiscovery {
        private static string location;

        public static string PazLocation => Path.Combine(Location, "Paz");

        public static string Location {
            get {
                if (location != null) return location;
                
                var path = (string) Registry.GetValue(
                    "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\{C1F96C92-7B8C-485F-A9CD-37A0708A2A60}",
                    "InstallLocation", "");
                if (Directory.Exists(path)) {
                    return location = path;
                }

                // Try via autostart shortcut
                path = Environment.GetFolderPath(Environment.SpecialFolder.CommonStartMenu);
                if (ResolveLinkDirectory(Path.Combine(path, "Black Desert Online.lnk"), out string link)) {
                    return location = link;
                }

                // Try via desktop shortcut
                path = Environment.GetFolderPath(Environment.SpecialFolder.CommonDesktopDirectory);
                if (ResolveLinkDirectory(Path.Combine(path, "Black Desert Online.lnk"), out link)) {
                    return location = link;
                }

                // Try via program files
                path = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86),
                    "Black Desert Online");
                if (Directory.Exists(path)) {
                    location = path;
                }

                throw new DirectoryNotFoundException("Black Desert Online could not be discovered.");
            }
        }

        private static bool ResolveLinkDirectory(string linkPath, out string directory) {
            if (!File.Exists(linkPath)) {
                directory = null;
                return false;
            }

            WshShell shell = new WshShell();
            var target = new FileInfo(((IWshShortcut) shell.CreateShortcut(linkPath)).TargetPath);
            if (target.Exists) {
                directory = target.DirectoryName;
                return true;
            }

            directory = null;
            return false;
        }
    }
}