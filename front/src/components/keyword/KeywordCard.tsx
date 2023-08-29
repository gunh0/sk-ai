import {motion} from 'framer-motion';
import {RefObject, useRef} from 'react';
import {Keyword} from '../../types/Keyword.ts';
import {SystemStyleObject} from '../../../styled-system/types';
import {css} from '../../../styled-system/css';

type Props = {
  keyword: Keyword;
  dragConstraint: RefObject<HTMLDivElement>;
  onAnimationUpdate?: (rect?: DOMRect) => void;
};

const shapes = ['diamond', 'rectangle', 'circle'];
const getRandomShape = () => shapes[Math.floor((Math.random() * 100) % 3)];

export const KeywordCard = ({keyword, dragConstraint, onAnimationUpdate}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const shape = getRandomShape();
  return (
    <>
      <motion.div
        drag
        ref={ref}
        className={css(containerStyle)}
        dragConstraints={dragConstraint}
        onUpdate={() => onAnimationUpdate?.(ref.current?.getBoundingClientRect())}
        data-shape={shape}
        initial={{
          ...(shape === 'rectangle' && {rotate: Math.floor(Math.random() * 90) - 45}),
        }}
      >
        {keyword.name}
      </motion.div>
    </>
  );
};

const rectangle: SystemStyleObject = {
  width: '200px',
  height: '160px',
  clipPath: 'url(#rectangle)',
};
const circle: SystemStyleObject = {
  width: '180px',
  height: '180px',
  clipPath: 'url(#circle)',
};
const diamond: SystemStyleObject = {
  width: '192px',
  height: '192px',
  clipPath: 'url(#diamond)',
};

const containerStyle: SystemStyleObject = {
  bgColor: '#ffffff10',
  backdropFilter: 'blur(25px)',
  width: '192px',
  height: '192px',
  color: '#f8bbed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '28px',
  textTransform: 'uppercase',
  '&[data-shape=diamond]': diamond,
  '&[data-shape=rectangle]': rectangle,
  '&[data-shape=circle]': circle,
};