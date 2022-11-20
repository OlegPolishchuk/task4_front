import React, {FC} from 'react';

interface Props {
  title: string;
  className?: string;
}

export const Title: FC<Props> = ({title, className}) => {
  const finalClassName = className ? className : '';
  return (
    <h3 className={`h-3 my-3 ${finalClassName}`}>{title}</h3>
  );
};