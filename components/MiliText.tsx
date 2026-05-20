import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import classNames from 'classnames';

type MiliColorsContextValue = {
  showColors: boolean;
  toggleColors: () => void;
};

const MiliColorsContext = createContext<MiliColorsContextValue | null>(null);

export const MiliColorsProvider = ({ children }: { children: ReactNode }) => {
  const [showColors, setShowColors] = useState(false);
  const toggleColors = useCallback(
    () => setShowColors((prev) => !prev),
    []
  );

  const value = useMemo(
    () => ({ showColors, toggleColors }),
    [showColors, toggleColors]
  );

  return (
    <MiliColorsContext.Provider value={value}>
      {children}
    </MiliColorsContext.Provider>
  );
};

const useMiliColors = () => {
  const context = useContext(MiliColorsContext);
  if (!context) {
    throw new Error('MiliText must be used within MiliColorsProvider');
  }
  return context;
};

const MILI_COLORS = [
  'text-red-600',
  'text-green-600',
  'text-blue-600',
  'text-yellow-600',
] as const;

function getMiliHighlightMap(text: string): Map<number, string> {
  const map = new Map<number, string>();
  const trimmed = text.trim();
  const parts = trimmed.split(/\s+/);

  const highlightPair = (start: number, colorOffset: number) => {
    map.set(start, MILI_COLORS[colorOffset]);
    map.set(start + 1, MILI_COLORS[colorOffset + 1]);
  };

  if (parts.length >= 2) {
    const firstName = parts[0];
    const lastName = parts[parts.length - 1];
    highlightPair(trimmed.indexOf(firstName), 0);
    highlightPair(trimmed.lastIndexOf(lastName), 2);
  } else if (trimmed.length >= 4) {
    highlightPair(0, 0);
    highlightPair(trimmed.length - 2, 2);
  }

  return map;
}

type MiliTextProps = {
  text: string;
  className?: string;
};

const MiliText = ({ text, className }: MiliTextProps) => {
  const { showColors, toggleColors } = useMiliColors();
  const highlights = getMiliHighlightMap(text);

  return (
    <button
      type="button"
      onClick={toggleColors}
      className={classNames(
        'inline cursor-pointer border-0 bg-transparent p-0 font-inherit',
        className
      )}
      aria-pressed={showColors}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={showColors ? highlights.get(index) : undefined}
        >
          {char}
        </span>
      ))}
    </button>
  );
};

export default MiliText;
