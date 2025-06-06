'use client';

import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function LatexRenderer({ 
  children, 
  displayMode = false 
}: { 
  children: string;
  displayMode?: boolean;
}) {
  return displayMode ? (
    <BlockMath math={children} />
  ) : (
    <InlineMath math={children} />
  );
}
