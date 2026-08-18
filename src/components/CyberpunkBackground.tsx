import { motion } from 'framer-motion';

interface CyberpunkBackgroundProps {
  scanLine: number;
}

export function GridBackground() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(180,0,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(180,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    />
  );
}

export function ScanLine({ scanLine }: CyberpunkBackgroundProps) {
  return (
    <div
      className="absolute left-0 right-0 z-10 pointer-events-none"
      style={{
        top: `${scanLine}%`,
        height: '2px',
        background:
          'linear-gradient(90deg, transparent, rgba(255,0,0,0.15), transparent)',
        transition: 'top 0.02s linear',
      }}
    />
  );
}

export function CornerDecorations() {
  return (
    <>
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-red-700/60 z-10" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-red-700/60 z-10" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-red-700/60 z-10" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-red-700/60 z-10" />
    </>
  );
}

export function SideDataStreams() {
  return (
    <>
      <div className="absolute left-4 top-20 bottom-20 w-px bg-red-950/40 z-10">
        <motion.div
          animate={{ y: ['0%', '100%'] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          className="w-full h-20 bg-gradient-to-b from-transparent via-red-600/40 to-transparent"
        />
      </div>
      <div className="absolute right-4 top-20 bottom-20 w-px bg-red-950/40 z-10">
        <motion.div
          animate={{ y: ['100%', '0%'] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
          className="w-full h-20 bg-gradient-to-b from-transparent via-red-600/40 to-transparent"
        />
      </div>
    </>
  );
}

export function FloatingBinary() {
  const binaryValues = ['01001000', '10110001', '01110100', '11001010', '00101101'];

  return (
    <>
      {binaryValues.map((bin, i) => (
        <motion.div
          key={i}
          className="absolute text-red-950/40 text-xs select-none pointer-events-none"
          style={{ left: `${10 + i * 18}%`, top: `${15 + i * 12}%` }}
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.5 }}
        >
          {bin}
        </motion.div>
      ))}
    </>
  );
}
