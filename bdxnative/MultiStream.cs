#if DEBUG
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bdxnative {
    class MultiStream : Stream {
        private readonly Stream @in;
        private readonly Stream @out;

        public MultiStream(Stream instream, Stream outstream) {
            @in = instream;
            @out = outstream;
        }

        protected override void Dispose(bool disposing) {
            if (disposing) {
                @in?.Dispose();
                @out?.Dispose();
            }

            base.Dispose(disposing);
        }

        public override int ReadByte() => @in.ReadByte();

        public override void Flush() => @out.Flush();

        public override long Seek(long offset, SeekOrigin origin) => throw new NotSupportedException();

        public override void SetLength(long value) => throw new NotSupportedException();

        public override int Read(byte[] buffer, int offset, int count) => @in.Read(buffer, offset, count);

        public override void Write(byte[] buffer, int offset, int count) => @out.Write(buffer, offset, count);

        public override bool CanRead { get; } = true;
        public override bool CanSeek { get; } = false;
        public override bool CanWrite { get; } = true;
        public override long Length => throw new NotSupportedException();

        public override long Position {
            get => throw new NotSupportedException();
            set => throw new NotSupportedException();
        }
    }
}
#endif